'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ButtonConvertProps {
  handleConvert: () => void;
  handleOpenConvert: () => void;
}

const ButtonConvert: React.FC<ButtonConvertProps> = ({
  handleConvert,
  handleOpenConvert,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex md:text-base text-xs items-center px-2 py-[3px] md:p-[10px] font-medium font-custom text-font-brown bg-light-gold rounded-[10px]"
      >
        Konversi
        <Image
          src="/icons/down-brown.svg"
          alt="dropdown"
          width={14}
          height={14}
          className={`w-[10px] h-[10px] md:w-[14px] md:h-[14px] ml-2 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 z-10  rounded-md shadow dark:shadow-md"
          onMouseLeave={closeDropdown}
        >
          <ul aria-labelledby="dropdownButton">
            <li>
              <a
                onClick={handleOpenConvert}
                href="#"
                className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium border px-10 py-2 border-font-grayLight hover:bg-gray-100 dark:hover:bg-gray-800 rounded-t-md"
              >
                Manual
              </a>
            </li>
            <li>
              <a
                onClick={handleConvert}
                href="#"
                className="flex items-center text-xs justify-center md:text-base bg-font-white dark:text-font-white dark:bg-dark-navy text-dark-navy font-custom font-medium px-10 py-2 border-l border-r border-b border-font-grayLight hover:bg-gray-100 dark:hover:bg-gray-800 rounded-b-md"
              >
                Otomatis
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ButtonConvert;
