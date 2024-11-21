'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/redux/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import UserLog from '@/app/(dashboard)/profile/partials/user-log';
import CardUserInfo from './partials/user-info';
import CardCompany from './partials/company-info';
import RouterBackButton from '@/components/button/route-back-button';

const User = () => {
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.profile);
  const { userCompany } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center pb-4 lg:pb-6">
        <div className="flex item-center gap-4">
          <RouterBackButton />
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
        <CardUserInfo user={user!} />
      ) : (
        <CardCompany userCompanyProps={userCompany!} />
      )}

      <UserLog />
    </>
  );
};

export default User;
