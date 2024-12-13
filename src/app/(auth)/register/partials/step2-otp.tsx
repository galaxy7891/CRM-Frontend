import React, { useState } from 'react';
import { SendOtpProps } from '@/types/authTypes';

import FormHeader from '@/components/layout/auth-form-header';
import FailText from '@/components/status/fail-text';
import BackButton from '@/components/button/back-button';
import AuthPositiveButton from '@/components/button/auth-positive-button';

const SendOtp: React.FC<SendOtpProps> = ({
  email,
  step,
  setOTP,
  errorMessage,
  isLoading,
  countdown,
  handleVerifyOTP,
  handleBackButton,
  handleSendOTP,
}) => {
  const [otpValues, setOTPValues] = useState<string[]>(Array(6).fill('')); // Initialize OTP values for 6 digits

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 1) return; // Only allow single digits

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;

    // Automatically move to the next input if value is entered
    if (value && index < otpValues.length - 1) {
      (
        document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement
      )?.focus();
    } else if (!value && index > 0) {
      // Move focus back to the previous input if the current input is empty
      (
        document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement
      )?.focus();
    }

    setOTPValues(newOtpValues);
    setOTP(newOtpValues.join('')); // Join to create the full OTP
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
      // Move focus back to the previous input if the current input is empty
      (
        document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement
      )?.focus();
    }
  };

  return (
    <div>
      <FormHeader
        title="Daftar Akun"
        subtitle="Verifikasi"
        description={`Cek email ${email} dan masukan 6 digit kode OTP yang telah terkirim`}
        step={step}
        page_name="register"
      />

      <div className="flex justify-center my-3">
        {otpValues.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value} // Set value to the individual input value
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-10 h-10 lg:w-12 lg:h-12 text-center border-2 rounded-2xl text-lg focus:outline-none bg-light-white focus:border-dark-navy mx-1 ${
              errorMessage && !value ? 'error-fields' : 'border-font-gray '
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-12 pb-8">
        <div className="col-span-11">
          {errorMessage && <FailText>{errorMessage} </FailText>}
        </div>
        <div className="col-span-1 flex justify-end pt-1">
          {countdown !== null && countdown > 0 && (
            <p className="text-xs md:text-base font-medium">00:{countdown}</p>
          )}
        </div>
      </div>
      <div className="text-center text-xs md:text-base">
        <p>
          Tidak menerima kode OTP?{' '}
          <span
            onClick={handleSendOTP}
            className="font-bold text-light-gold text-xs md:text-base :hover:opacity-80 transition-opacity duration-200 hover:underline"
          >
            {isLoading == 'Send OTP'
              ? 'Mengirim Ulang OTP...'
              : 'Kirim Ulang Kode'}
          </span>
        </p>
      </div>

      <AuthPositiveButton
        disabled={isLoading == 'Send OTP'}
        onClick={handleVerifyOTP}
      >
        {isLoading == 'Verify OTP' ? 'Memverifikasi...' : 'Verifikasi'}
      </AuthPositiveButton>

      <BackButton onClick={handleBackButton}>Kembali</BackButton>
    </div>
  );
};

export default SendOtp;
