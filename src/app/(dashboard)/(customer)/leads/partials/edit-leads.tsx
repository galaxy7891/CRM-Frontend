import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { leadsTypes, editLeadsPropsTypes } from '@/types/leadsTypes';
import { updateLead } from '@/redux/actions/leadsActions';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import SuccessModal from '@/components/status/success-modal';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';

const EditLeads: React.FC<editLeadsPropsTypes> = ({ onClose, leadProps }) => {
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [lead, setLead] = useState<leadsTypes>({
    id: leadProps?.id,
    first_name: leadProps?.first_name,
    last_name: leadProps?.last_name,
    job: leadProps?.job,
    description: leadProps?.description,
    status: leadProps?.status,
    birthdate: leadProps?.birthdate,
    email: leadProps?.email,
    phone: leadProps?.phone,
    owner: leadProps?.owner,
    address: leadProps?.address,
    province: leadProps?.province,
    city: leadProps?.city,
    subdistrict: leadProps?.subdistrict,
    village: leadProps?.village,
    zip_code: leadProps?.zip_code,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleEditLead = () => {
    dispatch(updateLead(lead, setIsSuccess, setErrorMessage));
  };

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
          {errorMessage && <FailText>{errorMessage.first_name}</FailText>}
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
              { label: 'Cold', value: 'cold' },
              { label: 'Warm', value: 'warm' },
              { label: 'Hot', value: 'hot' },
            ]}
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-5 md:order-8">
          <TextInput
            label="Penanggung Jawab"
            disabled={true}
            placeholder="Penanggung Jawab"
            value={lead.owner}
            onChange={(e) => setLead({ ...lead, owner: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.owner}</FailText>}
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
          {errorMessage && <FailText>{errorMessage.phone}</FailText>}
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
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleEditLead}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data leads berhasil diubah"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_action={() => onClose()}
        />
      )}
    </SidebarModal>
  );
};

export default EditLeads;
