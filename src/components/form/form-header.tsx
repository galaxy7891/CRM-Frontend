import React from 'react';
import Stepper from '@/components/stepper';
interface HeaderProps {
  logoText: string;
  title: string;
  subtitle: string;
  description: string;
  step: number;
  step1_name: string;
  step2_name: string;
  step3_name: string;
  step4_name: string;
}

const FormHeader: React.FC<HeaderProps> = ({
  logoText,
  title,
  subtitle,
  description,
  step,
  step1_name,
  step2_name,
  step3_name,
  step4_name,
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
          <Stepper
            step={step}
            step1_name={step1_name}
            step2_name={step2_name}
            step3_name={step3_name}
            step4_name={step4_name}
          />
        </div>
        <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
          {subtitle}
        </p>
        <p className="font-small text-font-black font-custom lg:text-base lg:mt-3 text-justify ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FormHeader;
