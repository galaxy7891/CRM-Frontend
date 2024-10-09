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
      name: 'email',
      type: 'email',
      placeholder: 'user@gmail.com',
      required: true,
      label: 'Email',
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
            Masukan email untuk verifikasi 
            </p>
          </div>
          <div className="w-full">
            <FormComponent
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              buttonText="Masuk"
            />
          </div>

         
          
          <div className="mt-5 text-center">
            <p className="text-xs md:text-base  font-custom font-medium">
             Sudah punya akun?{' '}
              <a
                href="/register-email"
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
