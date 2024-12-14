'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getCompanyById,
  deleteCompany,
} from '@/redux/actions/companiesActions';
import EditCompany from '../partials/edit-company';
import CompanyLog from './partials/companies-log';
import DashboardCard from '@/components/layout/dashboard-card';
import SuccessModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import CustomerInfo from '@/components/import/card-info-customer';
import CardCustomer from '@/components/layout/detail-customer-card';
import EditUserButton from '@/components/button/edit-user-button';
import DeleteButton from '@/components/button/delete-button';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import Loading from '@/components/status/loading';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DetailCompany = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditCompany, setIsEditCompany] = useState<boolean>(false);
  const [isDeleteCompany, setIsDeleteCompany] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { company } = useSelector((state: RootState) => state.companies);

  const handleEdit = () => {
    setIsEditCompany(!isEditCompany);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteCompany(!isDeleteCompany);
  };

  const handleDeleteCompany = () => {
    setIsDeleteCompany(false);
    dispatch(deleteCompany(id, setIsSuccess));
  };

  useEffect(() => {
    if (id) {
      dispatch(getCompanyById(id)).then(() => setIsLoadingPage(false));
    }
  }, [dispatch, id, isEditCompany]);

  return (
    <>
      <HeaderWithBackButton title="Detail Perusahaan" />
      {isLoadingPage && company?.id != id ? (
        <Loading />
      ) : (
        <>
          <DashboardCard>
            <div className="grid grid-cols-12 ">
              {/* Photo with Primary Detail */}
              <div className="col-span-12 lg:col-span-4 mt-2 flex items-center justify-center">
                <CardCustomer
                  data={{
                    name: company?.name || '-',
                    email: company?.email || '-',
                    status: company?.status || '-',
                  }}
                  imageSrc="/images/customer.png"
                  emailHref={`mailto:${company?.email}`}
                  waHref={`https://wa.me/62${company?.phone}`}
                />
              </div>
              {/* Detail */}
              <div className="col-span-12 lg:col-start-5 lg:col-span-8">
                <div className="flex justify-between mb-4 mt-8 lg:mt-0">
                  <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium flex items-center">
                    Data Perusahaan
                  </p>
                  <div className="flex items-center space-x-2">
                    <EditUserButton onClick={handleEdit} />
                    <DeleteButton onClick={handleDeleteConfirmation} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  <CustomerInfo
                    label="Jenis Industri"
                    value={company?.industry}
                  />
                  <CustomerInfo label="Nomor Telepon" value={company?.phone} />
                  <CustomerInfo label="Alamat" value={company?.address} />
                  <CustomerInfo label="Provinsi" value={company?.province} />
                  <CustomerInfo label="Kota" value={company?.city} />
                  <CustomerInfo
                    label="Kecamatan"
                    value={company?.subdistrict}
                  />
                  <CustomerInfo label="Kelurahan" value={company?.village} />
                  <CustomerInfo label="Kode Pos" value={company?.zip_code} />
                  <CustomerInfo
                    label="Penanggung Jawab"
                    value={company?.owner}
                  />
                  <CustomerInfo
                    label="Deskripsi"
                    value={company?.description}
                  />
                </div>
              </div>
            </div>

            {isDeleteCompany && (
              <ActionConfirmModal
                header="Apakah ingin menghapus perusahaan?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={handleDeleteConfirmation}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteCompany}
              />
            )}
            {isEditCompany && (
              <EditCompany onClose={handleEdit} companyProps={company!} />
            )}

            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data perusahaan berhasil dihapus"
                actionButton={true}
                actionButton_name="Kembali ke Halaman Perusahaan"
                actionButton_href="/companies"
              />
            )}
          </DashboardCard>
          <CompanyLog />
        </>
      )}
    </>
  );
};

export default DetailCompany;
