'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1_email from './partials/step1-email';
import Step2_personal_data from './partials/step2-personal-data';
import AuthLeftSection from './partials/left-section';
import RightAuthSection from '@/components/layout/auth-right-section';
import SuccessModal from '@/components/status/success-modal';

// ***********************
// * same like register page, after personal data next to TNC *
// ***********************

interface PersonalData {
  first_name: string;
  last_name: string;
  phone: string;
}

interface Password {
  password: string;
  password_confirmation: string;
}


const Register = () => {
  const [isLoading, setIsLoading] = useState<string>(''); // Loading state
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [step, setStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<Password>({
    password: '',
    password_confirmation: '',
  });
  const [personalData, setPersonalData] = useState<PersonalData>({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const router = useRouter();

  const handleEmailVerification = async () => {
    setIsLoading('Verifying Email');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`,
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
        setErrorMessage('');
        setStep(2); // Continue to step 2 (input personal data)
      } else {
        if (data.message.code) {
          setErrorMessage(data.message.code[0]);
        } else if (data.message.email) {
          setErrorMessage(data.message.email[0]);
        } else {
          setErrorMessage(data.message);
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
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setErrorMessage('');
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setErrorMessage(data.message);
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading('');
    }
  };

  const handleBackButton = () => {
    setErrorMessage('');
    setStep(step - 1);
  };

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
                    email={email}
                    setEmail={setEmail}
                    onNext={handleEmailVerification}
                    step={step}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                  />
                );
              case 2:
                return (
                  <Step2_personal_data
                    personalData={personalData}
                    setPersonalData={setPersonalData}
                    onNext={() => setStep(2)} 
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
          actionButton_href="/homepage"
          actionButton_name="Masuk Beranda"
        />
      )}
    </div>
  );
};

export default Register;
