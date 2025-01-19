import React, { useState } from 'react';
import { inviteEmployeeDataTypes } from '@/types/employeeTypes';
import { InviteEmployeeProps } from '@/types/employeeTypes';
import { inviteUser } from '@/redux/actions/employeesActions';
import { useAppDispatch } from '@/hook/redux';
import InviteComponents from './invite-image';
import InviteSuccess from './invite-success';
import EmailInput from '@/components/form-input/email-input';
import SelectInput from '@/components/form-input/dropdown-input';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';
import SidebarFooter from '@/components/layout/sidebar-footer';
import EmployeeButton from '@/components/button/dashboard-sidebar-employee-button';

const InviteUser: React.FC<InviteEmployeeProps> = ({ onClose }) => {
  const [employeeData, setEmployeeData] = useState<inviteEmployeeDataTypes>({
    email: '',
    role: '',
    job_position: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const dispatch = useAppDispatch();

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      inviteUser(employeeData, setIsLoading, setIsSuccess, setErrorMessage)
    );
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Undang Pengguna">
      {isSuccess ? (
        <InviteSuccess onClose={onClose} />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center flex-grow  overflow-y-auto mb-6">
            <InviteComponents
              imageSrc="/images/icons/employee/invite.svg"
              title="Masukkan Data"
            />

            <p className="text-center  font-custom p-4 text-sm text-font-black dark:text-font-white md:text-base">
              Masukan Data Pengguna yang akan diajak kolaborasi
            </p>
            <div className="px-8 w-full">
              <EmailInput
                label="Email"
                placeholder="user@gmail.com"
                value={employeeData.email}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, email: e.target.value })
                }
                required
              />
              {errorMessage.email && <FailText>{errorMessage.email}</FailText>}
            </div>
            <div className="px-8 w-full mt-2">
              <SelectInput
                label="Akses"
                value={employeeData.role}
                options={[
                  { value: '-', label: 'Pilih Akses', hidden: true },
                  { value: 'Admin', label: 'Admin' },
                  { value: 'Karyawan', label: 'Karyawan' },
                ]}
                onChange={(e) =>
                  setEmployeeData({ ...employeeData, role: e.target.value })
                }
                required
              />
              {errorMessage.role && <FailText>{errorMessage.role}</FailText>}
            </div>
            <div className="px-8 w-full mt-2">
              <SelectInput
                label="Jabatan"
                value={employeeData.job_position}
                options={[
                  { value: '-', label: 'Pilih Jabatan', hidden: true },
                  { value: 'Presiden', label: 'Presiden' },
                  { value: 'C-Level', label: 'C-Level' },
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Sales', label: 'Sales' },
                  { value: 'Lainnya', label: 'Lainnya' },
                ]}
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    job_position: e.target.value,
                  })
                }
                required
              />
              {errorMessage.job_position && (
                <FailText>{errorMessage.job_position}</FailText>
              )}
            </div>
          </div>
          <SidebarFooter>
            <EmployeeButton onClick={handleInvite}>
              {isLoading ? 'Mengirim...' : 'Kirim'}
            </EmployeeButton>
          </SidebarFooter>
        </>
      )}
    </SidebarModal>
  );
};

export default InviteUser;
