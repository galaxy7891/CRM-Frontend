import React, { useState, useEffect } from 'react';
import { leadsTypes } from '@/types/leadsTypes';
import { useDispatch } from 'react-redux';
import { addLead } from '@/redux/actions/leadsActions';
import { AppDispatch } from '@/redux/store';
import {
  getProvinces,
  getCities,
  getSubDistricts,
  getVillage,
  getZipCodes,
} from '@/utils/getAddressLocation';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import SuccessModal from '@/components/status/success-modal';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';

interface newLeadsProps {
  onClose: () => void;
  emailLocal: string;
}

const NewLeads: React.FC<newLeadsProps> = ({ onClose, emailLocal }) => {
  const [provinces, setProvinces] = useState<{ id: string; text: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ id: string; text: string }[]>([]);
  const [subDistricts, setSubDistricts] = useState<
    { id: string; text: string }[]
  >([]);
  const [villages, setVillages] = useState<{ id: string; text: string }[]>([]);
  const [zipCodes, setZipCodes] = useState<{ id: string; text: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [lead, setLead] = useState<leadsTypes>({
    id: '',
    first_name: '',
    last_name: '',
    customerCategory: '',
    job: '',
    description: '',
    status: '',
    birthdate: '',
    email: '',
    phone: '',
    owner: emailLocal,
    address: '',
    province: '',
    city: '',
    subdistrict: '',
    village: '',
    zip_code: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const handleAddLead = () => {
    const leadWithLocation = {
      ...lead,
      province:
        provinces.find((province) => province.id === lead.province)?.text || '',
      city: cities.find((city) => city.id === lead.city)?.text || '',
      subdistrict:
        subDistricts.find((subdistrict) => subdistrict.id === lead.subdistrict)
          ?.text || '',
      village:
        villages.find((village) => village.id === lead.village)?.text || '',
      zip_code:
        zipCodes.find((zipCode) => zipCode.id === lead.zip_code)?.text || '',
    };
    dispatch(addLead(leadWithLocation, setIsSuccess, setErrorMessage));
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const provinces = await getProvinces();
        setProvinces(provinces);

        if (lead.province) {
          const cities = await getCities(lead.province);
          setCities(cities);

          if (lead.city) {
            const subDistricts = await getSubDistricts(lead.city);
            setSubDistricts(subDistricts);

            if (lead.subdistrict) {
              const villages = await getVillage(lead.subdistrict);
              setVillages(villages);

              const zipCodes = await getZipCodes(lead.city, lead.subdistrict);
              setZipCodes(zipCodes);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
  }, [lead.province, lead.city, lead.subdistrict]);

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Leads">
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
            value={lead.birthdate}
            onChange={(e) => setLead({ ...lead, birthdate: e.target.value })}
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
              { label: 'Rendah', value: 'cold' },
              { label: 'Sedang', value: 'warm' },
              { label: 'Tinggi', value: 'hot' },
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
        {/* get location API */}
        <div className="order-10">
          <SelectInput
            label="Provinsi"
            value={lead.province}
            options={[
              { label: 'Pilih Provinsi', value: '', hidden: true },
              ...provinces.map((province) => ({
                label: province.text,
                value: province.id,
              })),
            ]}
            onChange={(e) => {
              setLead({ ...lead, province: e.target.value });
            }}
          />
        </div>
        <div className="order-11 ">
          <SelectInput
            label="Kota"
            value={lead.city}
            disabled={!lead.province}
            options={[
              { label: 'Pilih Kota', value: '', hidden: true },
              ...cities.map((city) => ({ label: city.text, value: city.id })),
            ]}
            onChange={(e) => setLead({ ...lead, city: e.target.value })}
          />
        </div>

        <div className="order-12">
          <SelectInput
            label="Kecamatan"
            value={lead.subdistrict}
            disabled={!lead.city}
            options={[
              { label: 'Pilih Kecamatan', value: '', hidden: true },
              ...subDistricts.map((subDistrict) => ({
                label: subDistrict.text,
                value: subDistrict.id,
              })),
            ]}
            onChange={(e) => setLead({ ...lead, subdistrict: e.target.value })}
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kelurahan/Desa"
            value={lead.village}
            disabled={!lead.subdistrict}
            options={[
              { label: 'Pilih Kelurahan/Desa', value: '', hidden: true },
              ...villages.map((village) => ({
                label: village.text,
                value: village.id,
              })),
            ]}
            onChange={(e) => setLead({ ...lead, village: e.target.value })}
          />
        </div>
        <div className="order-[14]">
          <SelectInput
            label="Kode Pos"
            value={lead.zip_code}
            disabled={!lead.village}
            options={[
              { label: 'Pilih Kode Pos', value: '', hidden: true },
              ...zipCodes.map((zipCode) => ({
                label: zipCode.text,
                value: zipCode.id,
              })),
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
        <DashboardSidebarYellowButton onClick={handleAddLead}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data leads berhasil ditambahkan"
          actionButton_href="/leads"
          actionButton_name="Kembali ke Daftar Leads"
        />
      )}
    </SidebarModal>
  );
};

export default NewLeads;
