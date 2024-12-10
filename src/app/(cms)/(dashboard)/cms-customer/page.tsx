'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getClients,
  getClientsForPrint,
} from '@/redux/actions/administratorActions';
import { clientTypes } from '@/types/administratorTypes';
import { paginationTypes } from '@/types/otherTypes';
import handleExport from '@/utils/export_CSV';
import EditCustomer from './partials/edit-customer';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import DashboardCard from '@/components/layout/dashboard-card';
import Loading from '@/components/status/loading';
import EmptyTable from '@/components/table/empty-table';
import PaginationButton from '@/components/button/pagination-button';
import TableDataLong from '@/components/table/table-data-long';
import TableDataShort from '@/components/table/table-data-short';
import TableHeader from '@/components/table/table-head';
import TableRow from '@/components/table/table-row';
import TableDataAction from '@/components/table/table-data-actions';
import EditTableButton from '@/components/button/edit-table-button';

const Customer = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [typeBy, setTypeBy] = useState<string>('semua');
  const [perPage, setPerPage] = useState<string>('10');
  const [printData, setPrintData] = useState<clientTypes[]>([]);
  const [isTriggerFetch, setIsTriggerFetch] = useState<boolean>(false);

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditCustomer, setIsEditCustomer] = useState<boolean>(false);
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
    '',
    'Tipe',
    'Batas Langganan',
    'Nama Perusahaan',
    'Email Perusahaan',
    'No Telepon Perusahaan ',
  ];
  const { clients } = useSelector((state: RootState) => state.administrator);

  const handleEdit = () => {
    setIsEditCustomer(true);
  };

  const handleCloseEdit = () => {
    setIsEditCustomer(false);
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(
        getClients(
          sortBy,
          typeBy,
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
        getClients(
          sortBy,
          typeBy,
          perPage,
          pagination.current_page + 1,
          setPagination
        )
      );
    }
  };

  useEffect(() => {
    if (isTriggerFetch) {
      setPagination((prev) => ({
        ...prev,
        current_page: 1,
      }));

      dispatch(getClients(sortBy, typeBy, perPage, 1, setPagination)).then(
        () => {
          setIsLoadingPage(false);
          setIsTriggerFetch(false);
        }
      );
    }
  }, [dispatch, sortBy, typeBy, perPage, isTriggerFetch]);

  useEffect(() => {
    if (sortBy || typeBy || perPage) {
      setIsTriggerFetch(true);
    }
  }, [sortBy, typeBy, perPage]);

  return (
    <>
      {isLoadingPage ? (
        <Loading />
      ) : (
        <DashboardCard>
          <div className="col-span-12 md:col-span-8 flex justify-end gap-2 mb-4 pt-2 md:pt-0">
            <ExportButton
              onClick={async () => {
                try {
                  // Panggil action Redux untuk mendapatkan data
                  const fetchedData = await dispatch(getClientsForPrint());

                  // Pastikan data tersedia sebelum ekspor
                  if (fetchedData && Array.isArray(fetchedData)) {
                    handleExport(fetchedData); // Langsung ekspor data
                  } else {
                    alert('Data tidak tersedia untuk diekspor.');
                  }
                } catch (error) {
                  console.error('Terjadi kesalahan saat ekspor:', error);
                  alert('Gagal mengekspor data.');
                }
              }}
            />

            <FilterTableButton
              setSortBy={setSortBy}
              setTypeBy={setTypeBy}
              setPerPage={setPerPage}
            />
          </div>
          <>
            {clients.length === 0 ? (
              <EmptyTable />
            ) : (
              <>
                {/* Table */}
                <div className="relative  overflow-auto lg:w-full ">
                  <TableHeader headers={headers}>
                    {clients.map((client: clientTypes, index: number) => (
                      <TableRow key={index} index={index}>
                        <TableDataAction>
                          <EditTableButton onClick={() => handleEdit()} />
                        </TableDataAction>
                        <TableDataShort>
                          {client.account_type || '-'}
                        </TableDataShort>
                        <TableDataLong>{client.end_date || '-'}</TableDataLong>
                        <TableDataLong>
                          {client.user_company.name || '-'}
                        </TableDataLong>
                        <TableDataLong>
                          {client.user_company.email || '-'}
                        </TableDataLong>
                        <TableDataLong>
                          {client.user_company.phone || '-'}
                        </TableDataLong>
                      </TableRow>
                    ))}
                  </TableHeader>
                </div>
                {isEditCustomer && <EditCustomer onClose={handleCloseEdit} />}
                <PaginationButton
                  last_page={pagination.last_page}
                  current_page={pagination.current_page}
                  prev_page_url={pagination.prev_page_url}
                  next_page_url={pagination.next_page_url}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                />
                {/* {isSuccess && (
                  <SuccessModal
                    header="Berhasil"
                    description="Tipe Berhasil dirubah"
                    actionButton={true}
                    actionButton_name="Kembali"
                    actionButton_action={() => setIsSuccess(false)}
                  />
                )} */}
              </>
            )}
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default Customer;
