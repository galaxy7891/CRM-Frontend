'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FailModel() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
      <div className="relative w-[300px] bg-font-white rounded-[30px] shadow-lg py-5 px-7">
        <button
          type="button"
          className="absolute top-4 right-4"
          onClick={handleClose}
        >
          <Image
            src="/icons/closed.svg"
            alt="close"
            width={10}
            height={10}
            className=""
          />
        </button>

        <div className="flex flex-col items-center py-3 space-y-3 text-center">
          <div className="icon">
            <Image
              src="/icons/fail.svg"
              alt="success"
              width={50}
              height={50}
              className="relative w-20 h-20 shadow-custom-success"
            />
          </div>
          <h2 className="font-button-md">Password gagal dirubah</h2>
          <div className="w-full">
            <a
              href="/login"
              type="submit"
              className="inline-block px-8 py-2 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
