'use client';

import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import SidebarProps from '@/components/layout/sidebar-props';

interface SidebarCmsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarCms = ({ isOpen, setIsOpen }: SidebarCmsProps) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
        setIsOpen(true);
      } else {
        setIsDesktop(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !isDesktop
      ) {
        setIsOpen(false);
      }
    };

    // Inisialisasi handleResize saat komponen pertama kali dirender
    handleResize();

    // Tambahkan event listener
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen, isDesktop]);

  return (
    <div className="relative">
      <nav
        id="logo-sidebar"
        aria-label="Sidebar"
        ref={sidebarRef}
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
            src="/images/icons/logo.svg"
            alt="logo"
            width={188}
            height={40}
            priority
            className="height:auto width:auto mx-auto px-4 "
          />
          <div className="flex flex-col h-screen">
            <SidebarProps
              href="/admin-homepage"
              title="Beranda"
              icon={
                <svg
                  width="26"
                  height="21"
                  viewBox="0 0 26 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.4 21V13.5882H15.6V21H22.1V11.1176H26L13 0L0 11.1176H3.9V21H10.4Z" />
                </svg>
              }
            />
            <SidebarProps
              href="/clients"
              title="Pelanggan"
              icon={
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0V25H26V24.9604V22.9152V2.08476V0H0ZM3.6851 3.0875H22.0997V5.16941H3.6851V3.0875ZM3.6851 7.25417H15.5024V9.33608H3.6851V7.25417ZM3.6851 11.4208H10.7748V13.5027H3.6851V11.4208ZM20.1385 15.7471C20.1385 16.4358 19.8796 17.0671 19.4472 17.5676C21.2193 18.4077 22.4359 20.0996 22.4359 22.044H20.5985C20.5985 20.1914 18.9495 18.6855 16.921 18.6855C14.8925 18.6855 13.2435 20.1914 13.2435 22.044H11.406C11.406 20.0973 12.6201 18.4055 14.3948 17.5676C13.9624 17.0671 13.7035 16.4335 13.7035 15.7471C13.7035 14.1242 15.1438 12.8088 16.921 12.8088C18.6981 12.8088 20.1385 14.1242 20.1385 15.7471ZM18.301 15.7494C18.301 15.0539 17.6801 14.4892 16.921 14.4892C16.1594 14.4892 15.541 15.0539 15.541 15.7494C15.541 16.445 16.1619 17.0097 16.921 17.0097C17.6826 17.0097 18.301 16.4427 18.301 15.7494Z"
                  />
                </svg>
              }
            />
            <SidebarProps
              href="/cms"
              title="Artikel"
              icon={
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M26 0.235352L23.829 2.46202L21.671 0.235352L19.5 2.46202L17.329 0.235352L15.171 2.46202L13 0.235352L10.829 2.46202L8.671 0.235352L6.5 2.46202L4.329 0.235352L2.171 2.46202L0 0.235352V21.5687C0 23.0354 1.17 24.2354 2.6 24.2354H23.4C24.83 24.2354 26 23.0354 26 21.5687V0.235352ZM11.7 21.5687H2.6V13.5687H11.7V21.5687ZM23.4 21.5687H14.3V18.902H23.4V21.5687ZM23.4 16.2354H14.3V13.5687H23.4V16.2354ZM23.4 10.902H2.6V6.90202H23.4V10.902Z" />
                </svg>
              }
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SidebarCms;
