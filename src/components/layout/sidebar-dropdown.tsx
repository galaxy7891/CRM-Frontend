import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DropdownContainer = () => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const menuItems = [
    { label: "Leads", href: "/leads" },
    { label: "Kontak", href: "/contacts" },
    { label: "Perusahaan", href: "/companies" },
  ];

  // Check if the current pathname matches any menu item
  const isAnyItemActive = menuItems.some((item) =>
    pathname.startsWith(item.href)
  );

  // Automatically open dropdown if pathname matches
  useEffect(() => {
    if (isAnyItemActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, isAnyItemActive]);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <div>
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
    </div>
  );
};

export default DropdownContainer;
