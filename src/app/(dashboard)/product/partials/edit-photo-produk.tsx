import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import FailText from '@/components/status/fail-text';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import DashboardChangePhotoButton from '@/components/button/dashboard-change-photo-button';
interface FormEditProps {
  onClose: () => void;
  data: Data;
}

interface Data {
  image_url: string;
}
const EditImageProduct = ({ onClose, data }: FormEditProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const token = localStorage.getItem('token');
    
    const formData = new FormData();

    if (photo) {
      formData.append('photo', photo);
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setErrorMessage(response.data.message.photo[0]);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Profil">
      {/* Centered Image and Text */}
      <div className="flex-grow flex flex-col justify-center items-center text-center">
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
        <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg pt-4">
          Sesuaikan foto Produk yang anda pilih.
        </p>
        <FailText>{errorMessage}</FailText>
      </div>

      <SidebarFooter>
        <DashboardChangePhotoButton onChange={handleFileChange}>
          Ganti Foto
        </DashboardChangePhotoButton>
        <DashboardSidebarYellowButton onClick={handleUpdatePhoto}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditImageProduct;
