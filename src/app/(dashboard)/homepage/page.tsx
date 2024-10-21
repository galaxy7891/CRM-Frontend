'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardActivity from '../../../components/homepage/card-activity';
import CardDeals from '@/components/homepage/card-pipeline';
import axios from 'axios';

const Dashboard: FC = () => {
  const [data, setData] = useState<any>(null);
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

    fetchData();
  }, [router]);

  return (
    <>
      {/* Card Activity */}
      <div className="bg-font-white dark:text-font-white shadow-lg rounded-lg p-6 lg:m-4 grid grid-rows-1  ">
        <section className="row-span-1">
          {data?.date || 'Loading...'}
          <h1 className="font-custom font-bold lg:text-2xl text-base text-font-black pt-1">
            {data?.user || 'Loading...'}{' '}
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
              link="/contact"
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

      <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 lg:mx-4 my-4 lg:my-8 grid grid-rows-1 ">
        <div className="row-span-1">
          <div className="grid grid-cols-12 ">
            <div className="col-span-8 lg:col-span-6">
              <p className="font-custom text-font-black dark:text-font-white font-medium lg:text-2xl text-sm">
                Deals Pipeline
              </p>
              <p className="font-custom text-font-black dark:text-font-white lg:text-base text-xs w-full pt-1">
                Ringkasan data deals Anda
              </p>
            </div>
            <div className="col-span-4 lg:col-span-6 flex justify-end items-center ">
              <button className="bg-light-gold hover:opacity-80 transition-opacity duration-200 hover:shadow-md text-font-brown font-medium px-8  py-3 md:py-2 text-xs lg:text-base rounded-xl">
                Detail
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardDeals
              title="Kualifikasi"
              total_pipeline={data?.deals_pipeline?.count?.qualification || 0}
              funds={data?.deals_pipeline?.value?.qualification || 0}
            />
            <CardDeals
              title="Proposal"
              total_pipeline={data?.deals_pipeline?.count?.proposal || 0}
              funds={data?.deals_pipeline?.value?.proposal || 0}
            />
            <CardDeals
              title="Negosiasi"
              total_pipeline={data?.deals_pipeline?.count?.negotiation || 0}
              funds={data?.deals_pipeline?.value?.negotiation || 0}
            />
            <CardDeals
              title="Tercapai"
              total_pipeline={data?.deals_pipeline?.count?.won || 0}
              funds={data?.deals_pipeline?.value?.won || 0}
            />
            <CardDeals
              title="Gagal"
              total_pipeline={data?.deals_pipeline?.count?.lose || 0}
              funds={data?.deals_pipeline?.value?.lose || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
