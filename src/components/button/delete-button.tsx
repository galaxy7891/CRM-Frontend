import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-dark-redLight dark:bg-[#E0283A] rounded-[10px] inline-flex items-center justify-center p-[8px] hover:opacity-80 transition-shadow duration-200"
    >
      <svg
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-dark-red dark:fill-light-white w-5 h-5 md:w-6 md:h-6 "
      >
        <path d="M20 1.22222H15L13.5714 0H6.42857L5 1.22222H0V3.66667H20M1.42857 19.5556C1.42857 20.2039 1.72959 20.8256 2.26541 21.284C2.80123 21.7425 3.52795 22 4.28571 22H15.7143C16.472 22 17.1988 21.7425 17.7346 21.284C18.2704 20.8256 18.5714 20.2039 18.5714 19.5556V4.88889H1.42857V19.5556Z" />
      </svg>
    </button>
  );
};

export default DeleteButton;
