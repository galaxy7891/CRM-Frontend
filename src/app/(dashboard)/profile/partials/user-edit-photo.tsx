import Image from 'next/image';
import { useState } from 'react';
import { updateUserPhoto } from '@/redux/actions/profileActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import FailText from '@/components/status/fail-text';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import DashboardChangePhotoButton from '@/components/button/dashboard-change-photo-button';
import SuccessModal from '@/components/status/success-modal';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdatePhoto = () => {
    dispatch(
      updateUserPhoto(photo, setIsLoading, setIsSuccess, setErrorMessage)
    );
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Profil">
      {/* Centered Image and Text */}
      <div className="flex flex-col justify-center items-center text-center h-full">
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
          Sesuaikan foto profil yang anda pilih.
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

      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Foto profil berhasil diubah"
          actionButton_name="Kembali"
          actionButton_action={() => window.location.reload()}
        />
      )}
    </SidebarModal>
  );
};

export default EditImageUser;
