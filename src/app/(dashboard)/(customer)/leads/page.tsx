"use client";

import { useState } from "react";
import StatusBadge from "@/components/table/status-badge";
// import Table from "@/components/table/table";
import TableHeader from "@/components/table/table-head";
import React from "react";
import Data from "./data.json";
import Image from "next/image";
import ButtonFilter from "@/components/button/button-filter";
import useTheme from "@/components/dark-mode";

const Leads = () => {
  const [userData] = useState<
    {
      Nama: string;
      Email: string;
      NoTelpon: string;
      Status: string;
      PenanggungJawab: string;
    }[]
  >(Data);
  const { isDarkMode } = useTheme();

  const headers = ["Nama", "Email", "No Telpon", "Status", "Penanggung Jawab"];

  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-auto mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Image
              src="/icons/table/search.svg"
              alt="search icon"
              width={20}
              height={20}
              className="w-[12px] h-[12px] lg:w-[20px] lg:h-[20px]"
            />
          </div>
          <input
            type="text"
            placeholder="Cari Leads"
            className="pl-10 p-2 border-2 font-custom text-xs lg:text-base border-font-gray bg-light-white rounded-[10px] focus:outline-none w-full dark:bg-dark-darkGray"
          />
        </div>

        {/* Trash Icon, Export, and Filter Buttons */}
        <div className="flex items-center space-x-2 ml-auto lg:self-start">
          <button className="hover:shadow-[0_4px_8px_rgba(255,202,202,0.5)] transition-shadow duration-200">
            <Image
              src={
                isDarkMode
                  ? "/icons/table/dustbin-dark.svg"
                  : "/icons/table/trash.svg"
              }
              alt="deletebtn"
              width={44}
              height={44}
              className="w-6 h-6 lg:w-[44px] lg:h-[44px]"
            />
          </button>
          <button className="p-[6px] lg:p-[10px]  rounded-[10px] font-medium text-xs lg:text-base border border-dark-gold text-dark-gold duration-200 hover:shadow-md hover:shadow-dark-gold">
            Ekspor Data
          </button>
          <ButtonFilter />
        </div>
      </div>

      <div className="relative h-[320px] overflow-auto">
        <table>
          <TableHeader headers={headers} />
          <tbody>
            {userData.map((item, index) => (
              <tr
                key={index}
                className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
              >
                <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                  <div className="flex items-center space-x-1">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
                    />
                    <button>
                      <Image
                        src="/icons/table/editbrown.svg"
                        alt="editbtn"
                        width={16}
                        height={16}
                        className="w-5 h-5"
                      />
                    </button>
                    <button>
                      <Image
                        src="/icons/table/dustbin.svg"
                        alt="deletebtn"
                        width={16}
                        height={16}
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs">
                  {item.Nama}
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs">
                  {item.Email}
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs">
                  {item.NoTelpon}
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs">
                  <StatusBadge status={item.Status} />
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs">
                  {item.PenanggungJawab}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
