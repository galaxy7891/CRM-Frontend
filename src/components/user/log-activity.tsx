'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Link from 'next/link';
import CardActivityLog from './card-activitylog';
import CurrentMonthYear from './current-month';

const ActivityLog = () => {
  const [activity, setActivity] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activity/log`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          // setActivity(response.data[0]); // Set dashboard data
          setActivity(response.data.data[0].data[0].activities);
          console.error(activity);
        } else {
          // alert('Failed to fetch activity logs.');
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        console.log('Finish');
      }
    };
    fetchData();
  }, [router]);

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
                <button className="py-1 px-4 lg:py-3 lg:px-6 text-xs text-font-brown font-custom md:text-base font-medium bg-light-gold rounded-[10px] hover:opacity-80 transition-opacity duration-200 hover:shadow-md shadow-md">
                  Detail
                </button>
              </Link>
            </div>
            <div className="col-span-12 space-y-4">
              <CurrentMonthYear />

              {activity.map((a: any, index: number) => (
                <CardActivityLog
                  key={index}
                  title={a?.title}
                  date={a?.datetime}
                  description={a?.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
