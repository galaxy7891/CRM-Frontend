"use client";
import React, { ReactNode } from "react";

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, isOpen, onClick, children }) => {
  return (
    <div className="rounded-[10px] bg-font-white">
      {/* Header Accordion */}
      <button
        onClick={onClick}
        className="w-full font-custom flex justify-between items-center py-4 px-6 text-left text-xl font-bold text-font-black"
      >
        <span>{title}</span>
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${
            isOpen ? "bg-light-gold rotate-180" : ""
          }`}
        >
          <svg
            width="22"
            height="14"
            viewBox="0 0 22 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300"
          >
            <path
              d="M1.18638 3.93009L9.82953 12.307C10.4849 12.9421 11.5474 12.9421 12.2027 12.307L12.2264 12.284C12.8817 11.6489 12.8817 10.6191 12.2264 9.98397L3.58324 1.60707C2.9279 0.97192 1.8654 0.97192 1.21006 1.60707L1.18638 1.63002C0.531044 2.26517 0.531044 3.29495 1.18638 3.93009Z"
              fill="#542D0A"
            />
            <path
              d="M9.77362 12.284L9.7973 12.307C10.4526 12.9421 11.5151 12.9421 12.1705 12.307L20.8136 3.93009C21.469 3.29495 21.469 2.26517 20.8136 1.63002L20.7899 1.60707C20.1346 0.97192 19.0721 0.97192 18.4168 1.60707L9.77362 9.98397C9.11828 10.6191 9.11828 11.6489 9.77362 12.284Z"
              fill="#542D0A"
            />
          </svg>
        </span>
      </button>

      {/* Konten Accordion */}
      {isOpen && (
        <div className="px-6 py-2 font-custom text-font-black text-xl font-normal">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
