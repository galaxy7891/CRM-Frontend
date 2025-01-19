'use client';

import { useState } from 'react';
import { userInfoProps } from '@/types/profileTypes';
import Image from 'next/image';
import EditUser from './user-edit';
import EditImageUser from './user-edit-photo';
import EditUserButton from '@/components/button/edit-user-button';
import DashboardCard from '@/components/layout/dashboard-card';

const CardProfile: React.FC<userInfoProps> = ({ user }) => {
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
                src={user?.image_url || '/images/default.jpg'}
                alt="image"
                width={160}
                height={160}
                className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="absolute bottom-[-15px] right-[-1px]">
                <Image
                  src="/images/icons/profile/camera.svg"
                  alt="camera"
                  width={24}
                  height={24}
                  className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                />
              </div>
            </div>
            {/* Name */}
            <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
              {user?.first_name || '-'} {user?.last_name}
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
              { label: 'Jabatan', value: user?.job_position },
              { label: 'Nomor Telepon', value: user?.phone },
              { label: 'Email', value: user?.email },
              { label: 'Akses', value: user?.role },
              { label: 'Jenis Kelamin', value: user?.gender },
            ].map((item, index) => (
              <div key={index} className="m-2 md:m-4 w-full">
                <p className="font-bold dark:text-font-white font-custom text-font-black text-xs md:text-base mb-1 min-w-[100px]">
                  {item.label}
                </p>
                <p className="font-custom dark:text-font-white text-font-black text-xs md:text-base truncate">
                  {item.value || '-'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditing && <EditUser onClose={handleCloseForm} data={user} />}
      {isEditingImage && (
        <EditImageUser onClose={handleCloseForm} data={user} />
      )}
    </DashboardCard>
  );
};

export default CardProfile;
