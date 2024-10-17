// import Image from "next/image";
import { FC } from "react";
import Link from "next/link"; // Import Link dari Next.js

interface CardProps {
  title: string;
  count: number;
  total: string;
}

const CardDeals: FC<CardProps> = ({ title, count, total }) => {
  // Fungsi untuk format rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  // Tentukan warna berdasarkan title
  const titleColor =
    title === "Tercapai"
      ? "text-dark-green"
      : title === "Gagal"
      ? "text-dark-red"
      : "text-font-black";

  return (
    <Link href="/deals">
      <div
        className="flex justify-between items-center p-4 rounded-lg bg-light-white w-full max-w-xs 
                        transform transition-transform duration-500 hover:scale-105 hover:shadow-lg"
      >
        <div>
          {/* Warna title berubah sesuai kondisi */}
          <p
            className={`text-xs lg:text-base font-custom ${titleColor} 
                          transition-opacity duration-300 delay-100 hover:opacity-100`}
          >
            {title}
          </p>
          {/* Format rupiah untuk count */}
          <p
            className="text-lg lg:text-4xl font-custom text-font-black 
                         transition-opacity duration-500 delay-200 hover:opacity-100"
          >
            {formatRupiah(count)}
          </p>
          <p
            className="mt-2 text-[8px] lg:xs font-custom text-font-black 
                         transition-opacity duration-700 delay-300 hover:opacity-100"
          >
            {total} {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardDeals;
