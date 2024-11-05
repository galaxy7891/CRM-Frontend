'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import DashboardPositiveButton from '@/components/button/dashboard-positive-button';
import CardActivity from './partials/card-activity';
import CardDeals from '@/app/(dashboard)/homepage/partials/card-pipeline';

interface ActivityData {
  leads: number;
  contacts: number;
  organizations: number;
}

interface DealsPipelineCount {
  qualification: number;
  proposal: number;
  negotiation: number;
  won: number;
  lose: number;
}

interface DealsPipelineValue {
  qualification: string;
  proposal: string;
  negotiation: string;
  won: string;
  lose: string;
}

interface DealsPipeline {
  count: DealsPipelineCount;
  value: DealsPipelineValue;
}

interface Data {
  date: string;
  greeting: string;
  user: string;
  activities: ActivityData;
  deals_pipeline: DealsPipeline;
}

const Dashboard: FC = () => {
  const [data, setData] = useState<Data>();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setData(response.data.data); // Set dashboard data
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const getUserData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem('email', response.data.data.email);
        localStorage.setItem('image_url', response.data.data.image_url);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    getUserData();
    fetchData();
  }, [router]);

  return (
    <>
      {/* Card Activity */}
      <div className="bg-font-white  dark:bg-dark-navy shadow-lg rounded-lg p-6 grid grid-rows-1">
        <section className="row-span-1">
          <p className="text-base font-custom dark:text-font-white">
            {data?.date || 'Loading...'}
          </p>
          <h1 className="font-custom font-bold lg:text-2xl text-base text-font-black dark:text-font-white pt-1">
            {data?.greeting || 'Loading...'}{' '}
            <span className="text-light-gold lg:text-2xl text-base font-bold font-custom">
              {data?.user || 'Loading..'}
            </span>
          </h1>
          <p className="text-sm lg:text-2xl font-custom text-font-black dark:text-font-white font-medium pt-6">
            Data Pelanggan
          </p>
          <p className="text-xs lg:text-base font-custom text-font-black dark:text-font-white pt-1">
            Ringkasan data pelanggan Anda
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardActivity
              title="Leads"
              count={data?.activities?.leads || 0}
              link="/leads"
            />
            <CardActivity
              title="Kontak"
              count={data?.activities?.contacts || 0}
              link="/contacts"
            />
            <CardActivity
              title="Perusahaan"
              count={data?.activities?.organizations || 0}
              link="/company"
            />
          </div>
        </section>
      </div>

      {/* Card Pipeline */}

      <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 mt-4 lg:mt-8 grid grid-rows-1 ">
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
              <DashboardPositiveButton>Detail</DashboardPositiveButton>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardDeals
              title="Kualifikasi"
              total_pipeline={data?.deals_pipeline?.count?.qualification || 0}
              funds={data?.deals_pipeline?.value?.qualification || '0'}
            />
            <CardDeals
              title="Proposal"
              total_pipeline={data?.deals_pipeline?.count?.proposal || 0}
              funds={data?.deals_pipeline?.value?.proposal || '0'}
            />
            <CardDeals
              title="Negosiasi"
              total_pipeline={data?.deals_pipeline?.count?.negotiation || 0}
              funds={data?.deals_pipeline?.value?.negotiation || '0'}
            />
            <CardDeals
              title="Tercapai"
              total_pipeline={data?.deals_pipeline?.count?.won || 0}
              funds={data?.deals_pipeline?.value?.won || '0'}
            />
            <CardDeals
              title="Gagal"
              total_pipeline={data?.deals_pipeline?.count?.lose || 0}
              funds={data?.deals_pipeline?.value?.lose || '0'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
