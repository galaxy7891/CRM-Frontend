'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { productsTypes } from '@/types/productTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getProducts,
  getProductById,
  deleteProduct,
} from '@/redux/actions/productsActions';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import EditProduct from './partials/edit-product';
import TableHeader from '@/components/table/table-head';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';
import DeleteTableButton from '@/components/button/delete-table-button';
import ExportButton from '@/components/button/export-button';
import NewProduct from './partials/new-product';
// import EmptyTable from '@/components/table/empty-table';

const Product = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [perPage, setPerPage] = useState<string>('10');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
  const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState<boolean>(false);
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
  const headers = [
    'Nama Produk',
    'Kode Produk',
    'Kategori Produk',
    'Jumlah Produk',
    'Harga Produk',
  ];
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0, // delete decimal
      minimumFractionDigits: 0,
    }).format(num);
  };
  
  const dispatch = useDispatch<AppDispatch>();
  const { product } = useSelector((state: RootState) => state.products);
  const { products } = useSelector((state: RootState) => state.products);
  console.log('Product data:', products);

  const handleEdit = async (id: string) => {
    await dispatch(getProductById(id));
    setIsEditProduct(true);
  };

  const handleCloseEdit = () => {
    setIsEditProduct(false);
  };

  const handleAddDataClick = () => {
    setIsAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setIsAddProduct(false);
  };

  const handleDeleteProduct = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteProduct(selectedIds, setIsSuccess));
    } else if (selectedId) {
      dispatch(deleteProduct(selectedId, setIsSuccess));
    }
    setIsDeleteProduct(false);
  };

  const handleDeleteConfirmation = (id: string | string[]) => {
    if (Array.isArray(id)) {
      setSelectedIds(id);
    } else {
      setSelectedId(id);
    }
    setIsDeleteProduct(true);
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
        getProducts(sortBy, perPage, pagination.current_page - 1, setPagination)
      );
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(
        getProducts(sortBy, perPage, pagination.current_page + 1, setPagination)
      );
    }
  };

  useEffect(() => {
    dispatch(
      getProducts(sortBy, perPage, pagination.current_page, setPagination)
    );
  }, [
    dispatch,
    sortBy,
    perPage,
    isSuccess,
    isAddProduct,
    isEditProduct,
    pagination.current_page,
  ]);

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="text-font-black dark:text-font-white text-base font-custom md:text-[32px]">
          Data Produk
        </p>

        <div className="flex items- center gap-2">
          <a
            href="/product/import"
            className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
          >
            Impor Data
          </a>

          <button
            onClick={handleAddDataClick}
            className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
          >
            Tambah Data
          </button>
        </div>
      </div>
      <div>
        <DashboardCard>
          {/* Search Input */}
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
                placeholder="Cari Product"
                className="pl-10 p-2 border-2 font-custom text-xs lg:text-base border-font-gray bg-light-white rounded-[10px] focus:outline-none  dark:bg-dark-darkGray w-full"
              /> */}
            </div>

            <div className="col-span-12 md:col-span-8 flex justify-end gap-2 pt-2 md:pt-0">
              <DeleteButton
                onClick={() => handleDeleteConfirmation(selectedIds)}
              />
              <ExportButton onClick={() => handleExport(products)} />
              <FilterTableButton
                setSortBy={setSortBy}
                setPerPage={setPerPage}
              />
            </div>
          </div>
          <>
            {/* Table */}
            <div className="relative  overflow-auto lg:w-full ">
              <table className="w-full mb-4">
                <TableHeader headers={headers} />
                <tbody>
                  {products.map((product: productsTypes, index: number) => (
                    <tr
                      key={index}
                      className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                    >
                      <td className="border px-2 min-w-[80px] border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`checkbox-${product.id}`}
                            checked={selectedIds.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                          />
                          <EditTableButton
                            onClick={() => handleEdit(product.id)}
                          />
                          <DeleteTableButton
                            onClick={() => handleDeleteConfirmation(product.id)}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base ">
                        <Link href={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                        {product.code}
                      </td>
                      <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                        {product.category}
                      </td>
                      <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                        {product.quantity}
                      </td>
                      <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                        {formatRupiah(Number(product.price))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationButton
              last_page={pagination.last_page}
              current_page={pagination.current_page}
              prev_page_url={pagination.prev_page_url}
              next_page_url={pagination.next_page_url}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
            {isEditProduct && (
              <EditProduct onClose={handleCloseEdit} productProps={product!} />
            )}
            {isAddProduct && <NewProduct onClose={handleCloseAddProduct} />}
            {isDeleteProduct && (
              <ActionConfirmModal
                header="Apakah ingin menghapus Produk?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={() => setIsDeleteProduct(false)}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteProduct}
              />
            )}
            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data Produk berhasil dihapus"
                actionButton={true}
                actionButton_name="Kembali"
                actionButton_action={() => setIsSuccess(false)}
              />
            )}
          </>
        </DashboardCard>
      </div>
    </>
  );
};

export default Product;
