import React from 'react';
import { PersonalDataStepProps } from '@/types/authTypes';
import BackButton from '@/components/button/back-button';
import FormHeader from '@/components/layout/auth-form-header';
import AuthInput from '@/components/form-input/auth-input';
import AuthPhoneInput from '@/components/form-input/auth-phone-input';
import AuthPositiveButton from '@/components/button/auth-positive-button';

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({
  personalData,
  setPersonalData,
  handleBackButton,
  onNext,
  step,
}) => {
  return (
    <div>
      <FormHeader
        title="Daftar Akun"
        subtitle="Lengkapi Data Diri"
        description="Isi data diri terlebih dahulu untuk melanjutkan membuat akun"
        step={step}
        page_name="register"
      />
      <form onSubmit={onNext}>
        {/* First Name */}
        <AuthInput
          label="Nama Depan"
          placeholder="John"
          value={personalData?.first_name}
          onChange={(e) =>
            setPersonalData({ ...personalData, first_name: e.target.value })
          }
          required
          type="text"
        />
        <AuthInput
          label="Nama Belakang"
          placeholder="Doe"
          value={personalData?.last_name}
          onChange={(e) =>
            setPersonalData({ ...personalData, last_name: e.target.value })
          }
          required
          type="text"
        />

        <AuthPhoneInput
          value={personalData?.phone}
          onChange={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, ''); // Hanya angka
            setPersonalData({ ...personalData, phone: value });
          }}
        />

        <AuthPositiveButton>Selanjutnya</AuthPositiveButton>
      </form>
      <BackButton onClick={handleBackButton}>Kembali</BackButton>
    </div>
  );
};

export default PersonalDataStep;
