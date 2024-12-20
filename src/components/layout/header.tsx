'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/redux/actions/profileActions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { HeaderTitle } from '@/constants/page';
import { logout } from '@/redux/actions/authActions';
import useTheme from '@/components/useTheme';
import ActionConfirmRedModal from '../status/action-confirm-red-modal';
import Loading from '@/components/status/loading';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [currentPage, setCurrentPage] = useState<
    { title: string; description?: string } | undefined
  >(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isLogOut, setIsLogOut] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleTooltip = () => setIsTooltipVisible(!isTooltipVisible);
  const [accountType, setAccountType] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathName = usePathname();
  const { user } = useSelector((state: RootState) => state.profile);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false); // Close the dropdown when outrange of element
    }
  };

  const handleIsLogout = () => {
    setIsLogOut(!isLogOut);
  };

  const handleLogout = () => {
    dispatch(logout(setIsLoading));
    console.log('logout');
    router.push('/login');
  };

  useEffect(() => {
    dispatch(getProfile());
    setAccountType(user?.account_type || '');
    setDuration(user?.duration || '');
    if (user?.image_url) {
      setPhoto(user.image_url!);
      console.log(user.image_url);
    }

    let matchedPage: { title: string; description?: string } | undefined;

    for (const menuItem of HeaderTitle) {
      if (pathName.startsWith(menuItem.link)) {
        matchedPage = {
          title: menuItem.title,
          description: menuItem.description,
        };
        break;
      }

      if (menuItem.subItems) {
        const matchedSubItem = menuItem.subItems.find((subItem) =>
          pathName.startsWith(subItem.link)
        );

        if (matchedSubItem) {
          matchedPage = {
            title: menuItem.title,
            description: menuItem.description,
          };
          break;
        }
      }
    }

    setCurrentPage(matchedPage);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pathName, dispatch, user?.image_url, user?.account_type, user?.duration]);

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

          <p className="text-base lg:text-xl font-custom text-font-light">
            {currentPage ? currentPage.title : 'Page'}
          </p>

          <div className="relative group">
            <button
              type="button"
              className="flex items-center justify-center"
              onClick={toggleTooltip}
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.35 17.25H12.65V10.35H10.35V17.25ZM11.5 8.04999C11.8258 8.04999 12.0991 7.93959 12.3199 7.71879C12.5407 7.49799 12.6508 7.22506 12.65 6.89999C12.6492 6.57493 12.5388 6.302 12.3188 6.0812C12.0988 5.8604 11.8258 5.75 11.5 5.75C11.1742 5.75 10.9012 5.8604 10.6812 6.0812C10.4612 6.302 10.3508 6.57493 10.35 6.89999C10.3492 7.22506 10.4596 7.49838 10.6812 7.71994C10.9028 7.94151 11.1757 8.05153 11.5 8.04999ZM11.5 23C9.90916 23 8.41416 22.6979 7.015 22.0938C5.61583 21.4897 4.39875 20.6705 3.36375 19.6362C2.32875 18.602 1.50957 17.3849 0.906201 15.985C0.302835 14.5851 0.000768122 13.0901 1.45569e-06 11.5C-0.00076521 9.90993 0.301301 8.41493 0.906201 7.015C1.5111 5.61506 2.33028 4.39798 3.36375 3.36375C4.39722 2.32952 5.6143 1.51033 7.015 0.906199C8.4157 0.302067 9.91069 0 11.5 0C13.0893 0 14.5843 0.302067 15.985 0.906199C17.3857 1.51033 18.6028 2.32952 19.6362 3.36375C20.6697 4.39798 21.4893 5.61506 22.0949 7.015C22.7006 8.41493 23.0023 9.90993 23 11.5C22.9977 13.0901 22.6956 14.5851 22.0938 15.985C21.492 17.3849 20.6728 18.602 19.6362 19.6362C18.5997 20.6705 17.3826 21.49 15.985 22.0949C14.5874 22.6998 13.0924 23.0015 11.5 23Z"
                  fill="#D9D9D9"
                />
              </svg>
            </button>

            {currentPage?.description && isTooltipVisible && (
              <div
                id="tooltip-bottom"
                role="tooltip"
                className="mx-auto absolute left-1/2 transform -translate-x-1/2 mt-2 w-[200px] max-w-xs md:w-[180px] p-2 border bg-light-white border-font-grayLight text-dark-navy text-xs text-start rounded-md shadow-lg transition-opacity duration-300 z-10"
              >
                {currentPage.description}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-light-white"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div ref={dropdownRef} className="relative">
            <div className="w-10">
              <Image
                id="avatarButton"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={photo ? photo : '/images/default.jpg'}
                alt="User dropdown"
                width={40}
                height={40}
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
                  <li>
                    <Link
                      href="/upgrade-LoyalCust"
                      className="flex items-center justify-between px-2 py-2 bg-light-gold rounded-t-md"
                    >
                      <p>
                        {accountType} {duration}
                      </p>
                      <Image
                        src="/icons/header/trial.svg"
                        alt="Trial Icon"
                        width={20}
                        height={20}
                      />
                    </Link>
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
                  <button
                    onClick={handleIsLogout}
                    className="block w-max px-2 py-2 text-sm text-dark-red dark:text-dark-redLight"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {isLoading && <Loading />}
        {isLogOut && (
          <ActionConfirmRedModal
            header="Apakah Anda yakin ingin keluar?"
            description="Anda akan diminta untuk masuk kembali melalui halaman login"
            closeModal
            actionButtonNegative_action={handleIsLogout}
            actionButtonPositive_action={handleLogout}
            actionButtonPositive_name="Keluar"
          />
        )}
      </header>
    </div>
  );
};

export default Header;
