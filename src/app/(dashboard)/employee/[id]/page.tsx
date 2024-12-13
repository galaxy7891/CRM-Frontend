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
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import ProductLog from './partials/employee-log';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import Loading from '@/components/status/loading';

const DetailProduct = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditEmployee, setIsEditEmployee] = useState<boolean>(false);
  const [isDeleteProduct, setIsDeleteProduct] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
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
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
    if (id) {
      dispatch(getEmployeeById(id)).then(() => setIsLoadingPage(false));
    }
  }, [dispatch, id, isEditEmployee]);

  return (
    <>
      <HeaderWithBackButton title="Detail Karyawan" />
      {isLoadingPage && employee?.id != id ? (
        <Loading />
      ) : (
        <>
          {' '}
          <DashboardCard>
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-4 flex justify-center items-center ">
                <CardCustomer
                  data={{
                    name:
                      employee?.first_name +
                        (employee?.last_name
                          ? ' ' + employee?.last_name
                          : '') || '-',
                    email: employee?.email || '-',
                  }}
                  imageSrc="/images/customer.png"
                />
              </div>
              <div className="col-span-12 lg:col-start-5 lg:col-span-8">
                <div className="flex items-center mt-2 justify-between">
                  <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium">
                    Data Karyawan
                  </p>
                  {role === 'superadmin' && (
                    <div className="flex items-center space-x-2">
                      {employee && (
                        <EditUserButton
                          onClick={() => handleEdit(employee.id)}
                        />
                      )}
                      <DeleteButton onClick={handleDeleteConfirmation} />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  <CustomerInfo
                    label="Jabatan"
                    value={employee?.job_position}
                  />
                  <CustomerInfo label="Nomor Telepon" value={employee?.phone} />
                  <CustomerInfo label="Email" value={employee?.email} />
                  <CustomerInfo label="Akses" value={employee?.role} />
                  <CustomerInfo
                    label="Jenis Kelamin"
                    value={employee?.gender}
                  />
                </div>
              </div>
            </div>
            {isDeleteProduct && (
              <ActionConfirmModal
                header="Apakah ingin menghapus data karyawan?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={handleDeleteConfirmation}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteProduct}
              />
            )}
            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data karyawan berhasil dihapus"
                actionButton={true}
                actionButton_name="Kembali ke Halaman Karyawan"
                actionButton_href="/employee"
              />
            )}
            {isEditEmployee && (
              <EditEmployee
                onClose={handleCloseEdit}
                employeeProps={employee!}
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
