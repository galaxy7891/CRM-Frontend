'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import EditImageProduct from './edit-photo-product';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getProductById } from '@/redux/actions/productsActions';

const CardDetailProduct = () => {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { product } = useSelector((state: RootState) => state.products);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleEditImageClick = () => {
    setIsEditingImage(true);
  };

  const handleCloseForm = () => {
    setIsEditingImage(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="relative cursor-pointer" onClick={handleEditImageClick}>
        <Image
          src={product?.image_url || '/images/default-product.svg'} // use default picture if image_url is null
          alt="image"
          width={160}
          height={160}
          className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
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
      <p className="text-black mt-2 dark:text-font-white text-lg font-medium font-custom md:text-2xl">
        {product?.name}
      </p>
      <p className="text-black mt-4 dark:text-font-white font-custom text-xs md:text-[28px]">
        {formatRupiah(Number(product?.price))}
      </p>
      {isEditingImage && product && (
        <EditImageProduct
          onClose={handleCloseForm}
          data={product}
          id={product.id}
        />
      )}
    </div>
  );
};

export default CardDetailProduct;
