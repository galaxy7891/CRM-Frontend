import React from 'react';
import Asterisk from '../status/required-asterisk';

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, required }) => (
  <div className="flex-1">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
      Nomor Telepon
      {required && <Asterisk />}
    </label>
    <div className="flex mt-2">
      <span className="inline-flex text-xs md:text-base font-custom items-center px-3 border dark:border-t-0 dark:border-b-0 dark:border-l-0 border-r-0 dark:border-r-2 dark:border-font-gray rounded-l-[4px] bg-gray-200 dark:bg-dark-navy dark:text-font-white border-font-black">
        +62
      </span>
      <input
        type="tel"
        className="w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-r-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
        placeholder="81234567890"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default PhoneInput;
