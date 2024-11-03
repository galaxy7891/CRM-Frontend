import React from "react";
import InviteComponents from "./invite-components";
import SidebarFooter from "@/components/layout/sidebar-footer";
import EmployeeButton from "@/components/button/dashboard-sidebar-employee-button";

const InviteEmployeeSucces = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center flex-grow">
        <InviteComponents
          imageSrc="/icons/table/impor-success.png"
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
        <EmployeeButton>Selesai</EmployeeButton>
      </SidebarFooter>
    </>
  );
};

export default InviteEmployeeSucces;
