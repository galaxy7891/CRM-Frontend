import React from "react";

interface HeaderProps {
  logoText: string;
  title: string;
  subtitle: string;
  description: string;
  stepper?: React.ReactNode;
}

const FormHeader: React.FC<HeaderProps> = ({
  logoText,
  title,
  subtitle,
  description,
  stepper,
}) => {
  return (
    <div className="mb-8">
      <p className="text-2xl lg:text-4xl text-font-brown font-custom">
        {logoText}
      </p>
      <p className="text-xl font-bold text-font-brown lg:mt-5 lg:text-4xl ">
        {title}
      </p>
      {stepper && <div className="my-4">{stepper}</div>}
      <p className="text-font-black text-2xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
        {subtitle}
      </p>

      <p className="font-small text-font-black font-custom lg:text-base lg:mt-3">
        {description}
      </p>
    </div>
  );
};

export default FormHeader;
