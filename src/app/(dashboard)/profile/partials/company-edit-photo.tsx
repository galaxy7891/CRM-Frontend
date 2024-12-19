import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { updateCompanyUserLogo } from '@/redux/actions/profileActions';
import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import FailText from '@/components/status/fail-text';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import DashboardChangePhotoButton from '@/components/button/dashboard-change-photo-button';
import SuccessModal from '@/components/status/success-modal';
interface FormEditProps {
  onClose: () => void;
  data: data;
}

interface data {
  image_url: string;
}
const EditImageCompany = ({ onClose, data }: FormEditProps) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setLogo(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdateLogoo = () => {
    dispatch(
      updateCompanyUserLogo(logo, setIsLoading, setIsSuccess, setErrorMessage)
    );
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Perusahaan">
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
        <FailText>{errorMessage}</FailText>
      </div>

      <SidebarFooter>
        <DashboardChangePhotoButton onChange={handleFileChange}>
          Ganti Foto
        </DashboardChangePhotoButton>
        <DashboardSidebarYellowButton onClick={handleUpdateLogoo}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Logo perusahaan berhasil diubah"
          actionButton_name="Kembali"
          actionButton_action={onClose}
        />
      )}
    </SidebarModal>
  );
};

export default EditImageCompany;
