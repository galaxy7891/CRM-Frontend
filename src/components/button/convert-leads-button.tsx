'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface ButtonConvertProps {
  handleConvert: () => void;
  handleConvertConfirmation: () => void;
}

const ButtonConvert: React.FC<ButtonConvertProps> = ({
  handleConvert,
  handleConvertConfirmation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex md:text-base text-xs items-center px-2 py-2  md:p-[10px] font-medium font-custom text-font-brown bg-light-gold rounded-[10px]"
      >
        Konversi
        <Image
          src="/images/icons/down-brown.svg"
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
        <div className="absolute right-0 mt-2 z-10  rounded-md shadow dark:shadow-md">
          <ul aria-labelledby="dropdownButton">
            <li>
              <a
                onClick={handleConvertConfirmation}
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
