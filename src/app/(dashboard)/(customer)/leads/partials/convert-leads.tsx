import React, { useState } from 'react';
import { leadsTypes } from '@/types/leadsTypes';
import { useAppDispatch } from '@/hook/redux';
import { convertManualLeads } from '@/redux/actions/leadsActions';
import SuccesModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';

interface FormEditProps {
  onClose: () => void;
  leadData: leadsTypes;
}

const ConvertLeadsPage: React.FC<FormEditProps> = ({ onClose, leadData }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [lead, setLead] = useState<leadsTypes>({
    id: leadData?.id || '',
    first_name: leadData?.first_name || '',
    last_name: leadData?.last_name || '',
    job: leadData?.job || '',
    description: leadData?.description || '',
    status: leadData?.status || '',
    birthdate: leadData?.birthdate || null,
    email: leadData?.email || '',
    phone: leadData?.phone || '',
    owner: leadData?.owner || '',
    organization: leadData?.organization || '',
    address: leadData?.address || '',
    province: leadData?.province || '',
    city: leadData?.city || '',
    subdistrict: leadData?.subdistrict || '',
    village: leadData?.village || '',
    zip_code: leadData?.zip_code || '',
  });

  const dispatch = useAppDispatch();

  const handleConvert = async (e: React.FormEvent) => {
    setIsConfirm(false);
    e.preventDefault();
    await dispatch(convertManualLeads(lead, setIsSuccess, setErrorMessage));
  };

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirm(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirm(false);
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Konversi Contact">
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
        <div className="order-7 md:order-7">
          <TextInput
            label="Pekerjaan"
            placeholder="Manager"
            value={lead.job}
            onChange={(e) => setLead({ ...lead, job: e.target.value })}
          />
        </div>
        <div className="order-8 md:order-8">
          <SelectInput
            label="Perusahaan"
            value={lead.organization}
            options={[{ label: 'Pilih Organisasi', value: '', hidden: true }]}
            onChange={(e) => setLead({ ...lead, organization: e.target.value })}
            required
          />
        </div>
        <div className="order-9 md:order-3">
          <PhoneInput
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.phone}</FailText>}
        </div>
        <div className="order-10 md:order-9">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={lead.address}
            onChange={(e) => setLead({ ...lead, address: e.target.value })}
          />
        </div>
        <div className="order-11">
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
        <div className="order-12 ">
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
        <div className="order-[13]">
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
        <div className="order-[14]">
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
        <div className="order-[15]">
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
        <div className="order-[16]">
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
        <DashboardSidebarYellowButton onClick={handleOpenConfirmation}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isConfirm && (
        <ActionConfirmModal
          header="Apakah ingin mengonversi data?"
          description="Data leads yang dipilih akan dikonversi menjadi data kontak"
          actionButtonNegative_action={handleCloseConfirmation}
          actionButtonPositive_name="Konversi"
          actionButtonPositive_action={handleConvert}
        />
      )}
      {isSuccess && (
        <SuccesModal
          header="Berhasil!"
          description="Data leads berhasil dikoversi menjadi kontak"
          actionButton={true}
          actionButton_href="/contacts"
          actionButton_name="Menuju ke kontak"
        />
      )}
    </SidebarModal>
  );
};

export default ConvertLeadsPage;
