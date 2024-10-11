// components/PersonalDataStep.tsx
import React from 'react';
import FormHeader from '../form-header';

interface PersonalData {
  first_name: string;
  last_name: string;
  phone: string;
  job_position: string;
  password: string;
}

interface PersonalDataStepProps {
  personalData: PersonalData;
  step: number;
  setPersonalData: (data: PersonalData) => void;
  onNext: () => void;
}

const PersonalDataStep: React.FC<PersonalDataStepProps> = ({
  personalData,
  setPersonalData,
  onNext,
  step,
}) => {
  return (
    <div>
      <FormHeader
        logoText="Logo"
        title="Daftar Akun"
        subtitle="Lengkapi Data Diri"
        description="Isi data diri terlebih dahulu untuk melanjutkan membuat akun."
        step={step}
      />
      {/* First Name */}
      <label
        htmlFor="first_name"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        First Name
      </label>
      <input
        name="first_name"
        type="text"
        value={personalData?.first_name}
        onChange={(e) =>
          setPersonalData({ ...personalData, first_name: e.target.value })
        }
        placeholder="John"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />
      {/* Last Name */}
      <label
        htmlFor="last_name"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Last Name
      </label>
      <input
        name="last_name"
        type="text"
        value={personalData?.last_name}
        onChange={(e) =>
          setPersonalData({ ...personalData, last_name: e.target.value })
        }
        placeholder="Doe"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />
      {/* Job Position */}
      <label
        htmlFor="job_position"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Posisi Pekerjaan
      </label>
      <input
        name="job_position"
        type="text"
        value={personalData?.job_position}
        onChange={(e) =>
          setPersonalData({ ...personalData, job_position: e.target.value })
        }
        placeholder="C-Level"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />
      {/* Phone */}
      <label
        htmlFor="phone"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Nomor Telepon
      </label>
      <input
        name="phone"
        type="text"
        value={personalData?.phone}
        onChange={(e) =>
          setPersonalData({ ...personalData, phone: e.target.value })
        }
        placeholder="08XXXXXXXXX"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />

      {/* Password */}
      <label
        htmlFor="password"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Password
      </label>
      <input
        name="password"
        type="password"
        value={personalData?.password}
        onChange={(e) =>
          setPersonalData({ ...personalData, password: e.target.value })
        }
        placeholder="password"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />

      {/* <label
        htmlFor="password"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Confirm Password
      </label>
      <input
        name="phone"
        type="password"
        value={personalData?.phone}
        onChange={(e) =>
          setPersonalData({ ...personalData, phone: e.target.value })
        }
        placeholder="password"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      /> */}

      <button
        onClick={onNext}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        Lanjut
      </button>
    </div>
  );
};

export default PersonalDataStep;
