'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface QuestionModalProps {
  header: string;
  description: string;
  closeModal: boolean;
  actionButton: boolean;
  actionButton_href: string;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  header,
  description,
  closeModal,
  actionButton,
  actionButton_href,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 px-4">
      <div className="relative w-[240px] md:w-[450px] bg-font-white dark:bg-dark-navy rounded-[30px] shadow-lg py-5 px-2">
        {closeModal && (
          <button
            type="button"
            className="absolute top-4 right-4"
            onClick={handleClose}
          >
            <Image
              src="/images/icons/closed.svg"
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
              src="/images/icons/modal/question.svg"
              alt="success"
              width={50}
              height={50}
              className="relative w-[100px] h-[100px] shadow-custom-success"
            />
          </div>
          <h2 className="text-xs md:text-xl font-bold font-custom text-font-black">
            {header}
          </h2>
          <p className="text-xs md:text-xl text-font-black font-custom">
            {description}
          </p>
          {actionButton && (
            <div className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 inline-block px-6 py-2 font-custom bg-font-white border-light-gold border-2 text-font-brown font-bold text-xs md:text-base rounded-lg hover:shadow-md"
              >
                Kembali
              </button>
              <a
                href={actionButton_href}
                type="submit"
                className="flex-1 inline-block px-6 py-2 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
              >
                Ya
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
