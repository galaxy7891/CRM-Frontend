import React from 'react';
import FormHeader from '@/components/form/form-header';
import FailPopUp from '@/components/status/fail-card';

interface SendEmailProps {
  email: string;
  step: number;
  setEmail: (email: string) => void;
  onNext: () => void;
  validation: string;
  isLoading: string;
}

const SendEmail: React.FC<SendEmailProps> = ({
  email,
  setEmail,
  onNext,
  step,
  validation,
  isLoading,
}) => {
  return (
    <div>
      <FormHeader
        title="Daftar Akun"
        subtitle="Masukkan Email"
        description="Masukan email untuk verifikasi"
        step={step}
        page_name="register"
      />
      {validation && <FailPopUp message={validation} />}
      <label
        htmlFor="email"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="user@example.com"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />
      <button
        onClick={onNext}
        disabled={isLoading == 'Send OTP'}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        {isLoading == 'Send OTP' ? 'Mengirim OTP...' : 'Kirim OTP'}
      </button>
    </div>
  );
};

export default SendEmail;
