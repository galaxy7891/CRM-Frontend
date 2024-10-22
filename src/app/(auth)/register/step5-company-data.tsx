// components/companyDataStep.tsx
import React from 'react';
import { useState } from 'react';
import FailText from '@/components/status/fail-text';
import FormHeader from '@/components/form/form-header';
import BackButton from '@/components/button/back-button';

interface CompanyDataStepProps {
  companyData: CompanyData;
  step: number;
  isLoading: string;
  setCompanyData: (data: CompanyData) => void;
  handleRegister: () => void;
  handleBackButton: () => void;
}
interface CompanyData {
  name: string;
  industry: string;
  job_position: string;
}

const CompanyDataStep: React.FC<CompanyDataStepProps> = ({
  companyData,
  step,
  isLoading,
  setCompanyData,
  handleRegister,
  handleBackButton,
}) => {
  const [isOnClick, setIsOnClick] = useState<boolean>(false);

  const handleCheckField = () => {
    setIsOnClick(true);
    if (companyData.name && companyData.industry && companyData.industry) {
      handleRegister();
    }
  };

  return (
    <div>
      <FormHeader
        title="Daftar Akun"
        subtitle="Lengkapi Data Perusahaan"
        description="Isi data perusahaan terlebih dahulu untuk melanjutkan membuat akun"
        step={step}
        page_name="register"
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
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none ${
          isOnClick && !companyData?.name ? 'error-fields' : 'border-font-gray'
        } rounded-lg bg-light-white focus:border-dark-navy `}
      />
      {isOnClick && !companyData?.name && (
        <FailText message="Nama perushaan tidak boleh kosong" />
      )}

      {/* Industry */}
      <label
        htmlFor="job_potition"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Jenis Jabatan
      </label>
      <select
        name="job_potition"
        value={companyData?.job_position}
        onChange={(e) =>
          setCompanyData({ ...companyData, job_position: e.target.value })
        }
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 focus:outline-none  ${
          isOnClick && companyData?.job_position == ''
            ? 'error-fields'
            : 'border-font-gray'
        }  rounded-lg bg-light-white focus:border-dark-navy ${
          companyData?.job_position ? 'text-black' : 'text-gray-500'
        }`}
      >
        <option value="" disabled hidden>
          Pilih Jabatan
        </option>
        <option value="Presiden" className="bg-white ">
          Presiden
        </option>
        <option value="C-Level" className="bg-white">
          C-Level
        </option>
        <option value="Manager" className="bg-white">
          Manager
        </option>
        <option value="Sales" className="bg-white">
          Sales
        </option>
        <option value="Lainnya" className="bg-white">
          Lainnya
        </option>
      </select>
      {isOnClick && companyData?.job_position == '' && (
        <FailText message="Jabatan tidak boleh kosong" />
      )}
      {/* Job Position */}
      <label
        htmlFor="job_position"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Jenis Industri
      </label>
      <select
        name="job_position"
        value={companyData?.industry}
        onChange={(e) =>
          setCompanyData({ ...companyData, industry: e.target.value })
        }
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 focus:outline-none ${
          isOnClick && companyData?.industry == ''
            ? 'error-fields'
            : 'border-font-gray'
        } rounded-lg bg-light-white focus:border-dark-navy ${
          companyData?.industry === '' ? 'text-gray-500' : 'text-black'
        }`}
      >
        <option value="" disabled hidden>
          Pilih Jenis Industri
        </option>
        <option value="Manufaktur" className="bg-white">
          Manufaktur
        </option>
        <option value="Teknologi" className="bg-white">
          Teknologi
        </option>
        <option value="Lainnya" className="bg-white">
          Lainnya
        </option>
      </select>
      {isOnClick && companyData?.industry == '' && (
        <FailText message="Jenis industri tidak boleh kosong" />
      )}

      <button
        onClick={handleCheckField}
        disabled={isLoading == 'Register'}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        {isLoading == 'Register' ? 'Mengirim...' : 'Kirim'}
      </button>
      <BackButton onClick={handleBackButton}>Kembali</BackButton>
    </div>
  );
};

export default CompanyDataStep;
