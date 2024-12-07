"use client";

import ExportButton from "@/components/button/export-button";
import FilterTableButton from "@/components/button/filter-table-button";
import DashboardCard from "@/components/layout/dashboard-card";
import Loading from "@/components/status/loading";
import EmptyTable from "@/components/table/empty-table";
import TableDataLong from "@/components/table/table-data-long";
import TableHeader from "@/components/table/table-head";
import TableRow from "@/components/table/table-row";
import React, { useState } from "react";
import company from "./data.json";
import TableDataAction from "@/components/table/table-data-actions";
import EditTableButton from "@/components/button/edit-table-button";
import EditCustomer from "./partials/edit-customer";

const Customer = () => {
  const [isEditCustomer, setIsEditCustomer] = useState<boolean>(false);
  const headers = [
    "",
    "Tipe",
    "Batas Langganan",
    "Nama Perusahaan",
    "Email Perusahaan",
    "No Telepon Perusahaan ",
  ];
  const handleEdit = () => {
    setIsEditCustomer(true);
  };

  const handleCloseEdit = () => {
    setIsEditCustomer(false);
  };
  return (
    <>
      {/* {isLoadingPage ? (
        <Loading />
      ) : ( */}
      <h1></h1>
      <DashboardCard>
        <div className="col-span-12 md:col-span-8 flex justify-end gap-2 mb-4 pt-2 md:pt-0">
          <ExportButton />

          <FilterTableButton
          // setSortBy={setSortBy}
          // setStatusBy={setStatusBy}
          // setPerPage={setPerPage}
          />
        </div>
        <>
          {/* {length === 0 ? (
            <EmptyTable />
          ) : ( */}
          <>
            {/* Table */}
            <div className="relative  overflow-auto lg:w-full ">
              <TableHeader headers={headers}>
                {company.map((company) => (
                  <tr key={company.id}>
                    <TableDataAction>
                      <EditTableButton onClick={() => handleEdit()} />
                    </TableDataAction>
                    <TableDataLong>{company.tipe}</TableDataLong>
                    <TableDataLong>{company.batasLangganan}</TableDataLong>
                    <TableDataLong>{company.namaPerusahaan}</TableDataLong>
                    <TableDataLong>{company.emailPerusahaan}</TableDataLong>
                    <TableDataLong>
                      {company.nomorTeleponPerusahaan}
                    </TableDataLong>
                  </tr>
                ))}
              </TableHeader>
            </div>
            {isEditCustomer && <EditCustomer onClose={handleCloseEdit} />}
            {/* <PaginationButton
                  last_page={pagination.last_page}
                  current_page={pagination.current_page}
                  prev_page_url={pagination.prev_page_url}
                  next_page_url={pagination.next_page_url}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                /> */}
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
          {/* )} */}
        </>
      </DashboardCard>
      {/* )} */}
    </>
  );
};

export default Customer;