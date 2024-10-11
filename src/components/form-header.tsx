import React from 'react';
import Stepper from '@/components/stepper';
interface HeaderProps {
  logoText: string;
  title: string;
  subtitle: string;
  description: string;
  step: number;
}

const FormHeader: React.FC<HeaderProps> = ({
  logoText,
  title,
  subtitle,
  description,
  step,
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
          <Stepper step={step} />
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
