'use client';

import { useState } from 'react';
import ChangePasswordForm from './partials/step1-change-password';
import EmailSend from './partials/step2-email-send';
import axios from 'axios';

const ChangePassword = () => {
  const [step, setStep] = useState<number>(1);

  const handleSendEmail = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgot`,
        {},

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pastikan untuk menyertakan token jika diperlukan
          },
        }
      );

      if (response.data.success) {
        alert('Email untuk reset kata sandi telah dikirim!');
        setStep(2);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error sending forgot password request:', error);
    }
  };

  const handleBackButton = () => {
    setStep(step - 1);
  };

  return (
    <div className="bg-font-white  dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full flex items-center justify-center">
      {step === 1 && <ChangePasswordForm handleSendEmail={handleSendEmail} />}
      {step === 2 && (
        <EmailSend
          handleSendEmail={handleSendEmail}
          handleBackButton={handleBackButton}
        />
      )}
    </div>
  );
};

export default ChangePassword;
