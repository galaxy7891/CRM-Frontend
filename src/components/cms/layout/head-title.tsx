import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const HeadTitle = () => {
  const pathname = usePathname();
  const isArticlePage = pathname === "/cms-article";
  const isCustomerPage = pathname === "/cms-customer";

  return (
    <div className="relative mb-5">
      <div className="flex justify-between items-center">
        <h1 className="font-custom text-font-black  dark:text-font-white text-base md:text-[32px]">
          {isCustomerPage && "Data Pelanggan"}
          {isArticlePage && "Data Artikel"}
        </h1>
        {isArticlePage && (
          <Link href="/cms-article/new">
            <button className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold">
              Tambah Artikel
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeadTitle;
