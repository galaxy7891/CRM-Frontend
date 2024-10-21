'use client';

import { useState } from 'react';

import AuthLeftSection from '@/components/icon-forget';
import AuthRightSection from '@/components/auth-right-section';
import Step1_email from '@/components/form/form-forget-password/step1-email';
import Step2_send_status from '@/components/form/form-forget-password/step2-send-status';

const ForgetPassword = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnClick, setIsOnClick] = useState<boolean>(false);

  const handleSendEmail = async () => {
    setIsLoading(true);
    setIsOnClick(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgot`,
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
        setStep(2);
      } else {
        console.error(data.message);
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
