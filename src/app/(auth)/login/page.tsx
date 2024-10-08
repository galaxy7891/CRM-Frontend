'use client';

import { useState } from 'react';
import FormComponent from '@/components/form-login';
import Image from 'next/image';
import LeftIconSection from '@/components/icon-left';

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
    <div className="flex flex-col md:flex-row min-h-screen">
      <LeftIconSection />
      <div className="flex flex-col p-7 lg:flex-row h-screen items-center justify-center lg:w-1/2 bg-light-white">
        <div className="bg-font-white  h-full w-full mx-auto lg:mx-auto rounded-lg lg:max-h-screen flex flex-col p-3 lg:px-14">
          <p className="text-2xl lg:text-4xl text-font-brown font-custom">
            Logo
          </p>
          <div className="pb-4">
            <h1 className="text-2xl font-bold text-font-brown lg:mt-5 lg:text-4xl ">
              Masuk
            </h1>
            <p className="text-font-black text-xs font-custom mt-2 lg:text-base lg:mt-4">
              Selamat datang kembali! Silahkan masuk ke dalam akun Anda.
            </p>
          </div>
          <div className="">
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

          <div className="text-center my-2 font-small font-custom lg:text-base">
            <p>Atau</p>
          </div>
          <button
            type="button"
            className="w-full px-1 h-12 lg:h-15  flex items-center justify-center border border-dark-blue py-2 rounded-md"
          >
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={14}
              height={14}
              className="mr-2"
            />
            <span className="font-custom text-dark-blue lg:text-base font-bold">
              Masuk menggunakan Google
            </span>
          </button>
          <div className="mt-auto text-center flex items-center justify-center mb-4">
            <a className="text-xs font-custom lg:text-base font-medium">
              Belum punya akun?
            </a>
            <a
              href="/register-email"
              className="text-xs lg:text-base font-custom text-light-gold font-bold ml-1"
            >
              Buat Akun
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
