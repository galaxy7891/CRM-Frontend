// components/SelectArticleStatus.tsx
import Asterisk from "@/components/status/required-asterisk";
import React from "react";

interface SelectArticleStatusProps {
  label: string;
  value: string;
  options: { label: string; value: string; hidden?: boolean }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const SelectArticleStatus: React.FC<SelectArticleStatusProps> = ({
  label,
  value,
  options,
  onChange,
  required = false,
}) => (
  <div className="flex-1">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
      {label}
      {required && <Asterisk />}
    </label>
    <select
      className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-darkGray dark:border-none dark:text-font-white"
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} hidden={option.hidden}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectArticleStatus;
