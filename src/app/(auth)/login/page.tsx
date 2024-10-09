'use client';

import { useState } from 'react';
import FormComponent from '@/components/form-login';
import LeftIconSection from '@/components/icon-left';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'user@gmail.com',
      required: true,
      label: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'masukkan kata sandi',
      required: true,
      label: 'Kata Sandi',
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
              Masuk
            </h1>
            <p className="text-font-black text-xs font-custom mt-2 md:text-base lg:mt-4">
              Selamat datang kembali! Silahkan masuk ke dalam akun Anda.
            </p>
          </div>
          <div className="w-full">
            <FormComponent
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              afterInputText="Lupa kata sandi?"
              afterInputTextHref="/verified-email"
              buttonText="Masuk"
            />
          </div>

          <div className="text-center my-3 text-xs md:text-base font-custom ">
            <p>Atau</p>
          </div>
          <button
            type="button"
            className=" bg-white w-full px-1 h-12 lg:h-15  flex items-center justify-center border border-dark-blue py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
          >
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={14}
              height={14}
              className="mr-2"
            />
            <span className="font-custom  text-dark-blue text-xs md:text-base font-bold ">
              Masuk menggunakan Google
            </span>
          </button>
          <div className="mt-5 text-center">
            <p className="text-xs md:text-base  font-custom font-medium">
              Belum punya akun?{' '}
              <a
                href="/register-email"
                className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
              >
                Buat Akun
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
