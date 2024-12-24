import React from 'react';
import { CompanyDataStepProps } from '@/types/authTypes';
import AuthInput from '@/components/form-input/auth-input';
import AuthSelectInput from '@/components/form-input/auth-dropdown-input';
import FormHeader from '@/components/layout/auth-form-header';
import BackButton from '@/components/button/back-button';
import AuthPositiveButton from '@/components/button/auth-positive-button';

const CompanyDataStep: React.FC<CompanyDataStepProps> = ({
  companyData,
  step,
  setCompanyData,
  onNext,
  handleBackButton,
}) => {
  return (
    <div>
      <FormHeader
        title="Daftar Akun"
        subtitle="Lengkapi Data Perusahaan"
        description="Isi data perusahaan terlebih dahulu untuk melanjutkan membuat akun"
        step={step}
        page_name="register"
      />
      <form onSubmit={onNext}>
        {/* Company Name */}
        <AuthInput
          label="Nama Perusahaan"
          placeholder="PT. Terang Benderang"
          value={companyData?.name}
          onChange={(e) =>
            setCompanyData({ ...companyData, name: e.target.value })
          }
          required
          type="text"
        />
        <AuthSelectInput
          label="Jenis Jabatan "
          value={companyData?.job_position}
          options={[
            { label: 'Pilih Jabatan', value: '', hidden: true },
            {
              label: 'Presiden',
              value: 'Presiden',
            },
            {
              label: 'C-Level',
              value: 'C-Level',
            },
            {
              label: 'Manager',
              value: 'Manager',
            },
            {
              label: 'Sales',
              value: 'Sales',
            },
            {
              label: 'Lainnya',
              value: 'Lainnya',
            },
          ]}
          onChange={(e) =>
            setCompanyData({ ...companyData, job_position: e.target.value })
          }
        />
        <AuthSelectInput
          label="Jenis Industri"
          value={companyData?.industry}
          options={[
            { label: 'Pilih Jabatan', value: '', hidden: true },
            {
              label: 'Edukasi',
              value: 'Edukasi',
            },
            {
              label: 'Kesehatan',
              value: 'Kesehatan',
            },
            {
              label: 'Manufaktur',
              value: 'Manufaktur',
            },
            {
              label: 'Pariwisata',
              value: 'Pariwisata',
            },
            {
              label: 'Real Estate',
              value: 'Real Estate',
            },
            {
              label: 'Teknologi',
              value: 'Teknologi',
            },
            {
              label: 'Retail',
              value: 'Retail',
            },
            {
              label: 'Transportasi',
              value: 'Transportasi',
            },

            {
              label: 'Lainnya',
              value: 'Lainnya',
            },
          ]}
          onChange={(e) =>
            setCompanyData({ ...companyData, industry: e.target.value })
          }
        />
        <AuthPositiveButton>Selanjutnya</AuthPositiveButton>
      </form>
      <BackButton onClick={handleBackButton}>Kembali</BackButton>
    </div>
  );
};

export default CompanyDataStep;
