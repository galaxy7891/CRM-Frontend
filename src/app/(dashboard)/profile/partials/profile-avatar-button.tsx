'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useTheme from '@/components/useTheme';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/actions/authActions';

const ProfileAvatarButton: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const savedPhoto = localStorage.getItem('photo');
    setPhoto(savedPhoto);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="relative">
      <Image
        id="ProfileavatarButton"
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer"
        src={photo && photo !== 'null' ? photo : '/images/default.jpg'}
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
            aria-labelledby="ProfileavatarButton"
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
  );
};

export default ProfileAvatarButton;
