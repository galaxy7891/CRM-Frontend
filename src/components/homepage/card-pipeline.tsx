// import Image from "next/image";
import { FC } from 'react';
import Link from 'next/link'; // Import Link dari Next.js

interface CardProps {
  title: string;
  total_pipeline: number;
  funds: string;
}

const CardDeals: FC<CardProps> = ({ title, total_pipeline, funds }) => {
  // rupiah currency change
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0, // delete decimal
      minimumFractionDigits: 0,
    }).format(num);
  };
  // Change colour based on title
  const titleColor =
    title === 'Tercapai'
      ? 'text-dark-green'
      : title === 'Gagal'
      ? 'text-dark-red'
      : 'text-font-black';

  return (
    <Link href="/deals">
      <div className="flex flex-col p-4 rounded-lg bg-light-white w-full  transform transition-transform duration-500 hover:scale-105 hover:shadow-lg">
        {/* colour change depends on title */}
        <p
          className={`text-xs lg:text-base font-custom ${titleColor} transition-opacity duration-300 delay-100 hover:opacity-100`}
        >
          {title}
        </p>
        {/* rupiah format and format data to number */}
        <p className="text-lg lg:text-4xl font-custom text-font-black transition-opacity duration-500 delay-200 hover:opacity-100 truncate">
          {formatRupiah(Number(funds))}
        </p>
        <p className="mt-2 text-xs lg:text-base font-custom text-font-black transition-opacity duration-700 delay-300 hover:opacity-100 ">
          {total_pipeline} {title}
        </p>
      </div>
    </Link>
  );
};

export default CardDeals;
