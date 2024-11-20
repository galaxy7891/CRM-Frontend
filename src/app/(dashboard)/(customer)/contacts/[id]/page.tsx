'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getContactById, deleteContact } from '@/redux/actions/contactsActions';
import EditContact from '../partials/edit-contact';
import ContactLog from './partials/contact-log';
import DashboardCard from '@/components/layout/dashboard-card';
import SuccessModal from '@/components/status/success-modal';
import ActionConfirmModal from '@/components/status/action-confirm-modal';
import CustomerInfo from '@/components/import/card-info-customer';
import CardCustomer from '@/components/layout/detail-customer-card';
import EditUserButton from '@/components/button/edit-user-button';
import DeleteButton from '@/components/button/delete-button';
import HeaderWithBackButton from '@/components/layout/header-with-back';
import Loading from '@/components/status/loading';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DetailContact = () => {
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [isEditContact, setIsEditContact] = useState<boolean>(false);
  const [isDeleteContact, setIsDeleteContact] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { contact } = useSelector((state: RootState) => state.contacts);

  const handleEdit = () => {
    setIsEditContact(!isEditContact);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteContact(!isDeleteContact);
  };

  const handleDeleteContact = () => {
    setIsDeleteContact(false);
    dispatch(deleteContact(id, setIsSuccess));
  };

  useEffect(() => {
    if (id) {
      dispatch(getContactById(id)).then(() => setIsLoadingPage(false));
    }
  }, [dispatch, id, isEditContact]);

  return (
    <>
      <HeaderWithBackButton title="Detail Kontak" />
      {isLoadingPage && contact?.id != id ? (
        <Loading />
      ) : (
        <>
          {' '}
          <DashboardCard>
            <div className="grid grid-cols-12 ">
              {/* Photo with Primary Detail */}
              <div className="col-span-12 lg:col-span-4 mt-2 flex items-center justify-center">
                <CardCustomer
                  data={{
                    name:
                      contact?.first_name +
                        (contact?.last_name ? ' ' + contact?.last_name : '') ||
                      '-',
                    email: contact?.email || '-',
                    status: contact?.status || '-',
                  }}
                  imageSrc="/images/customer.png"
                  emailHref={`mailto:${contact?.email}`}
                  waHref={`https://wa.me/62${contact?.phone}`}
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
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  <CustomerInfo label="Nomor Telepon" value={contact?.phone} />
                  <CustomerInfo label="Alamat" value={contact?.address} />
                  <CustomerInfo
                    label="Tanggal Lahir"
                    value={
                      contact?.birthdate
                        ? moment(contact?.birthdate).format('DD MMMM YYYY')
                        : '-'
                    }
                  />
                  <CustomerInfo label="Pekerjaan" value={contact?.job} />
                  <CustomerInfo label="Provinsi" value={contact?.province} />
                  <CustomerInfo label="Kota/Kabupaten" value={contact?.city} />
                  <CustomerInfo
                    label="Kecamatan"
                    value={contact?.subdistrict}
                  />
                  <CustomerInfo
                    label="Kelurahan/Desa"
                    value={contact?.village}
                  />
                  <CustomerInfo label="Kode Pos" value={contact?.zip_code} />
                  <CustomerInfo
                    label="Penanggung Jawab"
                    value={contact?.owner}
                  />
                  <CustomerInfo
                    label="Deskripsi"
                    value={contact?.description}
                  />
                </div>
              </div>
            </div>

            {isDeleteContact && (
              <ActionConfirmModal
                header="Apakah ingin menghapus kontak?"
                description="Data yang sudah terhapus tidak akan dapat dikembalikan"
                actionButtonNegative_action={handleDeleteConfirmation}
                actionButtonPositive_name="Hapus"
                actionButtonPositive_action={handleDeleteContact}
              />
            )}
            {isEditContact && (
              <EditContact onClose={handleEdit} contactProps={contact!} />
            )}

            {isSuccess && (
              <SuccessModal
                header="Berhasil"
                description="Data kontak berhasil dihapus"
                actionButton={true}
                actionButton_name="Kembali ke Halaman Kontak"
                actionButton_href="/contacts"
              />
            )}
          </DashboardCard>
          <ContactLog />
        </>
      )}
    </>
  );
};

export default DetailContact;
