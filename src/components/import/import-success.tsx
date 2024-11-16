'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DashboardCard from '../layout/dashboard-card';

interface SuccesImporProps {
  href: string;
}

const SuccesImpor: React.FC<SuccesImporProps> = ({ href }) => {
  return (
    <DashboardCard>
      <div className="flex flex-col gap-4 justify-center items-center">
        {/* <p>Stepper</p> */}
        <Image
          src="/icons/table/impor-success.png"
          alt="succes"
          width={150}
          height={150}
        />
        <p className="font-custom font-bold md:text-2xl text-lg text-font-black dark:text-font-white">
          Dokumen Berhasil Diimpor
        </p>
        <p className="font-custom text-sm md:text-base text-center text-font-black dark:text-font-white">
          Dokumen Anda telah berhasil diimpor
        </p>
        <Link href={href || '#'} passHref>
          <button
            className="bg-light-gold text-xs text-font-brown md:text-base font-medium py-3 md:px-[92px] px-[60px] rounded-[10px] 
          duration-200 hover:shadow-md hover:shadow-light-gold cursor-pointer"
          >
            Selesai
          </button>
        </Link>
      </div>
    </DashboardCard>
  );
};

export default SuccesImpor;
