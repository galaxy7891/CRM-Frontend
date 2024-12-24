import Asterisk from '@/components/status/required-asterisk';
import React from 'react';

interface TitleArticleProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const TitleArticle: React.FC<TitleArticleProps> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  required = false,
}) => (
  <div className="flex-1 ">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white font-bold">
      {label}
      {required && <Asterisk />}
    </label>
    <input
      disabled={disabled}
      type="text"
      className={`w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none
         border-font-black rounded-[4px] dark:bg-dark-darkGray dark:border-none dark:text-font-white ${
           disabled
             ? 'dark:bg-gray-800 bg-gray-200 border-gray-300 '
             : 'bg-font-white border-grey-200 border-gray-400'
         }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TitleArticle;
