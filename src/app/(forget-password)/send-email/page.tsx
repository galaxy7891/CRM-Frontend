"use client";

import Image from "next/image";
// import Stepper from "@/components/stepper";

const SendEmail: React.FC = () => {
  return (
    <div className="bg-light-white h-screen p-7">
      <div className="bg-font-white w-full mx-auto lg:w-full lg:mx-auto rounded-xs h-full lg:max-h-screen relative">
        <div className="flex flex-col lg:flex-col-reverse">
          <div className="p-5 text-start lg:text-center">
            <p className="text-base font-bold lg:text-2xl lg:block text-font-brown lg:order-2">
              Logo
            </p>
          </div>

          <div className="p-5 text-center">
            <p className="lg:text-2xl text-font-brown lg:order-1">Stepper</p>
          </div>
        </div>

        <div className="p-5 lg:text-center">
          <h1 className="text-2xl font-bold text-font-brown">Mengirim Email</h1>
        </div>

        <div className="flex justify-center mt-6">
          <Image
            src="/icons/waiting.svg"
            alt="wait"
            width={272}
            height={204}
            className="w-[272px] h-[204px]"
          />
        </div>
        <p className="text-font-black text-xs lg:text-base mt-3 text-center">
          Silakan periksa email Anda. Jika dalam 15 menit Anda belum menerima
          email 
        </p>
        <p className="text-font-black text-xs lg:text-base text-center">
        dari kami, mohon pastikan kembali bahwa alamat email yang Anda masukkan 
        </p>
        <p className="text-font-black text-xs lg:text-base  text-center">
        sudah benar.
        </p>
        
      </div>
    </div>
  );
};

export default SendEmail;
