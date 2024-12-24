import React, { useState, useEffect } from 'react';
import { dealsDataTypes } from '@/types/dealsTypes';
import { paginationTypes } from '@/types/otherTypes';
import {
  getDeals,
  getDealsForExport,
  getDealById,
  deleteDeal,
} from '@/redux/actions/dealsActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import EmptyTable from '@/components/table/empty-table';
import TableHeader from '@/components/table/table-header';
import Checkbox from '@/components/button/checkbox';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import StageBadge from '@/components/table/stage-badge';
import StatusBadge from '@/components/table/status-badge';
import TableRow from '@/components/table/table-row';
import TableDataAction from '@/components/table/table-data-actions';
import TableDataLink from '@/components/table/table-data-link';
import TableDataLong from '@/components/table/table-data-long';
import TableDataShort from '@/components/table/table-data-short';
import DeleteButton from '@/components/button/delete-button';
import DeleteTableButton from '@/components/button/delete-table-button';
import SuccessModal from '@/components/status/success-modal';
import ErrorModal from '@/components/status/error-modal';
import EditDeals from './edit-deals';
import PaginationButton from '@/components/button/pagination-button';
import Loading from '@/components/status/loading';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DealsTableView = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [buyerTypeBy, setBuyerTypeBy] = useState<string>('semua');
  const [statusBy, setStatusBy] = useState<string>('semua');
  const [perPage, setPerPage] = useState<string>('10');
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isTriggerFetch, setIsTriggerFetch] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string>('');
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false);
  const [isDeleteDeal, setIsDeleteDeal] = useState<boolean>(false);
  const [isEditDeals, setIsEditDeals] = useState<boolean>(false);
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
    'Nama Deals',
    'Jenis Pembeli',
    'Nama Pelanggan',
    'Tanggal Penutupan',
    'Nama Produk',
    'Tahapan',
    'Perkiraan Nilai',
    'Nilai Aktual',
    'Harga Produk',
    'Status',
    'Penangung Jawab',
  ];
  const { deals } = useSelector((state: RootState) => state.deals);
  const { deal } = useSelector((state: RootState) => state.deals);
  const handleEdit = async (id: string) => {
    await dispatch(getDealById(id));
    setIsEditDeals(true);
  };

  const handleCloseEdit = () => {
    setIsEditDeals(false);
  };

  const handleDeleteDeal = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteDeal(selectedIds, setIsSuccess));
    } else if (selectedId) {
      dispatch(deleteDeal(selectedId, setIsSuccess));
    }
    setIsDeleteDeal(false);
  };

  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteDeal(true);
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
        getDeals(
          sortBy,
          buyerTypeBy,
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
        getDeals(
          sortBy,
          buyerTypeBy,
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
      const fetchedData = await dispatch(getDealsForExport());

      // Make sure the data is available
      if (fetchedData && Array.isArray(fetchedData)) {
        handleExport(fetchedData);
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

      dispatch(
        getDeals(sortBy, buyerTypeBy, statusBy, perPage, 1, setPagination)
      ).then(() => {
        setIsLoadingPage(false);
        setIsTriggerFetch(false);
      });
    }
  }, [dispatch, sortBy, buyerTypeBy, statusBy, perPage, isTriggerFetch]);

  useEffect(() => {
    if (sortBy || statusBy || perPage) {
      setIsTriggerFetch(true);
    }
  }, [sortBy, buyerTypeBy, statusBy, isSuccess, perPage]);

  return (
    <>
      {isLoadingPage ? (
        <Loading />
      ) : (
        <>
          {' '}
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
                    if (selectedIds.length > 0) {
                      handleDeleteConfirmation(selectedIds);
                    } else {
                      setIsDeleteError(true);
                    }
                  }}
                />
                <ExportButton onClick={() => handleExportData()} />

                <FilterTableButton
                  setSortBy={setSortBy}
                  setBuyerTypeBy={setBuyerTypeBy}
                  setStatusBy={setStatusBy}
                  setPerPage={setPerPage}
                />
              </div>
            </div>
            <>
              {deals.length === 0 ? (
                <EmptyTable />
              ) : (
                <>
                  {/* Table */}
                  <div className="relative  overflow-auto lg:w-full ">
                    <TableHeader headers={headers}>
                      {deals.map((deal: dealsDataTypes, index: number) => (
                        <TableRow key={index} index={index}>
                          <TableDataAction>
                            <Checkbox
                              id={`checkbox-${deal.id}`}
                              checked={selectedIds.includes(deal.id)}
                              onChange={() => handleCheckboxChange(deal.id)}
                            />
                            <EditTableButton
                              onClick={() => handleEdit(deal.id)}
                            />
                            <DeleteTableButton
                              onClick={() => handleDeleteConfirmation(deal.id)}
                            />
                          </TableDataAction>
                          <TableDataLink href={`/deals/${deal.id}`}>
                            {deal.name}
                          </TableDataLink>
                          <TableDataShort>{deal.category}</TableDataShort>
                          <TableDataLong>
                            {deal.customer_name
                              ? deal.customer_name
                              : deal.customers_company_name}
                          </TableDataLong>
                          <TableDataShort>
                            {' '}
                            {moment(deal.expected_close_date).format(
                              'DD MMMM YYYY'
                            )}
                          </TableDataShort>
                          <TableDataShort>{deal.product?.name}</TableDataShort>
                          <TableDataShort>
                            <StageBadge status={deal.stage} />
                          </TableDataShort>
                          <TableDataLong>{deal.value_estimated}</TableDataLong>
                          <TableDataLong>
                            {deal.value_actual || '-'}
                          </TableDataLong>
                          <TableDataLong>{deal.product?.price}</TableDataLong>
                          <TableDataShort>
                            <StatusBadge status={deal.status} />
                          </TableDataShort>
                          <TableDataLong>{deal.owner || '-'}</TableDataLong>
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
                  {isEditDeals && (
                    <EditDeals onClose={handleCloseEdit} dealProp={deal!} />
                  )}
                  {isDeleteDeal && (
                    <ActionConfirmModal
                      header="Apakah ingin menghapus deal?"
                      description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                      actionButtonNegative_action={() => setIsDeleteDeal(false)}
                      actionButtonPositive_name="Hapus"
                      actionButtonPositive_action={handleDeleteDeal}
                    />
                  )}
                  {isSuccess && (
                    <SuccessModal
                      header="Berhasil"
                      description="Data deal berhasil dihapus"
                      actionButton={true}
                      actionButton_name="Kembali"
                      actionButton_action={() => setIsSuccess('')}
                    />
                  )}
                </>
              )}
              {isDeleteError && (
                <ErrorModal
                  header="Pilih data sebelum menghapus!"
                  description="Silahkan pilih minimal satu data untuk bisa dihapus"
                  actionButton={true}
                  actionButton_name="Kembali"
                  actionButton_action={() => setIsDeleteError(false)}
                />
              )}
            </>
          </DashboardCard>
        </>
      )}
    </>
  );
};

export default DealsTableView;
