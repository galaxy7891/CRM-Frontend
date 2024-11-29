'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getDealById, deleteDeal } from '@/redux/actions/dealsActions';
import DeleteButton from '@/components/button/delete-button';
import EditUserButton from '@/components/button/edit-user-button';
import CustomerInfo from '@/components/import/card-info-customer';
import DashBoardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import StageBadge from '@/components/table/stage-badge';
import StatusBadge from '@/components/table/status-badge';
import EditDeals from '../partials/edit-deals';
import Loading from '@/components/status/loading';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import SuccessModal from '@/components/status/success-modal';

const DetailDeals = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditDeal, setIsEditDeal] = useState<boolean>(false);
  const [isDeleteDeal, setIsDeleteDeal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { deal } = useSelector((state: RootState) => state.deals);
  const handleEditDealsClick = () => {
    setIsEditDeal(true);
  };

  const handleCloseEditDeals = () => {
    setIsEditDeal(false);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteDeal(!isDeleteDeal);
  };

  const handleDeleteDeal = () => {
    setIsDeleteDeal(false);
    dispatch(deleteDeal(id, setIsSuccess));
  };

  useEffect(() => {
    if (id) {
      dispatch(getDealById(id)).then(() => setIsLoadingPage(false));
    }
  });
  return (
    <>
      <HeaderWithBackButton title="Detail Deals" />
      {isLoadingPage && deal?.id != id ? (
        <Loading />
      ) : (
        <div className="font-custom text-font-black dark:text-font-white">
          <DashBoardCard>
            <div className="flex justify-between items-center">
              <p className="text-lg md:text-[32px]">{deal?.name}</p>
              <div className="flex items-center gap-2">
                <EditUserButton onClick={handleEditDealsClick} />
                <DeleteButton onClick={handleDeleteConfirmation} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Bagian Kiri */}
              <div className="space-y-4">
                <p className="font-medium text-base md:text-2xl">
                  {deal?.value_estimated}
                </p>
                <div className="flex gap-x-4">
                  <StatusBadge status={deal!.status} />
                  <StageBadge status={deal!.stage} />
                </div>
                <div className="p-4 space-y-4 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  <CustomerInfo
                    label="Durasi Pembayaran"
                    value={deal?.payment_category}
                  />
                  <CustomerInfo
                    label="Tanggal Penutupan"
                    value={deal?.close_date || '-'}
                  />
                  <CustomerInfo
                    label="Tanggal Perkiraan Penutupan"
                    value={deal?.expected_close_date || '-'}
                  />
                </div>
              </div>
              {/* Bagian Kanan */}
              <div>
                <p className="text-sm md:text-2xl font-medium">Data Deals</p>
                <div className="p-4 space-y-4 md:space-y-0 bg-light-white dark:bg-dark-darkGray rounded-[10px] md:grid md:grid-cols-2">
                  <div className="space-y-4">
                    <CustomerInfo
                      label="Kategori Pembeli"
                      value={deal?.category}
                    />
                    {deal?.category === 'customers_companies' && (
                      <CustomerInfo
                        label="Nama Perusahaan"
                        value={deal?.customers_company_id}
                      />
                    )}

                    {deal?.category === 'customers' && (
                      <CustomerInfo
                        label="Nama Pelanggan"
                        value={deal?.customer_id}
                      />
                    )}

                    <CustomerInfo label="Nama Produk" value={deal?.name} />

                    <CustomerInfo
                      label="Jumlah Produk"
                      value={deal?.quantity || '-'}
                    />
                  </div>
                  <div className="space-y-4">
                    <CustomerInfo
                      label="Harga Produk"
                      value={deal?.value_estimated}
                    />
                    <CustomerInfo label="Tag" value={deal?.tag} />
                    <CustomerInfo
                      label="Penanggung Jawab"
                      value={deal?.owner}
                    />
                    <CustomerInfo label="Deskripsi" value={deal?.description} />
                  </div>
                </div>
              </div>
            </div>
          </DashBoardCard>
          {isEditDeal && (
            <EditDeals onClose={handleCloseEditDeals} dealProp={deal!} />
          )}
          {isDeleteDeal && (
            <ActionConfirmModal
              header="Apakah ingin menghapus deal?"
              description="Data yang sudah terhapus tidak akan dapat dikembalikan"
              actionButtonNegative_action={handleDeleteConfirmation}
              actionButtonPositive_name="Hapus"
              actionButtonPositive_action={handleDeleteDeal}
            />
          )}
          {isSuccess == 'DeleteSuccess' && (
            <SuccessModal
              header="Berhasil"
              description="Data deals berhasil dihapus"
              actionButton={true}
              actionButton_name="Kembali ke Halaman Deals"
              actionButton_href="/deals"
            />
          )}
        </div>
      )}
    </>
  );
};

export default DetailDeals;
