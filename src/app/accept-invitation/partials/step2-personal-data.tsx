import React from 'react';
import { useState } from 'react';
import FormHeader from '@/components/layout/auth-form-header';
import FailText from '@/components/status/fail-text';
import BackButton from '@/components/button/back-button';

interface PersonalData {
  first_name: string;
  last_name: string;
  phone: string;
}

interface PersonalDataStepProps {
  personalData: PersonalData;
  step: number;
  isLoading: boolean;
  onNext: () => void;
  setPersonalData: (data: PersonalData) => void;
  handleBackButton: () => void;
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({
  personalData,
  setPersonalData,
  onNext,
  step,
  isLoading,
  handleBackButton,
}) => {
  const [isOnClick, setIsOnClick] = useState<boolean>(false);
  const handleCheckField = () => {
    setIsOnClick(true);
    if (personalData.first_name && personalData.phone) {
      onNext();
    }
  };
  return (
    <div>
      <FormHeader
        title="Kolaborasi Akun"
        subtitle="Lengkapi Data Diri"
        description="Isi data diri terlebih dahulu untuk melanjutkan kolaborasi akun"
        step={step}
        page_name="register-employee"
      />

      {/* First Name */}
      <label
        htmlFor="first_name"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Nama Depan
      </label>
      <input
        required
        name="first_name"
        type="text"
        value={personalData?.first_name}
        onChange={(e) =>
          setPersonalData({ ...personalData, first_name: e.target.value })
        }
        placeholder="John"
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none rounded-lg bg-light-white focus:border-dark-navy  ${
          isOnClick && !personalData?.first_name
            ? 'error-fields'
            : 'border-font-gray'
        }`}
      />
      {isOnClick && !personalData?.first_name && (
        <FailText>Nama depan tidak boleh kosong</FailText>
      )}

      {/* Last Name */}
      <label
        htmlFor="last_name"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Nama Belakang
      </label>
      <input
        required
        name="last_name"
        type="text"
        value={personalData?.last_name}
        onChange={(e) =>
          setPersonalData({ ...personalData, last_name: e.target.value })
        }
        placeholder="Doe"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />

      {/* Phone */}
      <label
        htmlFor="phone"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Nomor Telepon
      </label>
      <div
        className={`flex items-center border-2 border-font-gray rounded-lg bg-light-white  ${
          isOnClick && !personalData?.phone
            ? 'error-fields'
            : 'border-font-gray'
        }`}
      >
        {/* Country Code */}
        <div
          className={`bg-gray-100 px-3 py-2 text-black text-opacity-50 border-r  ${
            isOnClick && !personalData?.phone
              ? 'error-fields'
              : 'border-font-gray'
          }`}
        >
          +62
        </div>

        {/* Phone Input */}
        <input
          required
          name="phone"
          type="numeric"
          value={personalData?.phone}
          onChange={(e) => {
            // Allow only numeric input
            const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
            setPersonalData({ ...personalData, phone: value });
          }}
          placeholder="888xxxxx"
          className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom bg-light-white text-black focus:outline-none focus:border-dark-navy rounded-r-lg  ${
            isOnClick && !personalData?.phone
              ? 'error-fields'
              : 'border-font-gray'
          }`}
        />
      </div>
      {isOnClick && !personalData?.phone && (
        <FailText>Nomor telepon tidak boleh kosong</FailText>
      )}

      <button
        onClick={handleCheckField}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        {isLoading ? 'Loading...' : 'Daftar'}
      </button>
      <BackButton onClick={handleBackButton}>Kembali</BackButton>
    </div>
  );
};

export default PersonalDataStep;
