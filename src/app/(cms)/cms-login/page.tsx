'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hook/redux';
import { login } from '@/redux/actions/authActions';
import InputAuth from '@/components/form-input/auth-input';
import InputPassword from '@/components/form-input/password-input';
import AuthLeftSection from '@/components/layout/auth-left-section';
import AuthRightSection from '@/components/layout/auth-right-section';
import AuthPositiveButton from '@/components/button/auth-positive-button';
import FailPopUp from '@/components/status/fail-card';

const LoginPageCms: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(
      login(formData.email, formData.password, setErrorMessage)
    );
    if (response?.success) {
      router.push('/cms-homepage');
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <AuthLeftSection
          title="Jalin Hubungan, Raih Kesuksesan"
          imageSrc="/images/vector-login-cms.png"
        />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <AuthRightSection>
          <div className="pb-2 pt-3">
            <h1 className="text-2xl md:text-[28px] font-bold text-font-brown ">
              Masuk Admin
            </h1>
            <p className="text-font-black text-xs font-custom mt-2 md:text-base lg:mt-4">
              Selamat datang kembali! Silahkan masuk ke dalam akun Anda.
            </p>
          </div>
          {errorMessage && <FailPopUp>{errorMessage}</FailPopUp>}
          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div>
                <InputAuth
                  required
                  type="email"
                  label="Email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <InputPassword
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="mt-3 flex justify-end">
                <Link
                  href={'/forget-password'}
                  className="text-xs text-light-gold font-custom font-bold ml-1 md:text-base  hover:underline "
                >
                  Lupa Kata Sandi?
                </Link>
              </div>
              <AuthPositiveButton> Masuk </AuthPositiveButton>
            </form>
          </div>
        </AuthRightSection>
      </div>
    </div>
  );
};

export default LoginPageCms;
