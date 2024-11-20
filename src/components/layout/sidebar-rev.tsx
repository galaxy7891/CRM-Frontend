"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SidebarProps from "./sidebar-props";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarRev = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  const menuItems = [
    { label: "Leads", href: "/leads" },
    { label: "Kontak", href: "/contacts" },
    { label: "Perusahaan", href: "/companies" },
  ];

  // Check if the current pathname matches any menu item
  const isAnyItemActive = menuItems.some((item) =>
    pathname.startsWith(item.href)
  );

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("role"));
    }
  }, []);
  // let user: string | null = "";

  // if (typeof window !== "undefined") {
  //   user = localStorage.getItem("role");
  // }

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
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen, isDesktop]);

  useEffect(() => {
    // Perbarui isActive berdasarkan isAnyItemActive
    setIsActive(isAnyItemActive);
  }, [pathname, isAnyItemActive]);

  return (
    <div className="relative ">
      <nav
        id="logo-sidebar"
        aria-label="Sidebar"
        ref={sidebarRef}
        className={`${
          isOpen || isDesktop
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        } fixed top-0 left-0 h-screen transition-all duration-300 bg-dark-navy z-40 md:translate-x-0 md:opacity-100 md:static w-[190px] md:min-w-[200px] shadow-lg md:shadow-none shadow-gray-600 flex flex-col pt-4`}
        style={{
          visibility: isOpen || isDesktop ? "visible" : "hidden",
          maxWidth: isOpen && !isDesktop ? "50vw" : isDesktop ? "none" : "0",
        }}
      >
        <div className="flex flex-col  gap-[8px] md:gap-4">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={188}
            height={40}
            priority
            className="height:auto width:auto mx-auto px-4 "
          />
          <div className="flex flex-col h-screen">
            <SidebarProps
              href="/homepage"
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
            {!(user === "employee") && (
              <SidebarProps
                href="/employee"
                title="Karyawan"
                icon={
                  <svg
                    width="26"
                    height="25"
                    viewBox="0 0 26 25"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.1555 10.5109C14.2454 10.5109 16.7504 8.15796 16.7504 5.25546C16.7504 2.35295 14.2454 0 11.1555 0C8.06547 0 5.56055 2.35295 5.56055 5.25546C5.56055 8.15796 8.06547 10.5109 11.1555 10.5109Z" />
                    <path d="M14.7412 20.1191H20.8038V21.2581H14.7412V20.1191Z" />
                    <path d="M9.5444 21.746V24.1867C9.5444 24.4024 9.63565 24.6094 9.79807 24.7619C9.96049 24.9145 10.1808 25.0002 10.4105 25.0002H25.1339C25.3636 25.0002 25.5839 24.9145 25.7463 24.7619C25.9088 24.6094 26 24.4024 26 24.1867V16.0513C26 15.8355 25.9088 15.6286 25.7463 15.476C25.5839 15.3235 25.3636 15.2377 25.1339 15.2377H19.0713V14.0418C19.0713 13.8261 18.9801 13.6192 18.8177 13.4666C18.6552 13.314 18.4349 13.2283 18.2052 13.2283C17.9755 13.2283 17.7552 13.314 17.5928 13.4666C17.4304 13.6192 17.3392 13.8261 17.3392 14.0418V15.2377H15.607V12.3253C14.1353 12.0991 12.6466 11.9848 11.1553 11.9836C7.86662 11.9704 4.61477 12.6341 1.62839 13.9279C1.13687 14.1458 0.72221 14.4916 0.433605 14.9242C0.144999 15.3568 -0.00543546 15.8581 0.000150074 16.3686V21.746H9.5444ZM24.2678 23.3731H11.2766V16.8648H17.3392V17.2065C17.3392 17.4223 17.4304 17.6292 17.5928 17.7818C17.7552 17.9343 17.9755 18.02 18.2052 18.02C18.4349 18.02 18.6552 17.9343 18.8177 17.7818C18.9801 17.6292 19.0713 17.4223 19.0713 17.2065V16.8648H24.2678V23.3731Z" />
                  </svg>
                }
              />
            )}
            <div
              className={`group flex items-center ps-4 md:ps-10 py-3 md:py-5 cursor-pointer ${
                isAnyItemActive
                  ? "text-font-brown font-bold bg-dark-goldLight"
                  : isActive
                  ? "text-dark-goldLight font-medium"
                  : "text-font-light font-medium hover:text-dark-goldLight"
              } `}
              onClick={toggleActive}
            >
              <div className="flex items-center space-x-2">
                {/* Icon */}
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-colors duration-300 ${
                    isAnyItemActive
                      ? "text-font-brown "
                      : isActive
                      ? "text-dark-goldLight font-medium"
                      : "text-font-light group-hover:text-dark-goldLight font-medium"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0V25H26V24.9604V22.9152V2.08476V0H0ZM3.6851 3.0875H22.0997V5.16941H3.6851V3.0875ZM3.6851 7.25417H15.5024V9.33608H3.6851V7.25417ZM3.6851 11.4208H10.7748V13.5027H3.6851V11.4208ZM20.1385 15.7471C20.1385 16.4358 19.8796 17.0671 19.4472 17.5676C21.2193 18.4077 22.4359 20.0996 22.4359 22.044H20.5985C20.5985 20.1914 18.9495 18.6855 16.921 18.6855C14.8925 18.6855 13.2435 20.1914 13.2435 22.044H11.406C11.406 20.0973 12.6201 18.4055 14.3948 17.5676C13.9624 17.0671 13.7035 16.4335 13.7035 15.7471C13.7035 14.1242 15.1438 12.8088 16.921 12.8088C18.6981 12.8088 20.1385 14.1242 20.1385 15.7471ZM18.301 15.7494C18.301 15.0539 17.6801 14.4892 16.921 14.4892C16.1594 14.4892 15.541 15.0539 15.541 15.7494C15.541 16.445 16.1619 17.0097 16.921 17.0097C17.6826 17.0097 18.301 16.4427 18.301 15.7494Z"
                    fill="currentColor"
                  />
                </svg>
                {/* Label */}
                <span>Pelanggan</span>
                {/* Dropdown Arrow */}
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform duration-300 ${
                    isActive ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path
                    d="M10.4071 2.10295L6.08548 5.96921C5.75781 6.26236 5.22656 6.26236 4.89889 5.96921L4.88705 5.95862C4.55938 5.66548 4.55938 5.19019 4.88705 4.89705L9.20863 1.03079C9.53629 0.737642 10.0675 0.737642 10.3952 1.03079L10.4071 1.04138C10.7347 1.33453 10.7347 1.80981 10.4071 2.10295Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.11392 5.95862L6.10208 5.96921C5.77442 6.26236 5.24316 6.26236 4.9155 5.96921L0.593922 2.10295C0.266255 1.80981 0.266255 1.33453 0.593922 1.04138L0.605764 1.03079C0.933431 0.737642 1.46468 0.737642 1.79235 1.03079L6.11392 4.89705C6.44159 5.19019 6.44159 5.66548 6.11392 5.95862Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>

            {/* Dropdown Items */}
            {isActive && (
              <div className="bg-dropdown-navy text-font-light mt-2">
                {menuItems.map((item) => {
                  const isItemActive = pathname.startsWith(item.href);

                  return (
                    <Link href={item.href} key={item.href}>
                      <p
                        className={`py-3 cursor-pointer ${
                          isItemActive
                            ? "text-dark-navy bg-dropdown-gold font-bold ps-6 md:ps-14"
                            : "hover:text-dark-goldLight hover:font-bold ps-6 md:ps-14"
                        }`}
                      >
                        {item.label}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
            <SidebarProps
              href="/deals"
              title="Deals"
              icon={
                <svg
                  width="26"
                  height="21"
                  viewBox="0 0 26 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.6431 3.93668H15.7138L20.1779 0.32384C20.304 0.221226 20.4541 0.139779 20.6195 0.0841976C20.7848 0.0286161 20.9622 0 21.1413 0C21.3204 0 21.4978 0.0286161 21.6631 0.0841976C21.8285 0.139779 21.9785 0.221226 22.1047 0.32384L25.6054 3.15937C25.8582 3.36449 26 3.64197 26 3.9312C26 4.22043 25.8582 4.49791 25.6054 4.70304L22.4982 7.22108H11.6431V9.41067C11.6431 9.70103 11.5002 9.9795 11.2457 10.1848C10.9912 10.3901 10.6461 10.5055 10.2862 10.5055C9.92637 10.5055 9.58124 10.3901 9.32678 10.1848C9.07231 9.9795 8.92936 9.70103 8.92936 9.41067V6.12628C8.92936 5.54556 9.21527 4.98863 9.7242 4.578C10.2331 4.16737 10.9234 3.93668 11.6431 3.93668ZM3.50183 9.41067V13.7899L0.394571 16.297C0.141851 16.5021 0 16.7796 0 17.0688C0 17.358 0.141851 17.6355 0.394571 17.8406L3.89533 20.6762C4.02147 20.7788 4.17154 20.8602 4.33689 20.9158C4.50223 20.9714 4.67959 21 4.85871 21C5.03784 21 5.21519 20.9714 5.38054 20.9158C5.54589 20.8602 5.69596 20.7788 5.8221 20.6762L11.6431 15.9795H17.0706C17.4305 15.9795 17.7756 15.8641 18.0301 15.6588C18.2846 15.4535 18.4275 15.175 18.4275 14.8847V13.7899H19.7844C20.1443 13.7899 20.4894 13.6745 20.7439 13.4692C20.9983 13.2639 21.1413 12.9854 21.1413 12.6951V11.6003H22.4982C22.858 11.6003 23.2032 11.4849 23.4576 11.2796C23.7121 11.0743 23.8551 10.7958 23.8551 10.5055V9.41067H14.3569V10.5055C14.3569 11.0862 14.071 11.6431 13.562 12.0538C13.0531 12.4644 12.3629 12.6951 11.6431 12.6951H8.92936C8.20962 12.6951 7.51937 12.4644 7.01044 12.0538C6.50151 11.6431 6.21559 11.0862 6.21559 10.5055V7.22108L3.50183 9.41067Z" />
                </svg>
              }
            />
            <SidebarProps
              href="/product"
              title="Produk"
              icon={
                <svg
                  width="26"
                  height="25"
                  viewBox="0 0 26 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H26V5.55556H0V0ZM22.1 6.94444H1.3V22.2222C1.3 22.9589 1.57393 23.6655 2.06152 24.1864C2.54912 24.7073 3.21044 25 3.9 25H22.1C22.7896 25 23.4509 24.7073 23.9385 24.1864C24.4261 23.6655 24.7 22.9589 24.7 22.2222V6.94444H22.1ZM18.2 15.2778H7.8V12.5H18.2V15.2778Z" />
                </svg>
              }
            />
            <hr className="h-px my-2 w-5/6 bg-font-light border-0 mx-auto"></hr>
            <Link
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center items-center space-x-2 py-2 md:py-4"
            >
              <svg
                className="group-hover:hidden"
                width="30"
                height="30"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.6687 6.8898C19.2725 1.6248 12.3175 0.0648001 6.93873 3.33105C1.68998 6.5973 -1.66446e-05 13.7148 3.39623 18.9636L3.67248 19.3861L2.53498 23.6436L6.79248 22.5061L7.21498 22.7823C9.05123 23.7736 11.05 24.3423 13.0325 24.3423C15.1612 24.3423 17.29 23.7736 19.1262 22.6361C24.375 19.2236 25.935 12.2523 22.6687 6.8573V6.8898ZM19.695 17.8423C19.1262 18.6873 18.4112 19.256 17.42 19.4023C16.8512 19.4023 16.1362 19.6786 13.3087 18.5573C10.9037 17.4198 8.90498 15.5673 7.49123 13.4386C6.64623 12.4473 6.20748 11.1636 6.07748 9.8798C6.07748 8.7423 6.49998 7.75105 7.21498 7.03605C7.49123 6.7598 7.78373 6.61355 8.05998 6.61355H8.77498C9.05123 6.61355 9.34373 6.61355 9.48998 7.1823C9.76623 7.8973 10.4812 9.60355 10.4812 9.7498C10.6275 9.89605 10.5625 10.9848 9.91248 11.6023C9.55498 12.0086 9.48998 12.0248 9.63623 12.3173C10.205 13.1623 10.92 14.0236 11.6187 14.7386C12.4637 15.4536 13.325 16.0223 14.3162 16.4448C14.5925 16.5911 14.885 16.5911 15.0312 16.2986C15.1775 16.0223 15.8762 15.3073 16.1687 15.0148C16.445 14.7386 16.5912 14.7385 16.8837 14.8685L19.1587 16.0061C19.435 16.1523 19.7275 16.2823 19.8737 16.4286C20.02 16.851 20.02 17.4198 19.7275 17.8423H19.695Z"
                  fill="#D9D9D9"
                />
              </svg>
              <svg
                className="hidden group-hover:block"
                width="30"
                height="30"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12.5" cy="13.5" r="9.5" fill="#FDFDFD" />
                <path
                  d="M22.6687 6.8898C19.2725 1.6248 12.3175 0.0648001 6.93873 3.33105C1.68998 6.5973 -1.66893e-05 13.7148 3.39623 18.9636L3.67248 19.3861L2.53498 23.6436L6.79248 22.5061L7.21498 22.7823C9.05123 23.7736 11.05 24.3423 13.0325 24.3423C15.1612 24.3423 17.29 23.7736 19.1262 22.6361C24.375 19.2236 25.935 12.2523 22.6687 6.8573V6.8898ZM19.695 17.8423C19.1262 18.6873 18.4112 19.2561 17.42 19.4023C16.8512 19.4023 16.1362 19.6786 13.3087 18.5573C10.9037 17.4198 8.90498 15.5673 7.49123 13.4386C6.64623 12.4473 6.20748 11.1636 6.07748 9.8798C6.07748 8.7423 6.49998 7.75105 7.21498 7.03605C7.49123 6.7598 7.78373 6.61355 8.05998 6.61355H8.77498C9.05123 6.61355 9.34373 6.61355 9.48998 7.1823C9.76623 7.8973 10.4812 9.60355 10.4812 9.7498C10.6275 9.89605 10.5625 10.9848 9.91248 11.6023C9.55498 12.0086 9.48998 12.0248 9.63623 12.3173C10.205 13.1623 10.92 14.0236 11.6187 14.7386C12.4637 15.4536 13.325 16.0223 14.3162 16.4448C14.5925 16.5911 14.885 16.5911 15.0312 16.2985C15.1775 16.0223 15.8762 15.3073 16.1687 15.0148C16.445 14.7386 16.5912 14.7386 16.8837 14.8686L19.1587 16.0061C19.435 16.1523 19.7275 16.2823 19.8737 16.4285C20.02 16.8511 20.02 17.4198 19.7275 17.8423H19.695Z"
                  fill="#28A745"
                />
              </svg>

              <p className="font-custom text-font-white text-base group-hover:font-bold">
                Hubungi Kami
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SidebarRev;
