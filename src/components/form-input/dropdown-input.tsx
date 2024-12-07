// components/SelectInput.tsx
import React from 'react';
import Asterisk from '../status/required-asterisk';
interface SelectInputProps {
  label: string;
  value: string;
  options: { label: string; value: string; hidden?: boolean }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
}) => (
  <div className="flex-1">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
      {label}
      {required && <Asterisk />}
    </label>
    <select
      disabled={disabled}
      className={`w-full mt-2 p-2 border text-xs md:text-base font-custom
         focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] text-black
         ${disabled ? 'dark:bg-gray-800 bg-gray-300 ' : 'bg-font-white'}
          dark:bg-dark-navy dark:border-none dark:text-font-white ${
            value ? 'text-black' : 'text-gray-500'
          } `}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option
          className="max-h-12"
          key={option.value}
          value={option.value}
          hidden={option.hidden}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
