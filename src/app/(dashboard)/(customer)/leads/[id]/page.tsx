'use client';

import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ButtonConvert from '@/components/button/button-convert-leads';
import CustomerInfo from '@/components/import/card-info-customer';
import CardCustomer from '@/components/import/card-profil-customer';
import EditUserButton from '@/components/button/edit-user-button';
import DeleteButton from '@/components/button/delete-button';

interface leadData {
  first_name: string;
  last_name: string;
  job: string;
  description: string;
  status: string;
  birthdate: string;
  email: string;
  phone: string;
  owner: string;
  address: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}

const DetailLeads = () => {
  const [lead, setLead] = useState<leadData | null>(null);
  const router = useRouter();
  const { id } = useParams();

  const getLeadDataById = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setLead(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const deleteLead = async (ids: string | string[]) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      });

      if (response.data.success) {
        alert('Berhasil!');
        router.push('/leads');
      }
    } catch (error) {
      console.error('Error deleting lead(s):', error);
    }
  };

  useEffect(() => {
    if (id) {
      getLeadDataById(id.toString());
    }
  }, [id]);

  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div className="flex justify-between">
            <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium">
              Data Pelanggan
            </p>
            <div className="flex items-center space-x-2">
              <EditUserButton />
              <DeleteButton onClick={() => deleteLead(id)} />
              <ButtonConvert />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 mt-2">
          <CardCustomer
            data={{
              name: lead?.first_name + ' ' + lead?.last_name || 'N/A',
              email: lead?.email || 'N/A',
              status: lead?.status || 'N/A',
            }}
            imageSrc="/images/customer.png"
            emailHref={`mailto:${lead?.email}`}
            waHref={`https://wa.me/62${lead?.phone}`}
          />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
            <CustomerInfo label="Nomor Telepon" value={lead?.phone} />
            <CustomerInfo label="Alamat" value={lead?.address} />
            <CustomerInfo label="Pekerjaan" value={lead?.job} />
            <CustomerInfo label="Provinsi" value={lead?.province} />
            <CustomerInfo label="Kota" value={lead?.city} />
            <CustomerInfo label="Kecamatan" value={lead?.subdistrict} />
            <CustomerInfo label="Kelurahan" value={lead?.village} />
            <CustomerInfo label="Kode Pos" value={lead?.zip_code} />
            <CustomerInfo label="Penanggung Jawab" value={lead?.owner} />
            <CustomerInfo label="Deskripsi" value={lead?.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLeads;
