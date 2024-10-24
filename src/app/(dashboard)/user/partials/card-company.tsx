'use client';

import { useState } from 'react';
import Image from 'next/image';
import EditCompany from './edit-company';
import EditImageCompany from './edit-image-company';
import EditUserButton from '@/components/button/edit-user-button';

interface CardCompanyProps {
  data: any;
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
    setIsEditingImage(false); // Tutup kedua form
  };

  return (
    <div className="grid grid-rows">
      <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full">
        <div className="grid grid-cols-12 w-full h-full">
          <div className="col-span-12 grid grid-cols-12 gap-4">
            {/* Kolom Kiri */}
            <div className="col-span-12 md:col-span-4 flex items-center justify-center relative">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image
                    src={data?.company?.image_url || '/images/default.jpg'}
                    alt="image"
                    width={160}
                    height={160}
                    className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
                  />
                  <button
                    onClick={handleEditImageClick}
                    className="absolute bottom-[-10px] right-0"
                  >
                    <Image
                      src="/icons/profile/camera.svg"
                      alt="camera"
                      width={24}
                      height={24}
                      className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                    />
                  </button>
                </div>
                <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
                  {data?.company?.name || 'N/A'}
                </p>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="col-span-12 md:col-start-5 md:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <p className="dark:text-font-white text-base font-medium md:text-2xl font-custom text-font-black">
                  Data Perusahaan
                </p>
                <EditUserButton onClick={handleEditClick} />
              </div>

              <div className="p-4 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                {[
                  { label: 'Jenis Industri', value: data?.company?.industry },
                  { label: 'Email', value: data?.company?.email },
                  { label: 'Nomor Telepon', value: data?.company?.phone },
                  { label: 'Website', value: data?.company?.website },
                ].map((item, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold dark:text-font-white font-custom text-font-black text-xs md:text-base mb-1">
                      {item.label}
                    </p>
                    <p className="font-custom dark:text-font-white text-font-black text-xs md:text-base">
                      {item.value || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && <EditCompany onClose={handleCloseForm} />}
      {isEditingImage && <EditImageCompany onClose={handleCloseForm} />}
    </div>
  );
};

export default CardCompany;
