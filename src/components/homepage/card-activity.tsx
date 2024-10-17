import Image from "next/image";
import { FC } from "react";

interface CardProps {
  title: string;
  count: number;
  link: string; // Menambahkan properti link
}

const Card: FC<CardProps> = ({ title, count, link }) => {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg bg-light-white w-full max-w-xs 
                    transform transition-transform duration-500 hover:scale-105 hover:shadow-xs">
      <div>
        <p className="text-xs lg:text-base font-custom text-font-black 
                      transition-opacity duration-300 delay-100 hover:opacity-100">
          {title}
        </p>
        <p className="text-xl lg:text-4xl font-custom text-font-black 
                      transition-opacity duration-500 delay-200 hover:opacity-100">
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
