import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarPropsProps {
  href: string;
  icon: ReactNode; 
  title: string;
}

const SidebarProps = ({ href, icon, title }: SidebarPropsProps) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex items-center space-x-2 px-4 md:px-10 py-3 md:py-5 transition-all duration-200 ${
        isActive
          ? "bg-dark-goldLight text-font-brown font-bold"
          : "hover:text-dark-goldLight font-medium"
      }`}
    >
      <div
        className={`transition-all duration-200 ${
          isActive
            ? "fill-font-brown"
            : "fill-font-light group-hover:fill-dark-goldLight"
        }`}
      >
        {icon}
      </div>
      <span
        className={`font-custom text-base transition-all duration-200 ${
          isActive
            ? "text-font-brown font-bold"
            : "text-font-light group-hover:text-dark-goldLight font-medium" 
        }`}
      >
        {title}
      </span>
    </Link>
  );
};

export default SidebarProps;
