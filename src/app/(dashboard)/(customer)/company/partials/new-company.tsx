import React, { useState } from 'react';
import { organizationsTypes } from '@/types/leadsTypes';
import { useDispatch } from 'react-redux';
import { addOrganization } from '@/redux/actions/organizationsActions';
import { AppDispatch } from '@/redux/store';
import FailText from '@/components/status/fail-text';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import SuccessModal from '@/components/status/success-modal';
import TextArea from '@/components/form-input/text-area-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';

interface addOrganizationPropsTypes {
  onClose: () => void;
  emailLocal: string;
}
const NewCompany: React.FC<addOrganizationPropsTypes> = ({
  onClose,
  emailLocal,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [organization, setOrganization] = useState<organizationsTypes>({
    id: '',
    name: '',
    industry: '',
    email: '',
    status: '',
    phone: '',
    owner: emailLocal,
    website: '',
    address: '',
    province: '',
    city: '',
    subdistrict: '',
    village: '',
    zip_code: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleAddCompany = () => {
    dispatch(
      addOrganization(organization, setIsLoading, setErrorMessage, setIsSuccess)
    );
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
          {errorMessage?.name && <FailText>{errorMessage?.name}</FailText>}
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
          {errorMessage?.email && <FailText>{errorMessage?.email}</FailText>}
        </div>
        <div className="order-4">
          <PhoneInput
            value={organization.phone}
            onChange={(e) =>
              setOrganization({ ...organization, phone: e.target.value })
            }
          />
          {errorMessage?.phone && <FailText>{errorMessage?.phone}</FailText>}
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
              { label: 'Rendah', value: 'warm' },
              { label: 'Sedang', value: 'cold' },
              { label: 'Tinggi', value: 'hot' },
            ]}
            onChange={(e) =>
              setOrganization({ ...organization, status: e.target.value })
            }
            required
          />
          {errorMessage?.status && <FailText>{errorMessage?.status}</FailText>}
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
          <TextInput
            label="Penanggung Jawab"
            placeholder="Penanggung Jawab"
            value={organization.owner}
            onChange={(e) =>
              setOrganization({ ...organization, owner: e.target.value })
            }
            disabled
          />
          {errorMessage?.owner && <FailText>{errorMessage?.owner}</FailText>}
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
        <DashboardSidebarYellowButton onClick={handleAddCompany}>
          {isLoading ? 'Menambahkan' : 'Tambah'}
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil!"
          description="Perusahaan berhasil ditambahkan"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_href="/company"
        />
      )}
    </SidebarModal>
  );
};

export default NewCompany;
