import React from "react";
import Asterisk from "../status/required-asterisk";

interface DurationInputProps {
  label: string;
  placeholder: string;
  textValue: string;
  selectValue: string;
  options: { label: string; value: string; hidden?: boolean }[];
  onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const DurationInput: React.FC<DurationInputProps> = ({
  label,
  placeholder,
  textValue,
  selectValue,
  options,
  disabled = false,
  onTextChange,
  onSelectChange,
  required = false,
}) => (
  <div className="flex-1">
    {/* Label */}
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white mb-2">
      {label}
      {required && <Asterisk />}
    </label>

    {/* Input and Select Row */}
    <div className="flex gap-1">
      {/* Text Input */}
      <input
        disabled={disabled}
        type="text"
        className={`w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] dark:bg-dark-navy dark:border-none dark:text-font-white ${
          disabled ? "dark:bg-gray-800 bg-gray-300" : "bg-font-white"
        }`}
        placeholder={placeholder}
        value={textValue}
        onChange={onTextChange}
      />

      {/* Select Dropdown */}
      <select
        disabled={disabled}
        className={`w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white ${
          selectValue ? "text-black" : "text-gray-500"
        }`}
        value={selectValue}
        onChange={onSelectChange}
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
    </div>
  </div>
);

export default DurationInput;
