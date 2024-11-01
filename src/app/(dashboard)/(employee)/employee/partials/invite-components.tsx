import Image from "next/image";
import React from "react";

interface InviteData {
  imageSrc: string;
  title: string;
}

const InviteComponents: React.FC<InviteData> = ({ imageSrc, title }) => {
  return (
    <>
      <Image src={imageSrc} alt="invite" width={236} height={190} />
      <p className="font-custom font-bold mt-10 text-font-black text-lg dark:text-font-white md:text-[28px]">
        {title}
      </p>
    </>
  );
};

export default InviteComponents;
