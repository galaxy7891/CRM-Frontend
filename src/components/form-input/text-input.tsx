import React from "react";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="flex-1">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
      {label}
      {required && (
        <span className="font-custom text-dark-red dark:text-dark-redGlow md:text-base text-xs">
          *
        </span>
      )}
    </label>
    <input
      type="text"
      className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
