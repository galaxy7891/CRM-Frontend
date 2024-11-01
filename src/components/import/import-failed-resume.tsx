import React, { FC } from 'react';
import DashboardPositiveButton from '@/components/button/dashboard-positive-button';
import CardFailed from './resume-card';
import ImportFailedResumeTable from './import-failed-resume-table';
interface ResumeFailedImporProps {
  errorMessageDetail: any;
}

const ResumeFailedImpor: FC<ResumeFailedImporProps> = ({
  errorMessageDetail,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between ">
        <p className="font-custom text-base text-font-black dark:text-font-white md:text-2xl">
          {errorMessageDetail.file}
        </p>
        <DashboardPositiveButton>Upload Ulang</DashboardPositiveButton>
      </div>
      <p className="mt-4 text-xs md:text-lg font-custom text-font-black dark:text-font-white font-bold">
        {errorMessageDetail.type}
      </p>
      <p className="mt-2 text-xs md:text-lg font-custom text-font-black dark:text-font-white font-medium">
        {errorMessageDetail.date}
      </p>
      <p className="mt-8 text-lg md:text-[28px] font-custom text-font-black dark:text-font-white font-bold">
        Ringkasan
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardFailed
          title="Jumlah Data"
          count={errorMessageDetail.summaryData.total_data}
        />
        <CardFailed
          title="Data Valid"
          count={errorMessageDetail.summaryData.valid_data}
        />
        <CardFailed
          title="Data Tidak Valid"
          count={errorMessageDetail.summaryData.invalid_data}
        />
      </div>
      <ImportFailedResumeTable errorMessageDetail={errorMessageDetail} />
    </div>
  );
};

export default ResumeFailedImpor;
