import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import PhoneInput from "@/components/form-input/phone-input";
import TextInput from "@/components/form-input/text-input";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";
import React, { useState } from "react";

interface FormEditProps {
  onClose: () => void;
  data: EmployeeData; 
}

interface EmployeeData { 
  first_name: string;
  last_name: string;
  email: string;
  status: string; 
  phone: string;
}

const EditEmployee: React.FC<FormEditProps> = ({ onClose, data }) => {
  const [firstName, setFirstName] = useState(data?.first_name);
  const [lastName, setLastName] = useState(data?.last_name);
  const [email, setEmail] = useState(data?.email);
  const [jabatan, setJabatan] = useState(data?.status); 
  const [phone, setPhone] = useState(data?.phone);
  const [gender, setGender] = useState(data?.gender || ''); 

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Karyawan">
      <form className="flex-grow overflow-y-auto grid grid-cols-1 gap-4 md:grid-cols-2 p-2">
        <div className="order-1">
          <TextInput
            label="Nama Depan"
            placeholder="Nama Depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="order-2">
          <TextInput
            label="Nama Belakang"
            placeholder="Nama Belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="order-3">
          <TextInput
            label="Email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="order-4">
          <PhoneInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="order-5">
          <SelectInput
            label="Jabatan"
            value={jabatan} // Updated to use jabatan
            options={[
              
              { value: "Super Admin", label: "Super Admin" },
              { value: "Admin", label: "Admin" },
              { value: "Karyawan", label: "Karyawan" },
              
            ]}
            onChange={(e) => setJabatan(e.target.value)}
          />
        </div>
        <div className="order-6">
          <SelectInput
            label="Jabatan"
            value={jabatan} // Updated to use jabatan
            options={[
              
              { value: "Presiden", label: "Presiden" },
              { value: "C-Level", label: "C-Level" },
              { value: "Manager", label: "Manager" },
              { value: "Sales", label: "Sales" },
            ]}
            onChange={(e) => setJabatan(e.target.value)}
          />
        </div>
        <div className="order-7">
          <SelectInput
            label="Jenis Kelamin"
            value={gender} // Use state for gender
            options={[
              { label: "Laki-laki", value: "laki-laki" },
              { label: "Perempuan", value: "perempuan" },
              { label: "Lainnya", value: "lainnya" },
            ]}
            onChange={(e) => setGender(e.target.value)} // Set gender state on change
          />
        </div>
      </form>
      <SidebarFooter>
        {/* if data empty button disabled */}
        <DashboardSidebarRedButton onClick={onClose}>
          Hapus Semua
        </DashboardSidebarRedButton>
        {/* Uncomment and implement submit button */}
        {/* <DashboardSidebarYellowButton onClick={handleSubmit}>
          Simpan
        </DashboardSidebarYellowButton> */}
      </SidebarFooter>
    </SidebarModal>
  );
};

export default EditEmployee;
