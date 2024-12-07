import Link from "next/link";
import React from "react";

const Trial: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-font-white to-dark-navy py-10">
      <div className="px-6 md:px-12 w-full">
        <div className="text-center bg-font-white rounded-tr-3xl rounded-bl-3xl p-6 md:py-7 md:px-4 shadow-md">
          {/* Kontainer yang menahan elemen dan SVG */}
          <div className="">
            {/* Judul */}
            <h2 className="text-font-black font-custom font-bold text-lg md:text-[32px] leading-relaxed">
              Coba 7 Hari Untuk <br className="block mb-1" /> Meningkatkan
              Bisnismu
            </h2>

            {/* Tombol */}
            <Link href="/register">
              <button className="mt-6 bg-light-gold text-font-brown font-bold py-3 px-10 rounded-[5px] hover:bg-dark-gold transition">
                Coba 7 Hari
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trial;
