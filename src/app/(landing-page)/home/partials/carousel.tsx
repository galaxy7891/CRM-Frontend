"use client";

import { useState } from "react";

interface CarouselItem {
  description: string;
  name: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="w-full max-w-full p-6 bg-white shadow-md rounded-[20px]">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center ">
        <button
          className="px-3 py-2 bg-font-light items-center rounded-full"
          onClick={prevSlide}
        >
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.06125 0.862821L0.973108 7.14875C0.435675 7.62535 0.435675 8.39808 0.973108 8.87469L0.99253 8.89192C1.52996 9.36852 2.40131 9.36852 2.93874 8.89192L10.0269 2.60599C10.5643 2.12938 10.5643 1.35665 10.0269 0.880045L10.0075 0.862821C9.47004 0.386214 8.59869 0.386214 8.06125 0.862821Z"
              fill="#1A1A1A"
            />
            <path
              d="M0.99253 7.10808L0.973108 7.12531C0.435675 7.60192 0.435675 8.37465 0.973108 8.85125L8.06125 15.1372C8.59869 15.6138 9.47004 15.6138 10.0075 15.1372L10.0269 15.12C10.5643 14.6433 10.5643 13.8706 10.0269 13.394L2.93874 7.10808C2.40131 6.63148 1.52996 6.63148 0.99253 7.10808Z"
              fill="#1A1A1A"
            />
          </svg>
        </button>
        <div className="py-2 px-8 ">
          <p className="text-sm md:text-base lg:text-[28px] text-font-black">
            {items[currentIndex].description}
          </p>
          <p className="text-font-black text-base lg:text-2xl mt-4 font-bold">
            {items[currentIndex].name}
          </p>
        </div>
        <button
          className="px-3 py-2 bg-font-light items-center rounded-full"
          onClick={nextSlide}
        >
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.93875 0.862821L10.0269 7.14875C10.5643 7.62535 10.5643 8.39808 10.0269 8.87469L10.0075 8.89192C9.47004 9.36852 8.59869 9.36852 8.06126 8.89192L0.973108 2.60599C0.435676 2.12938 0.435675 1.35665 0.973108 0.880045L0.99253 0.862821C1.52996 0.386214 2.40131 0.386214 2.93875 0.862821Z"
              fill="#1A1A1A"
            />
            <path
              d="M10.0075 7.10808L10.0269 7.12531C10.5643 7.60192 10.5643 8.37465 10.0269 8.85125L2.93875 15.1372C2.40131 15.6138 1.52996 15.6138 0.99253 15.1372L0.973108 15.12C0.435675 14.6433 0.435676 13.8706 0.973108 13.394L8.06126 7.10808C8.59869 6.63148 9.47004 6.63148 10.0075 7.10808Z"
              fill="#1A1A1A"
            />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-dark-navy" : "bg-font-grayLight"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
