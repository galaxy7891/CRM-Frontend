// components/companyDataStep.tsx
import React from 'react';
import FormHeader from '../form-header';

interface CompanyData {
  name: string;
  industry: string;
}

interface CompanyDataStepProps {
  companyData: CompanyData;
  step: number;
  setCompanyData: (data: CompanyData) => void;
  onNext: () => void;
}

const CompanyDataStep: React.FC<CompanyDataStepProps> = ({
  companyData,
  setCompanyData,
  onNext,
  step,
}) => {
  return (
    <div>
      <FormHeader
        logoText="Logo"
        title="Daftar Akun"
        subtitle="Lengkapi Data Perusahaan"
        description="Isi data perusahaan terlebih dahulu untuk melanjutkan membuat akun."
        step={step}
      />
      {/* Name */}
      <label
        htmlFor="company_name"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Nama Perusahaan
      </label>
      <input
        name="company_name"
        type="text"
        value={companyData?.name}
        onChange={(e) =>
          setCompanyData({ ...companyData, name: e.target.value })
        }
        placeholder="PT. Terang Benderang"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />
      {/* Industry */}
      <label
        htmlFor="Industry"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Jenis Industri
      </label>
      <input
        type="text"
        value={companyData?.industry}
        onChange={(e) =>
          setCompanyData({ ...companyData, industry: e.target.value })
        }
        placeholder="Tekstil"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />

      <button
        onClick={onNext}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        Lanjut
      </button>
    </div>
  );
};

export default CompanyDataStep;
