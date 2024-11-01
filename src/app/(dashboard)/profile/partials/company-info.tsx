'use client';

import { useState } from 'react';
import Image from 'next/image';
import EditCompany from './company-edit';
import EditImageCompany from './company-edit-photo';
import EditUserButton from '@/components/button/edit-user-button';

interface CardCompanyProps {
  data: DataCompany;
}

interface DataCompany {
  name: string;
  description: string;
  image_url: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
}

const CardCompany: React.FC<CardCompanyProps> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false); // State untuk mengontrol tampilan form edit profil
  const [isEditingImage, setIsEditingImage] = useState(false); // State untuk mengontrol tampilan form edit foto

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
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6">
      <div className="grid grid-cols-12 gap-4">
        {/* Left column */}
        <div className="col-span-12 md:col-span-4 flex items-center justify-center relative">
          <div className="flex flex-col items-center relative">
            {/* Profile Picture */}
            <div
              className="relative cursor-pointer"
              onClick={handleEditImageClick}
            >
              <Image
                src={data?.image_url || '/images/default.jpg'}
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
              {data?.name || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div className="flex justify-between items-center mb-4">
            <p className="dark:text-font-white text-base font-medium md:text-2xl font-custom tex-font-black">
              Data Diri
            </p>
            <EditUserButton onClick={handleEditClick} />
          </div>

          {isEditing && <EditCompany onClose={handleCloseForm} data={data} />}
          {isEditingImage && (
            <EditImageCompany onClose={handleCloseForm} data={data} />
          )}

          <div className="md:px-4 py-1 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
            {[
              { label: 'Jenis Industri', value: data?.industry },
              { label: 'Email', value: data?.email },
              { label: 'Nomor Telepon', value: data?.phone },
              { label: 'Website', value: data?.website },
              // { label: 'Jenis Kelamin', value: data?.gender },
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
    </div>
  );
};

export default CardCompany;