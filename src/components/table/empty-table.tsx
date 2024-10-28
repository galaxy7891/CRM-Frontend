import Image from 'next/image';
import React from 'react';

const EmptyTable = () => {
  return (
    <div className="bg-font-white  dark:bg-dark-navy shadow-lg rounded-lg  ">
      <div className="flex flex-col justify-center items-center p-6 ">
        <Image
          src="/images/emptyData.svg"
          alt="empty-table"
          width={284}
          height={267}
        />
        <p className="font-custom text-sm font-bold md:text-xl text-font-black mt-4">
          Data Kosong
        </p>
        <p className="font-custom text-xs md:text-xl text-font-black">
          Belum ada data yang tersedia
        </p>
      </div>
    </div>
  );
};

export default EmptyTable;
