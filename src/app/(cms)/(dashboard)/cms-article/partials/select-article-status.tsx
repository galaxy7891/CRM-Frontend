// components/SelectArticleStatus.tsx
import Asterisk from '@/components/status/required-asterisk';
import React from 'react';

interface SelectArticleStatusProps {
  label: string;
  value: string;
  options: { label: string; value: string; hidden?: boolean }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const SelectArticleStatus: React.FC<SelectArticleStatusProps> = ({
  label,
  value,
  options,
  onChange,
  disabled,
  required = false,
}) => (
  <div className="flex-1">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
      {label}
      {required && <Asterisk />}
    </label>

    {disabled ? (
      <input
        type="text"
        className={`w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] text-black  dark:border-none dark:text-font-white dark:bg-gray-800 bg-gray-300
      `}
        value={value}
        disabled
      />
    ) : (
      <select
        className={`w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white text-black  dark:border-none dark:text-font-white ${
          value ? 'text-black' : 'text-gray-500'
        } `}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            hidden={option.hidden}
          >
            {option.label}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default SelectArticleStatus;
