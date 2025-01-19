import { FC, ReactNode } from 'react';

interface CardPlatformProps {
  title: string;
  description: string;
  icons: ReactNode;
}

const CardPlatform: FC<CardPlatformProps> = ({ title, description, icons }) => {
  return (
    <div className="bg-light-gold rounded-2xl w-full h-full">
      <div className="flex gap-6 p-5">
        <div className="flex items-center justify-center">{icons}</div>
        <div className="font-custom flex flex-col text-font-black">
          <p className="font-bold text-base ">{title}</p>
          <p className="text-xs md:text-base font-medium ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPlatform;
