'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1 from '@/components/form/register-step1';
import Step2 from '@/components/form/register-step2';
import Step3 from '@/components/form/register-step3';
import Step4 from '@/components/form/register-step4';
import LeftIconSection from '@/components/icon-left';

interface PersonalData {
  first_name: string;
  last_name: string;
  phone: string;
  job_position: string;
  password: string;
}

interface CompanyData {
  name: string;
  industry: string;
}

const Register = () => {
  // State untuk mengelola langkah yang aktif
  const [step, setStep] = useState<number>(1);
  // State untuk mengelola input form
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [personalData, setPersonalData] = useState<PersonalData>({
    first_name: '',
    last_name: '',
    phone: '',
    job_position: '',
    password: '',
  });
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    industry: '',
  });
  const router = useRouter();

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/otp/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setStep(2); // Lanjut ke step 2 (verifikasi OTP)
        console.log('OTP sent successfully');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/otp/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code: otp }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setStep(3); // Lanjut ke step 3 (data pribadi)
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            ...personalData,
            ...companyData,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert('Registrasi berhasil!');
        router.push('/welcome'); // Arahkan ke halaman utama
      } else {
        // Tampilkan kesalahan jika ada
        alert(data.message || 'Terjadi kesalahan saat registrasi.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <LeftIconSection />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <div className="w-full">
            {step === 1 && (
              <Step1
                email={email}
                setEmail={setEmail}
                onNext={handleSendOtp}
                step={step}
              />
            )}
            {step === 2 && (
              <Step2 otp={otp} setOtp={setOtp} onVerify={handleVerifyOtp} />
            )}
            {step === 3 && (
              <Step3
                personalData={personalData}
                setPersonalData={setPersonalData}
                onNext={() => setStep(4)}
                step={step}
              />
            )}
            {step === 4 && (
              <Step4
                companyData={companyData}
                setCompanyData={setCompanyData}
                onNext={handleRegister}
                step={step}
              />
            )}
          </div>
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

export default Register;
