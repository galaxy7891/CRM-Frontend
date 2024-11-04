'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useTheme from '@/components/dark-mode';
import Image from 'next/image';

import CardUserActivityLog from '@/app/(dashboard)/profile/partials/activity-info';
import CardUserInfo from './partials/user-info';
import CardCompany from './partials/company-info';

interface DataUser {
  image_url: string;
  first_name: string;
  last_name: string;
  job_position: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
}

interface DataCompany {
  name: string;
  description: string;
  image_url: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
}

const User = () => {
  const [dataUser, setDataUser] = useState<DataUser>();
  const [dataCompany, setDataCompany] = useState<DataCompany>();
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const { isDarkMode } = useTheme();
  const router = useRouter();
  console.log(`isdark mode? ${isDarkMode}`);

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
          setDataUser(response.data.data); // Set dashboard data
          setDataCompany(response.data.data.company);
          console.log(response.data.data);
          localStorage.setItem('company_id', response.data.data.company.id);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [router]);

  return (
    <>
      <div className="flex justify-between items-center pb-4 lg:pb-6">
        <div className="flex item-center gap-4">
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
              className="w-[12px] h-[12px] md:w-[15px] md:h-[15px] "
            />
          </button>
          <p className="font-custom font-medium text-font-black dark:text-font-white text-base md:text-2xl w-1/2 sm:w-full ">
            {showProfile ? 'Detail Profil' : 'Detail Perusahaan'}
          </p>
        </div>
        <div className="flex gap-2 ">
          <button
            onClick={() => {
              setShowProfile(true);
            }}
            className={`px-7 sm:px-8 py-2 md:py-2 text-xs lg:text-base font-medium font-custom rounded-[10px] ${
              showProfile
                ? 'text-font-brown  bg-light-gold  shadow-md duration-200  hover:opacity-100 dark:hover:opacity-100 dark:text-bold'
                : 'border-2 border-font-light hover:border-light-gold hover:text-black transition-opacity duration-200 hover:opacity-80  hover:shadow-md text-font-light bg-font-white dark:text-dark-navy dark:border-font-white dark:hover:border-light-gold dark:hover:opacity-100 dark:border-2 dark:bg-font-light'
            }`}
          >
            Profil
          </button>

          <button
            onClick={() => {
              setShowProfile(false);
            }}
            className={`px-1 sm:px-8 py-2 md:py-2 text-xs lg:text-base font-medium font-custom rounded-[10px]  ${
              !showProfile
                ? 'text-font-brown bg-light-gold shadow-md dark:text-bold hover:opacity-100 dark:hover:opacity-100'
                : 'border-2 border-font-light hover:border-light-gold hover:text-black transition-opacity duration-200 hover:opacity-80 hover:shadow-md text-font-light bg-font-white dark:text-dark-navy dark:border-font-white dark:hover:border-light-gold dark:hover:opacity-100 dark:border-2 dark:bg-font-light'
            }`}
          >
            Perusahaan
          </button>
        </div>
      </div>

      {showProfile ? (
        <CardUserInfo data={dataUser!} />
      ) : (
        <CardCompany data={dataCompany!} />
      )}

      <CardUserActivityLog />
    </>
  );
};

export default User;
