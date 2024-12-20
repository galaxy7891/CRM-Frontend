"use client";

import Link from "next/link";
import Menu from "./menu";
import Image from "next/image";

interface HeaderLandingPageProps {
  onToggleSidebar: () => void;
}

const HeaderLandingPage: React.FC<HeaderLandingPageProps> = ({
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 right-0 z-[88] flex items-center justify-between py-3 px-4 md:py-4  bg-dark-navy  shadow-lg">
      <div className="flex items-center justify-between w-full px-4">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={188}
          height={40}
          priority
          className="height:auto width:auto hidden lg:inline-block"
        />
        <button
          className="lg:hidden inline-flex items-center"
          onClick={onToggleSidebar}
        >
          <svg
            width="29"
            height="23"
            viewBox="0 0 29 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3.5" cy="11.5" r="3.5" fill="#D9D9D9" />
            <circle cx="14.5" cy="11.5" r="3.5" fill="#D9D9D9" />
            <circle cx="25.5" cy="11.5" r="3.5" fill="#D9D9D9" />
          </svg>
        </button>
        <div className="hidden lg:inline-flex">
          <Menu />
        </div>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="text-center font-custom rounded-[5px] p-[10px] w-[100px] text-xs md:text-base font-medium border border-light-gold text-light-gold hover:bg-dark-gold hover:bg-opacity-30"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="text-center font-custom rounded-[5px] p-3 text-xs md:text-base font-bold bg-light-gold text-font-brown hover:bg-dark-gold"
          >
            Coba 7 Hari
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderLandingPage;
