"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const ButtonFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button Filter */}
      <button
        onClick={toggleDropdown}
        className="p-[6px] lg:p-[10px]  rounded-[10px] font-medium text-xs lg:text-base border border-dark-gold text-dark-gold flex items-center space-x-1 duration-200 hover:shadow-md hover:shadow-dark-gold"
      >
        <Image
          src="/icons/table/filter-yellow.svg"
          alt="filter icon"
          width={20}
          height={20}
          className="w-[10px] h-[10px] lg:w-[20px] lg:h-[20px]"
        />
        <span>Filter</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="z-50 absolute right-0 mt-2 px-5 py-6 bg-font-white dark:bg-dark-navy backdrop-blur-sm border border-font-gray rounded-lg shadow-lg">
          {/* Tanggal Dibuat */}
          <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
            Tanggal Dibuat
          </p>
          <div className="flex flex-row gap-2 mb-4">
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              Terbaru
            </button>
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              Terlama
            </button>
          </div>

          {/* Status */}
          <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
            Status
          </p>
          <div className="flex flex-row gap-2 mb-4">
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              Rendah
            </button>
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              Sedang
            </button>
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              Tinggi
            </button>
          </div>
          <p className="font-medium text-xs mb-3 font-custom text-font-black dark:text-font-white">
            Jumlah Halaman
          </p>
          <div className="flex flex-row gap-2">
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              10
            </button>
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              25
            </button>
            <button className="w-[79px] h-[32px] rounded-[5px] p-2 border  backdrop-blur-sm border-dark-gold font-custom text-dark-gold text-xs hover:border-light-brownLight hover:bg-dropdown-lightYellow hover:text-light-brownLight dark:hover:bg-dark-brownLight dark:hover:border-dropdown-lightYellow dark:hover:text-dropdown-lightYellow">
              50
            </button>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 rounded-[4px] bg-light-gold w-full text-font-brown font-custom font-bold"
          >
            Konfirmasi
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonFilter;
