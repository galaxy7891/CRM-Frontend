import React from "react";
import Image from "next/image";

const IconForget: React.FC = () => {
  return (
    <div className="flex bg-dark-navy flex-col justify-center items-center sticky top-0 h-screen px-11">
      <Image
        src="/icons/forget-password.svg"
        alt="Gambar di Kolom Kiri"
        width={300}
        height={150}
      />
      <p className="text-font-white font-custom text-xl mt-12 ">
        Amankan akun Anda, kendalikan akses Anda
      </p>
    </div>
  );
};

export default IconForget;
