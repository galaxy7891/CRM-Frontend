// components/EmailStep.tsx
import React from 'react';
import FormHeader from '@/components/form-header';

interface EmailStepProps {
  email: string;
  step: number;
  setEmail: (email: string) => void;
  onNext: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({
  email,
  setEmail,
  onNext,
  step,
}) => {
  return (
    <div>
      <FormHeader
        logoText="Logo"
        title="Daftar Akun"
        subtitle="Masukkan Email"
        description="Masukan email untuk verifikasi"
        step={step}
      />
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
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        Kirim OTP
      </button>
    </div>
  );
};

export default EmailStep;
