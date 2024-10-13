'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1_email from '@/components/form/form-register/step1-email';
import Step2_otp from '@/components/form/form-register/step2-otp';
import Step3_personal_data from '@/components/form/form-register/step3-personal-data';
import Step4_company_data from '@/components/form/form-register/step4-company-data';
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
  const [step, setStep] = useState<number>(1);
  const [validation, setValidation] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading(true);
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
        setValidation(null);
        setStep(2); // Continue to step 2 (verifikasi OTP)
      } else {
        setValidation(data.message.email[0]);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
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
        setValidation(null);
        setStep(3); // Continue to step 3 (personal data)
      } else {
        if (data.message.code) {
          setValidation(data.message.code[0]);
        } else {
          setValidation(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
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
        setValidation(null);
        alert('Registrasi berhasil!');
        router.push('/login');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false);
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
            {(() => {
              switch (step) {
                case 1:
                  return (
                    <Step1_email
                      email={email}
                      setEmail={setEmail}
                      onNext={handleSendOtp}
                      step={step}
                      validation={validation}
                      isLoading={isLoading}
                    />
                  );
                case 2:
                  return (
                    <Step2_otp
                      otp={otp}
                      setOtp={setOtp}
                      onVerify={handleVerifyOtp}
                      step={step}
                      validation={validation}
                      isLoading={isLoading}
                    />
                  );
                case 3:
                  return (
                    <Step3_personal_data
                      personalData={personalData}
                      setPersonalData={setPersonalData}
                      onNext={() => setStep(4)}
                      step={step}
                      setValidation={setValidation}
                      validation={validation}
                    />
                  );
                case 4:
                  return (
                    <Step4_company_data
                      companyData={companyData}
                      setCompanyData={setCompanyData}
                      onNext={handleRegister}
                      step={step}
                      setIsValidation={setValidation}
                      validation={validation}
                      isLoading={isLoading}
                    />
                  );
              }
            })()}
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
