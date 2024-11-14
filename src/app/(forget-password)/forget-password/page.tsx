'use client';

import { useState } from 'react';
import { sendForgotPasswordEmail } from '@/redux/actions/profileActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import AuthLeftSection from '@/components/icon-forget';
import AuthRightSection from '@/components/layout/auth-right-section';
import Step1_email from '@/app/(forget-password)/forget-password/partials/step1-email';
import Step2_send_status from '@/app/(forget-password)/forget-password/partials/step2-send-status';

const ForgetPassword = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleSendEmail = async () => {
    dispatch(
      sendForgotPasswordEmail(email, setIsLoading, setErrorMessage, setStep)
    );
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
                    errorMessage={errorMessage}
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
              <Link
                href="/login"
                className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
              >
                Masuk
              </Link>
            </p>
          </div>
        </AuthRightSection>
      </div>
    </div>
  );
};

export default ForgetPassword;
