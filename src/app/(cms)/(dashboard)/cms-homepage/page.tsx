'use client';

import { useEffect, useState } from 'react';
import { getDashboardData } from '@/redux/actions/administratorActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import DashboardCard from '@/components/layout/dashboard-card';
import Loading from '@/components/status/loading';
import CardActivity from '@/app/(dashboard)/homepage/partials/card-activity';
import HomepageText from '@/app/(dashboard)/homepage/partials/homepage-text';

const DashboardCms = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardUser, dashboardActivities } = useSelector(
    (state: RootState) => state.administrator
  );

  useEffect(() => {
    dispatch(getDashboardData()).then(() => setIsLoadingPage(false));
  }, [dispatch]);

  return (
    <>
      {isLoadingPage && dashboardUser === null ? (
        <Loading />
      ) : (
        <>
          {/* Card Activity */}
          <DashboardCard>
            <section className="row-span-1">
              <HomepageText
                date={dashboardUser?.date || 'Memuat...'}
                greeting={dashboardUser?.greeting || 'Memuat...'}
                user={dashboardUser?.user || 'Memuat..'}
                title="Data Pelanggan"
                description="Ringkasan data pelanggan Anda"
              />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardActivity
                  title="Reguler"
                  count={dashboardActivities?.regular || 0}
                  link="/cms-customer"
                />
                <CardActivity
                  title="Profesional"
                  count={dashboardActivities?.professional || 0}
                  link="/cms-customer"
                />
                <CardActivity
                  title="Bisnis"
                  count={dashboardActivities?.business || 0}
                  link="/cms-customer"
                />
                <CardActivity
                  title="Percobaan"
                  count={dashboardActivities?.trial || 0}
                  link="/cms-customer"
                />
                <CardActivity
                  title="Tidak Aktif"
                  count={dashboardActivities?.unactive || 0}
                  link="/cms-customer"
                />
              </div>
            </section>
          </DashboardCard>
        </>
      )}
    </>
  );
};

export default DashboardCms;
