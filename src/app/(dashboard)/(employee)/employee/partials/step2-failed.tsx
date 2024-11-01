import React from "react";
import InviteComponents from "./invite-components";
import SidebarFooter from "@/components/layout/sidebar-footer";
import EmployeeButton from "@/components/button/dashboard-sidebar-employee-button";

const Step2Failed = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center flex-grow">
        <InviteComponents
          imageSrc="/icons/table/impor-failed.png"
          title="Email Gagal Terkirim"
        />
        <div>
          <p className="block md:hidden text-center font-custom mt-2 text-sm text-font-black dark:text-font-white md:text-base">
            Ada kendala mengirim undangan, <br />
            periksa koneksi Internet atau alamat <br />
            email
          </p>

          <p className="hidden md:block text-center mt-2 font-custom  text-sm text-font-black dark:text-font-white md:text-base">
            Ada kendala mengirim undangan, periksa koneksi <br />
            Internet atau alamat email
          </p>
        </div>
      </div>
      <SidebarFooter>
        <EmployeeButton>Undang Ulang</EmployeeButton>
      </SidebarFooter>
    </>
  );
};

export default Step2Failed;
