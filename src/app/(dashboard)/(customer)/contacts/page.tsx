'use client';

import { useState, useEffect } from 'react';
import StatusBadge from '@/components/table/status-badge';
// import Table from "@/components/table/table";
import TableHeader from '@/components/table/table-head';
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import EditContact from './partials/edit-contact';
import EmptyTable from '@/components/table/empty-table';
import DashboardCard from '@/components/layout/dashboard-card';
import ButtonFilter from '@/components/button/filter-table-button';
import useTheme from '@/components/dark-mode';
import handleExport from '@/utils/export_CSV';
import EditTableButton from '@/components/button/edit-table-button';

interface contactsData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  organization_id: string;
  phone: string;
  status: string;
  owner: string;
}

interface contactData {
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

const ContactsPage = () => {
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [perPage, setPerPage] = useState<string>('10');
  const [isEditLead, setEditContact] = useState<boolean>(false);
  const [contactsData, setContactsData] = useState<contactsData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [contactDataProps, setContactDataProps] = useState<contactData>(
    {} as contactData
  );
  const headers = [
    'Nama',
    'Email',
    'Perusahaan',
    'No Telpon',
    'Status',
    'Penanggung Jawab',
  ];
  let getContactData: contactData | null = null;

  const handleEdit = async (id: string) => {
    await getContactDataById(id);
    setContactDataProps(getContactData!);
    setEditContact(true);
  };

  const handleCloseEdit = () => {
    setEditContact(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        // If the ID is already selected, remove it
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        // Otherwise, add it
        return [...prevSelectedIds, id];
      }
    });
  };

  const deleteContact = async (ids: string | string[]) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      });

      if (response.data.success) {
        getContactsData();
      }
    } catch (error) {
      console.error('Error deleting lead(s):', error);
    }
  };

  const getContactDataById = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        getContactData = response.data.data;
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const getContactsData = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setContactsData(response.data.data.data);
      }
    } catch (error) {
      console.error('Error fetching contacs data:', error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, [sortBy, statusBy, perPage]); // Only run once when the component mounts
  return (
    <DashboardCard>
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
          <button
            onClick={() => deleteContact(selectedIds)}
            className="hover:shadow-[0_4px_8px_rgba(255,202,202,0.5)] transition-shadow duration-200"
          >
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

          <button
            onClick={() => handleExport(contactsData)}
            className="p-[6px] lg:p-[10px] rounded-[10px] font-medium text-xs md:text-base border border-dark-gold text-dark-gold duration-200 hover:shadow-md hover:shadow-dark-gold"
          >
            Ekspor Data
          </button>

          <ButtonFilter
            setSortBy={setSortBy}
            setStatusBy={setStatusBy}
            setPerPage={setPerPage}
          />
        </div>
      </div>
      {contactsData.length == 0 ? (
        <EmptyTable />
      ) : (
        <>
          {' '}
          {/* Table */}
          <div className="relative h-screen overflow-auto np lg:w-full ">
            <table className="w-full">
              <TableHeader headers={headers} />
              <tbody>
                {contactsData.map((contact, index) => (
                  <tr
                    key={index}
                    className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                  >
                    <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                      <div className="flex items-center space-x-1">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={selectedIds.includes(contact.id)} // Check if the ID is in the selectedIds state
                          onChange={() => handleCheckboxChange(contact.id)} // Call the handler
                          className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
                        />
                        <EditTableButton
                          onClick={() => handleEdit(contact.id)}
                        />
                        <button>
                          <Image
                            src="/icons/table/dustbin.svg"
                            alt="deletebtn"
                            width={16}
                            height={16}
                            className="w-5 h-5"
                            onClick={() => deleteContact(contact.id)}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base">
                      {contact.first_name} {contact.last_name}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {contact.email}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {contact.organization_id}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {contact.phone}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {contact.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditLead && (
            <EditContact
              onClose={handleCloseEdit}
              contactData={contactDataProps}
            />
          )}
        </>
      )}
    </DashboardCard>
  );
};

export default ContactsPage;
