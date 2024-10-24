import Image from "next/image";
import React from "react";

interface HeaderProps {
  imageSrc: string;
  title: string;
  description: React.ReactNode;
}

const HeaderChangePassword = ({
  imageSrc,
  title,
  description,
}: HeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center mt-4">
      <Image src={imageSrc} alt="header image" width={100} height={100} />
      <p className="mt-3 text-xs font-medium text-font-black font-custom lg:text-base dark:text-font-white">
        {title}
      </p>
      <p className="mt-1 text-font-black font-custom text-xs dark:text-font-white">
        {description}
      </p>
    </div>
  );
};

export default HeaderChangePassword;
