'use client';

import { useState } from 'react';
import FormComponent from '@/components/form-login';
import LeftIconSection from '@/components/icon-left';
import Stepper from '@/components/stepper';
// import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "user@gmail.com",
      required: true,
      label: "Email",
    },
    {
      name: "nama depan",
      type: "text",
      placeholder: "Contoh : Jhon",
      required: true,
      label: "Nama Depan",
    },
    {
      name: "nama belakang",
      type: "text",
      placeholder: "Contoh: Sucipto",
      required: true,
      label: "Nama Belakang",
    },
    {
      name: "password",
      type: "password",
      placeholder: "masukkan kata sandi",
      required: true,
      label: "Kata Sandi",
    },
    {
      name: "telepon",
      type: "",
      placeholder: "Contoh: 08xxxxxxxxxx",
      required: true,
      label: "Nomor Telepon",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login Data:', formData);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <LeftIconSection />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <p className="text-2xl lg:text-4xl text-font-brown font-custom pb-2">
            Logo
          </p>
          <div className="pb-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-font-brown lg:mt-5">
              Buat Akun
            </h1>
            <div className='flex justify-center mt-4'>
            <Stepper/>
            </div>
            <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
              Verifikasi
            </p>
            <p className="font-small text-font-black font-custom lg:text-base lg:mt-3">
            Isi data diri terlebih dahulu untuk melanjutkan membuat akun
            </p>
          </div>
          <div className="w-full">
            <FormComponent
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              buttonText="Lanjut"
            />
          </div>
          <a
           href="/register-otp"
            type="button"
            className=" bg-white w-full mt-2 px-1 h-12 lg:h-15  flex items-center justify-center border border-dark-gold py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
          >
            <span className="font-custom  text-dark-gold text-xs md:text-base font-bold ">
              Kembali
            </span>
          </a>
         
          
          <div className="mt-5 text-center">
            <p className="text-xs md:text-base  font-custom font-medium">
             Sudah punya akun?{' '}
              <a
                href="/login"
                className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
              >
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
