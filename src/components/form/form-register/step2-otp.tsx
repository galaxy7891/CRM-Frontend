import React, { useState } from 'react';
import FormHeader from '@/components/form/form-header';
import Countdown from '@/components/countdown';
import FailPopUp from '@/components/pop-up/fail';

interface SendOtpProps {
  otp: string; // Current OTP value
  step: number;
  setOtp: (otp: string) => void; // Function to set the OTP
  onVerify: () => void; // Function to call on OTP verification
  validation: any;
  isLoading: boolean;
}

const SendOtp: React.FC<SendOtpProps> = ({
  step,
  setOtp,
  onVerify,
  validation,
  isLoading,
}) => {
  //otp -
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill('')); // Initialize OTP values for 6 digits

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

    setOtpValues(newOtpValues);
    setOtp(newOtpValues.join('')); // Join to create the full OTP
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
        logoText="Logo"
        title="Daftar Akun"
        subtitle="Verifikasi"
        description="Cek email dan masukan kode OTP yang telah terkirim"
        step={step}
        step1_name="Verifikasi"
        step2_name="Akun"
        step3_name="Data Diri"
        step4_name="Perusahaan"
      />
      {validation && <FailPopUp message={validation} />}
      <div className="flex justify-center mt-3">
        {otpValues.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value} // Set value to the individual input value
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-10 h-10 lg:w-12 lg:h-12 bg-light-white text-center border-2 border-font-gray rounded-2xl text-lg focus:outline-none focus:border-dark-navy mx-1"
          />
        ))}
      </div>
      <div className="flex justify-end mt-1">
        <Countdown />
      </div>
      <button
        onClick={onVerify}
        disabled={isLoading}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
      </button>
    </div>
  );
};

export default SendOtp;
