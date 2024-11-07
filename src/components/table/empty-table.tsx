import Image from 'next/image';
import React from 'react';

const EmptyTable = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6 ">
      <Image
        src="/images/emptyData.svg"
        alt="empty-table"
        width={284}
        height={267}
      />
      <p className="font-custom text-sm font-bold md:text-xl text-font-black mt-4 dark:text-font-white">
        Data Kosong
      </p>
      <p className="font-custom text-xs md:text-xl text-font-black dark:text-font-white">
        Belum ada data yang tersedia
      </p>
    </div>
  );
};

export default EmptyTable;
