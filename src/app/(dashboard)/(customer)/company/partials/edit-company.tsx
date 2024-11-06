import React, { useState } from 'react';
import { organizationsTypes, editOrganizationPropsTypes } from '@/types/leads';
import { updateOrganization } from '@/redux/actions/organizations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import SuccessModal from '@/components/status/success-modal';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';

const EditCompany: React.FC<editOrganizationPropsTypes> = ({
  onClose,
  organizationProps,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [organization, setOrganization] = useState<organizationsTypes>({
    id: organizationProps.id,
    name: organizationProps.name,
    industry: organizationProps.industry,
    email: organizationProps.email,
    status: organizationProps.status,
    phone: organizationProps.phone,
    owner: organizationProps.owner,
    website: organizationProps.website,
    address: organizationProps.address,
    province: organizationProps.province,
    city: organizationProps.city,
    subdistrict: organizationProps.subdistrict,
    village: organizationProps.village,
    zip_code: organizationProps.zip_code,
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleEditCompany = () => {
    dispatch(updateOrganization(organization, setIsLoading, setIsSuccess));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Tambah Perusahaan">
      <form className="flex-grow overflow-y-auto px-4 grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Perusahaan"
            placeholder="Pt Loyal Cust"
            value={organization?.name}
            onChange={(e) =>
              setOrganization({ ...organization, name: e.target.value })
            }
            required
          />
        </div>
        <div className="order-2">
          <SelectInput
            label="Jenis Industri"
            value={organization.industry}
            options={[
              { label: 'Manufaktur', value: 'Manufaktur' },
              { label: 'Teknologi', value: 'Teknologi' },
              { label: 'Lainnya', value: 'Lainnya' },
            ]}
            onChange={(e) =>
              setOrganization({ ...organization, industry: e.target.value })
            }
          />
        </div>
        <div className="order-3">
          <TextInput
            label="Email"
            placeholder="loyalcust@gmail.com"
            value={organization.email}
            onChange={(e) =>
              setOrganization({ ...organization, email: e.target.value })
            }
          />
        </div>
        <div className="order-4">
          <PhoneInput
            value={organization.phone}
            onChange={(e) =>
              setOrganization({ ...organization, phone: e.target.value })
            }
          />
        </div>
        <div className="order-5 ">
          <TextInput
            label="Website"
            placeholder="www.loyalcust.com"
            value={organization.website}
            onChange={(e) =>
              setOrganization({ ...organization, website: e.target.value })
            }
          />
        </div>
        <div className="order-6">
          <SelectInput
            label="Status Perusahaan"
            value={organization.status}
            options={[
              { label: 'Rendah', value: 'Rendah' },
              { label: 'Sedang', value: 'Sedang' },
              { label: 'Tinggi', value: 'Tinggi' },
            ]}
            onChange={(e) =>
              setOrganization({ ...organization, status: e.target.value })
            }
            required
          />
        </div>
        <div className="order-7">
          <TextArea
            label="Alamat"
            placeholder="Jl. Kemenangan No.99"
            value={organization.address}
            onChange={(e) =>
              setOrganization({ ...organization, address: e.target.value })
            }
          />
        </div>
        <div className="order-8 ">
          <SelectInput
            label="Penanggung Jawab"
            value={organization.owner}
            options={
              [
                // get data from karyawan
              ]
            }
            onChange={(e) =>
              setOrganization({ ...organization, owner: e.target.value })
            }
            required
          />
        </div>

        <div className="order-9">
          <SelectInput
            label="Provinsi"
            value={organization.province}
            options={
              [
                // get data from api provinsi
              ]
            }
            onChange={(e) =>
              setOrganization({ ...organization, province: e.target.value })
            }
          />
        </div>
        <div className="order-10 ">
          <SelectInput
            label="Kota"
            value={organization.city}
            options={
              [
                // get data from api kota
              ]
            }
            onChange={(e) =>
              setOrganization({ ...organization, city: e.target.value })
            }
          />
        </div>
        <div className="order-11">
          <SelectInput
            label="Kecamatan"
            value={organization.subdistrict}
            options={
              [
                // get data from api kecamatan
              ]
            }
            onChange={(e) =>
              setOrganization({ ...organization, subdistrict: e.target.value })
            }
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kelurahan"
            value={organization.village}
            options={
              [
                // get data from api kelurahan
              ]
            }
            onChange={(e) =>
              setOrganization({ ...organization, village: e.target.value })
            }
          />
        </div>
        <div className="order-[13]">
          <SelectInput
            label="Kode Pos"
            value={organization.zip_code}
            options={
              [
                // get data from api kode pos
              ]
            }
            onChange={(e) =>
              setOrganization({ ...organization, zip_code: e.target.value })
            }
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
          actionButton_href="/company"
        />
      )}
    </SidebarModal>
  );
};

export default EditCompany;
