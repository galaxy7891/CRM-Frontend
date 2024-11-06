import React from 'react';
import { useState } from 'react';
import { InviteEmployeeProps } from '@/types/employeeTypes';
import InviteComponents from './invite-image';
import { inviteUser } from '@/redux/actions/employeeActions';
import { useAppDispatch } from '@/hook/redux';
import InviteSuccess from './invite-success';
import SidebarModal from '@/components/layout/sidebar-modal';
import FailText from '@/components/status/fail-text';
import SidebarFooter from '@/components/layout/sidebar-footer';
import EmployeeButton from '@/components/button/dashboard-sidebar-employee-button';

const InviteUser: React.FC<InviteEmployeeProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const dispatch = useAppDispatch();

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(inviteUser(email, setIsLoading, setIsSuccess, setErrorMessage));
  };

  return (
    <SidebarModal onClose={onClose} SidebarModalTitle="Undang Pengguna">
      {isSuccess ? (
        <InviteSuccess onClose={onClose} />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center flex-grow">
            <InviteComponents
              imageSrc="/icons/employee/invite.svg"
              title="Masukkan Email"
            />
            <p className="block md:hidden font-custom mt-2 p-4 text-sm text-font-black dark:text-font-white md:text-base text-center">
              Masukkan email pengguna yang akan diajak <br />
              kolaborasi
            </p>
            <p className="text-center hidden md:block font-custom mt-2 p-4 text-sm text-font-black dark:text-font-white md:text-base">
              Masukkan email pengguna yang akan diajak kolaborasi
            </p>
            <div className="px-8 w-full">
              <input
                type="text"
                className="w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                placeholder="user@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage.email && <FailText>{errorMessage.email}</FailText>}
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
