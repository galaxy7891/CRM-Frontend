"use client"

import DeleteButton from "@/components/button/delete-button";
import EditUserButton from "@/components/button/edit-user-button";
import CustomerInfo from "@/components/import/card-info-customer";
import DashBoardCard from "@/components/layout/dashboard-card";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import StageBadge from "@/components/table/stage-badge";
import StatusBadge from "@/components/table/status-badge";
import React, { useState } from "react";
import EditDeals from "../partials/edit-deals";

const DetailDeals = () => {
  const [isEditDeals, setIsEditDeals] = useState<boolean>(false);

  const handleEditDealsClick = () => {
    setIsEditDeals(true);
  };

  const handleCloseEditDeals = () => {
    setIsEditDeals(false);
  };
  return (
    <>
      <HeaderWithBackButton title="Detail Deals" />
      <div className="font-custom text-font-black dark:text-font-white">
        <DashBoardCard>
          <div className="flex justify-between items-center">
            <p className="text-lg md:text-[32px]">Penjualan Kripik</p>
            <div className="flex items-center gap-2">
              <EditUserButton onClick={handleEditDealsClick} />
              <DeleteButton />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Bagian Kiri */}
            <div className="space-y-4">
              <p className="font-medium text-base md:text-2xl">Rp 1000</p>
              <div className="flex gap-x-4">
                <StatusBadge status="tinggi" />
                <StageBadge status="Proposal" />
              </div>
              <div className="p-4 space-y-4 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                <CustomerInfo label="Durasi Pembayaran" value="4 hari" />
                <CustomerInfo label="Tanggal Penutupan" value="10/09/2024" />
                <CustomerInfo
                  label="Tanggal Perkiraan Penutupan"
                  value="10/09/2024"
                />
              </div>
            </div>
            {/* Bagian Kanan */}
            <div>
              <p className="text-sm md:text-2xl font-medium">Data Deals</p>
              <div className="p-4 space-y-4 md:space-y-0 bg-light-white dark:bg-dark-darkGray rounded-[10px] md:grid md:grid-cols-2">
                <div className="space-y-4">
                  <CustomerInfo label="Nama Pelanggan" value="Rizky" />
                  <CustomerInfo label="Nama Produk" value="Roti" />
                  <CustomerInfo label="Harga Produk" value="Rp 1000" />
                  <CustomerInfo label="Jumlah Produk" value="12 pcs" />
                </div>
                <div className="space-y-4">
                  <CustomerInfo label="Tag" value="Roti" />
                  <CustomerInfo
                    label="Penanggung Jawab"
                    value="Hernan Pemalang"
                  />
                  <CustomerInfo label="Deskripsi" value="Ketua kita" />
                </div>
              </div>
            </div>
          </div>
        </DashBoardCard>
        {isEditDeals && <EditDeals onClose={handleCloseEditDeals} />}
      </div>
    </>
  );
};

export default DetailDeals;
