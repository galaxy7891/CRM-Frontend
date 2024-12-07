import Link from "next/link";
import React from "react";

interface CardPriceLightProps {
  title: string;
  description: React.ReactNode;
  price: string;
  dataPelanggan: React.ReactNode;
  dataProduk: React.ReactNode;
  dataPengguna: React.ReactNode;
  FontSize: string;
}

const CardPriceLight: React.FC<CardPriceLightProps> = ({
  title,
  description,
  price,
  dataPelanggan,
  dataProduk,
  dataPengguna,
  FontSize,
}) => {
  return (
    <div className="rounded-lg ">
      {/* Card Atas */}
      <div className="p-5 bg-font-white  rounded-t-lg">
        <p className="text-xl font-bold mb-2">{title}</p>
        <div className="text-base">{description}</div>
        <p className="text-xl font-medium mb-4 mt-4">
          Rp {price} / <span className="text-base font-normal">bulan</span>
        </p>
        <button className="w-full mt-4">
          <Link
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-light-gold text-font-brown text-base font-bold py-3 rounded-[5px] block text-center"
          >
            Hubungi
          </Link>
        </button>
      </div>

      {/* Card Bawah */}
      <div className="p-5 bg-font-white rounded-b-lg">
        <p className="text-base font-medium mb-2">Batasan Data</p>
        <div className="space-y-2">
          {[
            { title: "Jumlah Pelanggan", value: dataPelanggan },
            { title: "Jumlah Produk", value: dataProduk },
            { title: "Jumlah Pengguna", value: dataPengguna },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <p className="text-base">{item.title}</p>
              <p className={`${FontSize} font-medium`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPriceLight;
