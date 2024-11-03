import React from "react";
import Image from "next/image";

const IconForget: React.FC = () => {
  return (
    <div className="flex bg-dark-navy flex-col justify-center items-center sticky top-0 h-screen px-11">
      <Image
        src="/icons/regis-emoloyee.svg"
        alt="Gambar di Kolom Kiri"
        width={475}
        height={237}
      />
      <p className="text-font-white font-custom text-xl mt-12 ">
        Bergerak Bersama, Berkembang Bersama
      </p>
    </div>
  );
};

export default IconForget;
