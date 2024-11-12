'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SuccessModalProps } from '@/types/otherTypes';

const SuccessModel: React.FC<SuccessModalProps> = ({
  header,
  description,
  closeModal,
  actionButton_href,
  actionButton_action,
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
      <div className="relative w-[500px] bg-font-white rounded-[30px] shadow-lg pb-5  px-4 md:px-8">
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

        <div className="flex flex-col items-center text-center">
          <div className="pt-2">
            <Image
              src="/icons/status/success.svg"
              alt="success"
              width={50}
              height={50}
              className="relative w-32 h-32 shadow-custom-success"
            />
          </div>
          <h2 className="font-button-md font-semibold text-font-brown  md:text-base">
            {header}
          </h2>
          <p className="text-xs md:text-base my-3">{description}</p>
          {actionButton_action && (
            <div className="w-full">
              <button
                onClick={actionButton_action}
                type="submit"
                className="flex justify-center px-8 py-2 w-full font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
              >
                {actionButton_name}
              </button>
            </div>
          )}

          {actionButton_href && (
            <div className="w-full">
              <a
                href={actionButton_href}
                className=' className="flex justify-center px-8 py-2 w-full font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
              '
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

export default SuccessModel;
