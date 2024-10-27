import React, { FC } from "react";
import CardFailed from "./card-failed";
import DashboardPositiveButton from "../button/dashboard-positive-button";

interface ResumeFailedImporProps {
  title: string; // Prop to make the "Leads" title dynamic
}

const ResumeFailedImpor: FC<ResumeFailedImporProps> = ({ title }) => {
  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6">
      <div className="flex justify-between">
        <p className="font-custom text-base text-font-black dark:text-font-white md:text-2xl">
          Nama File Upload
        </p>
        <DashboardPositiveButton>Upload Ulang</DashboardPositiveButton>
      </div>
      <p className="mt-4 text-xs md:text-lg font-custom text-font-black dark:text-font-white font-bold">
        {title}
      </p>
      <p className="mt-2 text-xs md:text-lg font-custom text-font-black dark:text-font-white font-medium">
        Kamis, 17 Agustus 2030
      </p>
      <p className="mt-8 text-lg md:text-[28px] font-custom text-font-black dark:text-font-white font-bold">
        Ringkasan
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardFailed title="Jumlah Data" count={40} />
        <CardFailed title="Data Valid" count={40} />
        <CardFailed title="Data Tidak Valid" count={40} />
      </div>
    </div>
  );
};

export default ResumeFailedImpor;
