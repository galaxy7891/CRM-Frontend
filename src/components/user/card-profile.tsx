'use client';
import { useState } from 'react';
import Image from 'next/image';
import FormEdit from './edit-user';
import EditImageUser from './edit-image-user';
interface CardProfileProps {
  data: any;
}

const CardProfile: React.FC<CardProfileProps> = ({ data }) => {
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
            <div className="col-span-12 md:col-span-4 flex items-center justify-center relative">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image
                    src={data?.image_url || '/images/default.jpg'}
                    alt="image"
                    width={160}
                    height={160}
                    className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
                  />
                  <button onClick={handleEditImageClick}>
                    <Image
                      src="/icons/profile/camera.svg"
                      alt="camera"
                      width={24}
                      height={24}
                      className="absolute bottom-[-10px] right-0 w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                    />
                  </button>
                </div>
                <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
                  {data?.first_name} {data?.last_name}
                </p>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="col-span-12 md:col-start-5 md:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <p className="dark:text-font-white text-base font-medium md:text-2xl font-custom tex-font-black">
                  Data Diri
                </p>
                <button onClick={handleEditClick}>
                  <Image
                    src="/icons/profile/edits.svg"
                    alt="editbtn"
                    width={32}
                    height={32}
                    className="w-[18px] h-[18px] md:w-8 md:h-8"
                  />
                </button>
              </div>

              <div className="p-4 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                {[
                  { label: 'Jabatan', value: data?.role },
                  { label: 'Nomor Telepon', value: data?.phone_number },
                  { label: 'Email', value: data?.email },
                  { label: 'Jenis Kelamin', value: data?.gender },
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
      {isEditing && <FormEdit onClose={handleCloseForm} />}
      {isEditingImage && <EditImageUser onClose={handleCloseForm} />}
    </div>
  );
};

export default CardProfile;
