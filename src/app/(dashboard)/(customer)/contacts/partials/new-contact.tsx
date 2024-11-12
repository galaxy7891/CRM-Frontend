import React, { useState } from 'react';
import axios from 'axios';
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
  emailLocal: string;
}

interface dataCustomer {
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
const NewContact: React.FC<FormEditProps> = ({ onClose, emailLocal }) => {
  const [errorMessage, setErrorMessage] = useState<dataCustomer | null>(null);
  const [contact, setContact] = useState<dataCustomer>({
    first_name: '',
    last_name: '',
    customerCategory: '',
    job: '',
    description: '',
    status: '',
    birthdate: null,
    email: '',
    phone: '',
    owner: emailLocal,
    address: '',
    country: '',
    province: '',
    city: '',
    subdistrict: '',
    village: '',
    zip_code: '',
  });

  const handleAddContact = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contacts`,
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        window.location.reload();
      } else {
        setErrorMessage(response.data.message);
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log(contact);
    }
  };

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
        <div className="order-10">
          <SelectInput
            label="Provinsi"
            value={contact.province}
            options={[
              { label: 'Pilih Provinsi', value: '', hidden: true },
              { label: 'Jawa Tengah', value: 'Jawa Tengah' },
            ]}
            onChange={(e) =>
              setContact({ ...contact, province: e.target.value })
            }
          />
        </div>
        <div className="order-11 ">
          <SelectInput
            label="Kota"
            value={contact.city}
            options={[
              { label: 'Pilih Kota', value: '', hidden: true },
              { label: 'Kota Semarang', value: 'Kota Semarang' },
            ]}
            onChange={(e) => setContact({ ...contact, city: e.target.value })}
          />
        </div>
        <div className="order-12">
          <SelectInput
            label="Kecamatan"
            value={contact.subdistrict}
            options={[
              { label: 'Pilih Kecamatan', value: '', hidden: true },
              {
                label: 'Semarang Tengah',
                value: 'Semarang Tengah',
                hidden: false,
              },
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
            options={[
              { label: 'Pilih Kelurahan/Desa', value: '', hidden: true },
              {
                label: 'Pendrikan Kidul',
                value: 'Pendrikan Kidul',
                hidden: false,
              },
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
            options={[
              { label: 'Pilih Kode Pos', value: '', hidden: true },
              { label: '12345', value: '12345' },
              { label: '23456', value: '23456' },
              { label: '34567', value: '34567' },
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
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Tambah button is used  */}
        <DashboardSidebarYellowButton onClick={handleAddContact}>
          Tambah
        </DashboardSidebarYellowButton>
      </SidebarFooter>
    </SidebarModal>
  );
};

export default NewContact;
