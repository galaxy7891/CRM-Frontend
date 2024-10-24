'use client';
// import Image from 'next/image';
import React, { useState } from 'react';

interface InputField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  label: string;
}

interface FormComponentProps {
  fields: InputField[];
  formData: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  afterInputText?: string;
  afterInputTextHref?: string;
}

const FormComponent: React.FC<FormComponentProps> = ({
  fields,
  formData,
  handleChange,
  handleSubmit,
  buttonText,
  afterInputText,
  afterInputTextHref,
}) => {
  // Inisialisasi awal state showPassword hanya satu kali
  const initialShowPasswordState = fields.reduce((acc, field) => {
    if (field.type === 'password') {
      acc[field.name] = false; // Default hidden
    }
    return acc;
  }, {} as { [key: string]: boolean });

  const [showPassword, setShowPassword] = useState(initialShowPasswordState);

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4 relative">
          {/* Label */}
          <label
            htmlFor={field.name}
            className="block text-black text-xs font-custom font-medium my-3 md:text-base"
          >
            {field.label}
          </label>

          {/* Input */}
          <input
            type={
              field.type === 'password' && showPassword[field.name]
                ? 'text'
                : field.type
            }
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black text-opacity-50 focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
          />

          {/* Right Icon for Password Visibility Toggle */}
          {field.type === 'password' && (
            <span
              className="absolute inset-y-0 right-3 pt-5 lg:pt-7 flex items-center cursor-pointer"
              onClick={() => togglePasswordVisibility(field.name)}
            >
              {/* <Image
                src={
                  showPassword[field.name]
                    ? "/icons/open-eye.svg"
                    : "/icons/closed-eye.svg"
                }
                alt={
                  showPassword[field.name] ? "Show password" : "Hide password"
                }
                width={12}
                height={12}
                className="lg:h-6 lg:w-6 h-5 w-5"
              /> */}
            </span>
          )}
        </div>
      ))}

      {/* ?? */}
      {/* Opsional Teks Setelah Input dengan Gaya */}
      {afterInputText && (
        <div className="flex justify-end mb-4">
          <a
            href={afterInputTextHref || '#'}
            className="text-xs text-light-gold font-custom font-bold ml-1 md:text-base  hover:underline"
          >
            {afterInputText}
          </a>
        </div>
      )}

      {/* Tombol Submit */}
      <button
        type="submit"
        className="w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default FormComponent;
