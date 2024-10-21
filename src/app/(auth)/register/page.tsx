'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1_email from '@/components/form/form-register/step1-email';
import Step2_otp from '@/components/form/form-register/step2-otp';
import Step3_password from '@/components/form/form-register/step3-password';
import Step4_personal_data from '@/components/form/form-register/step4-personal-data';
import Step5_company_data from '@/components/form/form-register/step5-company-data';
import AuthLeftSection from '@/components/auth-left-section';
import RightAuthSection from '@/components/auth-right-section';
import SuccessModal from '@/components/status/success-modal';
import { useOtpCountdown } from '@/hook/useOtpCountdown';
import AuthRightSection from '@/components/auth-right-section';

interface PersonalData {
  first_name: string;
  last_name: string;
  phone: string;
}

interface CompanyData {
  name: string;
  industry: string;
  job_position: string;
}

interface Password {
  password: string;
  password_confirmation: string;
}

const Register = () => {
  const [step, setStep] = useState<number>(4);
  const { countdown, startCountdown } = useOtpCountdown(60); // Use countdown hook
  const [validation, setValidation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<Password>({
    password: '',
    password_confirmation: '',
  });
  const [otp, setOtp] = useState<string>('');
  const [personalData, setPersonalData] = useState<PersonalData>({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    industry: '',
    job_position: '',
  });
  const router = useRouter();

  const handleSendOTP = async () => {
    setIsLoading('Send OTP');
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
        setValidation('');
        startCountdown();
        setStep(2); // Continue to step 2 (verifikasi OTP)
      } else {
        if (data.message.email) {
          setValidation(data.message.email[0]);
        } else {
          setValidation(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading('');
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading('Verify OTP');

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
        setValidation('');
        setStep(3); // Continue to step 3 (input password)
      } else {
        if (data.message.code) {
          setValidation(data.message.code[0]);
        } else if (data.message.email) {
          setValidation(data.message.email[0]);
        } else {
          setValidation(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading('');
    }
  };

  const handleRegister = async () => {
    setIsLoading('Register');
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
            ...password,
            ...personalData,
            ...companyData,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setValidation('');
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setValidation(data.message);
        console.error(data.message);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading('');
    }
  };

  const handleBackButton = () => {
    setValidation('');
    setStep(step - 1);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <AuthLeftSection />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <RightAuthSection>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <Step1_email
                    email={email}
                    setEmail={setEmail}
                    onNext={handleSendOTP}
                    step={step}
                    validation={validation}
                    isLoading={isLoading}
                  />
                );

              case 2:
                return (
                  <Step2_otp
                    email={email}
                    countdown={countdown}
                    otp={otp}
                    setOtp={setOtp}
                    step={step}
                    validation={validation}
                    isLoading={isLoading}
                    handleSendOTP={handleSendOTP}
                    handleVerifyOTP={handleVerifyOtp}
                    handleBackButton={handleBackButton}
                  />
                );
              case 3:
                return (
                  <Step3_password
                    email={email}
                    password={password}
                    onNext={() => setStep(4)}
                    setPassword={setPassword}
                    step={step}
                    setValidation={setValidation}
                    validation={validation}
                  />
                );
              case 4:
                return (
                  <Step4_personal_data
                    personalData={personalData}
                    setPersonalData={setPersonalData}
                    onNext={() => setStep(5)}
                    step={step}
                  />
                );
              case 5:
                return (
                  <Step5_company_data
                    companyData={companyData}
                    step={step}
                    isLoading={isLoading}
                    setCompanyData={setCompanyData}
                    handleRegister={handleRegister}
                    handleBackButton={handleBackButton}
                  />
                );
            }
          })()}

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
        </RightAuthSection>
      </div>
      {isSuccess && (
        <SuccessModal
          header="Akun berhasil didaftarkan"
          description="Selamat bergabung dengan Loyal Cust!"
          closeModal={false}
          actionButton={false}
          actionButton_href=""
          actionButton_name=""
        />
      )}
    </div>
  );
};

export default Register;
