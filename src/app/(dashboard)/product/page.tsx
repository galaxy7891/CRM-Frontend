'use client';

import { useState, useEffect } from 'react';
import { ProductTypes } from '@/types/Product';
import StatusBadge from '@/components/table/status-badge';
import TableHeader from '@/components/table/table-head';
import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ButtonFilter from '@/components/button/filter-table-button';
import EditProduct from './partials/edit-Product';
import DeleteButton from '@/components/button/delete-button';
import EmptyTable from '@/components/table/empty-table';
import handleExport from '@/utils/export_CSV';
import NewProduct from './partials/new-product';
import EditTableButton from '@/components/button/edit-table-button';
import ExportButton from '@/components/button/export-button';
import FilterTableButton from '@/components/button/filter-table-button';

const Product = () => {
  const [sortBy, setSortBy] = useState<string>('terbaru');
  const [statusBy, setStatusBy] = useState<string>('rendah');
  const [perPage, setPerPage] = useState<string>('10');
  const [isEditLead, setIsEditLead] = useState<boolean>(false);
  const [ProductData, setProductData] = useState<ProductTypes[]>([]);
  const [leadDataProps, setLeadDataProps] = useState<ProductTypes>(
    {} as ProductTypes);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
      setIsEditing(true);
    };
    const handleCloseForm = () => {
      setIsEditingImage(false);
    };
  // const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const headers = ['Nama Produk', 'Kode Produk', 'Kategori Produk', 'Jumlah Produk', 'Harga Produk'];
  // let getLeadData: ProductTypes | null = null;

  // const handleEdit = async (id: string) => {
  //   await getLeadDataById(id);
  //   setLeadDataProps(getLeadData!);
  //   setIsEditLead(true);
  // };

  // const handleCloseEdit = () => {
  //   setIsEditLead(false);
  // };

  // const handleCheckboxChange = (id: string) => {
  //   setSelectedIds((prevSelectedIds) => {
  //     if (prevSelectedIds.includes(id)) {
  //       // If the ID is already selected, remove it
  //       return prevSelectedIds.filter((selectedId) => selectedId !== id);
  //     } else {
  //       // Otherwise, add it
  //       return [...prevSelectedIds, id];
  //     }
  //   });
  // };

  // const deleteLead = async (ids: string | string[]) => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await axios.request({
  //       url: `${process.env.NEXT_PUBLIC_API_URL}/api/Product/`,
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: { id: Array.isArray(ids) ? ids : [ids] },
  //     });

  //     if (response.data.success) {
  //       getProductData();
  //     }
  //   } catch (error) {
  //     console.error('Error deleting lead(s):', error);
  //   }
  // };

  // const getLeadDataById = async (id: string) => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/Product/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.data.success) {
  //       getLeadData = response.data.data;
  //     } else {
  //       console.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting lead:', error);
  //   }
  // };

  // const getProductData = async () => {
  //   const token = localStorage.getItem('token');

  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/Product?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.data.success) {
  //       setProductData(response.data.data.data);
  //       console.log(response.data.data.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching Product data:', error);
  //   }
  // };

  // useEffect(() => {
  //   getProductData();
  // }, [sortBy, statusBy, perPage]); // Only run once when the component mounts
  return (
    <>
    <div className="flex justify-between items-center mb-5">
        <p className="text-font-black dark:text-font-white text-base font-custom md:text-[32px]">
          Data Produk
        </p>
        
        <div className="flex items- center gap-2">
          
          <a
              href="/product-import"
              className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
            >
              Impor Data
            </a>
        
        <button
          onClick={() => setIsAddingProduct(true)}
          className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
        >
          Tambah Data
        </button>
        </div>
      </div>
      <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6">
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
          {/* Trash Icon, Export, and Filter Buttons */}
          {/* Delete Button */}
          <DeleteButton />

          <ExportButton/>

          {/* <ButtonFilter
            setSortBy={setSortBy}
            setStatusBy={setStatusBy}
            setPerPage={setPerPage}
          /> */}
          <FilterTableButton/>
        </div>
      </div>
      {/* {ProductData.length == 0 ? (
        <EmptyTable />
      ) : ( */}
        <>
          {' '}
          {/* Table */}
          <div className="relative  overflow-auto lg:w-full ">
            <table className="w-full ">
              <TableHeader headers={headers} />
              <tbody>
                {ProductData.map((lead, index) => (
                  <tr
                    key={index}
                    className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                  >
                    <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                      <div className="flex items-center space-x-1">
                        {/* <input
                          id={`checkbox-${lead.id}`} // Unique ID for each checkbox
                          type="checkbox"
                          checked={selectedIds.includes(lead.id)} // Check if the ID is in the selectedIds state
                          onChange={() => handleCheckboxChange(lead.id)} // Call the handler
                          className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
                        /> */}
                        <EditTableButton
                        onClick={handleEditClick}/>

                        <button>
                          <Image
                            src="/icons/table/dustbin.svg"
                            alt="deletebtn"
                            width={16}
                            height={16}
                            className="w-5 h-5"
                            // onClick={() => deleteLead(lead.id)}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base ">
                      <Link href="/detail-product">
                        Nama Produk
                      </Link>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      Kode produk
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      kategori produk
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      halo
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      halo
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {isEditLead && (
            // <EditProduct onClose={handleCloseEdit} leadData={leadDataProps} />
          )} */}
          {isAddingProduct && <NewProduct />}
          {isEditing && <EditProduct onClose={handleCloseForm}/>}
        </>
      {/* )} */}
      </div>
    </>
  );
};

export default Product;
