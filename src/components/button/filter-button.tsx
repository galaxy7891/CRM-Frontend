import React from 'react';

interface FilterProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Filter: React.FC<FilterProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`w-[89px] h-[32px] rounded-[5px] p-2 border text-xs ${
        isActive
          ? 'border border-dark-darkGray text-dark-darkGray bg-light-grayBright dark:border-dropdown-darkGray dark:bg-light-white dark:text-dropdown-darkGray'
          : 'text-dark-darkGray border border-dark-darkGray bg-font-white dark:border-light-white dark:text-light-white dark:bg-dark-navy'
      }`}
    >
      {children}
    </button>
  );
};

export default Filter;
