import React from 'react';
import Image from 'next/image';

const LeftIconSection: React.FC = () => {
  return (
    <div className="md:w-1/2 hidden md:block lg:flex bg-dark-navy flex-col justify-center items-center sticky top-0 h-screen">
      <Image
        src="/icons/vector-login.svg"
        alt="Gambar di Kolom Kiri"
        width={530}
        height={280}
      />
      <p className="text-font-white font-custom text-2xl mt-12">
        Jalin Hubungan, Raih Kesuksesan.
      </p>
    </div>
  );
};

export default LeftIconSection;
