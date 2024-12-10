import React from 'react';
import { SendEmailProps } from '@/types/authTypes';
import FormHeader from '@/components/layout/auth-form-header';
import InputAuth from '@/components/form-input/auth-input';
import AuthPositiveButton from '@/components/button/auth-positive-button';

const SendEmail: React.FC<SendEmailProps> = ({
  email,
  setEmail,
  onNext,
  step,
  errorMessage,
  isLoading,
}) => {
  return (
    <>
      <FormHeader
        title="Daftar Akun"
        subtitle="Masukkan Email"
        description="Masukan email untuk verifikasi"
        step={step}
        page_name="register"
      />
      <form onSubmit={onNext}>
        <InputAuth
          required
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errorMessage && (
          <p className="text-xs text-red-500 mt-2">{errorMessage}</p>
        )}
        <AuthPositiveButton disabled={isLoading == 'Send OTP'}>
          {isLoading == 'Send OTP' ? 'Mengirim OTP...' : 'Kirim OTP'}
        </AuthPositiveButton>
      </form>
    </>
  );
};

export default SendEmail;
