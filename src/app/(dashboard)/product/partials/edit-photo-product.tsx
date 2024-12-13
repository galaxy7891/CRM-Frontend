import Image from 'next/image';
import { useState } from 'react';
import { updatePhotoProduct } from '@/redux/actions/productsActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import FailText from '@/components/status/fail-text';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import DashboardChangePhotoButton from '@/components/button/dashboard-change-photo-button';

interface FormEditProps {
  onClose: () => void;
  data: Data;
  id: string;
}

interface Data {
  image_url: string;
}

const EditImageProduct = ({ onClose, data, id }: FormEditProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleUpdatePhoto = () => {
    dispatch(updatePhotoProduct(photo, id, setErrorMessage, setIsLoading));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Produk">
      <div className="flex flex-col justify-center items-center text-center h-full ">
        <Image
          src={
            preview
              ? preview
              : data?.image_url
              ? data?.image_url
              : '/images/default-product.svg'
          }
          alt="image"
          width={160}
          height={160}
          className="rounded-full w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
        />
        <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg pt-4">
          Sesuaikan foto produk yang anda pilih.
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
