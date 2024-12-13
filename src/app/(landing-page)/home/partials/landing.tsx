import React from "react";
import Image from "next/image";
import Link from "next/link";
import BgDarkNavy from "@/components/landing-page/layout/bg-dark-navy";

const Landing = () => {
  return (
    <>
      <BgDarkNavy>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="text-font-white font-custom font-bold text-2xl md:text-5xl mb-2">
              Membangun Loyalitas,
            </p>
            <p className="text-font-white font-custom font-bold text-2xl md:text-5xl ">
              Menguatkan Hubungan
            </p>
            <p className="mt-5 text-font-white font-custom font-medium text-xs md:text-base mb-1">
              Kami menyediakan aplikasi CRM untuk pengelolaan pelanggan,
            </p>
            <p className="text-font-white font-custom font-medium text-xs md:text-base">
              membantu bisnis Anda tumbuh lebih cepat dan efisien
            </p>
            <div className="md:flex items-center gap-12 mt-12 hidden ">
              <Link href="/register">
                <button className=" bg-light-gold text-font-brown font-bold py-3 px-10 rounded-[5px] hover:bg-dark-gold transition">
                  Coba 7 Hari
                </button>
              </Link>
              <Link
                href="/login"
                className="text-center font-custom rounded-[5px] p-[10px] w-[100px] text-xs md:text-base font-medium border border-light-gold text-light-gold hover:bg-dark-gold hover:bg-opacity-30"
              >
                Masuk
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/landing.png"
              alt="landing"
              width={500}
              height={500}
            />
          </div>
          <div className="md:hidden mt-4  ">
            <Link href="/register">
              <button className=" w-full bg-light-gold text-font-brown font-bold py-3 px-10 rounded-[5px] hover:bg-dark-gold transition">
                Coba 7 Hari
              </button>
            </Link>
            <Link href="/login">
              <button className="mt-2 w-full text-center font-custom rounded-[5px] py-3 px-10 text-xs md:text-base font-medium border border-light-gold text-light-gold hover:bg-dark-gold hover:bg-opacity-30">
                Masuk
              </button>
            </Link>
          </div>
        </div>
      </BgDarkNavy>
    </>
  );
};

export default Landing;
