import React from 'react';
import Image from 'next/image';

const NotFound: React.FC = () => {
  return (
    <div className=" h-screen p-4 md:px-[50px] md:py-[50px] rounded-full ">
      <div className="bg-font-white w-full h-full lg:max-h-screen rounded-xs mx-auto flex flex-col justify-center items-center rounded-lg ">
        <div className="flex flex-col items-center">
          <Image
            src="/icons/404.svg"
            alt="notfound"
            width={400}
            height={200}
            className="w-[200px] h-[100px] sm:w-[400px] sm:h-[200px]"
          />
          <p className="text-lg sm:text-[32px] font-bold text-font-black lg:mt-5">
            Halaman Tidak Ditemukan
          </p>
          <p className="text-black text-xs font-custom mt-2 sm:text-lg lg:mt-4">
            Maaf, halaman yang Anda cari tidak tersedia.
          </p>
          <p className="text-black text-xs font-custom sm:text-lg ">
            Periksa kembali URL
          </p>
        </div>

        <div className="absolute top-[15px] right-[15px] md:top-[50px] md:right-[50px] ">
          <Image
            src="/icons/top.png"
            alt="top"
            width={125}
            height={125}
            className="w-[90px] h-[90px]  sm:w-[125px] sm:h-[125px] lg:w-[125px] lg:h-[125px] rounded-lg"
          />
        </div>
        <div className="absolute bottom-[15px] left-[15px] md:bottom-[50px] md:left-[50px]">
          <Image
            src="/icons/bottom.png"
            alt="bottom"
            width={125}
            height={125}
            className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[125px] lg:h-[125px] rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
