'use client';

import { useEffect, useState } from 'react';
// import Link from 'next/link';
import { activityLogTypes } from '@/types/profileTypes';
import { paginationTypes } from '@/types/otherTypes';
import { logActivityProfile } from '@/redux/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import CardActivityLog from '@/components/layout/log-card';
import DashboardCard from '@/components/layout/dashboard-card';
import PaginationButton from '@/components/button/pagination-button';
// import DashboardPositiveButton from '@/components/button/dashboard-positive-button';

const UserLog = () => {
  const [pagination, setPagination] = useState<paginationTypes>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 25,
    next_page_url: null,
    prev_page_url: null,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { logProfile } = useSelector((state: RootState) => state.profile);

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(logActivityProfile(pagination.current_page + 1, setPagination));
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(logActivityProfile(pagination.current_page - 1, setPagination));
    }
  };

  useEffect(() => {
    dispatch(logActivityProfile(pagination.current_page, setPagination));
  }, [dispatch, pagination.current_page]);

  return (
    <div className="pt-4 lg:pt-8 ">
      <DashboardCard>
        {/* Header */}
        <div className="col-span-12 flex justify-between items-center">
          <p className="font-custom dark:text-font-white text-font-black md:text-2xl font-medium text-sm">
            Aktivitas
          </p>
          {/* <Link href="#">
            <DashboardPositiveButton>Detail</DashboardPositiveButton>
          </Link> */}
        </div>
        {/* Body */}
        <div className="col-span-12 space-y-4 mt-4">
          {logProfile.map((log: activityLogTypes, index: number) => (
            <CardActivityLog
              key={index}
              title={log.title}
              date={log.datetime}
              description={log.description}
            />
          ))}
          {/* Pagination Button */}
          <PaginationButton
            last_page={pagination.last_page}
            current_page={pagination.current_page}
            prev_page_url={pagination.prev_page_url}
            next_page_url={pagination.next_page_url}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            perPage={pagination.per_page}
          />
        </div>
      </DashboardCard>
    </div>
  );
};

export default UserLog;
