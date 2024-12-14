'use client';
import { useParams } from 'next/navigation';
import CardDetailProduct from '@/app/(dashboard)/product/partials/card-detail-product';
import EditUserButton from '@/components/button/edit-user-button';
import CustomerInfo from '@/components/import/card-info-customer';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getProductById, deleteProduct } from '@/redux/actions/productsActions';
import EditProduct from '../partials/edit-product';
import DashboardCard from '@/components/layout/dashboard-card';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import ProductLog from './partials/product-log';
import FailModal from '@/components/status/fail-modal';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import Loading from '@/components/status/loading';

const DetailProduct = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDeleteFail, setIsDeleteFail] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { product } = useSelector((state: RootState) => state.products);

  const handleEdit = async (id: string) => {
    await dispatch(getProductById(id));
    setIsEditProduct(true);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteProduct(!isDeleteProduct);
  };

  const handleCloseEdit = () => {
    setIsEditProduct(false);
  };

  const handleDeleteProduct = () => {
    setIsDeleteProduct(false);
    dispatch(deleteProduct(id, setIsSuccess, setIsDeleteFail));
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id)).then(() => setIsLoadingPage(false));
    }
  }, [dispatch, id, isEditProduct]);

  return (
    <>
      <HeaderWithBackButton title="Detail Produk" />
      {isLoadingPage && product?.id != id ? (
        <Loading />
      ) : (
        <>
          {' '}
          <DashboardCard>
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-4 flex justify-center items-center ">
                <CardDetailProduct />
              </div>
              <div className="col-span-12 lg:col-start-5 lg:col-span-8">
                <div className="flex items-center mt-2 justify-between">
                  <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium">
                    Data Produk
                  </p>
                  <div className="flex items-center space-x-2">
                    {product && (
                      <EditUserButton onClick={() => handleEdit(product.id)} />
                    )}
                    <DeleteButton onClick={handleDeleteConfirmation} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  <CustomerInfo label="Kode Produk" value={product?.code} />
                  <CustomerInfo
                    label="Kategori Produk"
                    value={product?.category}
                  />
                  <CustomerInfo
                    label="Jumlah Produk"
                    value={
                      product?.quantity && product?.unit
                        ? `${product.quantity} ${product.unit}`
                        : '-'
                    }
                  />
                  <CustomerInfo
                    label="Deskripsi"
                    value={product?.description}
                  />
                </div>
              </div>
            </div>
            {isDeleteProduct && (
              <ActionConfirmModal
                header="Apakah ingin menghapus produk?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={handleDeleteConfirmation}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteProduct}
              />
            )}
            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data produk berhasil dihapus"
                actionButton={true}
                actionButton_name="Kembali ke Halaman Produk"
                actionButton_href="/product"
              />
            )}
            {isEditProduct && (
              <EditProduct onClose={handleCloseEdit} productProps={product!} />
            )}
            {isDeleteFail && (
              <FailModal
                description="Beberapa data gagal dihapus, terdapat deals yang sedang berlangsung"
                closeModal={true}
                actionButton={false}
                actionButton_href=""
                actionButton_name=""
              />
            )}
          </DashboardCard>
          <ProductLog />
        </>
      )}
    </>
  );
};

export default DetailProduct;
