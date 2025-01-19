import React from 'react';
import Image from 'next/image';

const ServerError: React.FC = () => {
  return (
    <div className="bg-light-white h-screen p-8 ">
      <div className="bg-font-white w-full h-full lg:max-h-screen rounded-xs mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <Image
            src="/images/icons/500.svg"
            alt="notfound"
            width={400}
            height={200}
            className="w-[200px] h-[100px] sm:w-[400px] sm:h-[200px]"
          />
          <p className="text-lg sm:text-[32px] font-bold text-font-black lg:mt-5">
            Kesalahan Pada Server
          </p>
          <p className="text-black text-xs font-custom mt-2 sm:text-lg lg:mt-4">
            Maaf, kami mengalami masalah dengan server.
          </p>
          <p className="text-black text-xs font-custom sm:text-lg ">
            Server akan diperbaiki segera.
          </p>
        </div>

        <div className="absolute top-[30px] right-[30px] lg:top-[34px] lg:right-[34px]">
          <Image
            src="/images/icons/top.png"
            alt="top"
            width={125}
            height={125}
            className="w-[90px] h-[90px]  sm:w-[125px] sm:h-[125px] lg:w-[125px] lg:h-[125px]"
          />
        </div>
        <div className="absolute bottom-[30px] left-[30px] lg:bottom-[34px] lg:left-[34px]">
          <Image
            src="/images/icons/bottom.png"
            alt="bottom"
            width={125}
            height={125}
            className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[125px] lg:h-[125px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ServerError;
