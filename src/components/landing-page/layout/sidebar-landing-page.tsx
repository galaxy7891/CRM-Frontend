"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Menu from "./menu";

interface SidebarLandingPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarLandingPage: React.FC<SidebarLandingPageProps> = ({
  isOpen,
  onClose,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen w-1/2 bg-dark-navy z-[99] flex flex-col overflow-hidden transition-transform duration-300 md:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={188}
        height={40}
        priority
        className="p-4 h-auto w-auto"
      />
      <div className="flex items-center justify-center">
        <Menu />
      </div>
    </div>
  );
};

export default SidebarLandingPage;
