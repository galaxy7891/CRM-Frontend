import React, { useState } from "react";
import { employeesTypes, formActionPropsTypes } from "@/types/employeeTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateEmployee } from "@/redux/actions/employeesActions";
import DashboardSidebarRedButton from "@/components/button/dashboard-sidebar-red-button";
import DashboardSidebarYellowButton from "@/components/button/dashboard-sidebar-yellow-button";
import SelectInput from "@/components/form-input/dropdown-input";
import FailText from "@/components/status/fail-text";
import PhoneInput from "@/components/form-input/phone-input";
import TextInput from "@/components/form-input/text-input";
import SuccessModal from "@/components/status/success-modal";
import SidebarFooter from "@/components/layout/sidebar-footer";
import SidebarModal from "@/components/layout/sidebar-modal";

const EditEmployee: React.FC<formActionPropsTypes> = ({
  onClose,
  employeeProps,
}) => {
  const [employee, setEmployee] = useState<employeesTypes>(employeeProps);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const handleEditEmployee = () => {
    dispatch(updateEmployee(employee, setIsSuccess, setErrorMessage));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Karyawan">
      <form className="">
        <div className="overflow-y-auto grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div className="order-1">
            <TextInput
              label="Nama Depan"
              placeholder="Nama Depan"
              value={employee.first_name}
              onChange={(e) =>
                setEmployee({ ...employee, first_name: e.target.value })
              }
              required
            />
            {errorMessage?.first_name && (
              <FailText>{errorMessage.first_name}</FailText>
            )}
          </div>
          <div className="order-2">
            <TextInput
              label="Nama Belakang"
              placeholder="Nama Belakang"
              value={employee.last_name}
              onChange={(e) =>
                setEmployee({ ...employee, last_name: e.target.value })
              }
            />
          </div>
          <div className="order-3">
            <TextInput
              label="Email"
              placeholder="user@gmail.com"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
            {errorMessage?.email && <FailText>{errorMessage.email}</FailText>}
          </div>
          <div className="order-4">
            <PhoneInput
              value={employee.phone || ''}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
              required
            />
            {errorMessage?.phone && <FailText>{errorMessage.phone}</FailText>}
          </div>
          <div className="order-5">
            <SelectInput
              label="Akses"
              value={employee.role}
              options={[
                { value: '', label: 'Pilih Akses', hidden: true },
                { value: 'super_admin', label: 'Super Admin' },
                { value: 'admin', label: 'Admin' },
                { value: 'karyawan', label: 'Karyawan' },
              ]}
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
            />
            {errorMessage?.role && <FailText>{errorMessage.role}</FailText>}
          </div>
          <div className="order-6">
            <SelectInput
              label="Jabatan"
              value={employee.job_position}
              options={[
                { value: '', label: 'Pilih Jabatan', hidden: true },
                { value: 'Presiden', label: 'Presiden' },
                { value: 'C-Level', label: 'C-Level' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Sales', label: 'Sales' },
              ]}
              onChange={(e) =>
                setEmployee({ ...employee, job_position: e.target.value })
              }
              required
            />
            {errorMessage?.job_potition && (
              <FailText>{errorMessage.job_potition}</FailText>
            )}
          </div>
          <div className="order-7">
            <SelectInput
              label="Jenis Kelamin"
              value={employee.gender} // Use state for gender
              options={[
                { label: 'Pilih Jenis Kelamin', value: '', hidden: true },
                { label: 'laki-laki', value: 'laki-laki' },
                { label: 'perempuan', value: 'perempuan' },
                { label: 'lainnya', value: 'lainnya' },
              ]}
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            />
          </div>
        </div>
      </form>
      <SidebarFooter>
        <DashboardSidebarRedButton onClick={onClose}>
          Batal
        </DashboardSidebarRedButton>
        <DashboardSidebarYellowButton onClick={handleEditEmployee}>
          Simpan
        </DashboardSidebarYellowButton>
      </SidebarFooter>
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data Karyawan berhasil diubah"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_action={() => window.location.reload()}
        />
      )}
    </SidebarModal>
  );
};

export default EditEmployee;
