'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU } from '@/constants/page';
import Image from 'next/image';

interface MenuItem {
  id: number;
  title: string;
  link?: string;
  icon: string;
  iconClicked?: string;
  iconHover?: string;
  alt: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: number;
  title: string;
  link: string;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [activeLink, setActiveLink] = useState<string | undefined>();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<number | null>(null);
  const pathName = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setActiveLink(pathName);
    const activeItem = MENU.find((item) =>
      item.subItems?.some((subItem) => subItem.link === pathName)
    );
    setOpenDropdown(activeItem?.id || null);
  }, [pathName]);

  const handleDropdownClick = (id: number) => {
    if (isItemDisabled(id)) return;
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const isItemDisabled = (id: number) => {
    const item = MENU.find((menu) => menu.id === id);
    return (
      openDropdown === id &&
      item?.subItems?.some((subItem) => subItem.link === activeLink)
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
        setIsOpen(true);
      } else {
        setIsDesktop(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  return (
    <div className="relative ">
      <nav
        id="logo-sidebar"
        aria-label="Sidebar"
        className={`${
          isOpen || isDesktop
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        } fixed top-0 left-0 h-screen transition-all duration-300 bg-dark-navy z-40 md:translate-x-0 md:opacity-100 md:static w-[190px] md:min-w-[200px] shadow-lg md:shadow-none shadow-gray-600 flex flex-col pt-4`}
        style={{
          visibility: isOpen || isDesktop ? 'visible' : 'hidden',
          maxWidth: isOpen && !isDesktop ? '50vw' : isDesktop ? 'none' : '0',
        }}
      >
        <div className="flex flex-col  gap-[8px] md:gap-4">
          <Image
            src="icons/logo.svg"
            alt="logo"
            width={188}
            height={369}
            priority
            className="mx-auto px-4 "
          />

          <div className="flex flex-col items-start h-screen">
            {MENU.map((item: MenuItem) =>
              item.id === 9 ? (
                <div key={item.id} className="w-full">
                  <div className="border-t border-white">
                    <Link
                      href={item.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group w-full ${
                        activeLink === item.link
                          ? 'text-font-white font-bold'
                          : 'text-font-white font-medium'
                      } font-custom text-base flex flex-row px-4 md:px-10  py-4 md:py-6 gap-2 items-center`}
                    >
                      <Image
                        src={
                          activeLink === item.link ? item.iconHover! : item.icon
                        }
                        alt={item.alt}
                        width={25}
                        height={25}
                        className={`${
                          activeLink === item.link
                            ? 'block'
                            : 'group-hover:hidden'
                        }`}
                      />
                      <Image
                        src={item.iconHover!}
                        alt={item.alt + ' hover'}
                        width={25}
                        height={25}
                        className={`${
                          activeLink === item.link
                            ? 'hidden'
                            : 'hidden group-hover:block'
                        }`}
                      />
                      <p
                        className={`font-custom text-xs lg:text-base  ${
                          activeLink === item.link
                            ? 'font-bold'
                            : 'font-medium group-hover:font-bold'
                        }`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </div>
              ) : item.subItems ? (
                <div className="flex flex-col w-full gap-2" key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleDropdownClick(item.id)}
                    onMouseEnter={() => setHoveredDropdown(item.id)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                    className={`group w-full flex flex-row px-4 md:px-10  py-4 md:py-6 gap-2 items-center ${
                      (openDropdown === item.id &&
                        activeLink?.startsWith(item.link || '')) ||
                      (openDropdown === item.id &&
                        item.subItems.some(
                          (subItem) => subItem.link === activeLink
                        ))
                        ? 'bg-dark-goldLight text-font-brown font-bold'
                        : openDropdown === item.id
                        ? 'text-dark-goldLight font-bold'
                        : 'text-font-light font-medium'
                    } font-custom text-base`}
                  >
                    <Image
                      src={
                        (openDropdown === item.id &&
                          activeLink?.startsWith(item.link || '')) ||
                        (openDropdown === item.id &&
                          item.subItems.some(
                            (subItem) => subItem.link === activeLink
                          ))
                          ? item.iconClicked!
                          : openDropdown === item.id
                          ? item.iconHover!
                          : hoveredDropdown === item.id
                          ? item.iconHover!
                          : item.icon
                      }
                      alt={item.alt}
                      width={25}
                      height={25}
                      className="block"
                    />
                    <p
                      className={`font-custom   text-xs lg:text-base ${
                        (openDropdown === item.id &&
                          activeLink?.startsWith(item.link || '')) ||
                        (openDropdown === item.id &&
                          item.subItems.some(
                            (subItem) => subItem.link === activeLink
                          ))
                          ? 'text-font-brown font-bold'
                          : openDropdown === item.id
                          ? 'text-dark-goldLight font-bold'
                          : 'text-font-light font-medium group-hover:text-dark-goldLight group-hover:font-bold'
                      }`}
                    >
                      {item.title}
                    </p>
                    {openDropdown === item.id ? (
                      activeLink?.startsWith(item.link || '') ||
                      item.subItems.some(
                        (subItem) => subItem.link === activeLink
                      ) ? (
                        <Image
                          src="/icons/sidebar/dropdown-brown.svg"
                          alt="Dropdown"
                          width={20}
                          height={20}
                          className="block"
                        />
                      ) : (
                        <Image
                          src="/icons/sidebar/dropdown-yellow.svg"
                          alt="Dropdown"
                          width={20}
                          height={20}
                          className="block"
                        />
                      )
                    ) : (
                      <>
                        <Image
                          src="/icons/sidebar/dropdown.svg"
                          alt="Dropdown"
                          width={20}
                          height={20}
                          className={`${
                            hoveredDropdown === item.id ? 'hidden' : 'block'
                          } group-hover:hidden`}
                        />
                        <Image
                          src="/icons/sidebar/down-yellow.svg"
                          alt="Dropdown hover"
                          width={20}
                          height={20}
                          className={`${
                            hoveredDropdown === item.id ? 'block' : 'hidden'
                          }`}
                        />
                      </>
                    )}
                  </button>
                  <div
                    className={`${
                      openDropdown === item.id
                        ? 'block bg-dropdown-navy'
                        : 'hidden'
                    } gap-2 flex flex-col overflow-hidden`}
                  >
                    {item.subItems.map((subItem: SubMenuItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.link}
                        className="flex flex-row w-full items-center"
                      >
                        <p
                          className={`font-custom text-xs lg:text-base w-full py-2 px-12 ${
                            activeLink === subItem.link
                              ? 'text-dark-navy font-bold bg-dropdown-gold'
                              : 'text-font-white font-medium hover:text-dark-goldLight hover:font-bold'
                          }`}
                        >
                          {subItem.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.id}
                  href={item.link || '#'}
                  className={`group w-full ${
                    activeLink === item.link
                      ? 'bg-dark-goldLight text-font-brown font-bold'
                      : 'text-font-white font-medium'
                  } font-custom text-base flex flex-row px-4 md:px-10 py-4 md:py-6 gap-2 items-center`}
                >
                  <Image
                    src={
                      activeLink === item.link ? item.iconClicked! : item.icon
                    }
                    alt={item.alt}
                    width={25}
                    height={25}
                    className={`${
                      activeLink === item.link ? 'block' : 'group-hover:hidden'
                    }`}
                  />
                  <Image
                    src={item.iconHover!}
                    alt={item.alt + ' hover'}
                    width={25}
                    height={25}
                    className={`${
                      activeLink === item.link
                        ? 'hidden'
                        : 'hidden group-hover:block'
                    }`}
                  />
                  <p
                    className={`font-custom text-xs lg:text-base ${
                      activeLink === item.link
                        ? 'text-font-brown font-bold'
                        : 'text-font-white group-hover:text-dark-goldLight group-hover:font-bold'
                    }`}
                  >
                    {item.title}
                  </p>
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
