'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MENU } from '@/constants/page';
import Image from 'next/image';
import useTheme from '../dark-mode';
import Link from 'next/link';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [currentPage, setCurrentPage] = useState<
    { title: string; description?: string } | undefined
  >(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Custom hook for theme handling
  const pathName = usePathname();

  useEffect(() => {
    let matchedPage: { title: string; description?: string } | undefined =
      undefined;
    const photo = localStorage.getItem('image_url');
    if (photo) {
      setProfilePhoto(photo);
    }
    const customPages = ['/user'];
    if (customPages.includes(pathName)) {
      matchedPage = {
        title: 'Detail Pengguna',
        description:
          'Atur preferensi akun Anda secara personal dan perusahaan serta memantau aktivitas Anda. Edit untuk memperbarui data.',
      };
    } else {
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
              title: menuItem.title,
              description: menuItem.description,
            };
          }
        }
      });
    }

    setCurrentPage(matchedPage);
  }, [pathName]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleTooltip = () => setIsTooltipVisible(!isTooltipVisible);

  return (
    <div className="relative">
      <header className="sticky top-0 z-30 flex items-center justify-between ps-3 pe-4 py-3 lg:pe-12 md:py-4  bg-dark-navy  shadow-lg">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden inline-flex items-center"
            onClick={onToggleSidebar}
          >
            <Image
              src="icons/header/sidebar.svg"
              alt="tes"
              width={20}
              height={20}
            />
          </button>

          <p className="text-base lg:text-xl font-custom text-font-light">
            {currentPage ? currentPage.title : 'Page'}
          </p>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center lg:hidden"
              onClick={toggleTooltip}
            >
              <Image
                src="/icons/header/info-off.svg"
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
                src="/icons/header/info-off.svg"
                alt="info-off"
                width={24}
                height={24}
                className="h-6 w-6 group-hover:hidden"
              />
              <Image
                src="/icons/header/info-on.svg"
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
          <div className="relative">
            <Image
              id="avatarButton"
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full cursor-pointer"
              src={'/images/default.jpg'}
              alt="User dropdown"
              width={40}
              height={40}
            />

            {isDropdownOpen && (
              <div
                id="userDropdown"
                className="absolute right-0 mt-2 z-10 bg-font-white dark:bg-dark-navy divide-y divide-font-gray rounded-md shadow dark:shadow-md dark:shadow-gray-700 w-44 dark:divide-font-white"
              >
                <ul
                  className="text-sm text-font-black font-custom"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between px-2 py-2 bg-light-gold rounded-t-md"
                    >
                      <span>Percobaan 7 hari</span>
                      <Image
                        src="/icons/header/trial.svg"
                        alt="Trial Icon"
                        width={20}
                        height={20}
                      />
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="dark:text-font-white block px-2 py-2 hover:bg-light-white dark:hover:bg-dark-darkGray"
                    >
                      Detail Pengguna
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/change-password"
                      className="dark:text-font-white block w-full text-left px-2 py-2 hover:bg-light-white dark:hover:bg-dark-darkGray"
                    >
                      Ubah Kata Sandi
                    </Link>
                  </li>
                  <li className="dark:text-font-white flex items-center justify-between px-2 py-2 hover:bg-light-white dark:hover:bg-dark-darkGray">
                    <span>Tema Gelap</span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={toggleTheme}
                        className="sr-only peer"
                      />
                      <div className="relative w-9 h-5 bg-font-light rounded-full peer-checked:bg-dark-navy peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all"></div>
                    </label>
                  </li>
                </ul>
                <div className="py-1">
                  <Link
                    href="/login"
                    className="block w-max px-2 py-2 text-sm text-dark-red dark:text-dark-redLight"
                  >
                    Keluar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
