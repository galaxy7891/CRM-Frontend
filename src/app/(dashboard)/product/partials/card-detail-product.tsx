"use client";

import Image from "next/image";
import React, { useState } from "react";
import EditImageProduct from "./edit-photo-produk";

const CardDetailProduct = ({}) => {
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleEditImageClick = () => {
    setIsEditingImage(true);
  };

  const handleCloseForm = () => {
    setIsEditingImage(false);
  };
  return (
    <div className="flex flex-col items-center relative">
      <div
        className="relative cursor-pointer"
        onClick={handleEditImageClick}
      >
        <Image
          src="/images/default.jpg"
          alt="image"
          width={160}
          height={160}
          className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px] "
        />
        <div className="absolute bottom-[-15px] right-[-1px]">
          <Image
            src="/icons/profile/camera.svg"
            alt="camera"
            width={24}
            height={24}
            className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
          />
        </div>
      </div>
      {/* Name */}
      <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-2xl">
        Nama
      </p>
      <p className="text-black mt-2 dark:text-font-white font-medium font-custom text-xs md:text-[28px]">
        Harga Barang
      </p>
      {isEditingImage && <EditImageProduct onClose={handleCloseForm}/>}
    </div>
  );
};

export default CardDetailProduct;
