import React from 'react';

interface ExportButtonProps {
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" px-2 py-2  md:p-[10px]  rounded-[10px] bg-font-white font-medium text-xs md:text-base border border-dropdown-darkGray text-dropdown-darkGray dark:bg-dark-navy dark:border-light-white dark:text-light-white duration-200 hover:shadow-md hover:shadow-dropdown-darkGray"
    >
      Ekspor Data
    </button>
  );
};

export default ExportButton;
