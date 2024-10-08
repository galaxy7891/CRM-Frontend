"use client";

import Countdown from "@/components/countdown";
import FormHeader from "@/components/form-header";
import LeftIconSection from "@/components/icon-left";
import Otp from "@/components/otp";
import Stepper from "@/components/stepper";
import React, { useState } from "react";

const RegisOtp: React.FC = () => {
  const [otp, setOtp] = useState("");  // State untuk menyimpan nilai OTP

  // Fungsi untuk mengecek apakah semua input OTP sudah terisi
  const isOtpFilled = otp.length === 6;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <LeftIconSection />
      <div className="flex flex-col p-7 lg:flex-row h-screen items-center justify-center w-full lg:w-1/2 bg-light-white">
        <div className="bg-font-white w-full mx-auto lg:w-full lg:mx-auto rounded-lg h-full lg:max-h-screen flex flex-col p-3 lg:px-14">
          <FormHeader
            logoText="Logo"
            title="Buat Akun"
            subtitle="Verifikasi"
            description="Cek email user@gmail.com dan masukan 6 digit kode otp yang telah terkirim"
            stepper={<Stepper />}
          />
          <div className="flex justify-center">
            <Otp count={6} onOtpChange={setOtp} /> 
          </div>
          <div className="flex justify-end">
            <Countdown />
          </div>
          <div className="text-center">
            <p className="font-custom text-font-black lg:text-sm mt-4">Tidak Menerima Kode OTP?</p>
            <button className="mt-2 font-custom font-bold lg:text-base text-font-brown">
              Kirim Ulang Kode
            </button>
          </div>
          <button
            type="button"
            className={`mt-2 w-full px-1 h-12 lg:h-15 flex items-center justify-center border py-2 rounded-md ${
              isOtpFilled
                ? "  bg-light-gold"
                : "bg-light-gold"
            }`}
            disabled={!isOtpFilled}  
          >
            <span className="font-custom text-font-brown lg:text-base font-bold">
              Lanjut
            </span>
          </button>
          <button
            type="button"
            className="mt-2 w-full px-1 h-12 lg:h-15  flex items-center justify-center border border-light-gold py-2 rounded-md"
          >
            <span className="font-custom text-dark-gold lg:text-base font-bold">
              Kembali
            </span>
          </button>
          <div className="mt-auto text-center flex items-center justify-center mb-4">
            <a className="text-xs font-custom lg:text-base font-medium">
              Sudah punya akun?
            </a>
            <a
              href="/login"
              className="text-xs lg:text-base font-custom text-light-gold font-bold ml-1"
            >
              Masuk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisOtp;
