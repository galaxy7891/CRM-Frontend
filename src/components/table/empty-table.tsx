import Image from "next/image";
import React from "react";

const EmptyTable = () => {
  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg py-[115px] px-12 md:p-12 h-full w-full  flex flex-col justify-center items-center">
      <Image
        src="/icons/table/EmptyTable.png"
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
  );
};

export default EmptyTable;
