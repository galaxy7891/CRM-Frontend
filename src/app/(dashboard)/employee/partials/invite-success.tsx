import React from 'react';
import { InviteEmployeeProps } from '@/types/employeeTypes';
import InviteComponents from './invite-image';
import SidebarFooter from '@/components/layout/sidebar-footer';
import EmployeeButton from '@/components/button/dashboard-sidebar-employee-button';

const InviteSuccess: React.FC<InviteEmployeeProps> = ({ onClose }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center flex-grow">
        <InviteComponents
          imageSrc="/images/icons/table/impor-success.png"
          title="Email Terkirim"
        />
        <div>
          <p className="block md:hidden text-center font-custom mt-2 text-sm text-font-black dark:text-font-white md:text-base">
            Email telah terkirim, silakan tunggu <br />
            respon dari user
          </p>

          <p className="hidden md:block text-center mt-2 font-custom  text-sm text-font-black dark:text-font-white md:text-base">
            Email telah terkirim, silakan tunggu respon dari user
          </p>
        </div>
      </div>
      <SidebarFooter>
        <EmployeeButton onClick={onClose}>Selesai</EmployeeButton>
      </SidebarFooter>
    </>
  );
};

export default InviteSuccess;
