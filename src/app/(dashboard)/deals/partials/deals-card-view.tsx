'use client';

import React, { useState, useEffect } from 'react';
import {
  getDealsNegotiation,
  getDealsProposal,
  getDealsQualification,
  getDealsWon,
  getDealsLose,
  getDealById,
  getDealsValue,
  getDealsForExport,
  updateDealStage,
  deleteDeal,
} from '@/redux/actions/dealsActions';
import { paginationTypes } from '@/types/otherTypes';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import StageCards from './stage-cards';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import NewDeals from './new-deals';
import FilterTableButton from '@/components/button/filter-table-button';
import PaginationButton from '@/components/button/pagination-button';
import ExportButton from '@/components/button/export-button';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import SuccessModal from '@/components/status/success-modal';
import Loading from '@/components/status/loading';
import EditDeals from './edit-deals';

const DealsCardView = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [buyerTypeBy, setBuyerTypeBy] = useState<string>('semua');
  const [statusBy, setStatusBy] = useState<string>('semua');
  const [perPage, setPerPage] = useState<string>('10');
  const [isLoadingPage, setIsloadingPage] = useState<boolean>(true);
  const [isAddDeals, setIsAddDeals] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string>('');
  const [isDeleteDeal, setIsDeleteDeal] = useState<boolean>(false);
  const [isEditDeals, setIsEditDeals] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [owner, setOwner] = useState<string | null>(null);
  const [pagination, setPagination] = useState<paginationTypes>({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 25,
    next_page_url: null,
    prev_page_url: null,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { dealsNegotiation } = useSelector((state: RootState) => state.deals);
  const { dealsProposal } = useSelector((state: RootState) => state.deals);
  const { dealsQualification } = useSelector((state: RootState) => state.deals);
  const { dealsWon } = useSelector((state: RootState) => state.deals);
  const { dealsLose } = useSelector((state: RootState) => state.deals);
  const { deal } = useSelector((state: RootState) => state.deals);
  const { dealsValue } = useSelector((state: RootState) => state.deals);

  const handleEdit = async (id: string) => {
    await dispatch(getDealById(id));
    setIsEditDeals(true);
  };

  const handleCloseEdit = () => {
    setIsEditDeals(false);
  };

  const handleEditStageDeal = async (id: string, stageChangeValue: string) => {
    await dispatch(updateDealStage(id, stageChangeValue, setIsSuccess));
  };

  const handleCloseAddDeals = () => {
    setIsAddDeals(false);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteDeal(true);
  };

  const handleDeleteDeal = () => {
    setIsDeleteDeal(false);
    dispatch(deleteDeal(selectedId, setIsSuccess));
  };

  const handlePrevPage = () => {
    if (pagination.prev_page_url) {
      dispatch(
        getDealsQualification(
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
        getDealsQualification(
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

  const stages = [
    {
      title: 'Kualifikasi',
      dealsProps: dealsQualification,
      dealsValue: dealsValue?.qualification,
    },
    {
      title: 'Proposal',
      dealsProps: dealsProposal,
      dealsValue: dealsValue?.proposal,
    },
    {
      title: 'Negosiasi',
      dealsProps: dealsNegotiation,
      dealsValue: dealsValue?.negotiation,
    },
    {
      title: 'Tercapai',
      dealsProps: dealsWon,
      dealsValue: dealsValue?.won,
    },
    {
      title: 'Gagal',
      dealsProps: dealsLose,
      dealsValue: dealsValue?.lose,
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOwner(localStorage.getItem('email'));
    }
    dispatch(getDealsValue());
    dispatch(
      getDealsQualification(
        sortBy,
        buyerTypeBy,
        statusBy,
        perPage,
        pagination.current_page + 1,
        setPagination
      )
    ).then(() => {
      setIsloadingPage(false);
    });
    dispatch(
      getDealsProposal(
        sortBy,
        buyerTypeBy,
        statusBy,
        perPage,
        pagination.current_page + 1,
        setPagination
      )
    );
    dispatch(
      getDealsNegotiation(
        sortBy,
        buyerTypeBy,
        statusBy,
        perPage,
        pagination.current_page + 1,
        setPagination
      )
    );
    dispatch(
      getDealsWon(
        sortBy,
        buyerTypeBy,
        statusBy,
        perPage,
        pagination.current_page + 1,
        setPagination
      )
    );
    dispatch(
      getDealsLose(
        sortBy,
        buyerTypeBy,
        statusBy,
        perPage,
        pagination.current_page + 1,
        setPagination
      )
    );
  }, [
    dispatch,
    isSuccess,
    sortBy,
    buyerTypeBy,
    pagination.current_page,
    statusBy,
    perPage,
  ]);
  return (
    <>
      <div className="flex-grow overflow-y-auto ">
        <div className="flex h-full">
          {isLoadingPage &&
          dealsNegotiation &&
          dealsProposal &&
          dealsQualification &&
          dealsWon &&
          dealsLose ? (
            <Loading />
          ) : (
            <>
              <DashboardCard>
                <div className="lg:items-center mb-4 grid grid-cols-12 ">
                  {/* Search Bar */}
                  <div className="col-span-12 md:col-span-4 relative"></div>

                  <div className="col-span-12 md:col-span-8 flex justify-end gap-2 pt-2 md:pt-0">
                    <ExportButton onClick={() => handleExportData()} />
                    <FilterTableButton
                      setSortBy={setSortBy}
                      setBuyerTypeBy={setBuyerTypeBy}
                      setStatusBy={setStatusBy}
                      setPerPage={setPerPage}
                    />
                  </div>
                </div>
                <div className="h-full overflow-y-auto mb-3">
                  <div className="grid grid-flow-col gap-4">
                    {stages.map((stage, index) => (
                      <StageCards
                        key={index}
                        title={stage.title}
                        dealsProps={stage.dealsProps}
                        dealsValue={stage.dealsValue || '0'}
                        total={pagination.total}
                        handleDeleteConfirmation={handleDeleteConfirmation}
                        handleEdit={handleEdit}
                        handleEditStageDeal={handleEditStageDeal}
                        setSelectedId={setSelectedId}
                      />
                    ))}
                  </div>
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
                {isAddDeals && (
                  <NewDeals onClose={handleCloseAddDeals} owner={owner!} />
                )}

                {isDeleteDeal && (
                  <ActionConfirmModal
                    header="Apakah ingin menghapus deals?"
                    description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                    actionButtonNegative_action={() => setIsDeleteDeal(false)}
                    actionButtonPositive_name="Hapus"
                    actionButtonPositive_action={handleDeleteDeal}
                  />
                )}
                {isSuccess == 'DeleteSuccess' && (
                  <SuccessModal
                    header="Berhasil"
                    description="Data deals berhasil dihapus"
                    actionButton={true}
                    actionButton_name="Kembali"
                    actionButton_action={() => setIsSuccess('')}
                  />
                )}
                {isSuccess == 'StageUpdateSuccess' && (
                  <SuccessModal
                    header="Berhasil"
                    description="Stage deals berhasil diperbarui"
                    actionButton={true}
                    actionButton_name="Kembali"
                    actionButton_action={() => setIsSuccess('')}
                  />
                )}
              </DashboardCard>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DealsCardView;
