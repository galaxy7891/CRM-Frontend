import Image from 'next/image';
import { FC } from 'react';

interface CardProps {
  title: string;
  count: number;
  link: string; // Menambahkan properti link
}

const Card: FC<CardProps> = ({ title, count, link }) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg bg-light-white w-full  transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
      <div className="w-full">
        <p className="text-xs lg:text-base font-custom text-font-black transition-opacity duration-300 delay-100 hover:opacity-100 truncate">
          {title}
        </p>
        <p className="text-xl lg:text-4xl font-custom text-font-black transition-opacity duration-500 delay-200 hover:opacity-100 truncate">
          {count}
        </p>
      </div>
      <a href={link}>
        <Image
          src="/icons/homepage/more-yellow.svg"
          alt="more"
          width={15}
          height={15}
          className="transition-opacity duration-700 delay-300 hover:opacity-100"
        />
      </a>
    </div>
  );
};

export default Card;
