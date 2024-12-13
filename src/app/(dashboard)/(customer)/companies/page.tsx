'use client';

import React, { useState, useEffect } from 'react';
import { companiesTypes } from '@/types/companiesTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getCompanies,
  getCompaniesForExport,
  getCompanyById,
  deleteCompany,
} from '@/redux/actions/companiesActions';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import StatusBadge from '@/components/table/status-badge';
import DeleteTableButton from '@/components/button/delete-table-button';
import EditCompany from './partials/edit-company';
import TableHeader from '@/components/table/table-header';
import TableRow from '@/components/table/table-row';
import TableDataAction from '@/components/table/table-data-actions';
import TableDataLink from '@/components/table/table-data-link';
import TableDataLong from '@/components/table/table-data-long';
import TableDataShort from '@/components/table/table-data-short';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';
import EmptyTable from '@/components/table/empty-table';
import Loading from '@/components/status/loading';

const CompanyPage = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('semua');
  const [perPage, setPerPage] = useState<string>('10');
  const [isTriggerFetch, setIsTriggerFetch] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
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

  const handleExportData = async () => {
    try {
      // Call redux and gettin data to variable
      const fetchedData = await dispatch(getCompaniesForExport());

      // Make sure the data is available
      if (fetchedData && Array.isArray(fetchedData)) {
        handleExport(fetchedData);
      } else {
        alert('error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isTriggerFetch) {
      setPagination((prev) => ({
        ...prev,
        current_page: 1,
      }));

      dispatch(getCompanies(sortBy, statusBy, perPage, 1, setPagination)).then(
        () => {
          setIsLoadingPage(false);
          setIsTriggerFetch(false);
        }
      );
    }
  }, [dispatch, sortBy, statusBy, perPage, isTriggerFetch]);

  useEffect(() => {
    if (sortBy || statusBy || perPage) {
      setIsTriggerFetch(true);
    }
  }, [sortBy, statusBy, perPage, isSuccess]);

  return (
    <>
      {' '}
      {isLoadingPage ? (
        <Loading />
      ) : (
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
                onClick={() => handleDeleteConfirmation(selectedIds)}
              />
              <ExportButton onClick={() => handleExportData()} />

              <FilterTableButton
                setSortBy={setSortBy}
                setStatusBy={setStatusBy}
                setPerPage={setPerPage}
              />
            </div>
          </div>
          {companies.length === 0 ? (
            <EmptyTable />
          ) : (
            <>
              {' '}
              {/* Table */}
              <div className="relative  overflow-auto lg:w-full ">
                <TableHeader headers={headers}>
                  {companies.map((company: companiesTypes, index: number) => (
                    <TableRow key={index} index={index}>
                      <TableDataAction>
                        <Checkbox
                          id={`checkbox-${company.id}`}
                          checked={selectedIds.includes(company.id)}
                          onChange={() => handleCheckboxChange(company.id)}
                        />
                        <EditTableButton
                          onClick={() => handleEdit(company.id)}
                        />
                        <DeleteTableButton
                          onClick={() => handleDeleteConfirmation(company.id)}
                        />
                      </TableDataAction>
                      <TableDataLink href={`/companies/${company.id}`}>
                        {company.name}
                      </TableDataLink>
                      <TableDataLong>{company.email || '-'}</TableDataLong>
                      <TableDataLong>{company.industry || '-'}</TableDataLong>
                      <TableDataShort>
                        <StatusBadge status={company.status || '-'} />
                      </TableDataShort>
                      <TableDataLong> {company.owner || '-'}</TableDataLong>
                    </TableRow>
                  ))}
                </TableHeader>
              </div>
              <PaginationButton
                last_page={pagination.last_page}
                current_page={pagination.current_page}
                prev_page_url={pagination.prev_page_url}
                next_page_url={pagination.next_page_url}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                perPage={pagination.per_page}
              />
              {isEditCompany && (
                <EditCompany
                  onClose={handleCloseEdit}
                  companyProps={company!}
                />
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
            </>
          )}
        </DashboardCard>
      )}
    </>
  );
};

export default CompanyPage;
