"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useTheme from "../dark-mode";

const HeaderProfile = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isUserProfile = pathname === "/detail-user";
  const title = isUserProfile ? "Detail Profil" : "Detail Perusahaan";
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-4">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}>
          <Image
            src={
              isDarkMode
                ? "/icons/profile/back-white.svg"
                : "/icons/profile/back.svg"
            }
            alt="back"
            width={24}
            height={24}
            className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
          />
        </button>
        <p className="font-custom font-medium text-font-black dark:text-font-white text-base md:text-2xl">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/detail-user">
          <button
            className={`py-1 px-4 lg:py-3 lg:px-6 text-xs md:text-base font-medium font-custom rounded-[10px] transition-opacity duration-200 hover:opacity-80 hover:shadow-md ${
              isUserProfile
                ? "border-2 border-font-light text-font-light bg-font-white dark:text-dark-navy dark:border-font-white dark:border-2 dark:bg-font-light"
                : "text-font-brown dark:text-bold bg-light-gold"
            }`}
          >
            Profil
          </button>
        </Link>

        <Link href="/detail-company">
          <button
            className={`py-1 px-4 lg:py-3 lg:px-6 text-xs md:text-base font-medium font-custom rounded-[10px] transition-opacity duration-200 hover:opacity-80 hover:shadow-md ${
              isUserProfile
                ? "text-font-brown bg-light-gold shadow-md dark:text-bold"
                : "border-2 border-font-light text-font-light bg-font-white dark:text-dark-navy dark:border-font-white dark:border-2 dark:bg-font-light"
            }`}
          >
            Perusahaan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderProfile;
