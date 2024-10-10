"use client";

// import { useState } from 'react';
import Countdown from "@/components/countdown";
import LeftIconSection from "@/components/icon-left";
import Stepper from "@/components/stepper";
import Otp from "@/components/otp";
// import Image from 'next/image';

const RegisOtp: React.FC = () => {
  // const [otp, setOtp] = useState("");

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block">
        <LeftIconSection />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <p className="text-2xl lg:text-4xl text-font-brown font-custom pb-2">
            Logo
          </p>
          <div className="pb-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-font-brown lg:mt-5">
              Buat Akun
            </h1>
            <div className="flex justify-center mt-4">
              <Stepper />
            </div>
            <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
              Verifikasi
            </p>
            <p className="font-small text-font-black font-custom lg:text-base lg:mt-3">
              Cek email user@gmail.com dan masukan 6 digit kode otp yang telah
              terkirim
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <Otp count={6} />
          </div>
          <div className="flex justify-end mt-1">
            <Countdown />
          </div>
          <div className="text-center">
            <p className="font-custom text-xs text-font-black lg:text-sm mt-4">Tidak Menerima Kode OTP?</p>
            <button className="mt-2 font-custom font-bold text-xs lg:text-base text-font-brown">
              Kirim Ulang Kode
              </button>
          <button
            type="submit"
            className="w-full px-1 h-12 lg:h-15 font-custom mt-2 bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
          >
            Lanjut

          </button>
          <a
           href="/register-email"
            type="button"
            className="bg-white w-full mt-2 px-1 h-12 lg:h-15 flex items-center justify-center border border-dark-gold py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
          >
            <span className="font-custom text-dark-gold text-xs md:text-base font-bold">
              Kembali
            </span>
          </a>

          <div className="mt-5 text-center">
            <p className="text-xs md:text-base font-custom font-medium">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
              >
                Masuk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RegisOtp;
