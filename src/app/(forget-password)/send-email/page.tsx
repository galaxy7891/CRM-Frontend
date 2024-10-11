"use client";

import Stepper from "@/components/stepper";
import IconForget from "@/components/icon-forget";
import Image from "next/image";

const SendEmail: React.FC = () => {
  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <IconForget />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <p className="text-2xl lg:text-4xl text-font-brown font-custom pb-2">
            Logo
          </p>
          <div className="pb-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-font-brown lg:mt-5">
              Atur Ulang Kata Sandi
            </h1>
            <div className="flex justify-center mt-4">
              <Stepper />
            </div>
            <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
              Verifikasi
            </p>
            <div className="flex justify-center">
              <Image
                src="/icons/Clock.svg"
                alt="Gambar di Kolom Kiri"
                width={150}
                height={150}
              />
            </div>
            <p className="font-small text-font-black font-custom lg:text-base lg:mt-3">
              Periksa email anda, jika tidak menerima dalam 15 menit, pastikan
              email yang dimasukkan benar
            </p>
            <a
              href="/verified-email"
              type="button"
              className=" mt-8 bg-white w-full px-1 h-12 lg:h-15  flex items-center font-bold justify-center border-2 text-light-gold border-dark-gold py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
            >
              Kembali
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
