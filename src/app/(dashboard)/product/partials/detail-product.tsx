import CardDetailProduct from "@/app/(dashboard)/product/partials/card-detail-product";
import EditUserButton from "@/components/button/edit-user-button";
import CustomerInfo from "@/components/import/card-info-customer";
import Image from "next/image";
import React, { useState } from "react";
import EditProduct from "./edit-product";

const DetailProduct = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };
  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 flex justify-center items-center ">
          <CardDetailProduct />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div className="flex mt-2 justify-between">
            <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium">
              Data Produk
            </p>
            <div className="space-x-2">
              <EditUserButton onClick={handleEditClick} />
              <button className="hover:shadow-[0_4px_8px_rgba(255,202,202,0.5)] transition-shadow duration-200">
                <Image
                  src={"/icons/table/trash.svg"}
                  alt="deletebtn"
                  width={32}
                  height={32}
                  className="w-[18px] h-[18px] md:w-8 md:h-8"
                />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
            <CustomerInfo label="Kode Produk" value="halo" />
            <CustomerInfo label="Kategori Produk" value="halo" />
            <CustomerInfo label="Jumlah Produk" value="halo" />
            <CustomerInfo label="Deskripsi" value="halo" />
          </div>
        </div>
      </div>
      {isEditing && <EditProduct onClose={handleCloseForm}/>}
    </div>
  );
};

export default DetailProduct;
