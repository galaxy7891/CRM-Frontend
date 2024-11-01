"use client";

import Image from "next/image";
import { useState } from "react";

interface AllertModalProps {
  header: string;
  description: string;
  closeModal: boolean;
  actionButton: boolean;
  actionButton_href: string;
  actionButton_name: string;
}
const AllertModal: React.FC<AllertModalProps> = ({
  header,
  description,
  closeModal,
  actionButton,
  actionButton_href,
  actionButton_name,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 px-4">
      <div className="relative w-[240px] md:w-[450px] bg-font-white rounded-[30px] shadow-lg py-5 px-2">
        {closeModal && (
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
        )}

        <div className="flex flex-col items-center py-3 space-y-3 text-center">
          <div className="icon">
            <Image
              src="/icons/modal/allert.svg"
              alt="success"
              width={50}
              height={50}
              className="relative w-[100px] h-[100px] shadow-custom-success"
            />
          </div>
          <h2 className="text-xs md:text-xl font-bold font-custom text-font-black">
            {header}
          </h2>
          <p className=" text-xs md:text-xl text-font-black font-custom">{description}</p>
          {actionButton && (
            <div className="w-full">
              <a
                href={actionButton_href}
                type="submit"
                className="inline-block px-8 py-2 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
              >
                {actionButton_name}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllertModal;
