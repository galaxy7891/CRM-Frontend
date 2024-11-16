'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { employeesTypes } from '@/types/employeeTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getEmployees,
  getEmployeeById,
  deleteEmployee,
} from '@/redux/actions/employeesActions';
import InviteEmployee from './partials/invite-employee';
import EditEmployee from './partials/edit-employee';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import TableHeader from '@/components/table/table-head';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';

const Employee = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [perPage, setPerPage] = useState<string>('10');
  const [isAddUser, setAddUser] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isEditEmployee, setIsEditEmployee] = useState<boolean>(false);
  const [isDeleteEmployee, setIsDeleteEmployee] = useState<boolean>(false);
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
  const dispatch = useDispatch<AppDispatch>();
  const headers = [
    'Nama Karyawan',
    'Akses',
    'Jabatan',
    'Email',
    'Nomor Telepon',
  ];
  const { employees } = useSelector((state: RootState) => state.employees);
  const { employee } = useSelector((state: RootState) => state.employees);

  const handleEdit = async (id: string) => {
    await dispatch(getEmployeeById(id));
    setIsEditEmployee(true);
  };

  const handleCloseEdit = () => {
    setIsEditEmployee(false);
  };
  const handleAddUser = () => {
    setAddUser(!isAddUser);
  };
  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteEmployee(true);
  };

  const handleDeleteEmployee = () => {
    setIsDeleteEmployee(false);
    if (selectedIds.length > 0) {
      dispatch(deleteEmployee(selectedIds, setIsSuccess));
    } else {
      dispatch(deleteEmployee(selectedId, setIsSuccess));
    }
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
        getEmployees(
          sortBy,
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
        getEmployees(
          sortBy,
          perPage,
          pagination.current_page + 1,
          setPagination
        )
      );
    }
  };

  useEffect(() => {
    dispatch(
      getEmployees(sortBy, perPage, pagination.current_page, setPagination)
    );
  }, [
    sortBy,
    perPage,
    pagination.current_page,
    isSuccess,
    dispatch,
    isEditEmployee,
    isDeleteEmployee,
  ]);
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <p className="text-font-black dark:text-font-white text-base font-custom md:text-[32px]">
          Data Karyawan
        </p>
        <button
          onClick={handleAddUser}
          className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
        >
          Undang Pengguna
        </button>
      </div>
      {/* Content */}
      <div>
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
              <DeleteButton
                onClick={() => {
                  handleDeleteConfirmation(selectedIds);
                }}
              />

              <ExportButton
                onClick={() => {
                  handleExport(employees);
                }}
              />

              <FilterTableButton
                setSortBy={setSortBy}
                setPerPage={setPerPage}
              />
            </div>
          </div>

          {/* Table */}
          <div className="relative  overflow-auto lg:w-full ">
            <table className="w-full mb-4">
              <TableHeader headers={headers} />
              <tbody>
                {employees.map((employee: employeesTypes, index: number) => (
                  <tr
                    key={index}
                    className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                  >
                    <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`checkbox-${employee.id}`}
                          checked={selectedIds.includes(employee.id)}
                          onChange={() => {
                            handleCheckboxChange(employee.id);
                          }}
                        />
                        <EditTableButton
                          onClick={() => {
                            handleEdit(employee.id);
                          }}
                        />
                        <button
                          onClick={() => handleDeleteConfirmation(employee.id)}
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
                    <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base ">
                      <Link href={`/employee/${employee.id}`}>
                        {employee.first_name} {employee.last_name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {employee.role || '-'}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {employee.job_position || '-'}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {employee.email || '-'}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {employee.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isAddUser && <InviteEmployee onClose={handleAddUser} />}
          <PaginationButton
            last_page={pagination.last_page}
            current_page={pagination.current_page}
            prev_page_url={pagination.prev_page_url}
            next_page_url={pagination.next_page_url}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
          {isEditEmployee && (
            <EditEmployee onClose={handleCloseEdit} employeeProps={employee!} />
          )}
          {isDeleteEmployee && (
            <ActionConfirmModal
              header="Apakah ingin menghapus karyawan ini?"
              description="Data yang sudah terhapus tidak akan dapat dikembalikan"
              actionButtonNegative_action={() => setIsDeleteEmployee(false)}
              actionButtonPositive_name="Hapus"
              actionButtonPositive_action={handleDeleteEmployee}
            />
          )}
          {isSuccess && (
            <SuccessModal
              header="Berhasil"
              description="Data karyawan berhasil dihapus"
              actionButton={true}
              actionButton_name="Kembali"
              actionButton_action={() => setIsSuccess(false)}
            />
          )}
        </DashboardCard>
      </div>
    </>
  );
};

export default Employee;
