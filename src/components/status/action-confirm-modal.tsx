'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ActionConfirmModalProps } from '@/types/otherTypes';

const SuccessModal: React.FC<ActionConfirmModalProps> = ({
  header,
  description,
  closeModal,
  actionButtonNegative_action,
  actionButtonPositive_name,
  actionButtonPositive_action,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
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
              src="/icons/status/action-confirm.svg"
              alt="success"
              width={50}
              height={50}
              className="relative w-32 h-32 shadow-custom-success"
            />
          </div>

          <h2 className="font-button-md font-semibold text-font-brown md:text-base">
            {header}
          </h2>
          <p className="text-xs md:text-base my-3">{description}</p>

          <div className="w-full flex gap-2 justify-center ">
            <button
              onClick={actionButtonNegative_action}
              type="submit"
              className="flex flex-1 justify-center px-4 py-2 mt-3 font-custom bg-white  border-2 text-light-gold border-dark-gold font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
            >
              Kembali
            </button>

            <button
              onClick={actionButtonPositive_action}
              type="submit"
              className="flex flex-1 justify-center px-4 py-2 mt-3 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
            >
              {actionButtonPositive_name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
