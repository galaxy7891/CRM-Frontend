import React from 'react';
import Stepper_register from '@/components/stepper/stepper-register';
import Stepper_forget_password from '@/components/stepper/stepper-forget-password';
import Stepper_register_employee from '@/components/stepper/stepper-register-employee';

interface HeaderProps {
  title: string;
  subtitle: string;
  description: string;
  page_name: 'register' | 'forget-password' | 'register-employee';
  step: number;
}

const FormHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  description,
  step,
  page_name,
}) => {
  return (
    <div>
      <div className="pb-2 pt-3">
        <h1 className="text-2xl md:text-[28px] font-semibold text-black">
          {title}
        </h1>
        <div className="flex justify-center my-4 pb-6">
          {page_name === 'register' ? (
            <Stepper_register step={step} />
          ) : page_name === 'forget-password' ? (
            <Stepper_forget_password step={step} />
          ) : (
            <Stepper_register_employee step={step} />
          )}
        </div>
        <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
          {subtitle}
        </p>
        <p className="text-xs text-font-black font-custom lg:text-base lg:mt-3 text-justify">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
