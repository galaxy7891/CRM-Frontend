'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import {
  getLeadById,
  deleteLead,
  convertAutoLead,
} from '@/redux/actions/leadsActions';
import EditLeads from '../partials/edit-leads';
import ConvertLeads from '../partials/convert-leads';
import LeadLog from './partials/lead-log';
import DashboardCard from '@/components/layout/dashboard-card';
import SuccessModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-yellow-modal';
import ButtonConvert from '@/components/button/convert-leads-button';
import CustomerInfo from '@/components/import/card-info-customer';
import CardCustomer from '@/components/layout/detail-customer-card';
import EditUserButton from '@/components/button/edit-user-button';
import DeleteButton from '@/components/button/delete-button';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import Loading from '@/components/status/loading';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DetailLeads = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditLead, setIsEditLead] = useState<boolean>(false);
  const [isConvertAuto, setIsConvertAuto] = useState<boolean>(false);
  const [isDeleteLead, setIsDeleteLead] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isConvertLead, setIsConvertLead] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { lead } = useSelector((state: RootState) => state.leads);

  const handleEdit = () => {
    setIsEditLead(!isEditLead);
  };

  const handleConvertManualOpen = () => {
    setIsConvertLead(!isConvertLead);
  };

  const handleConvertAutoConfirmation = () => {
    setIsConvertAuto(!isConvertAuto);
  };
  const handleDeleteConfirmation = () => {
    setIsDeleteLead(!isDeleteLead);
  };

  const handleConvertAutoLead = () => {
    setIsConvertAuto(false);
    dispatch(convertAutoLead(id, setIsSuccess));
  };

  const handleDeleteLead = () => {
    setIsDeleteLead(false);
    dispatch(deleteLead(id, setIsSuccess));
  };

  useEffect(() => {
    if (id) {
      dispatch(getLeadById(id)).then(() => setIsLoadingPage(false));
    }
  }, [dispatch, id, isEditLead]);

  return (
    <>
      <HeaderWithBackButton title="Detail Leads" />
      {isLoadingPage && lead?.id != id ? (
        <Loading />
      ) : (
        <>
          <DashboardCard>
            <div className="grid grid-cols-12 ">
              {/* Photo with Primary Detail */}
              <div className="col-span-12 lg:col-span-4 mt-2 flex items-center justify-center">
                <CardCustomer
                  data={{
                    name:
                      lead?.first_name +
                        (lead?.last_name ? ' ' + lead?.last_name : '') || '-',
                    email: lead?.email || '-',
                    status: lead?.status || '-',
                  }}
                  imageSrc="/images/customer.png"
                  emailHref={`mailto:${lead?.email}`}
                  waHref={`https://wa.me/62${lead?.phone}`}
                />
              </div>
              {/* Detail */}
              <div className="col-span-12 lg:col-start-5 lg:col-span-8">
                <div className="flex justify-between mb-4 mt-8 lg:mt-0">
                  <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium flex items-center">
                    Data Pelanggan
                  </p>
                  <div className="flex items-center space-x-2">
                    <EditUserButton onClick={handleEdit} />
                    <DeleteButton onClick={handleDeleteConfirmation} />
                    <ButtonConvert
                      handleConvert={handleConvertAutoConfirmation}
                      handleConvertConfirmation={handleConvertManualOpen}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  <CustomerInfo label="Nomor Telepon" value={lead?.phone} />
                  <CustomerInfo label="Alamat" value={lead?.address} />
                  <CustomerInfo
                    label="Tanggal Lahir"
                    value={
                      lead?.birthdate
                        ? moment(lead?.birthdate).format('DD MMMM YYYY')
                        : '-'
                    }
                  />
                  <CustomerInfo label="Pekerjaan" value={lead?.job} />
                  <CustomerInfo label="Provinsi" value={lead?.province} />
                  <CustomerInfo label="Kota/Kabupaten" value={lead?.city} />
                  <CustomerInfo label="Kecamatan" value={lead?.subdistrict} />
                  <CustomerInfo label="Kelurahan/Desa" value={lead?.village} />
                  <CustomerInfo label="Kode Pos" value={lead?.zip_code} />
                  <CustomerInfo label="Penanggung Jawab" value={lead?.owner} />
                  <CustomerInfo label="Deskripsi" value={lead?.description} />
                </div>
              </div>
            </div>
            {isConvertAuto && (
              <ActionConfirmModal
                header="Apakah ingin mengonversi data?"
                description="Data leads yang dipilih akan dikonversi menjadi data kontak"
                actionButtonNegative_action={handleConvertAutoConfirmation}
                actionButtonPositive_name="Konversi"
                actionButtonPositive_action={handleConvertAutoLead}
              />
            )}
            {isDeleteLead && (
              <ActionConfirmModal
                header="Apakah ingin menghapus leads?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={handleDeleteConfirmation}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteLead}
              />
            )}
            {isEditLead && <EditLeads onClose={handleEdit} leadProps={lead!} />}
            {isConvertLead && (
              <ConvertLeads
                leadProps={lead!}
                onClose={handleConvertManualOpen}
              />
            )}
            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data leads berhasil dikonversi menjadi kontak"
                actionButton={true}
                actionButton_name="Menuju ke Halaman Kontak"
                actionButton_href="/contacts"
              />
            )}
          </DashboardCard>
          <LeadLog />
        </>
      )}
    </>
  );
};

export default DetailLeads;
