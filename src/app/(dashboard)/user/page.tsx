'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTheme from '@/components/dark-mode';
import Image from 'next/image';

import CardUserActivityLog from '@/components/user/log-activity';
import CardUserInfo from '@/components/user/card-profile';
import CardCompany from '@/components/user/card-company';

const User = () => {
  const [data, setData] = useState<any>(null);
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const { isDarkMode } = useTheme();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
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
        if (response.data.success) {
          setData(response.data.data); // Set dashboard data
          console.log(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [router]);

  return (
    <>
      <div className="flex justify-between items-center ps-4">
        <div className="flex">
          <button onClick={() => router.back()}>
            <Image
              src={
                isDarkMode
                  ? '/icons/profile/back-white.svg'
                  : '/icons/profile/back.svg'
              }
              alt="back"
              width={24}
              height={24}
              className="w-[12px] h-[12px] md:w-[15px] md:h-[15px] p"
            />
          </button>
          <p className="font-custom font-medium text-font-black dark:text-font-white text-base md:text-2xl ">
            {showProfile ? 'Detail Profil' : 'Detail Perusahaan'}
          </p>
        </div>
        <div className="flex gap-2 ">
          <button
            onClick={() => {
              setShowProfile(true);
            }}
            className={`py-1 px-4 lg:py-3 lg:px-6 text-xs md:text-base font-medium font-custom rounded-[10px] transition-opacity duration-200 hover:opacity-80 hover:shadow-md ${
              showProfile
                ? 'text-font-brown dark:text-bold bg-light-gold'
                : 'border-2 border-font-light text-font-light bg-font-white dark:text-dark-navy dark:border-font-white dark:border-2 dark:bg-font-light'
            }`}
          >
            Profil
          </button>

          <button
            onClick={() => {
              setShowProfile(false);
            }}
            className={`py-1 px-4 lg:py-3 lg:px-6 text-xs md:text-base font-medium font-custom rounded-[10px] transition-opacity duration-200 hover:opacity-80 hover:shadow-md ${
              !showProfile
                ? 'text-font-brown bg-light-gold shadow-md dark:text-bold'
                : 'border-2 border-font-light text-font-light bg-font-white dark:text-dark-navy dark:border-font-white dark:border-2 dark:bg-font-light'
            }`}
          >
            Perusahaan
          </button>
        </div>
      </div>

      {showProfile ? <CardUserInfo data={data} /> : <CardCompany data={data} />}

      <CardUserActivityLog />
    </>
  );
};

export default User;
