import { useState } from 'react';
import axios from 'axios';
import FailText from '@/components/status/fail-text';
import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import Asterisk from '@/components/status/required-asterisk';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';

interface FormEditProps {
  onClose: () => void;
  data: data;
}

interface data {
  name: string;
  email: string;
  industry: string;
  phone: string;
  website: string;
}

const EditCompany = ({ onClose, data }: FormEditProps) => {
  const [errorMessage, setErrorMessage] = useState<data | null>(null);
  const [name, setName] = useState(data?.name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [industry, setIndustry] = useState(data?.industry || '');
  const [phone, setPhone] = useState(data?.phone || '');
  const [website, setWebsite] = useState(data?.website || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const company_id = localStorage.getItem('company_id');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('industry', industry);
    formData.append('phone', phone);
    formData.append('website', website);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/companies/${company_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setErrorMessage(response.data.message);
      } else {
        console.error(response.data);
      }

      // onClose();
      // window.location.reload();
      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Perusahaan">
      {/* Scrollable Form */}
      <form className="flex-grow overflow-y-auto p-2 md:p-4 space-y-4">
        {/* Nama Perusahaan dan Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block text-xs md:text-base font-custom text-font-black dark:text-font-white"
            >
              Nama Perusahaan
              <Asterisk />
            </label>
            <input
              value={name}
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-2 text-xs md:text-base border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              placeholder="Nama Perusahaan"
            />
            {errorMessage && <FailText>{errorMessage?.name}</FailText>}
          </div>
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-xs md:text-base font-custom text-font-black dark:text-font-white"
            >
              Email
            </label>
            <input
              name="email"
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 text-xs md:text-base border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              placeholder="Email"
            />
          </div>
        </div>

        {/* Jenis Industri dan Nomor Telepon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label
              htmlFor="industry"
              className="block text-xs md:text-base font-custom text-font-black dark:text-font-white"
            >
              Jenis Industri
            </label>
            <select
              name="industry"
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full mt-2 p-2 text-xs md:text-base border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              defaultValue={industry}
            >
              <option value="Manufaktur">Manufaktur</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Jasa">Jasa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="phone"
              className="block text-xs md:text-base font-custom text-font-black dark:text-font-white"
            >
              Nomor Telepon
              <Asterisk />
            </label>
            <div className="flex mt-2">
              <span className="inline-flex items-center px-3 text-xs md:text-sm border border-r-0 rounded-l-[4px] bg-gray-200 dark:bg-dark-navy dark:text-font-white border-font-black">
                +62
              </span>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full p-2 text-xs md:text-base border focus:border-dark-navy focus:outline-none border-font-black rounded-r-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                placeholder="81234567890"
              />
            </div>
            {errorMessage?.phone && <FailText>{errorMessage?.phone}</FailText>}
          </div>
        </div>

        {/* Website */}
        <div className="grid md:grid-cols-2 gap-x-4">
          <div className="flex-1">
            <label
              htmlFor="website"
              className="block text-xs md:text-base font-custom text-font-black dark:text-font-white"
            >
              Website
            </label>
            <input
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              type="text"
              className="w-full mt-2 p-2 text-xs md:text-base border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              placeholder="Website"
            />
          </div>
        </div>
      </form>

      {/* Sticky Footer */}
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus semua
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleSubmit}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditCompany;
