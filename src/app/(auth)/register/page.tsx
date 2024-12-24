'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PasswordTypes,
  PersonalDataTypes,
  CompanyDataTypes,
} from '@/types/authTypes';
import {
  sendOTP,
  verifyOTP,
  submitRegisterData,
} from '@/redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Step1_email from '@/app/(auth)/register/partials/step1-email';
import Step2_otp from '@/app/(auth)/register/partials/step2-otp';
import Step3_password from '@/app/(auth)/register/partials/step3-password';
import Step4_personal_data from '@/app/(auth)/register/partials/step4-personal-data';
import Step5_company_data from '@/app/(auth)/register/partials/step5-company-data';
import Step6_Terms from '@/components/TOS/TOS_Content';
import AuthLeftSection from '@/components/layout/auth-left-section';
import RightAuthSection from '@/components/layout/auth-right-section';
import SuccessModal from '@/components/status/success-modal';
import { useOtpCountdown } from '@/hook/useOtpCountdown';

const Register = () => {
  const [isLoading, setIsLoading] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [OTP, setOTP] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { countdown, startCountdown } = useOtpCountdown(60);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<PasswordTypes>({
    password: '',
    password_confirmation: '',
  });
  const [personalData, setPersonalData] = useState<PersonalDataTypes>({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [companyData, setCompanyData] = useState<CompanyDataTypes>({
    name: '',
    industry: '',
    job_position: '',
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      sendOTP(email, setIsLoading, setErrorMessage, setStep, startCountdown)
    );
  };

  const handleVerifyOtp = () => {
    dispatch(verifyOTP(email, OTP, setIsLoading, setErrorMessage, setStep));
  };

  const handleRegister = async () => {
    const formattedPersonalData = {
      ...personalData,
      phone: `62${personalData.phone}`,
    };

    const response = await dispatch(
      submitRegisterData(
        email,
        setIsLoading,
        setErrorMessage,
        setIsSuccess,
        password,
        formattedPersonalData,
        companyData
      )
    );

    if (response?.success) {
      router.push('/homepage');
    }
  };

  const handleBackButton = () => {
    setErrorMessage('');
    setStep(step - 1);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <AuthLeftSection
          title="Solusi cerdas untuk bisnis yang berkualitas"
          imageSrc="/images/vector-login.png"
        />
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
                    errorMessage={errorMessage}
                    isLoading={isLoading}
                  />
                );

              case 2:
                return (
                  <Step2_otp
                    email={email}
                    countdown={countdown}
                    OTP={OTP}
                    setOTP={setOTP}
                    step={step}
                    errorMessage={errorMessage}
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
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                  />
                );
              case 4:
                return (
                  <Step4_personal_data
                    personalData={personalData}
                    setPersonalData={setPersonalData}
                    onNext={() => setStep(5)}
                    step={step}
                    handleBackButton={handleBackButton}
                  />
                );
              case 5:
                return (
                  <Step5_company_data
                    companyData={companyData}
                    step={step}
                    setCompanyData={setCompanyData}
                    onNext={() => setStep(6)}
                    handleBackButton={handleBackButton}
                  />
                );
              case 6:
                return (
                  <Step6_Terms
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
        />
      )}
    </div>
  );
};

export default Register;
