'use client';

import IconForget from '@/components/icon-forget';
import PasswordValidation from '@/components/password-validation';
import FormHeader from '@/components/form/form-header';
import SuccessModel from '@/components/pop-up/success';
import { useState, FormEvent, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const searchParams = useSearchParams(); // Ambil search params

  // Ambil token dan email dari query params
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  console.log('Token:', token, 'Email:', email); // Tambahkan ini untuk debug

  useEffect(() => {
    if (!email || !token) {
      setError('Email atau token tidak ditemukan.');
    } else {
      console.log('Token:', token, 'Email:', email); // Tambahkan ini untuk debug
    }
  }, [email, token]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            email,
            new_password: newPassword,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setSuccess('Password Berhasil Diubah!');

        setError(null);
      }
    } catch (Exception) {
      setError('Terjadi Kesalahan pada Server!');
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <IconForget />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          {success && <SuccessModel />}
          <FormHeader
            logoText="Logo"
            title=" Atur Ulang Kata Sandi"
            subtitle=" Atur Kata Sandi"
            description="Silakan masukkan kata sandi yang baru"
            step={4}
            step1_name="Email"
            step2_name="Verifikasi"
            step3_name="Ubah Sandi"
          />
          <div className="mt-4">
            <PasswordValidation
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              handleResetPassword={handleResetPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
