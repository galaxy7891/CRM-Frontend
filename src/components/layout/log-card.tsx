import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  date: string;
}

const CardActivityLog = ({ title, description, date }: CardProps) => {
  return (
    <div className="bg-light-white dark:bg-dark-darkGray p-2 md:p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 hover:border hover:border-light-gold">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <h2 className="text-font-black dark:text-font-white font-custom font-bold text-xs md:text-base">
          {title}
        </h2>
        <span className="text-font-black dark:text-font-white font-custom font-medium text-xs mt-2 md:mt-0 md:order-none order-last">
          {date}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-font-black dark:text-font-white font-custom text-xs md:text-base">
          {description}
        </p>
        <Link href="#" className="ml-2 md:ml-0">
          <Image
            src="/icons/profile/more-yellow.svg"
            alt="morebtn"
            width={15}
            height={15}
            className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
          />
        </Link>
      </div>
    </div>
  );
};

export default CardActivityLog;
