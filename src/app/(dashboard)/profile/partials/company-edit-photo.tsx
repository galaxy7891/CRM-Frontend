import Image from 'next/image';

import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import FailText from '@/components/status/fail-text';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import DashboardChangePhotoButton from '@/components/button/dashboard-change-photo-button';
interface FormEditProps {
  onClose: () => void;
  data: data;
}

interface data {
  image_url: string;
}
const EditImageCompany = ({ onClose, data }: FormEditProps) => {
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Foto Perusahaan">
      <div className="flex-grow flex flex-col justify-center items-center text-center space-y-4">
        <Image
          src={data?.image_url || '/images/default.jpg'}
          alt="image"
          width={160}
          height={160}
          className="rounded-full w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
        />
        <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
          Sesuaikan foto profil yang anda pilih.
        </p>
      </div>

      <SidebarFooter>
        <DashboardChangePhotoButton onChange={() => {}} />
        <DashboardSidebarYellowButton>Simpan</DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditImageCompany;
