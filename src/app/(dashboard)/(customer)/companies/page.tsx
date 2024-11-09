'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { companiesTypes } from '@/types/companiesTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getCompanies,
  getCompanyById,
  deleteCompany,
} from '@/redux/actions/companiesActions';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import StatusBadge from '@/components/table/status-badge';
import EditCompany from './partials/edit-company';
import TableHeader from '@/components/table/table-head';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';

const CompanyPage = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [perPage, setPerPage] = useState<string>('10');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isEditCompany, setIsEditCompany] = useState<boolean>(false);
  const [isDeleteCompany, setIsDeleteCompany] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState<paginationTypes>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 25,
    next_page_url: null,
    prev_page_url: null,
  });

  const headers = [
    'Nama Perusahaan',
    'Email',
    'Jenis Industri',
    'Status',
    'Penanggung Jawab',
  ];
  const dispatch = useDispatch<AppDispatch>();
  const { companies } = useSelector((state: RootState) => state.companies);
  const { company } = useSelector((state: RootState) => state.companies);
  console.log(companies, 'companies');
  const handleEdit = async (id: string) => {
    await dispatch(getCompanyById(id));
    setIsEditCompany(true);
  };
  const handleCloseEdit = () => {
    setIsEditCompany(false);
  };

  const handleDeleteCompany = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteCompany(selectedIds, setIsSuccess));
    } else if (selectedId) {
      dispatch(deleteCompany(selectedId, setIsSuccess));
    }
    setIsDeleteCompany(false);
  };

  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteCompany(true);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(
        getCompanies(
          sortBy,
          statusBy,
          perPage,
          pagination.current_page - 1,
          setPagination
        )
      );
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(
        getCompanies(
          sortBy,
          statusBy,
          perPage,
          pagination.current_page + 1,
          setPagination
        )
      );
    }
  };

  useEffect(() => {
    dispatch(
      getCompanies(
        sortBy,
        statusBy,
        perPage,
        pagination.current_page,
        setPagination
      )
    );
  }, [
    dispatch,
    sortBy,
    statusBy,
    perPage,
    isSuccess,
    isDeleteCompany,
    pagination.current_page,
  ]);

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
          <DeleteButton onClick={() => handleDeleteConfirmation(selectedIds)} />
          <ExportButton onClick={() => handleExport(companies)} />

          <FilterTableButton
            setSortBy={setSortBy}
            setStatusBy={setStatusBy}
            setPerPage={setPerPage}
          />
        </div>
      </div>
      {/* Table */}
      <div className="relative  overflow-auto lg:w-full ">
        <table className="w-full mb-4">
          <TableHeader headers={headers} />
          <tbody>
            {companies.map((company: companiesTypes, index: number) => (
              <tr
                key={index}
                className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
              >
                <td className="border px-2 min-w-[80px] border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`checkbox-${company.id}`}
                      checked={selectedIds.includes(company.id)}
                      onChange={() => handleCheckboxChange(company.id)}
                    />
                    <EditTableButton onClick={() => handleEdit(company.id)} />
                    <button
                      onClick={() => handleDeleteConfirmation(company.id)}
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
                <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base w-full ">
                  <Link
                    href={`/companies/${company.id}`}
                    className="truncate max-w-[200px] block"
                  >
                    {company.name}
                  </Link>
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base w-full">
                  <div className="truncate max-w-[200px] block">
                    {company.email || '-'}
                  </div>
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                  {company.industry}
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                  <StatusBadge status={company.status} />
                </td>
                <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                  {company.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationButton
        last_page={pagination.last_page}
        current_page={pagination.current_page}
        prev_page_url={pagination.prev_page_url}
        next_page_url={pagination.next_page_url}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      {isEditCompany && (
        <EditCompany onClose={handleCloseEdit} companyProps={company!} />
      )}
      {isDeleteCompany && (
        <ActionConfirmModal
          header="Apakah ingin menghapus perusahaan?"
          description="Data yang sudah terhapus tidak akan dapat dikembalikan"
          actionButtonNegative_action={() => setIsDeleteCompany(false)}
          actionButtonPositive_name="Hapus"
          actionButtonPositive_action={handleDeleteCompany}
        />
      )}
      {isSuccess && (
        <SuccessModal
          header="Berhasil"
          description="Data perusahaan berhasil dihapus"
          actionButton={true}
          actionButton_name="Kembali"
          actionButton_action={() => setIsSuccess(false)}
        />
      )}
    </DashboardCard>
  );
};

export default CompanyPage;