import { FC } from "react";

interface CardFailedProps {
  title: string;
  count: number;
}

const CardFailed: FC<CardFailedProps> = ({ title, count }) => {
  return (
    <div className="flex items-center justify-center rounded-lg bg-light-white dark:bg-dark-darkGray p-4 w-full h-full transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
      <div className="text-center">
        <p className="text-xs md:text-lg font-custom font-bold text-dark-navy dark:text-font-white transition-opacity duration-300 delay-100 hover:opacity-100">
          {title}
        </p>
        <p className="text-base md:text-[32px] font-custom text-dark-navy dark:text-font-white transition-opacity duration-500 delay-200 hover:opacity-100">
          {count}
        </p>
      </div>
    </div>
  );
};

export default CardFailed;
