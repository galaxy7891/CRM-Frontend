import React from "react";
import { AuthLeftSectionProps } from "@/types/otherTypes";
import Image from "next/image";

const AuthLeftSection: React.FC<AuthLeftSectionProps> = ({
  title,
  imageSrc,
}) => {
  return (
    <div className="flex bg-dark-navy flex-col justify-center items-center sticky top-0 h-screen px-11">
      <Image
        src={imageSrc}
        alt="Gambar di Kolom Kiri"
        width={530}
        height={280}
        priority
        className="h-auto w-auto"
      />
      <p className="text-font-white font-custom text-xl mt-12 ">{title}</p>
    </div>
  );
};

export default AuthLeftSection;
