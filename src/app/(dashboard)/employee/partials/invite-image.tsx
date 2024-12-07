import Image from 'next/image';
import React from 'react';

interface InviteData {
  imageSrc: string;
  title: string;
}

const InviteComponents: React.FC<InviteData> = ({ imageSrc, title }) => {
  return (
    <div className="px-10">
      <Image src={imageSrc} alt="invite" width={260} height={170} />
      <p className="font-custom font-bold mt-10 text-font-black text-lg dark:text-font-white md:text-[28px] text-center">
        {title}
      </p>
    </div>
  );
};

export default InviteComponents;
