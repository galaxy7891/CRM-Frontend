import CustomerInfo from '@/components/import/card-info-customer';
import CardCustomer from '@/components/import/card-profil-customer';
import Image from 'next/image';
import React from 'react';

const DetailContact = () => {
  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div className="flex justify-between">
            <p className="font-custom text-font-black dark:text-font-white text-sm md:text-2xl font-medium">
              Data Pelanggan
            </p>
            <div className=" space-x-2">
              {/* <EditUserButton onClick={handleEditClick} /> */}
              <button className="hover:shadow-[0_4px_8px_rgba(255,202,202,0.5)] transition-shadow duration-200">
                <Image
                  src={'/icons/table/trash.svg'}
                  alt="deletebtn"
                  width={32}
                  height={32}
                  className="w-[18px] h-[18px] md:w-8 md:h-8"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 mt-2">
          <CardCustomer
            data={{
              name: 'Nama Lengkap',
              email: 'email@example.com',
              status: 'Rendah',
            }}
            imageSrc="/images/customer.png"
            emailHref="mailto:email@example.com"
            waHref="https://wa.me/6281234567890"
          />
        </div>
        <div className="col-span-12 md:col-start-5 md:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-2 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
            <CustomerInfo label="Nomor Telepon" value="halo" />
            <CustomerInfo label="Alamat" value="halo" />
            <CustomerInfo label="Pekerjaan" value="halo" />
            <CustomerInfo label="Perusahaan" value="halo" />
            <CustomerInfo label="Provinsi" value="halo" />
            <CustomerInfo label="Kota" value="halo" />
            <CustomerInfo label="Kecamatan" value="halo" />
            <CustomerInfo label="Kelurahan" value="halo" />
            <CustomerInfo label="Kode Pos" value="halo" />
            <CustomerInfo label="Penanggung Jawab" value="halo" />
            <CustomerInfo label="Deskripsi" value="halo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailContact;
