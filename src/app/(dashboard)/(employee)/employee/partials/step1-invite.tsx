import React from "react";
import InviteComponents from "./invite-components";
import SidebarFooter from "@/components/layout/sidebar-footer";
import EmployeeButton from "@/components/button/dashboard-sidebar-employee-button";

const Step1Invite = () => {
  return (
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
            onChange={handleChange}
          />
        </div>
      </div>
      <SidebarFooter>
        <EmployeeButton>Kirim</EmployeeButton>
      </SidebarFooter>
    </>
  );
};

export default Step1Invite;
