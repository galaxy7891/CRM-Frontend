import React from "react";
import HeaderChangePassword from "./header-change-pass";
import Link from "next/link";

const Waiting = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>stepper</div>
      <HeaderChangePassword
        imageSrc="/icons/Clock.svg"
        title="Verifikasi Kata Sandi"
        description={
          <div>
            <p>Periksa email user@gmail.com untuk melakukan verifikasi.</p>
            <p>
              Jika tidak menerima pesan selama 15 menit
              <Link href="/kirim-ulang">
                <span className="font-medium font-custom text-light-gold text-xs cursor-pointer">
                  Kirim Ulang
                </span>
              </Link>
            </p>
            {/* button konfirmasi hidden */}
          </div>
        }
      />
    </div>
  );
};

export default Waiting;
