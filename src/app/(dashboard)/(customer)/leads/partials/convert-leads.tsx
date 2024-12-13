import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hook/redux';
import { convertManualLead } from '@/redux/actions/leadsActions';
import {
  leadsTypes,
  editLeadsPropsTypes,
  selectedIds,
} from '@/types/leadsTypes';
import {
  getProvinces,
  getCities,
  getSubDistricts,
  getVillage,
  getZipCodes,
} from '@/utils/getAddressLocation';
import SuccesModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';

const ConvertLeadsPage: React.FC<editLeadsPropsTypes> = ({
  onClose,
  leadProps,
}) => {
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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [lead, setLead] = useState<leadsTypes>(leadProps);

  const dispatch = useAppDispatch();

  const handleConvert = async () => {
    setIsConfirm(false);
    await dispatch(convertManualLead(lead, setIsSuccess, setErrorMessage));
  };

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirm(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirm(false);
  };
  useEffect(() => {
    if (!provinces.length) {
      getProvinces().then(setProvinces);
    }
    if (selectedIds.provinceId) {
      getCities(selectedIds.provinceId).then(setCities);
    }
    if (selectedIds.cityId) {
      getSubDistricts(selectedIds.cityId).then(setSubDistricts);
    }
    if (selectedIds.subdistrictId) {
      getVillage(selectedIds.subdistrictId).then(setVillages);
    }
    if (selectedIds.villageId) {
      getZipCodes(selectedIds.villageId, selectedIds.cityId).then(setZipCodes);
    }
  }, [selectedIds, provinces]);

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Konversi Contact">
      <form className=" overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Depan"
            placeholder="Nama Depan"
            value={lead.first_name || ''}
            onChange={(e) => setLead({ ...lead, first_name: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.first_name}</FailText>}
        </div>
        <div className="order-2">
          <TextInput
            label="Nama Belakang"
            placeholder="Nama Belakang"
            value={lead.last_name || ''}
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
            value={lead.email || ''}
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
              { label: 'rendah', value: 'rendah' },
              { label: 'sedang', value: 'sedang' },
              { label: 'tinggi', value: 'tinggi' },
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
            value={lead.owner || ''}
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
            value={lead.customers_company || ''}
            options={[{ label: 'Pilih Organisasi', value: '', hidden: true }]}
            onChange={(e) =>
              setLead({ ...lead, customers_company: e.target.value })
            }
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
        <div className="order-[10]">
          <SelectInput
            label="Provinsi"
            value={lead.province || ''}
            options={[
              {
                label: lead.province ? lead.province : 'Pilih Provinsi',
                value: lead.province ? lead.province : '',
                hidden: lead.province ? true : false,
              },
              ...provinces.map((p) => ({ label: p.text, value: p.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                provinces.find((p) => p.id === e.target.value)?.text || '';

              // Reset the lead state for city, subdistrict, village, and zip_code
              setLead({
                ...lead,
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
            value={lead.city || ''}
            disabled={!selectedIds.provinceId}
            options={[
              {
                label: lead.city ? lead.city : 'Pilih Kota',
                value: lead.city ? lead.city : '',
                hidden: true,
              },
              ...cities.map((c) => ({ label: c.text, value: c.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                cities.find((c) => c.id === e.target.value)?.text || '';
              setLead({ ...lead, city: selectedText });
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
            value={lead.subdistrict || ''}
            disabled={!selectedIds.cityId}
            options={[
              {
                label: lead.subdistrict ? lead.subdistrict : 'Pilih Kecamatan',
                value: lead.subdistrict ? lead.subdistrict : '',
                hidden: true,
              },

              ...subDistricts.map((sd) => ({ label: sd.text, value: sd.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                subDistricts.find((sd) => sd.id === e.target.value)?.text || '';
              setLead({ ...lead, subdistrict: selectedText });
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
            value={lead.village || ''}
            disabled={!selectedIds.subdistrictId}
            options={[
              {
                label: lead.village ? lead.village : 'Pilih Kelurahan/Desa',
                value: lead.village ? lead.village : '',
                hidden: lead.village ? true : false,
              },

              ...villages.map((v) => ({ label: v.text, value: v.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                villages.find((v) => v.id === e.target.value)?.text || '';
              setLead({ ...lead, village: selectedText });
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
            value={lead.zip_code || ''}
            disabled={!selectedIds.villageId}
            options={[
              {
                label: lead.zip_code ? lead.zip_code : 'Pilih Kode Pos',
                value: lead.zip_code ? lead.zip_code : '',
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
              setLead({ ...lead, zip_code: selectedText });
              setSelectedIds({ ...selectedIds, zipCodeId: e.target.value });
            }}
          />
        </div>
        <div className="order-[16]">
          <TextArea
            label="Deskripsi"
            placeholder="Deskripsi"
            value={lead.description || ''}
            onChange={(e) => setLead({ ...lead, description: e.target.value })}
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Batal
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
          description="Data leads berhasil dikonversi menjadi kontak"
          actionButton={true}
          actionButton_href="/contacts"
          actionButton_name="Menuju ke Halaman Kontak"
        />
      )}
    </SidebarModal>
  );
};

export default ConvertLeadsPage;
