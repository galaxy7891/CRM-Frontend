'use client';
import { FormComponentProps } from '@/types/authTypes';
import React, { useState } from 'react';

const FormComponent: React.FC<FormComponentProps> = ({
  fields,
  formData,
  handleChange,
  handleSubmit,
  buttonText,
  afterInputText,
  afterInputTextHref,
}) => {
  const initialShowPasswordState = fields.reduce((acc, field) => {
    if (field.type === 'password') {
      acc[field.name] = false;
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
            ></span>
          )}
        </div>
      ))}

      {/* ?? */}
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
