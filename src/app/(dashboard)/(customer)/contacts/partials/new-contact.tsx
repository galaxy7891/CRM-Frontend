import React, { useState, useEffect } from 'react';
import { contactsTypes, selectedIds } from '@/types/contactsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '@/redux/actions/contactsActions';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getProvinces,
  getCities,
  getSubDistricts,
  getVillage,
  getZipCodes,
} from '@/utils/getAddressLocation';
import { getCompanies } from '@/redux/actions/companiesActions';

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
  const [selectedIds, setSelectedIds] = useState<selectedIds>({
    provinceId: '',
    cityId: '',
    subdistrictId: '',
    villageId: '',
    zipCodeId: '',
  });
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
    customers_company_id: '',
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
  const { companies } = useSelector((state: RootState) => state.companies);

  console.log(companies, 'companies');

  const handcontactdContact = async () => {
    dispatch(addContact(contact, setIsSuccess, setErrorMessage));
  };

  useEffect(() => {
    dispatch(getCompanies('', '', '', 0, () => {}));
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
  }, [contact.province, contact.city, contact.subdistrict, dispatch]);

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Kontak">
      <form className="overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
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
        <div className="order-8 md:order-8">
          <SelectInput
            label="Perusahaan"
            value={contact.customers_company?.name || ''}
            options={[
              {
                label: 'Pilih Perusahaan',
                value: '',
                hidden: true,
              },
              ...companies.map((p) => ({
                label: p.name,
                value: p.id,
              })),
            ]}
            onChange={(e) =>
              setContact({
                ...contact,
                customers_company_id: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="order-9 md:order-3">
          <PhoneInput
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.phone}</FailText>}
        </div>
        <div className="order-10 md:order-9">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={contact.address}
            onChange={(e) =>
              setContact({ ...contact, address: e.target.value })
            }
          />
        </div>
        <div className="order-[10]">
          <SelectInput
            label="Provinsi"
            value={contact.province || ''}
            options={[
              {
                label: contact.province ? contact.province : 'Pilih Provinsi',
                value: contact.province ? contact.province : '',
                hidden: contact.province ? true : false,
              },
              ...provinces.map((p) => ({ label: p.text, value: p.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                provinces.find((p) => p.id === e.target.value)?.text || '';

              // Reset the contact state for city, subdistrict, village, and zip_code
              setContact({
                ...contact,
                province: selectedText,
                city: '',
                subdistrict: '',
                village: '',
                zip_code: '',
              });

              // Reset selected IDs for cityId, subdistrictId, villageId, and zipCodeId
              setSelectedIds({
                provinceId: e.target.value,
                cityId: '',
                subdistrictId: '',
                villageId: '',
                zipCodeId: '',
              });
            }}
          />
        </div>

        {/* Kota */}
        <div className="order-[11]">
          <SelectInput
            label="Kota"
            value={contact.city || ''}
            disabled={!selectedIds.provinceId}
            options={[
              {
                label: contact.city ? contact.city : 'Pilih Kota',
                value: contact.city ? contact.city : '',
                hidden: true,
              },
              ...cities.map((c) => ({ label: c.text, value: c.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                cities.find((c) => c.id === e.target.value)?.text || '';
              setContact({ ...contact, city: selectedText });
              setSelectedIds({
                ...selectedIds,
                cityId: e.target.value,
                subdistrictId: '',
                villageId: '',
                zipCodeId: '',
              });
            }}
          />
        </div>
        {/* Kecamatan */}
        <div className="order-[12]">
          <SelectInput
            label="Kecamatan"
            value={contact.subdistrict || ''}
            disabled={!selectedIds.cityId}
            options={[
              {
                label: contact.subdistrict
                  ? contact.subdistrict
                  : 'Pilih Kecamatan',
                value: contact.subdistrict ? contact.subdistrict : '',
                hidden: true,
              },

              ...subDistricts.map((sd) => ({ label: sd.text, value: sd.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                subDistricts.find((sd) => sd.id === e.target.value)?.text || '';
              setContact({ ...contact, subdistrict: selectedText });
              setSelectedIds({
                ...selectedIds,
                subdistrictId: e.target.value,
                villageId: '',
                zipCodeId: '',
              });
            }}
          />
        </div>
        {/* Kelurahan */}
        <div className="order-[13]">
          <SelectInput
            label="Kelurahan/Desa"
            value={contact.village || ''}
            disabled={!selectedIds.subdistrictId}
            options={[
              {
                label: contact.village
                  ? contact.village
                  : 'Pilih Kelurahan/Desa',
                value: contact.village ? contact.village : '',
                hidden: contact.village ? true : false,
              },

              ...villages.map((v) => ({ label: v.text, value: v.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                villages.find((v) => v.id === e.target.value)?.text || '';
              setContact({ ...contact, village: selectedText });
              setSelectedIds({
                ...selectedIds,
                villageId: e.target.value,
                zipCodeId: '',
              });
            }}
          />
        </div>
        {/* Kode Pos */}
        <div className="order-[14]">
          <SelectInput
            label="Kode Pos"
            value={contact.zip_code || ''}
            disabled={!selectedIds.villageId}
            options={[
              {
                label: contact.zip_code ? contact.zip_code : 'Pilih Kode Pos',
                value: contact.zip_code ? contact.zip_code : '',
                hidden: true,
              },
              ...zipCodes.map((zipCode) => ({
                label: zipCode.text,
                value: zipCode.id,
              })),
            ]}
            onChange={(e) => {
              const selectedText =
                zipCodes.find((z) => z.id === e.target.value)?.text || '';
              setContact({ ...contact, zip_code: selectedText });
              setSelectedIds({ ...selectedIds, zipCodeId: e.target.value });
            }}
          />
        </div>
        <div className="order-[16]">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={contact.description || ''}
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
        <DashboardSidebarYellowButton onClick={handcontactdContact}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data Kontak berhasil ditambahkan"
          actionButton_href="/contacts"
          actionButton_name="Kembali ke Daftar Kontak"
        />
      )}
    </SidebarModal>
  );
};

export default NewContact;
