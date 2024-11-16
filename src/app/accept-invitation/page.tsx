'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { acceptInvitation } from '@/redux/actions/employeesActions';
import { useAppDispatch } from '@/hook/redux';
import { useSearchParams } from 'next/navigation';
import { ParamsData, PersonalData, Password } from '@/types/authTypes';
import Step1_email from './partials/step1-password';
import Step2_personal_data from './partials/step2-personal-data';
import AuthLeftSection from './partials/left-section';
import RightAuthSection from '@/components/layout/auth-right-section';
import SuccessModal from '@/components/status/success-modal';

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [step, setStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paramsData, setParamsData] = useState<ParamsData>({
    email: '',
    token: '',
  });
  const [password, setPassword] = useState<Password>({
    password: '',
    password_confirmation: '',
  });
  const [personalData, setPersonalData] = useState<PersonalData>({
    first_name: '',
    last_name: '',
    phone: '',
  });

  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const handleRegister = async () => {
    dispatch(
      acceptInvitation(
        paramsData,
        password,
        personalData,
        setIsLoading,
        setIsSuccess
      )
    );
  };

  const handleBackButton = () => {
    setErrorMessage('');
    setStep(step - 1);
  };

  useEffect(() => {
    setParamsData({
      email: searchParams.get('email') || '',
      token: searchParams.get('token') || '',
    });
  }, [searchParams]);

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block">
        <AuthLeftSection />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <RightAuthSection>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <Step1_email
                    email={paramsData.email}
                    password={password}
                    setPassword={setPassword}
                    onNext={() => setStep(2)}
                    step={step}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                  />
                );
              case 2:
                return (
                  <Step2_personal_data
                    personalData={personalData}
                    isLoading={isLoading}
                    setPersonalData={setPersonalData}
                    onNext={handleRegister}
                    step={step}
                    handleBackButton={handleBackButton}
                  />
                );
              default:
                return null;
            }
          })()}
        </RightAuthSection>
      </div>
      {isSuccess && (
        <SuccessModal
          header="Akun berhasil didaftarkan"
          description="Selamat bergabung dengan Loyal Cust!"
          closeModal={false}
          actionButton={true}
          actionButton_href="/login"
          actionButton_name="Login ke Loyal Cust"
        />
      )}
    </div>
  );
};

const RegisterPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Register />
  </Suspense>
);

export default RegisterPage;
