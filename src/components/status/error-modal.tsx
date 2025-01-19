'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SuccessModalProps } from '@/types/otherTypes';

const ErrorModal: React.FC<SuccessModalProps> = ({
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
      <div className="relative w-[500px] bg-font-white dark:bg-dark-navy rounded-[30px] shadow-lg pb-5  px-4 md:px-8">
        {closeModal && (
          <button
            type="button"
            className="absolute top-4 right-4"
            onClick={handleClose}
          >
            <svg
              // width="25"
              // height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-font-black dark:fill-font-white w-3 md:w-4 md:h-7"
            >
              <path d="M0.524505 0.524505C0.690347 0.358244 0.887359 0.226334 1.10426 0.13633C1.32116 0.046327 1.55368 0 1.78852 0C2.02335 0 2.25587 0.046327 2.47277 0.13633C2.68967 0.226334 2.88669 0.358244 3.05253 0.524505L12.5005 9.97602L21.9484 0.524505C22.1144 0.358513 22.3115 0.226841 22.5283 0.137006C22.7452 0.047172 22.9777 0.000934738 23.2124 0.000934738C23.4472 0.000934738 23.6796 0.047172 23.8965 0.137006C24.1134 0.226841 24.3104 0.358513 24.4764 0.524505C24.6424 0.690498 24.7741 0.887559 24.8639 1.10444C24.9538 1.32132 25 1.55377 25 1.78852C25 2.02326 24.9538 2.25572 24.8639 2.47259C24.7741 2.68947 24.6424 2.88653 24.4764 3.05253L15.0249 12.5005L24.4764 21.9484C24.6424 22.1144 24.7741 22.3115 24.8639 22.5283C24.9538 22.7452 25 22.9777 25 23.2124C25 23.4472 24.9538 23.6796 24.8639 23.8965C24.7741 24.1134 24.6424 24.3104 24.4764 24.4764C24.3104 24.6424 24.1134 24.7741 23.8965 24.8639C23.6796 24.9538 23.4472 25 23.2124 25C22.9777 25 22.7452 24.9538 22.5283 24.8639C22.3115 24.7741 22.1144 24.6424 21.9484 24.4764L12.5005 15.0249L3.05253 24.4764C2.88653 24.6424 2.68947 24.7741 2.47259 24.8639C2.25572 24.9538 2.02326 25 1.78852 25C1.55377 25 1.32132 24.9538 1.10444 24.8639C0.887559 24.7741 0.690498 24.6424 0.524505 24.4764C0.358513 24.3104 0.226841 24.1134 0.137006 23.8965C0.047172 23.6796 0.000934738 23.4472 0.000934738 23.2124C0.000934738 22.9777 0.047172 22.7452 0.137006 22.5283C0.226841 22.3115 0.358513 22.1144 0.524505 21.9484L9.97602 12.5005L0.524505 3.05253C0.358244 2.88669 0.226334 2.68967 0.13633 2.47277C0.046327 2.25587 0 2.02335 0 1.78852C0 1.55368 0.046327 1.32116 0.13633 1.10426C0.226334 0.887359 0.358244 0.690347 0.524505 0.524505Z" />
            </svg>
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          <div className="pt-2">
            <Image
              src="/images/icons/status/error.svg"
              alt="success"
              width={50}
              height={50}
              className="relative w-32 h-32 shadow-custom-success"
            />
          </div>
          <h2 className="font-button-md font-semibold text-font-brown dark:text-dark-gold md:text-base">
            {header}
          </h2>
          <p className="text-xs md:text-base my-3 text-font-black dark:text-font-white">
            {description}
          </p>
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
              <Link
                href={actionButton_href}
                className=' className="flex justify-center px-8 py-2 w-full font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
              '
              >
                {actionButton_name}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
