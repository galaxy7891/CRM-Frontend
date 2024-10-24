import React, { useState } from 'react';
import axios from 'axios';

import SidebarModal from '@/components/layout/sidebar-modal';
import SidebarFooter from '@/components/layout/sidebar-footer';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';

interface FormEditProps {
  onClose: () => void;
  data: data;
}

interface data {
  first_name: string;
  last_name: string;
  job_position: string;
  role: string;
  email: string;
  phone: string;
  gender: string;
}

const EditUser: React.FC<FormEditProps> = ({ onClose, data }) => {
  const [firstName, setFirstName] = useState(data?.first_name);
  const [lastName, setLastName] = useState(data?.last_name);
  const [jobPosition, setJobPosition] = useState(data?.job_position);
  const [role, setRole] = useState(data?.role);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(data?.phone);
  const [gender, setGender] = useState(data?.gender);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('job_position', jobPosition);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('gender', gender);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onClose();
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SidebarModal onClose={onClose} SidebarModalTitle="Edit User">
        {/* Scrollable Form*/}
        <form className="flex-grow overflow-y-auto p-2 space-y-4 px-4">
          {/* Nama Depan dan Nama Belakang */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Nama Depan
                <span className="font-custom text-dark-red dark:text-dark-redGlow md:text-base text-xs">
                  *
                </span>
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border  text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                placeholder="Nama Depan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Nama Belakang
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 text-xs md:text-base font-custom border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                placeholder="Nama Belakang"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Job Position and Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Jabatan
                <span className="font-custom text-dark-red dark:text-dark-redGlow md:text-base text-xs">
                  *
                </span>
              </label>
              <select
                className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              >
                <option value="CEO">CEO</option>
                <option value="Presiden">Presiden</option>
                <option value="Wakil CEO">Wakil CEO</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Akses
                <span className="font-custom text-dark-red dark:text-dark-redGlow md:text-base text-xs">
                  *
                </span>
              </label>
              <input
                className="w-full mt-2 p-2 text-xs md:text-base font-custom border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                defaultValue={data?.role}
                onChange={(e) => setRole(e.target.value)}
                disabled
              ></input>
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Email
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Nomor Telepon
                <span className="font-custom text-dark-red dark:text-dark-redGlow md:text-base text-xs">
                  *
                </span>
              </label>
              <div className="flex mt-2">
                <span className="inline-flex text-xs md:text-base font-custom items-center px-3 border dark:border-t-0 dark:border-b-0 dark:border-l-0 border-r-0 dark:border-r-2 dark:border-font-gray rounded-l-[4px] bg-gray-200 dark:bg-dark-navy dark:text-font-white border-font-black">
                  +62
                </span>
                <input
                  type="tel"
                  className="w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-r-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                  placeholder="81234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
                Jenis Kelamin
              </label>
              <select
                className="w-full mt-2 p-2 text-xs md:text-base font-custom border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled hidden>
                  N/A
                </option>
                <option value="male">Laki-Laki</option>
                <option value="female">Perempuan</option>
                <option value="other">Lain-Lain</option>
              </select>
            </div>
          </div>
        </form>

        {/* Sticky Footer */}
        <SidebarFooter>
          <DashboardSidebarRedButton onClick={onClose}>
            Hapus Semua
          </DashboardSidebarRedButton>
          <DashboardSidebarYellowButton onClick={handleSubmit}>
            Simpan
          </DashboardSidebarYellowButton>
        </SidebarFooter>
      </SidebarModal>
    </>
  );
};

export default EditUser;
