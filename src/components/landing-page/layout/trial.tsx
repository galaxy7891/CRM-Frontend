import Link from "next/link";
import React from "react";

const Trial: React.FC = () => {
  return (
    <div className="relative z-[10] p-6 lg:p-8">
      {/* Background Layer */}
      <div className="absolute inset-0 z-[1]">
        <div className="h-1/2 bg-light-white"></div>
        <div className="h-1/2 bg-dark-navy"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-[2] flex justify-center items-center">
        <div className="bg-font-white shadow-md p-8 rounded-tr-3xl rounded-bl-3xl w-full max-w-6xl text-center relative">
          {/* Title */}
          <h2 className="text-font-black font-custom font-bold text-lg md:text-[32px] leading-relaxed">
            Coba 7 Hari Untuk <br className="block mb-1" /> Meningkatkan
            Bisnismu
          </h2>

          {/* Button */}
          <Link href="/register">
            <button className="mt-6 bg-light-gold text-font-brown font-bold py-3 px-10 rounded-[5px] hover:bg-dark-gold transition">
              Coba 7 Hari
            </button>
          </Link>

          {/* SVG di pojok kanan bawah, tetap dalam Content Layer */}
          <svg
            width="121"
            height="124"
            viewBox="0 0 121 124"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 right-0 z-[2] w-[52px] h-[41px] lg:w-[121px] lg:h-[124px]"
          >
            <ellipse
              cx="96"
              cy="101.457"
              rx="96"
              ry="101"
              fill="#FFBD39"
              fillOpacity="0.5"
            />
          </svg>
          <svg
            width="132"
            height="114"
            viewBox="0 0 132 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 left-0 z-[2] w-[52px] h-[41px] lg:w-[121px] lg:h-[124px]"
          >
            <ellipse
              cx="36"
              cy="12.457"
              rx="96"
              ry="101"
              fill="#FFBD39"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Trial;
