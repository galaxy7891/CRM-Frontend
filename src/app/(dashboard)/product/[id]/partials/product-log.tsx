'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { activityLogTypes } from '@/types/profileTypes';
import { paginationTypes } from '@/types/otherTypes';
import { logActivityProduct } from '@/redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { useParams } from 'next/navigation';
import CardActivityLog from '@/components/layout/log-card';
import DashboardCard from '@/components/layout/dashboard-card';
import PaginationButton from '@/components/button/pagination-button';
import DashboardPositiveButton from '@/components/button/dashboard-positive-button';

const ProductLog = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [pagination, setPagination] = useState<paginationTypes>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 25,
    next_page_url: null,
    prev_page_url: null,
  });
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { productLog } = useSelector((state: RootState) => state.products);

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(
        logActivityProduct(pagination.current_page + 1, id, setPagination)
      );
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(
        logActivityProduct(pagination.current_page - 1, id, setPagination)
      );
    }
  };

  useEffect(() => {
    dispatch(
      logActivityProduct(pagination.current_page, id, setPagination)
    ).then(() => {
      setIsLoadingPage(false);
    });
  }, [id, dispatch, pagination.current_page]);

  return (
    <div className="pt-4 lg:pt-8 ">
      <DashboardCard>
        {/* Header */}
        <div className="col-span-12 flex justify-between items-center">
          <p className="font-custom dark:text-font-white text-font-black md:text-2xl font-medium text-sm">
            Aktivitas
          </p>
          <Link href="#">
            <DashboardPositiveButton>Detail</DashboardPositiveButton>
          </Link>
        </div>
        {/* Body */}
        {isLoadingPage ? (
          <div className="flex justify-center text-black dark:text-white">
            Memuat...
          </div>
        ) : (
          <div className="col-span-12 space-y-4 mt-4">
            {productLog.map((log: activityLogTypes, index: number) => (
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
        )}
      </DashboardCard>
    </div>
  );
};

export default ProductLog;
