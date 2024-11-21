"use client";

import React, { useState } from "react";

const QualificationEdit: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoved, setIsMoved] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleMoveClick = () => {
    setIsMoved(true);
  };

  const handleBackClick = () => {
    setIsMoved(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <svg
          width="5"
          height="19"
          viewBox="0 0 5 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="2" fill="#797474" stroke="#797474" />
          <circle cx="2.5" cy="9.5" r="2" fill="#797474" stroke="#797474" />
          <circle cx="2.5" cy="16.5" r="2" fill="#797474" stroke="#797474" />
        </svg>
      </button>
      {isOpen && (
        <div
          onMouseLeave={closeDropdown}
          className="absolute right-0 z-10 mt-1 rounded-[10px] border-collapse border border-font-light dark:border-light-grayBright shadow-lg"
        >
          <ul aria-labelledby="dropdownButton">
            {isMoved ? (
              // Isi dropdown saat mode pindah
              <>
                <li
                  onClick={handleBackClick}
                  className="flex items-center justify-center rounded-t-[10px] text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray"
                >
                  <div className="flex items-center space-x-3">
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-font-black dark:fill-font-white"
                    >
                      <path d="M3.66421 0.985581L0.442322 4.52141C0.198034 4.7895 0.198034 5.22417 0.442322 5.49226L0.45115 5.50195C0.695437 5.77004 1.09151 5.77004 1.33579 5.50195L4.55768 1.96611C4.80197 1.69802 4.80197 1.26336 4.55768 0.99527L4.54885 0.985581C4.30456 0.71749 3.90849 0.717489 3.66421 0.985581Z" />
                      <path d="M0.45115 4.49805L0.442322 4.50774C0.198034 4.77583 0.198034 5.2105 0.442322 5.47859L3.66421 9.01442C3.90849 9.28251 4.30456 9.28251 4.54885 9.01442L4.55768 9.00473C4.80197 8.73664 4.80197 8.30198 4.55768 8.03389L1.33579 4.49805C1.09151 4.22996 0.695437 4.22996 0.45115 4.49805Z" />
                    </svg>
                    <p>Kembali</p>
                  </div>
                </li>
                <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Kualifikasi
                </li>
                <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Proposal
                </li>
                <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Negosiasi
                </li>
                <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Tercapai
                </li>
                <li className="flex items-center justify-center rounded-b-[10px] text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Gagal
                </li>
              </>
            ) : (
              // Isi dropdown default
              <>
                <li className="flex items-center justify-center rounded-t-[10px] text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Detail
                </li>
                <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Edit
                </li>
                <li
                  onClick={handleMoveClick}
                  className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy dark:text-font-white text-dark-navy font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray"
                >
                  <div className="flex items-center space-x-5">
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-font-black dark:fill-font-white"
                    >
                      <path d="M3.66421 0.985581L0.442322 4.52141C0.198034 4.7895 0.198034 5.22417 0.442322 5.49226L0.45115 5.50195C0.695437 5.77004 1.09151 5.77004 1.33579 5.50195L4.55768 1.96611C4.80197 1.69802 4.80197 1.26336 4.55768 0.99527L4.54885 0.985581C4.30456 0.71749 3.90849 0.717489 3.66421 0.985581Z" />
                      <path d="M0.45115 4.49805L0.442322 4.50774C0.198034 4.77583 0.198034 5.2105 0.442322 5.47859L3.66421 9.01442C3.90849 9.28251 4.30456 9.28251 4.54885 9.01442L4.55768 9.00473C4.80197 8.73664 4.80197 8.30198 4.55768 8.03389L1.33579 4.49805C1.09151 4.22996 0.695437 4.22996 0.45115 4.49805Z" />
                    </svg>
                    <p>pindah</p>
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-font-black dark:fill-font-white"
                    >
                      <path d="M1.33579 0.985581L4.55768 4.52141C4.80197 4.7895 4.80197 5.22417 4.55768 5.49226L4.54885 5.50195C4.30456 5.77004 3.90849 5.77004 3.66421 5.50195L0.442322 1.96611C0.198034 1.69802 0.198034 1.26336 0.442322 0.99527L0.45115 0.985581C0.695438 0.71749 1.09151 0.717489 1.33579 0.985581Z" />
                      <path d="M4.54885 4.49805L4.55768 4.50774C4.80197 4.77583 4.80197 5.2105 4.55768 5.47859L1.33579 9.01442C1.09151 9.28251 0.695438 9.28251 0.45115 9.01442L0.442322 9.00473C0.198035 8.73664 0.198034 8.30198 0.442322 8.03389L3.66421 4.49805C3.90849 4.22996 4.30456 4.22996 4.54885 4.49805Z" />
                    </svg>
                  </div>
                </li>
                <li className="flex items-center justify-center rounded-b-[10px] text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
                  Hapus
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QualificationEdit;