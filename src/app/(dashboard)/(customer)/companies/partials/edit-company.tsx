import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { companiesTypes, formActionPropsTypes } from '@/types/companiesTypes';
import { selectedIds } from '@/types/otherTypes';
import {
  getProvinces,
  getCities,
  getSubDistricts,
  getVillage,
  getZipCodes,
} from '@/utils/getAddressLocation';
import { updateCompany } from '@/redux/actions/companiesActions';
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

const EditCompany: React.FC<formActionPropsTypes> = ({
  onClose,
  companyProps,
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
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [company, setCompany] = useState<companiesTypes>(companyProps);

  const dispatch = useDispatch<AppDispatch>();

  const handleEditCompany = () => {
    console.log('update');
    dispatch(updateCompany(company, setIsSuccess, setErrorMessage));
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
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Perusahaan">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Perusahaan"
            placeholder="Pt Loyal Cust"
            value={company?.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            required
          />
          {errorMessage.name && <FailText>{errorMessage.name}</FailText>}
        </div>
        <div className="order-2">
          <SelectInput
            label="Jenis Industri"
            value={company.industry}
            options={[
              { label: 'Manufaktur', value: 'Manufaktur' },
              { label: 'Teknologi', value: 'Teknologi' },
              { label: 'Lainnya', value: 'Lainnya' },
            ]}
            onChange={(e) =>
              setCompany({ ...company, industry: e.target.value })
            }
          />
        </div>
        <div className="order-3">
          <TextInput
            label="Email"
            placeholder="loyalcust@gmail.com"
            value={company.email}
            onChange={(e) => setCompany({ ...company, email: e.target.value })}
          />
        </div>
        <div className="order-4">
          <PhoneInput
            value={company.phone}
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
          />
        </div>
        <div className="order-5 ">
          <TextInput
            label="Website"
            placeholder="www.loyalcust.com"
            value={company.website}
            onChange={(e) =>
              setCompany({ ...company, website: e.target.value })
            }
          />
        </div>
        <div className="order-6">
          <SelectInput
            label="Status Perusahaan"
            value={company.status}
            options={[
              { label: 'Rendah', value: 'cold' },
              { label: 'Sedang', value: 'warm' },
              { label: 'Tinggi', value: 'Hot' },
            ]}
            onChange={(e) => setCompany({ ...company, status: e.target.value })}
            required
          />
          {errorMessage.status && <FailText>{errorMessage.status}</FailText>}
        </div>
        <div className="order-7">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={company.address}
            onChange={(e) =>
              setCompany({ ...company, address: e.target.value })
            }
          />
        </div>
        <div className="order-8 ">
          <TextInput
            label="Penanggung Jawab"
            disabled={true}
            placeholder="Penanggung Jawab"
            value={company.owner || ''}
            onChange={(e) => setCompany({ ...company, owner: e.target.value })}
            required
          />
          {errorMessage && <FailText>{errorMessage.owner}</FailText>}
        </div>

        <div className="order-9">
          <SelectInput
            label="Provinsi"
            value={company.province || ''}
            options={[
              {
                label: company.province ? company.province : 'Pilih Provinsi',
                value: company.province ? company.province : '',
                hidden: company.province ? true : false,
              },
              ...provinces.map((p) => ({ label: p.text, value: p.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                provinces.find((p) => p.id === e.target.value)?.text || '';

              // Reset the company state for city, subdistrict, village, and zip_code
              setCompany({
                ...company,
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
        <div className="order-10 ">
          <SelectInput
            label="Kota"
            value={company.city || ''}
            disabled={!selectedIds.provinceId}
            options={[
              {
                label: company.city ? company.city : 'Pilih Kota',
                value: company.city ? company.city : '',
                hidden: true,
              },
              ...cities.map((c) => ({ label: c.text, value: c.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                cities.find((c) => c.id === e.target.value)?.text || '';
              setCompany({ ...company, city: selectedText });
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
        <div className="order-11">
          <SelectInput
            label="Kecamatan"
            value={company.subdistrict || ''}
            disabled={!selectedIds.cityId}
            options={[
              {
                label: company.subdistrict
                  ? company.subdistrict
                  : 'Pilih Kecamatan',
                value: company.subdistrict ? company.subdistrict : '',
                hidden: true,
              },

              ...subDistricts.map((sd) => ({ label: sd.text, value: sd.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                subDistricts.find((sd) => sd.id === e.target.value)?.text || '';
              setCompany({ ...company, subdistrict: selectedText });
              setSelectedIds({
                ...selectedIds,
                subdistrictId: e.target.value,
                villageId: '',
                zipCodeId: '',
              });
            }}
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kelurahan/Desa"
            value={company.village || ''}
            disabled={!selectedIds.subdistrictId}
            options={[
              {
                label: company.village
                  ? company.village
                  : 'Pilih Kelurahan/Desa',
                value: company.village ? company.village : '',
                hidden: company.village ? true : false,
              },

              ...villages.map((v) => ({ label: v.text, value: v.id })),
            ]}
            onChange={(e) => {
              const selectedText =
                villages.find((v) => v.id === e.target.value)?.text || '';
              setCompany({ ...company, village: selectedText });
              setSelectedIds({
                ...selectedIds,
                villageId: e.target.value,
                zipCodeId: '',
              });
            }}
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kode Pos"
            value={company.zip_code || ''}
            disabled={!selectedIds.villageId}
            options={[
              {
                label: company.zip_code ? company.zip_code : 'Pilih Kode Pos',
                value: company.zip_code ? company.zip_code : '',
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
              setCompany({ ...company, zip_code: selectedText });
              setSelectedIds({ ...selectedIds, zipCodeId: e.target.value });
            }}
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        <DashboardSidebarYellowButton onClick={handleEditCompany}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil!"
          description="Data perusahaan berhasil diubah"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_href="/companies"
        />
      )}
    </SidebarModal>
  );
};

export default EditCompany;
