import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/redux/actions/administratorActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logout } from '@/redux/actions/authActions';
import Image from 'next/image';
import useTheme from '@/components/useTheme';
import HeaderText from './header-text';

interface HeaderCmsProps {
  onToggleSidebar: () => void;
}

const headerTitles = [
  { title: 'Beranda', link: '/cms-homepage' },
  { title: 'Pelanggan', link: '/cms-clients' },
  { title: 'Artikel', link: '/cms-article' },
];
const HeaderCms: React.FC<HeaderCmsProps> = ({ onToggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log('logout');
    router.push('/cms-login');
  };

  useEffect(
    () => {
      dispatch(getProfile());
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    // [dispatch]
  );

  return (
    <div className="relative">
      <header className="sticky top-0 z-30 flex items-center justify-between ps-3 pe-4 py-3 lg:pe-12 md:py-4  bg-dark-navy  shadow-lg">
        <div className="flex items-center gap-3 md:gap-5">
          <button
            className="md:hidden inline-flex items-center"
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
          <HeaderText headerTitles={headerTitles} />
        </div>
        <div className="flex items-center gap-5">
          <div ref={dropdownRef} className="relative">
            <div className="w-10">
              <Image
                id="avatarButton"
                onClick={toggleDropdown}
                className="w-auto h-auto rounded-full cursor-pointer"
                src="/images/customer.png"
                alt="User dropdown"
                width={35}
                height={35}
              />
            </div>

            {isDropdownOpen && (
              <div
                id="userDropdown"
                className="absolute right-0 mt-2 z-10 bg-font-white dark:bg-dark-navy divide-y divide-font-gray rounded-md shadow dark:shadow-md dark:shadow-gray-700 w-44 dark:divide-font-white"
              >
                <ul
                  className="text-sm text-font-black font-custom"
                  aria-labelledby="avatarButton"
                >
                  <li className=" rounded-t-md dark:text-font-white flex items-center justify-between px-2 py-2 hover:bg-light-white dark:hover:bg-dark-darkGray">
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
                  <button
                    onClick={handleLogout}
                    className="block w-max px-2 py-2 text-sm text-dark-red dark:text-dark-redLight"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderCms;
