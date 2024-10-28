import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';
import React, { useState } from 'react';

interface FormEditProps {
  onClose: () => void;
  leadData: leadData;
}

interface leadData {
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
const EditLeads: React.FC<FormEditProps> = ({ onClose, leadData }) => {
  const [errorMessage, setErrorMessage] = useState<leadData | null>(null);
  const [lead, setLead] = useState<leadData>({
    first_name: leadData?.first_name,
    last_name: leadData?.last_name,
    customerCategory: leadData?.customerCategory,
    job: leadData?.job,
    description: leadData?.description,
    status: leadData?.status,
    birthdate: leadData?.birthdate,
    email: leadData?.email,
    phone: leadData?.phone,
    owner: leadData?.owner,
    address: leadData?.address,
    country: leadData?.country,
    province: leadData?.province,
    city: leadData?.city,
    subdistrict: leadData?.subdistrict,
    village: leadData?.village,
    zip_code: leadData?.zip_code,
  });
  
  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Leads">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Depan"
            placeholder="Nama Depan"
            value={lead.first_name}
            onChange={(e) => setLead({ ...lead, first_name: e.target.value })}
            required
          />
        </div>
        <div className="order-2">
          <TextInput
            label="Nama Belakang"
            placeholder="Nama Belakang"
            value={lead.last_name}
            onChange={(e) => setLead({ ...lead, last_name: e.target.value })}
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
            // value={lead.birthdate}
            // onChange={(e) => setLead({ ...lead, birthdate: e.target.value })}
          />
        </div>
        <div className="order-4">
          <TextInput
            label="Email"
            placeholder="user@gmail.com"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
          />
          {errorMessage && <FailText>{errorMessage.email}</FailText>}
        </div>

        <div className="order-5">
          <SelectInput
            label="Status Kontak"
            value={lead.status}
            options={[
              { label: 'Pilih Status', value: '', hidden: true },
              { label: 'Rendah', value: 'Rendah' },
              { label: 'Sedang', value: 'Sedang' },
              { label: 'Tinggi', value: 'Tinggi' },
            ]}
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            required
          />
        </div>
        <div className="order-5 md:order-8">
          <SelectInput
            label="Penanggung Jawab"
            value={lead.owner}
            options={
              [
                // get data from karyawan
              ]
            }
            onChange={(e) => setLead({ ...lead, owner: e.target.value })}
            required
          />
        </div>
        <div className="order-6 md:order-7">
          <TextInput
            label="Pekerjaan"
            placeholder="Manager"
            value={lead.job}
            onChange={(e) => setLead({ ...lead, job: e.target.value })}
          />
        </div>
        <div className="order-8 md:order-3">
          <PhoneInput
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            required
          />
        </div>
        <div className="order-9">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={lead.address}
            onChange={(e) => setLead({ ...lead, address: e.target.value })}
          />
        </div>
        <div className="order-9">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={lead.address}
            onChange={(e) => setLead({ ...lead, address: e.target.value })}
          />
        </div>
        <div className="order-10">
          <SelectInput
            label="Provinsi"
            value={lead.province}
            options={[
              { label: 'Pilih Provinsi', value: '', hidden: true },
              { label: 'Jawa Tengah', value: 'Jawa Tengah' },
            ]}
            onChange={(e) => setLead({ ...lead, province: e.target.value })}
          />
        </div>
        <div className="order-11 ">
          <SelectInput
            label="Kota"
            value={lead.city}
            options={[
              { label: 'Pilih Kota', value: '', hidden: true },
              { label: 'Kota Semarang', value: 'Kota Semarang' },
            ]}
            onChange={(e) => setLead({ ...lead, city: e.target.value })}
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kecamatan"
            value={lead.subdistrict}
            options={[
              { label: 'Pilih Kecamatan', value: '', hidden: true },
              {
                label: 'Semarang Tengah',
                value: 'Semarang Tengah',
                hidden: false,
              },
            ]}
            onChange={(e) => setLead({ ...lead, subdistrict: e.target.value })}
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kelurahan/Desa"
            value={lead.village}
            options={[
              { label: 'Pilih Kelurahan/Desa', value: '', hidden: true },
              {
                label: 'Pendrikan Kidul',
                value: 'Pendrikan Kidul',
                hidden: false,
              },
            ]}
            onChange={(e) => setLead({ ...lead, village: e.target.value })}
          />
        </div>
        <div className="order-[14]">
          <SelectInput
            label="Kode Pos"
            value={lead.zip_code}
            options={[
              { label: 'Pilih Kode Pos', value: '', hidden: true },
              { label: '12345', value: '12345' },
              { label: '23456', value: '23456' },
              { label: '34567', value: '34567' },
            ]}
            onChange={(e) => setLead({ ...lead, zip_code: e.target.value })}
          />
        </div>
        <div className="order-[15]">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={lead.description}
            onChange={(e) => setLead({ ...lead, description: e.target.value })}
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        <DashboardSidebarYellowButton>Tambah</DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditLeads;
