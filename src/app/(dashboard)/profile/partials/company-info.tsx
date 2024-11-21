'use client';

import { useState } from 'react';
import { companyInfoProps } from '@/types/profileTypes';
import Image from 'next/image';
import EditCompany from './company-edit';
import EditImageCompany from './company-edit-photo';
import EditUserButton from '@/components/button/edit-user-button';
import DashboardCard from '@/components/layout/dashboard-card';

const CardCompany: React.FC<companyInfoProps> = ({ userCompanyProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditImageClick = () => {
    setIsEditingImage(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setIsEditingImage(false);
  };

  return (
    <DashboardCard>
      <div className="grid grid-cols-12 gap-4">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-4 flex items-center justify-center relative">
          <div className="flex flex-col items-center relative">
            {/* Profile Picture */}
            <div
              className="relative cursor-pointer"
              onClick={handleEditImageClick}
            >
              <Image
                src={userCompanyProps?.image_url || '/images/default.jpg'}
                alt="image"
                width={160}
                height={160}
                className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px] "
              />
              <div className="absolute bottom-[-15px] right-[-1px]">
                <Image
                  src="/icons/profile/camera.svg"
                  alt="camera"
                  width={24}
                  height={24}
                  className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                />
              </div>
            </div>
            {/* Name */}
            <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
              {userCompanyProps?.name || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-start-5 lg:col-span-8">
          <div className="flex justify-between items-center mb-4">
            <p className="dark:text-font-white text-base font-medium md:text-2xl font-custom tex-font-black">
              Data Diri
            </p>
            <EditUserButton onClick={handleEditClick} />
          </div>

          <div className="md:px-4 py-1 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
            {[
              { label: 'Jenis Industri', value: userCompanyProps?.industry },
              { label: 'Email', value: userCompanyProps?.email },
              { label: 'Nomor Telepon', value: userCompanyProps?.phone },
              { label: 'Website', value: userCompanyProps?.website },
            ].map((item, index) => (
              <div key={index} className="m-2 md:m-4 w-full">
                <p className="font-bold dark:text-font-white font-custom text-font-black text-xs md:text-base mb-1">
                  {item.label}
                </p>
                <p className="font-custom dark:text-font-white text-font-black text-xs md:text-base truncate">
                  {item.value || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditing && (
        <EditCompany onClose={handleCloseForm} data={userCompanyProps} />
      )}
      {isEditingImage && (
        <EditImageCompany onClose={handleCloseForm} data={userCompanyProps} />
      )}
    </DashboardCard>
  );
};

export default CardCompany;
