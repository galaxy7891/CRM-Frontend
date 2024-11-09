'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contactsTypes } from '@/types/contactsTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getContacts,
  getContactById,
  deleteContact,
} from '@/redux/actions/contactsActions';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import StatusBadge from '@/components/table/status-badge';
import EditContact from './partials/edit-contact';
import TableHeader from '@/components/table/table-head';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';

const ContactsPage = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [perPage, setPerPage] = useState<string>('10');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isEditContact, setIsEditContact] = useState<boolean>(false);
  const [isDeleteContact, setIsDeleteContact] = useState<boolean>(false);
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
    'Nama',
    'Email',
    'Perusahaan',
    'No Telpon',
    'Status',
    'Penanggung Jawab',
  ];
  const dispatch = useDispatch<AppDispatch>();
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const { contact } = useSelector((state: RootState) => state.contacts);

  const handleEdit = async (id: string) => {
    await dispatch(getContactById(id));
    setIsEditContact(true);
  };

  const handleCloseEdit = () => {
    setIsEditContact(false);
  };

  const handleDeleteContact = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteContact(selectedIds, setIsSuccess));
    } else if (selectedId) {
      dispatch(deleteContact(selectedId, setIsSuccess));
    }
    setIsDeleteContact(false);
  };

  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteContact(true);
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
        getContacts(
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
        getContacts(
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
      getContacts(
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
    isEditContact,
    pagination.current_page,
  ]);

  return (
    <DashboardCard>
      <div className="lg:items-center mb-4 grid grid-cols-12">
        {/* Search Bar */}
        <div className="col-span-12 md:col-span-4 relative"></div>

        <div className="col-span-12 md:col-span-8 flex justify-end gap-2 pt-2 md:pt-0">
          {/* Trash Icon, Export, and Filter Buttons */}
          {/* Delete Button */}
          <DeleteButton onClick={() => handleDeleteConfirmation(selectedIds)} />

          <ExportButton onClick={() => handleExport(contacts)} />

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
              {contacts.map((contact: contactsTypes, index: number) => (
                <tr
                  key={index}
                  className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group "
                >
                  <td className="border px-2 min-w-[80px] border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`checkbox-${contact.id}`}
                        checked={selectedIds.includes(contact.id)}
                        onChange={() => handleCheckboxChange(contact.id)}
                      />
                      <EditTableButton onClick={() => handleEdit(contact.id)} />
                      <button
                        onClick={() => handleDeleteConfirmation(contact.id)}
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
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base w-full">
                    <Link
                      href={`/contacts/${contact.id}`}
                      className="truncate max-w-[200px] block"
                    >
                      {contact.first_name} {contact.last_name}
                    </Link>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base w-full">
                    <div className="truncate max-w-[200px] block">
                      {contact.email || '-'}
                    </div>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base w-full">
                    <div className="truncate max-w-[200px] block">
                      {contact.customers_company?.name || '-'}
                    </div>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    {contact.phone || '-'}
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    {contact.owner || '-'}
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
        {isEditContact && (
          <EditContact onClose={handleCloseEdit} contactProps={contact!} />
        )}
        {isDeleteContact && (
          <ActionConfirmModal
            header="Apakah ingin menghapus kontak?"
            description="Data yang sudah terhapus tidak akan dapat dikembalikan"
            actionButtonNegative_action={() => setIsDeleteContact(false)}
            actionButtonPositive_name="Hapus"
            actionButtonPositive_action={handleDeleteContact}
          />
        )}
        {isSuccess && (
          <SuccessModal
            header="Berhasil"
            description="Data kontak berhasil dihapus"
            actionButton={true}
            actionButton_name="Kembali"
            actionButton_action={() => setIsSuccess(false)}
          />
        )}
      </>
    </DashboardCard>
  );
};

export default ContactsPage;
