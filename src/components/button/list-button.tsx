import React from "react";

const ListButton = () => {
  return (
    <>
      <li className="flex items-center justify-center rounded-t-[10px] text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
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

          <p>pindah</p>
        </div>
      </li>
      <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
        Kualifikasi
      </li>
      <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
        Proposal
      </li>
      <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
        Negosiasi
      </li>
      <li className="flex items-center justify-center text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
        Tercapai
      </li>
      <li className="flex items-center justify-center rounded-b-[10px] text-xs md:text-base bg-font-white dark:bg-dark-navy text-light-redLight font-custom font-medium px-10 py-2 hover:bg-light-grayBright dark:hover:bg-dropdown-darkGray">
        Gagal
      </li>
    </>
  );
};

export default ListButton;
