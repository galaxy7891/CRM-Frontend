import { employeesTypes, formActionPropsTypes } from '@/types/employeeTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateEmployee } from '@/redux/actions/employeesActions';
import DashboardSidebarRedButton from '@/components/button/dashboard-sidebar-red-button';
import DashboardSidebarYellowButton from '@/components/button/dashboard-sidebar-yellow-button';
import SelectInput from '@/components/form-input/dropdown-input';
import PhoneInput from '@/components/form-input/phone-input';
import TextInput from '@/components/form-input/text-input';
import SidebarFooter from '@/components/layout/sidebar-footer';
import SidebarModal from '@/components/layout/sidebar-modal';
import React, { useState } from 'react';

const EditEmployee: React.FC<formActionPropsTypes> = ({
  onClose,
  employeeProps,
}) => {
  const [employee, setEmployee] = useState<employeesTypes>(employeeProps);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const handlEditEmployee = () => {
    dispatch(updateEmployee(employee, setIsSuccess, setErrorMessage));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Edit Karyawan">
      <form className="flex-grow">
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
          </div>
          <div className="order-4">
            <PhoneInput
              value={employee.phone}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="order-5">
            <SelectInput
              label="Jabatan"
              value={employee.role}
              options={[
                { value: 'super_admin', label: 'Super Admin' },
                { value: 'admin', label: 'Admin' },
                { value: 'employee', label: 'Karyawan' },
              ]}
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
            />
          </div>
          <div className="order-6">
            <SelectInput
              label="Jabatan"
              value={employee.job_position}
              options={[
                { value: 'Presiden', label: 'Presiden' },
                { value: 'C-Level', label: 'C-Level' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Sales', label: 'Sales' },
              ]}
              onChange={(e) =>
                setEmployee({ ...employee, job_position: e.target.value })
              }
            />
          </div>
          <div className="order-7">
            <SelectInput
              label="Jenis Kelamin"
              value={employee.gender} // Use state for gender
              options={[
                { label: 'Laki-laki', value: 'laki-laki' },
                { label: 'Perempuan', value: 'perempuan' },
                { label: 'Lainnya', value: 'lainnya' },
              ]}
              onChange={(e) =>
                setEmployee({ ...employee, gender: e.target.value })
              }
            />
          </div>
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
