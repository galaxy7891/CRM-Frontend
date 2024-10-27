"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FailedImporProps {
  href: string;
}

const FailedImpor: React.FC<FailedImporProps> = ({ href }) => {
  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg py-[115px] px-12 md:p-12 h-full w-full flex flex-col gap-4 justify-center items-center">
      <p>Stepper</p>
      <Image
        src="/icons/table/impor-failed.png"
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
      <Link href={href || "#"} passHref>
        <button
          className="bg-light-gold text-xs text-font-brown md:text-base font-medium py-3 md:px-[92px] px-[60px] rounded-[10px] 
          duration-200 hover:shadow-md hover:shadow-light-gold cursor-pointer"
        >
          Lihat Detail
        </button>
      </Link>
    </div>
  );
};

export default FailedImpor;
