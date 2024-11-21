import QualificationInsideCard from "@/components/layout/qualification-inside-card";
import QualificationOutsideCard from "@/components/layout/qualification-outside-card";
import StatusBadge from "@/components/table/status-badge";
import React from "react";
import Image from "next/image";
import QualificationEdit from "./qualification-edit";

const QualificationCard = () => {
  return (
    <div>
      <QualificationOutsideCard>
        {/* (stage) */}
        <p className="font-custom text-font-black dark:text-font-white font-bold text-2xl">
          Kualifikasi
        </p>
        <div className="mt-1 flex justify-between items-center font-bold font-custom text-font-black dark:text-font-white">
          {/* (total value_estimated) */}
          <p className="text-xs">Rp 1.000.000</p>
          <p className="text-xs">Total Data</p>
        </div>
        <QualificationInsideCard>
          <div className="font-custom text-font-black dark:text-font-white space-y-1">
            <div className="flex items-center justify-between">
              {/* (name) */}
              <p className="text-base font-bold">Penjualan Kripik </p>
              <QualificationEdit />
            </div>
            <p className="text-xs font-medium">
              Deadline :{/* (expected_close_date) */}
              <span className="text-xs font-bold">11/11/11</span>
            </p>
            {/* (value_estimated) */}
            <p className="text-base font-bold">Rp 10000 </p>
            <p className="text-xs font-medium">Nama Pelanggan</p>
            {/* (customer_name) */}
            <p className="text-base font-bold">Tejo Wijaya </p>
            <p className="text-xs font-medium">Nama Produk</p>
            <p className="text-base font-bold">Keripik Kaca</p>
            <p className="text-xs font-medium">Jumlah Produk</p>
            <p className="text-base font-bold">12 pcs</p>
            <div>
              <div className="flex items-center gap-x-2">
                <StatusBadge status="rendah" />
                <Image
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={"/images/default.jpg"}
                  alt="User dropdown"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </QualificationInsideCard>
        <QualificationInsideCard>
          <div className="font-custom text-font-black dark:text-font-white space-y-1">
            <div className="flex items-center justify-between">
              {/* (name) */}
              <p className="text-base font-bold">Penjualan Kripik </p>
              <QualificationEdit />
            </div>
            <p className="text-xs font-medium">
              Deadline :{/* (expected_close_date) */}
              <span className="text-xs font-bold">11/11/11</span>
            </p>
            {/* (value_estimated) */}
            <p className="text-base font-bold">Rp 10000 </p>
            <p className="text-xs font-medium">Nama Pelanggan</p>
            {/* (customer_name) */}
            <p className="text-base font-bold">Tejo Wijaya </p>
            <p className="text-xs font-medium">Nama Produk</p>
            <p className="text-base font-bold">Keripik Kaca</p>
            <p className="text-xs font-medium">Jumlah Produk</p>
            <p className="text-base font-bold">12 pcs</p>
            <div>
              <div className="flex items-center gap-x-2">
                <StatusBadge status="rendah" />
                <Image
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={"/images/default.jpg"}
                  alt="User dropdown"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </QualificationInsideCard>
      </QualificationOutsideCard>
    </div>
  );
};

export default QualificationCard;
