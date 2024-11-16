'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { leadsTypes } from '@/types/leadsTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getLeads,
  getLeadById,
  deleteLead,
} from '@/redux/actions/leadsActions';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import StatusBadge from '@/components/table/status-badge';
import EditLeads from './partials/edit-leads';
import TableHeader from '@/components/table/table-head';
import DeleteButton from '@/components/button/delete-button';
import DeleteTableButton from '@/components/button/delete-table-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';
// import EmptyTable from '@/components/table/empty-table';

const LeadsPage = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [perPage, setPerPage] = useState<string>('10');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isEditLead, setIsEditLead] = useState<boolean>(false);
  const [isDeleteLead, setIsDeleteLead] = useState<boolean>(false);
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
  const headers = ['Nama', 'Email', 'No Telpon', 'Status', 'Penanggung Jawab'];
  const dispatch = useDispatch<AppDispatch>();
  const { leads } = useSelector((state: RootState) => state.leads);
  const { lead } = useSelector((state: RootState) => state.leads);
  const handleEdit = async (id: string) => {
    await dispatch(getLeadById(id));
    setIsEditLead(true);
  };

  const handleCloseEdit = () => {
    setIsEditLead(false);
  };

  const handleDeleteLead = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteLead(selectedIds, setIsSuccess));
    } else if (selectedId) {
      dispatch(deleteLead(selectedId, setIsSuccess));
    }
    setIsDeleteLead(false);
  };

  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteLead(true);
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
        getLeads(
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
        getLeads(
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
      getLeads(
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
    isEditLead,
    pagination.current_page,
  ]);

  return (
    <DashboardCard>
      {/* Search Input */}
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

          <ExportButton onClick={() => handleExport(leads)} />

          <FilterTableButton
            setSortBy={setSortBy}
            setStatusBy={setStatusBy}
            setPerPage={setPerPage}
          />
        </div>
      </div>
      <>
        {/* Table */}
        <div className="relative  overflow-auto lg:w-full ">
          <table className="w-full mb-4">
            <TableHeader headers={headers} />
            <tbody>
              {leads.map((lead: leadsTypes, index: number) => (
                <tr
                  key={index}
                  className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                >
                  <td className="border px-2 min-w-[80px] border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`checkbox-${lead.id}`}
                        checked={selectedIds.includes(lead.id)}
                        onChange={() => handleCheckboxChange(lead.id)}
                      />
                      <EditTableButton onClick={() => handleEdit(lead.id)} />
                      <DeleteTableButton
                        onClick={() => handleDeleteConfirmation(lead.id)}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base w-full ">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="truncate max-w-[200px] block"
                    >
                      {lead.first_name} {lead.last_name}
                    </Link>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base w-full">
                    <div className="truncate max-w-[200px] block">
                      {lead.email || '-'}
                    </div>
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
        <PaginationButton
          last_page={pagination.last_page}
          current_page={pagination.current_page}
          prev_page_url={pagination.prev_page_url}
          next_page_url={pagination.next_page_url}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
        {isEditLead && (
          <EditLeads onClose={handleCloseEdit} leadProps={lead!} />
        )}
        {isDeleteLead && (
          <ActionConfirmModal
            header="Apakah ingin menghapus leads?"
            description="Data yang sudah terhapus tidak akan dapat dikembalikan"
            actionButtonNegative_action={() => setIsDeleteLead(false)}
            actionButtonPositive_name="Hapus"
            actionButtonPositive_action={handleDeleteLead}
          />
        )}
        {isSuccess && (
          <SuccessModal
            header="Berhasil"
            description="Data leads berhasil dihapus"
            actionButton={true}
            actionButton_name="Kembali"
            actionButton_action={() => setIsSuccess(false)}
          />
        )}
      </>
    </DashboardCard>
  );
};

export default LeadsPage;
