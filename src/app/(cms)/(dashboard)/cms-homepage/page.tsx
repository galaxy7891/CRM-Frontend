"use client";

import { useEffect, useState } from "react";
// import { getDashboardData } from '@/redux/actions/profileActions';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/redux/store';
import DashboardCard from "@/components/layout/dashboard-card";
import Loading from "@/components/status/loading";
import CardActivity from "@/app/(dashboard)/homepage/partials/card-activity";
import HomepageText from "@/app/(dashboard)/homepage/partials/homepage-text";

const DashboardCms = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  // const dispatch = useDispatch<AppDispatch>();

  // const {
  //   dashboardUser,
  //   dashboardActivities,
  //   dashboardDealsValue,
  //   dashboardDealsCount,
  // } = useSelector((state: RootState) => state.profile);

  // useEffect(() => {
  //   dispatch(getDashboardData()).then(() => setIsLoadingPage(false));
  // }, [dispatch]);

  return (
    <>
      {/* {isLoadingPage && dashboardUser === null ? (
        <Loading />
      ) : ( */}
      <>
        {/* Card Activity */}
        <DashboardCard>
          <section className="row-span-1">
            <HomepageText
              date=""
              greeting=""
              user=""
              title="Data Pelanggan"
              description="Ringkasan data pelanggan Anda"
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CardActivity
                title="Reguler"
                // count={dashboardActivities?.leads || 0}
                count={0}
                link="/cms-customer"
              />
              <CardActivity
                title="Profesional"
                // count={dashboardActivities?.contacts || 0}
                count={0}
                link="/cms-customer"
              />
              <CardActivity
                title="Bisnis"
                // count={dashboardActivities?.customers_companies || 0}
                count={0}
                link="/cms-customer"
              />
              <CardActivity
                title="Percobaan"
                // count={dashboardActivities?.customers_companies || 0}
                count={0}
                link="/cms-customer"
              />
              <CardActivity
                title="Tidak Aktif"
                // count={dashboardActivities?.customers_companies || 0}
                count={0}
                link="/cms-customer"
              />
            </div>
          </section>
        </DashboardCard>
      </>
    </>
  );
};

export default DashboardCms;
