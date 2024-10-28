import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import React, { useState } from 'react';

interface FormEditProps {
  onClose: () => void;
  data: data;
}

interface dataContacts {
  first_name: string;
  last_name: string;
  customerCategory: string;
  job: string;
  description: string;
  status: string;
  birthdate: null;
  email: string;
  phone: string;
  owner: string;
  address: string;
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}

const EditContact: React.FC<FormEditProps> = ({ onClose, data }) => {
  const [contacts, setContacts] = useState<dataContacts>({
    first_name: '',
    last_name: '',
    customerCategory: '',
    job: '',
    description: '',
    status: '',
    birthdate: null,
    email: '',
    phone: '',
    owner: '',
    address: '',
    country: '',
    province: '',
    city: '',
    subdistrict: '',
    village: '',
    zip_code: '',
  });
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Leads">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Depan"
            placeholder="Nama Depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="order-2">
          <TextInput
            label="Nama Belakang"
            placeholder="Nama Belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="order-3 md:order-6">
          <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
            Tanggal Lahir
          </label>
          <input
            type="date"
            className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:ring-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
            placeholder="Tanggal Lahir"
          />
        </div>
        <div className="order-4">
          <TextInput
            label="Email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-5">
          <SelectInput
            label="Status Kontak"
            value={status}
            options={[
              { label: 'Rendah', value: 'Rendah' },
              { label: 'Sedang', value: 'Sedang' },
              { label: 'Tinggi', value: 'Tinggi' },
            ]}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="order-6 md:order-10">
          <SelectInput
            label="Penanggung Jawab"
            value={status}
            options={
              [
                // get data from karyawan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="order-7 md:order-7">
          <TextInput
            label="Pekerjaan"
            placeholder="Manager"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-8 md:order-8">
          <SelectInput
            label="Perusahaan"
            value={status}
            options={
              [
                // get data from perusahaan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="order-9 md:order-3">
          <PhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="order-10 md:order-9">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-11">
          <SelectInput
            label="Provinsi"
            value={status}
            options={
              [
                // get data from api provinsi
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-12 ">
          <SelectInput
            label="Kota"
            value={status}
            options={
              [
                // get data from api kota
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kecamatan"
            value={status}
            options={
              [
                // get data from api kecamatan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-[14]">
          <SelectInput
            label="Kelurahan"
            value={status}
            options={
              [
                // get data from api kelurahan
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-[15]">
          <SelectInput
            label="Kode Pos"
            value={status}
            options={
              [
                // get data from api kode pos
              ]
            }
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="order-[16]">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        {/* <DashboardSidebarYellowButton onClick={handleSubmit}>
            Tambah
          </DashboardSidebarYellowButton> */}
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditContact;
