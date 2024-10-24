import Image from 'next/image';
import useTheme from '@/components/dark-mode';
import { useState, useRef } from 'react';
import axios from 'axios';

interface FormEditProps {
  onClose: () => void;
  data: Data;
}

interface Data {
  image_url: string;
}
const EditImageUser = ({ onClose, data }: FormEditProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // Trigger click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    if (file) {
      // Handle the uploaded file (e.g., upload it to a server or preview it)
      console.log('Selected file:', file);
    }
  };

  const handleUpdatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        alert('Tes');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 right-0 md:w-1/2 w-full h-full bg-light-white dark:bg-dark-darkGray shadow-lg z-50 flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-light-white dark:bg-dark-darkGray z-10 p-4 md:p-8">
        <div className="flex space-x-6 items-center">
          <button onClick={onClose}>
            <Image
              src={
                isDarkMode
                  ? '/icons/profile/back-white.svg'
                  : '/icons/profile/back.svg'
              }
              alt="back"
              width={24}
              height={24}
              className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
            />
          </button>
          <h2 className="md:text-2xl text-base font-medium text-font-black dark:text-font-white">
            Edit Foto Profil
          </h2>
        </div>
      </div>

      {/* Centered Image and Text */}
      <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4">
        <Image
          src={
            preview
              ? preview
              : data?.image_url
              ? data?.image_url
              : '/images/default.jpg'
          }
          alt="image"
          width={160}
          height={160}
          className="rounded-full w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
        />
        <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
          Sesuaikan foto profil yang anda pilih.
        </p>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 bg-dark-navy dark:bg-dark-navy z-10 p-4 flex justify-end space-x-2">
        <div>
          <button
            type="button"
            onClick={handleButtonClick}
            className="px-4 py-2 text-dark-red bg-dark-redLight font-medium rounded-[10px]"
          >
            Ganti Foto
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpg, image/jpeg" // Optional: restrict to image files
            style={{ display: 'none' }} // Hide the file input
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-[10px] bg-light-gold text-font-brown font-custom font-medium "
          onClick={handleUpdatePhoto}
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default EditImageUser;
