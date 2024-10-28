'use client';

import { useState, useEffect } from 'react';
import StatusBadge from '@/components/table/status-badge';
// import Table from "@/components/table/table";
import TableHeader from '@/components/table/table-head';
import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import ButtonFilter from '@/components/button/button-filter';
import useTheme from '@/components/dark-mode';
import EditLeads from './partials/edit-leads';
import EmptyTable from '@/components/table/empty-table';

interface leadsData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  owner: string;
}

interface leadData {
  id: string;
  first_name: string;
  last_name: string;
  customerCategory: string;
  job: string;
  description: string;
  status: string;
  birthdate: null;
  email: string;
  phone: string;
  owner: string;
  address: string;
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}

const Leads = () => {
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [isEditLead, setIsEditLead] = useState<boolean>(false);
  const [leadsData, setLeadsData] = useState<leadsData[]>([]);
  const [leadDataProps, setLeadDataProps] = useState<leadData>({} as leadData);
  const headers = ['Nama', 'Email', 'No Telpon', 'Status', 'Penanggung Jawab'];
  let getLeadData: leadData | null = null;

  const handleEdit = async (id: string) => {
    await getLeadDataById(id);
    setLeadDataProps(getLeadData!);
    setIsEditLead(true);
  };

  const handleCloseEdit = () => {
    setIsEditLead(false);
  };

  const deleteLead = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        getLeadsData();
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getLeadDataById = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        getLeadData = response.data.data;
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getLeadsData = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads?sort=${sortBy}&status=${statusBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setLeadsData(response.data.data.data);
        console.log(response.data.data.data);
      }
    } catch (error) {
      console.error('Error fetching leads data:', error);
    }
  };

  useEffect(() => {
    getLeadsData();
  }, [sortBy, statusBy]); // Only run once when the component mounts
  return (
    <>
      {/* Search Input */}
      {leadsData.length == 0 ? (
        <EmptyTable />
      ) : (
        <>
          <div className="lg:items-center mb-4 grid grid-cols-12">
            {/* Search Bar */}
            <div className="col-span-12 md:col-span-4 relative">
              {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3">
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
                className="pl-10 p-2 border-2 font-custom text-xs lg:text-base border-font-gray bg-light-white rounded-[10px] focus:outline-none  dark:bg-dark-darkGray w-full"
              /> */}
            </div>

            <div className="col-span-12 md:col-span-8 flex justify-end gap-2 pt-2 md:pt-0">
              {/* Trash Icon, Export, and Filter Buttons */}
              {/* Delete Button */}
              <button className="hover:shadow-[0_4px_8px_rgba(255,202,202,0.5)] transition-shadow duration-200">
                <Image
                  src={
                    isDarkMode
                      ? '/icons/table/dustbin-dark.svg'
                      : '/icons/table/trash.svg'
                  }
                  alt="deletebtn"
                  width={44}
                  height={44}
                  className="w-7 h-7 lg:w-[44px] lg:h-[44px]"
                />
              </button>

              <button className="p-[6px] lg:p-[10px] rounded-[10px] font-medium text-xs md:text-base border border-dark-gold text-dark-gold duration-200 hover:shadow-md hover:shadow-dark-gold">
                Ekspor Data
              </button>

              <ButtonFilter setSortBy={setSortBy} setStatusBy={setStatusBy} />
            </div>
          </div>

          {/* Table */}
          <div className="relative h-screen overflow-auto  lg:w-full ">
            <table className="w-full ">
              <TableHeader headers={headers} />
              <tbody>
                {leadsData.map((lead, index) => (
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
                            onClick={() => handleEdit(lead.id)}
                          />
                        </button>

                        <button>
                          <Image
                            src="/icons/table/dustbin.svg"
                            alt="deletebtn"
                            width={16}
                            height={16}
                            className="w-5 h-5"
                            onClick={() => deleteLead(lead.id)}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base">
                      {lead.first_name} {lead.last_name}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {lead.email}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {lead.phone}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {lead.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditLead && (
            <EditLeads onClose={handleCloseEdit} leadData={leadDataProps} />
          )}
        </>
      )}
    </>
  );
};

export default Leads;
