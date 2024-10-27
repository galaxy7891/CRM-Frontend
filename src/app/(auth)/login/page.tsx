'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import GoogleLoginButton from '@/components/button/google-login-button';
import FormComponent from '@/app/(auth)/login/partials/form-login';
import AuthLeftSection from '@/components/layout/auth-left-section';
import AuthRightSection from '@/components/layout/auth-right-section';
import FailPopUp from '@/components/status/fail-card';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState<string>('');
  const router = useRouter();

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

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        formDataToSend
      );

      console.log(response); // Debugging log

      if (
        response.data &&
        response.data.data &&
        response.data.data.access_token
      ) {
        localStorage.setItem('token', response.data.data.access_token); // Set token in localStorage
        router.push('/homepage'); // Redirect to homepage
      } else {
        setValidation('Email atau Password salah. Silakan coba lagi.');
      }
    } catch (error) {
      console.error(error); // Debugging log for errors
    }
  };

  useEffect(() => {
    //Check if token exists
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/login');
    }
  });

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <AuthLeftSection />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <AuthRightSection>
          <div className="pb-2 pt-3">
            <h1 className="text-2xl md:text-[28px] font-bold text-black ">
              Masuk
            </h1>
            <p className="text-font-black text-xs font-custom mt-2 md:text-base lg:mt-4">
              Selamat datang kembali! Silahkan masuk ke dalam akun Anda.
            </p>
          </div>
          {validation && <FailPopUp>{validation}</FailPopUp>}
          <div className="w-full">
            <FormComponent
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={loginHandler}
              afterInputText="Lupa kata sandi?"
              afterInputTextHref="/forget-password"
              buttonText="Masuk"
            />
          </div>
          <div className="text-center my-3 text-xs md:text-base font-custom ">
            <p>Atau</p>
          </div>

          <GoogleLoginButton />
          <div className="mt-5 text-center">
            <p className="text-xs md:text-base font-custom font-medium">
              Belum punya akun?{' '}
              <a
                href="/register"
                className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
              >
                Buat Akun
              </a>
            </p>
          </div>
        </AuthRightSection>
      </div>
    </div>
  );
};

export default LoginPage;
