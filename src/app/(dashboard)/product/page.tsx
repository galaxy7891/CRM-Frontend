'use client';

import React, { useState, useEffect } from 'react';
import { productsTypes } from '@/types/productTypes';
import { paginationTypes } from '@/types/otherTypes';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getProducts,
  getProductsForExport,
  getProductById,
  deleteProduct,
} from '@/redux/actions/productsActions';
import handleExport from '@/utils/export_CSV';
import DashboardCard from '@/components/layout/dashboard-card';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import ErrorModal from '@/components/status/error-modal';
import EditProduct from './partials/edit-product';
import TableHeader from '@/components/table/table-header';
import TableRow from '@/components/table/table-row';
import TableDataAction from '@/components/table/table-data-actions';
import TableDataLink from '@/components/table/table-data-link';
import TableDataShort from '@/components/table/table-data-short';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import PaginationButton from '@/components/button/pagination-button';
import FilterTableButton from '@/components/button/filter-table-button';
import EditTableButton from '@/components/button/edit-table-button';
import Checkbox from '@/components/button/checkbox';
import DeleteTableButton from '@/components/button/delete-table-button';
import ExportButton from '@/components/button/export-button';
import NewProduct from './partials/new-product';
import FailModal from '@/components/status/fail-modal';
import EmptyTable from '@/components/table/empty-table';
import Loading from '@/components/status/loading';
import SearchBar from '@/components/table/search-bar';

const Product = () => {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [perPage, setPerPage] = useState<string>('10');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isTriggerFetch, setIsTriggerFetch] = useState<boolean>(false);
  const [isDeleteError, setIsDeleteError] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditProduct, setIsEditProduct] = useState<boolean>(false);
  const [isAddProduct, setIsAddProduct] = useState<boolean>(false);
  const [isDeleteFail, setIsDeleteFail] = useState<boolean>(false);
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

  const handleEdit = async (id: string) => {
    await dispatch(getProductById(id));
    setIsEditProduct(true);
  };

  const handleCloseEdit = () => {
    setIsEditProduct(false);
  };

  const handleAddDataClick = () => {
    setIsAddProduct(!isAddProduct);
  };

  const handleDeleteProduct = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteProduct(selectedIds, setIsSuccess, setIsDeleteFail));
    } else if (selectedId) {
      dispatch(deleteProduct(selectedId, setIsSuccess, setIsDeleteFail));
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
        getProducts(
          sortBy,
          perPage,
          search,
          pagination.current_page - 1,
          setPagination
        )
      );
    }
  };

  const handleNextPage = () => {
    if (pagination.next_page_url) {
      dispatch(
        getProducts(
          sortBy,
          perPage,
          search,
          pagination.current_page + 1,
          setPagination
        )
      );
    }
  };

  const handleExportData = async () => {
    try {
      // Call redux and gettin data to variable
      const fetchedData = await dispatch(getProductsForExport());

      // Make sure the data is available
      if (fetchedData && Array.isArray(fetchedData)) {
        handleExport(fetchedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isTriggerFetch) {
      setPagination((prev) => ({
        ...prev,
        current_page: 1,
      }));

      dispatch(getProducts(sortBy, perPage, search, 1, setPagination)).then(
        () => {
          setIsLoadingPage(false);
          setIsTriggerFetch(false);
        }
      );
    }
    console.log(search);
  }, [dispatch, sortBy, perPage, search, isTriggerFetch]);

  useEffect(() => {
    if (sortBy || perPage) {
      setIsTriggerFetch(true);
    }
  }, [sortBy, perPage, search, isSuccess]);

  return (
    <>
      <div className="flex justify-between items-center mb-4 lg:mb-8">
        <p className="text-font-black dark:text-font-white text-base font-custom md:text-[32px]">
          Data Produk
        </p>

        <div className="flex items-center gap-2">
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
        {isLoadingPage ? (
          <Loading />
        ) : (
          <DashboardCard>
            {/* Search Input */}
            <div className="lg:items-center mb-4 grid grid-cols-12">
              {/* Search Bar */}
              <div className="col-span-12 md:col-span-4 relative">
                <SearchBar onChange={(e) => setSearch(e.target.value)} />
              </div>

              <div className="col-span-12 md:col-span-8 flex justify-end gap-2 pt-2 md:pt-0">
                <DeleteButton
                  onClick={() => {
                    if (selectedIds.length > 0) {
                      handleDeleteConfirmation(selectedIds);
                    } else {
                      setIsDeleteError(true);
                    }
                  }}
                />
                <ExportButton onClick={() => handleExportData()} />
                <FilterTableButton
                  setSortBy={setSortBy}
                  setPerPage={setPerPage}
                />
              </div>
            </div>
            <>
              {products.length === 0 ? (
                <EmptyTable />
              ) : (
                <>
                  {' '}
                  {/* Table */}
                  <div className="relative  overflow-auto lg:w-full ">
                    <TableHeader headers={headers}>
                      {products.map((product: productsTypes, index: number) => (
                        <TableRow index={index} key={product.id}>
                          <TableDataAction>
                            <Checkbox
                              id={`checkbox-${product.id}`}
                              checked={selectedIds.includes(product.id)}
                              onChange={() => handleCheckboxChange(product.id)}
                            />
                            <EditTableButton
                              onClick={() => handleEdit(product.id)}
                            />
                            <DeleteTableButton
                              onClick={() =>
                                handleDeleteConfirmation(product.id)
                              }
                            />
                          </TableDataAction>
                          <TableDataLink href={`/product/${product.id}`}>
                            {product.name}
                          </TableDataLink>

                          <TableDataShort>{product.code}</TableDataShort>
                          <TableDataShort>{product.category}</TableDataShort>
                          <TableDataShort>{product.quantity}</TableDataShort>
                          <TableDataShort>
                            {formatRupiah(Number(product.price))}
                          </TableDataShort>
                        </TableRow>
                      ))}
                    </TableHeader>
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
                  {isEditProduct && (
                    <EditProduct
                      onClose={handleCloseEdit}
                      productProps={product!}
                    />
                  )}
                  {isDeleteProduct && (
                    <ActionConfirmModal
                      header="Apakah ingin menghapus Produk?"
                      description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                      actionButtonNegative_action={() =>
                        setIsDeleteProduct(false)
                      }
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
                  {isDeleteFail && (
                    <FailModal
                      description="Beberapa data gagal dihapus, terdapat deals yang sedang berlangsung"
                      closeModal={true}
                      actionButton={false}
                      actionButton_href=""
                      actionButton_name=""
                    />
                  )}
                  {isDeleteError && (
                    <ErrorModal
                      header="Pilih data sebelum menghapus!"
                      description="Silahkan pilih minimal satu data untuk bisa dihapus"
                      actionButton={true}
                      actionButton_name="Kembali"
                      actionButton_action={() => setIsDeleteError(false)}
                    />
                  )}
                </>
              )}
              {isAddProduct && <NewProduct onClose={handleAddDataClick} />}
            </>
          </DashboardCard>
        )}
      </div>
    </>
  );
};

export default Product;
