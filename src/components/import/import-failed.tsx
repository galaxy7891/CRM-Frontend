'use client';
import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import { ImportErrorMessageDetailTypes } from '@/types/otherTypes';
import ImportFailedResume from './import-failed-resume';
import DashboardCard from '@/components/layout/dashboard-card';

interface ImportFailedProps {
  errorMessageDetail: ImportErrorMessageDetailTypes;
}

const FailedImpor: React.FC<ImportFailedProps> = ({ errorMessageDetail }) => {
  const [showResume, setShowResume] = useState(false);

  const HandleShowResume = () => {
    setShowResume(!showResume);
  };

  return (
    <>
      {showResume ? (
        <ImportFailedResume errorMessageDetail={errorMessageDetail} />
      ) : (
        <DashboardCard>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Image
              src="/images/icons/table/impor-failed.png"
              alt="failed"
              width={150}
              height={150}
            />
            <p className="font-custom font-bold md:text-2xl text-lg text-font-black dark:text-font-white">
              Dokumen Gagal Diimpor
            </p>
            <p className="font-custom text-sm md:text-base text-center text-font-black dark:text-font-white">
              Dokumen Anda telah gagal diimpor, perbaiki kolom
            </p>

            <button
              onClick={HandleShowResume}
              className="bg-light-gold text-xs text-font-brown md:text-base font-medium py-3 md:px-[92px] px-[60px] rounded-[10px] 
          duration-200 hover:shadow-md hover:shadow-light-gold cursor-pointer"
            >
              Lihat Detail
            </button>
          </div>
        </DashboardCard>
      )}
    </>
  );
};

export default FailedImpor;
