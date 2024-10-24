import React from "react";
import HeaderChangePassword from "./header-change-pass";
import Link from "next/link";

const OldPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <p>stepper</p>
      </div>
      <HeaderChangePassword
        imageSrc="/icons/change-pass.svg"
        title="Verifikasi Kata Sandi"
        description="Masukkan kata sandi lama Anda untuk verifikasi kata sandi"
      />
      {/* Form password yang mirip di auth => label: Masukkan kata Sandi Lama */}

      {/* Wrapper dengan flex justify-between untuk mengatur posisi */}
      <div className="w-full flex justify-end">
        <Link href="/lupa-kata-sandi">
          <p className="text-base font-custom text-light-gold">
            Lupa Kata Sandi?
          </p>
        </Link>
      </div>
    </div>
  );
};

export default OldPassword;
