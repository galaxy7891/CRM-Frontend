import React, { useState, useEffect } from 'react';
import { contactsTypes } from '@/types/contactsTypes';
import { useDispatch } from 'react-redux';
import { addContact } from '@/redux/actions/contactsActions';
import { AppDispatch } from '@/redux/store';
import {
  getProvinces,
  getCities,
  getSubDistricts,
  getVillage,
  getZipCodes,
} from '@/utils/getAddressLocation';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';
import SuccessModal from '@/components/status/success-modal';

interface FormEditProps {
  onClose: () => void;
  emailLocal: string;
}

const NewContact: React.FC<FormEditProps> = ({ onClose, emailLocal }) => {
  const [provinces, setProvinces] = useState<{ id: string; text: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ id: string; text: string }[]>([]);
  const [subDistricts, setSubDistricts] = useState<
    { id: string; text: string }[]
  >([]);
  const [villages, setVillages] = useState<{ id: string; text: string }[]>([]);
  const [zipCodes, setZipCodes] = useState<{ id: string; text: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [contact, setContact] = useState<contactsTypes>({
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

  const handleAddContact = async () => {
    dispatch(addContact(contact, setIsSuccess, setErrorMessage));
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const provinces = await getProvinces();
        setProvinces(provinces);

        if (contact.province) {
          const cities = await getCities(contact.province);
          setCities(cities);

          if (contact.city) {
            const subDistricts = await getSubDistricts(contact.city);
            setSubDistricts(subDistricts);

            if (contact.subdistrict) {
              const villages = await getVillage(contact.subdistrict);
              setVillages(villages);

              const zipCodes = await getZipCodes(
                contact.city,
                contact.subdistrict
              );
              setZipCodes(zipCodes);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLocation();
  }, [contact.province, contact.city, contact.subdistrict]);

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Kontak">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Depan"
            placeholder="Nama Depan"
            value={contact.first_name}
            onChange={(e) =>
              setContact({ ...contact, first_name: e.target.value })
            }
            required
          />
          {errorMessage && <FailText>{errorMessage.first_name}</FailText>}
        </div>

        <div className="order-2">
          <TextInput
            label="Nama Belakang"
            placeholder="Nama Belakang"
            value={contact.last_name}
            onChange={(e) =>
              setContact({ ...contact, last_name: e.target.value })
            }
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
            onChange={(e) =>
              setContact({ ...contact, birthdate: e.target.value })
            }
          />
        </div>
        <div className="order-4">
          <TextInput
            label="Email"
            placeholder="user@gmail.com"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          {errorMessage && <FailText>{errorMessage.email}</FailText>}
        </div>
        <div className="order-5">
          <SelectInput
            label="Status Kontak"
            value={contact.status}
            options={[
              { label: 'Pilih Status', value: '', hidden: true },
              { label: 'rendah', value: 'rendah' },
              { label: 'sedang', value: 'sedang' },
              { label: 'tinggi', value: 'tinggi' },
            ]}
            onChange={(e) => setContact({ ...contact, status: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-5 md:order-8">
          <TextInput
            label="Penanggung Jawab"
            disabled={true}
            placeholder="Penanggung Jawab"
            value={contact.owner}
            onChange={(e) => setContact({ ...contact, owner: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.owner}</FailText>}
        </div>
        <div className="order-6 md:order-7">
          <TextInput
            label="Pekerjaan"
            placeholder="Manager"
            value={contact.job}
            onChange={(e) => setContact({ ...contact, job: e.target.value })}
          />
        </div>
        <div className="order-8 md:order-3">
          <PhoneInput
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.phone}</FailText>}
        </div>
        <div className="order-9">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={contact.address}
            onChange={(e) =>
              setContact({ ...contact, address: e.target.value })
            }
          />
        </div>
        {/* get location API */}
        <div className="order-10">
          <SelectInput
            label="Provinsi"
            value={contact.province}
            options={[
              { label: 'Pilih Provinsi', value: '', hidden: true },
              ...provinces.map((province) => ({
                label: province.text,
                value: province.id,
              })),
            ]}
            onChange={(e) => {
              setContact({ ...contact, province: e.target.value });
            }}
          />
        </div>
        <div className="order-11 ">
          <SelectInput
            label="Kota"
            value={contact.city}
            disabled={!contact.province}
            options={[
              { label: 'Pilih Kota', value: '', hidden: true },
              ...cities.map((city) => ({ label: city.text, value: city.id })),
            ]}
            onChange={(e) => setContact({ ...contact, city: e.target.value })}
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kecamatan"
            value={contact.subdistrict}
            disabled={!contact.city}
            options={[
              { label: 'Pilih Kecamatan', value: '', hidden: true },
              ...subDistricts.map((subDistrict) => ({
                label: subDistrict.text,
                value: subDistrict.id,
              })),
            ]}
            onChange={(e) =>
              setContact({ ...contact, subdistrict: e.target.value })
            }
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kelurahan/Desa"
            value={contact.village}
            disabled={!contact.subdistrict}
            options={[
              { label: 'Pilih Kelurahan/Desa', value: '', hidden: true },
              ...villages.map((village) => ({
                label: village.text,
                value: village.id,
              })),
            ]}
            onChange={(e) =>
              setContact({ ...contact, village: e.target.value })
            }
          />
        </div>
        <div className="order-[14]">
          <SelectInput
            label="Kode Pos"
            value={contact.zip_code}
            disabled={!contact.village}
            options={[
              { label: 'Pilih Kode Pos', value: '', hidden: true },
              ...zipCodes.map((zipCode) => ({
                label: zipCode.text,
                value: zipCode.id,
              })),
            ]}
            onChange={(e) =>
              setContact({ ...contact, zip_code: e.target.value })
            }
          />
        </div>
        <div className="order-[15]">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={contact.description}
            onChange={(e) =>
              setContact({ ...contact, description: e.target.value })
            }
          />
        </div>
      </form>
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleAddContact}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data Kontak berhasil ditambahkan"
          actionButton_href="/contact"
          actionButton_name="Kembali ke Daftar Kontak"
        />
      )}
    </SidebarModal>
  );
};

export default NewContact;
