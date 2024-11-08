'use client';

import { useState } from 'react';
import axios from 'axios';

import AuthLeftSection from '@/components/icon-forget';
import AuthRightSection from '@/components/layout/auth-right-section';
import Step1_email from '@/app/(forget-password)/forget-password/partials/step1-email';
import Step2_send_status from '@/app/(forget-password)/forget-password/partials/step2-send-status';

const ForgetPassword = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnClick, setIsOnClick] = useState<boolean>(false);


  const handleSendEmail = async () => {
    setIsLoading(true);
    setIsOnClick(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgot`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.data.success) {
        setStep(2);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackButton = () => {
    setStep(1);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <AuthLeftSection />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <AuthRightSection>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <Step1_email
                    step={step}
                    email={email}
                    setEmail={setEmail}
                    onNext={handleSendEmail}
                    isLoading={isLoading}
                    isOnClick={isOnClick}
                  />
                );
              case 2:
                return (
                  <Step2_send_status step={step} onBack={handleBackButton} />
                );
              default:
                return null;
            }
          })()}
          <div className="mt-5 text-center">
            <p className="text-xs md:text-base font-custom font-medium">
              Ingat kata sandi?
              <a
                href="/login"
                className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
              >
                Masuk
              </a>
            </p>
          </div>
        </AuthRightSection>
      </div>
    </div>
  );
};

export default ForgetPassword;
