'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import CardActivityLog from './activity-card';
import DashboardPositiveButton from '../../../../components/button/dashboard-positive-button';

// Definisikan interface untuk Activity
interface Activity {
  title: string;
  datetime: string;
  description: string;
}

// Definisikan interface untuk pagination
interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

const ActivityLog = () => {
  const [activity, setActivity] = useState<Activity[]>([]); // Ubah tipe menjadi Activity[]
  const [pagination, setPagination] = useState<Pagination>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 25,
    next_page_url: null,
    prev_page_url: null,
  });


  const fetchData = async (page = 1) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        const activityData = response.data.data[0];
        setActivity(activityData.data[0].activities); // Pastikan tipe data yang diterima sesuai
        setPagination({
          current_page: activityData.current_page,
          last_page: activityData.last_page,
          total: activityData.total,
          per_page: activityData.per_page,
          next_page_url: activityData.next_page_url,
          prev_page_url: activityData.prev_page_url,
        });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      fetchData(pagination.current_page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      fetchData(pagination.current_page - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid grid-rows pt-4 lg:pt-8 ">
      <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <div className="col-span-12 flex justify-between items-center">
              <p className="font-custom dark:text-font-white text-font-black md:text-2xl font-medium text-sm">
                Aktivitas
              </p>
              <Link href="#">
                <DashboardPositiveButton>Detail</DashboardPositiveButton>
              </Link>
            </div>
            <div className="col-span-12 space-y-4">
              {activity.map((a: Activity, index: number) => (
                <CardActivityLog
                  key={index}
                  title={a.title}
                  date={a.datetime}
                  description={a.description}
                />
              ))}
              <div className="flex justify-center ">
                <button
                  onClick={handlePrevPage}
                  disabled={!pagination.prev_page_url}
                >
                  <Image
                    src="icons/pagination/prev-icon.svg"
                    alt="prev"
                    width={10}
                    height={10}
                  />
                </button>
                <p className="dark:text-white text-xs md:text-base px-4">
                  {pagination.current_page}
                  {' / '} {pagination.last_page}
                </p>
                <button
                  onClick={handleNextPage}
                  disabled={!pagination.next_page_url}
                >
                  <Image
                    src="icons/pagination/next-icon.svg"
                    alt="next"
                    width={10}
                    height={10}
                  />
                </button>
                <p className="dark:text-white text-xs md:text-base ps-4">
                  5 per halaman
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
