'use client';
import { useParams } from 'next/navigation';
import CardCustomer from '@/components/layout/detail-customer-card';
import EditUserButton from '@/components/button/edit-user-button';
import CustomerInfo from '@/components/import/card-info-customer';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import EditEmployee from '../partials/edit-employee';
import {
  deleteEmployee,
  getEmployeeById,
} from '@/redux/actions/employeesActions';
import DashboardCard from '@/components/layout/dashboard-card';
import DeleteButton from '@/components/button/delete-button';
import SuccessModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import ProductLog from './partials/employee-log';

const DetailProduct = () => {
  const [isEditEmployee, setIsEditEmployee] = useState<boolean>(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { employee } = useSelector((state: RootState) => state.employees);

  const handleEdit = async (id: string) => {
    await dispatch(getEmployeeById(id));
    setIsEditEmployee(true);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteProduct(!isDeleteProduct);
  };

  const handleCloseEdit = () => {
    setIsEditEmployee(false);
  };

  const handleDeleteProduct = () => {
    setIsDeleteProduct(false);
    dispatch(deleteEmployee(id, setIsSuccess));
  };

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeById(id));
    }
  }, [dispatch, id, isEditEmployee]);

  return (
    <div>
      <DashboardCard>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-4 flex justify-center items-center ">
            <CardCustomer
              data={{
                name:
                  employee?.first_name +
                    (employee?.last_name ? ' ' + employee?.last_name : '') ||
                  '-',
                email: employee?.email || '-',
              }}
              imageSrc="/images/customer.png"
              emailHref={`mailto:${employee?.email}`}
              waHref={`https://wa.me/62${employee?.phone}`}
            />
          </div>
          <div className="col-span-12 lg:col-start-5 lg:col-span-8">
            <div className="flex items-center mt-2 justify-between">
              <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium">
                Data Produk
              </p>
              <div className="flex items-center space-x-2">
                {employee && (
                  <EditUserButton onClick={() => handleEdit(employee.id)} />
                )}
                <DeleteButton onClick={handleDeleteConfirmation} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
              <CustomerInfo label="Jabatan" value={employee?.job_position} />
              <CustomerInfo label="Nomor Telepon" value={employee?.phone} />
              <CustomerInfo label="Email" value={employee?.email} />
              <CustomerInfo label="Akses" value={employee?.role} />
              <CustomerInfo label="Jenis Kelamin" value={employee?.gender} />
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
        {isEditEmployee && (
          <EditEmployee onClose={handleCloseEdit} employeeProps={employee!} />
        )}
      </DashboardCard>
      <ProductLog />
    </div>
  );
};

export default DetailProduct;
