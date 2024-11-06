'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { organizationsTypes } from '@/types/leads';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  getOrganizations,
  getOrganizationsById,
  deleteOrganization,
} from '@/redux/actions/organizations';
import handleExport from '@/utils/export_CSV';
import EditCompany from './partials/edit-company';
import DeleteButton from '@/components/button/delete-button';
import StatusBadge from '@/components/table/status-badge';
import TableHeader from '@/components/table/table-head';
import ButtonFilter from '@/components/button/button-filter';

const CompanyPage = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [perPage, setPerPage] = useState<string>('10');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditCompany, setIsEditCompany] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { organizations } = useSelector(
    (state: RootState) => state.organizations
  );
  const { organization } = useSelector(
    (state: RootState) => state.organizations
  );

  const headers = [
    'Nama Perusahaan',
    'Email',
    'Jenis Industri',
    'Status',
    'Penanggung Jawab',
  ];

  const handleEditCompany = async (id: string) => {
    await dispatch(getOrganizationsById(id));
    setIsEditCompany(true);
  };
  const handleCloseEdit = () => {
    setIsEditCompany(false);
  };

  const handleDeleteOrganization = (id: string | string[]) => {
    dispatch(deleteOrganization(id));
    dispatch(getOrganizations(sortBy, statusBy, perPage));
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

  useEffect(() => {
    dispatch(getOrganizations(sortBy, statusBy, perPage));
  }, [dispatch, sortBy, statusBy, perPage]);

  return (
    <div>
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
          <DeleteButton onClick={() => handleDeleteOrganization(selectedIds)} />

          <button
            onClick={() => {
              handleExport(organizations);
            }}
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
      {/* Table */}
      <div className="relative h-[320px] overflow-auto w-full lg:w-full">
        <table className="w-full">
          <TableHeader headers={headers} />
          <tbody>
            {organizations.map(
              (organization: organizationsTypes, index: number) => (
                <tr
                  key={index}
                  className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                >
                  <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-0 left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                    <div className="flex items-center space-x-1">
                      <input
                        id={`checkbox-${organization.id}`} // Unique ID for each checkbox
                        type="checkbox"
                        checked={selectedIds.includes(organization.id)} // Check if the ID is in the selectedIds state
                        onChange={() => handleCheckboxChange(organization.id)} // Call the handler
                        className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
                      />
                      <button
                        onClick={() => handleEditCompany(organization.id)}
                      >
                        <Image
                          src="/icons/table/editbrown.svg"
                          alt="editbtn"
                          width={16}
                          height={16}
                          className="w-5 h-5"
                        />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteOrganization(organization.id)
                        }
                      >
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
                  <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base">
                    {organization.name}
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    {organization.email}
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    {organization.industry}
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    <StatusBadge status={organization.status} />
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    {organization.owner}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {isEditCompany && (
        <EditCompany
          onClose={handleCloseEdit}
          organizationProps={organization!}
        />
      )}
    </div>
  );
};

export default CompanyPage;
