'use client';

import { useEffect, useState } from 'react';
import { getDashboardData } from '@/redux/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import DashboardPositiveButton from '@/components/button/dashboard-positive-button';
import DashboardCard from '@/components/layout/dashboard-card';
import CardActivity from './partials/card-activity';
import CardDeals from '@/app/(dashboard)/homepage/partials/card-pipeline';
import Loading from '@/components/status/loading';
import HomepageText from './partials/homepage-text';

const Dashboard = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleDealsDetail = () => {
    router.push('/deals');
  };

  const {
    dashboardUser,
    dashboardActivities,
    dashboardDealsValue,
    dashboardDealsCount,
  } = useSelector((state: RootState) => state.profile);

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
              title='Data Pelanggan'
              description='Ringkasan data pelanggan Anda'/>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardActivity
                  title="Leads"
                  count={dashboardActivities?.leads || 0}
                  link="/leads"
                />
                <CardActivity
                  title="Kontak"
                  count={dashboardActivities?.contacts || 0}
                  link="/contacts"
                />
                <CardActivity
                  title="Perusahaan"
                  count={dashboardActivities?.customers_companies || 0}
                  link="/companies"
                />
              </div>
            </section>
          </DashboardCard>
          <div className="md:pt-7 pt-4"></div>
          {/* Card Pipeline */}
          <DashboardCard>
            <div className="row-span-1">
              <div className="grid grid-cols-12 ">
                <div className="col-span-7 lg:col-span-6">
                  <p className="font-custom text-font-black dark:text-font-white font-medium lg:text-2xl text-sm">
                    Deals Pipeline
                  </p>
                  <p className="font-custom text-font-black dark:text-font-white lg:text-base text-xs w-full pt-1">
                    Ringkasan data deals Anda
                  </p>
                </div>
                <div className="col-span-5 lg:col-span-6 flex justify-end items-center ">
                  <DashboardPositiveButton onClick={handleDealsDetail}>
                    Detail
                  </DashboardPositiveButton>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CardDeals
                  title="Kualifikasi"
                  total_pipeline={dashboardDealsCount?.qualification || 0}
                  funds={dashboardDealsValue?.qualification || '0'}
                />
                <CardDeals
                  title="Proposal"
                  total_pipeline={dashboardDealsCount?.proposal || 0}
                  funds={dashboardDealsValue?.proposal || '0'}
                />
                <CardDeals
                  title="Negosiasi"
                  total_pipeline={dashboardDealsCount?.negotiation || 0}
                  funds={dashboardDealsValue?.negotiation || '0'}
                />
                <CardDeals
                  title="Tercapai"
                  total_pipeline={dashboardDealsCount?.won || 0}
                  funds={dashboardDealsValue?.won || '0'}
                />
                <CardDeals
                  title="Gagal"
                  total_pipeline={dashboardDealsCount?.lose || 0}
                  funds={dashboardDealsValue?.lose || '0'}
                />
              </div>
            </div>
          </DashboardCard>
        </>
      )}
    </>
  );
};

export default Dashboard;
