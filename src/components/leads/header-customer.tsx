"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MENU } from "@/constants/page";
import Image from "next/image";

const HeaderCustomer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    { title: string; description?: string } | undefined
  >(undefined);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    let matchedPage: { title: string; description?: string } | undefined =
      undefined;

    MENU.forEach((menuItem) => {
      if (menuItem.link === pathName) {
        matchedPage = {
          title: menuItem.title,
          description: menuItem.description,
        };
      }
      if (menuItem.subItems) {
        const matchedSubItem = menuItem.subItems.find(
          (subItem) => subItem.link === pathName
        );
        if (matchedSubItem) {
          matchedPage = {
            title: matchedSubItem.title, // Mengambil title dari subItem
            description: matchedSubItem.description, // Mengambil description dari subItem
          };
        }
      }
    });

    setCurrentPage(matchedPage);
  }, [pathName]);

  const toggleTooltip = () => setIsTooltipVisible(!isTooltipVisible);

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <p className="text-base lg:text-3xl font-custom text-font-black">
            {currentPage ? currentPage.title : "Page"}
          </p>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center lg:hidden"
              onClick={toggleTooltip}
            >
              <Image
                src="/icons/table/tooltip-off.svg"
                alt="info-off"
                width={24}
                height={24}
                className="h-3 w-3 lg:h-6 lg:w-6"
              />
            </button>

            <button
              type="button"
              className="hidden lg:flex items-center justify-center"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <Image
                src="/icons/table/tooltip-off.svg"
                alt="info-off"
                width={24}
                height={24}
                className="h-6 w-6 group-hover:hidden"
              />
              <Image
                src="/icons/table/tooltip-on.svg"
                alt="info-on"
                width={24}
                height={24}
                className="h-6 w-6 hidden group-hover:block"
              />
            </button>

            {currentPage?.description && isTooltipVisible && (
              <div
                id="tooltip-bottom"
                role="tooltip"
                className="mx-auto absolute left-1/2 transform -translate-x-1/2 mt-2 w-60 max-w-xs p-2 border bg-light-white border-font-grayLight text-dark-navy text-xs text-start rounded-md shadow-lg transition-opacity duration-300 z-10"
              >
                {currentPage.description}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-light-white"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="bg-light-gold hover:opacity-80 transition-opacity duration-200 hover:shadow-md text-font-brown text-base font-medium py-1 px-4 lg:text-sm lg:py-3 lg:px-6 rounded-xl">
            Impor Data
          </button>
          <button className="bg-light-gold hover:opacity-80 transition-opacity duration-200 hover:shadow-md text-font-brown text-base font-medium py-1 px-4 lg:text-sm lg:py-3 lg:px-6 rounded-xl">
           Tambah Data
          </button>
        </div>
      </header>
    </div>
  );
};

export default HeaderCustomer;
