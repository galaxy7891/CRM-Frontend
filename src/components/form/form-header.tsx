import React from 'react';
import Stepper_register from '@/components/stepper/stepper-register';
import Stepper_forget_password from '@/components/stepper/stepper-forget-password';

interface HeaderProps {
  logoText: string;
  title: string;
  subtitle: string;
  description: string;
  page_name: 'register' | 'forget-password';
  step: number;
}

const FormHeader: React.FC<HeaderProps> = ({
  logoText,
  title,
  subtitle,
  description,
  step,
  page_name,
}) => {
  return (
    <div>
      <p className="text-2xl lg:text-4xl text-font-brown font-custom pb-2">
        {logoText}
      </p>
      <div className="pb-2">
        <h1 className="text-2xl md:text-[28px] font-bold text-font-brown lg:mt-5">
          {title}
        </h1>
        <div className=" flex justify-center my-4 pb-6">
          {page_name === 'register' ? (
            <Stepper_register step={step} />
          ) : (
            <Stepper_forget_password step={step} />
          )}
        </div>
        <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
          {subtitle}
        </p>
        <p className="text-xs text-font-black font-custom lg:text-base lg:mt-3 text-justify ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
