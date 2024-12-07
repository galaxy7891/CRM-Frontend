import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuPropsProps {
  href: string;
  title: string;
}

const MenuProps = ({ href, title }: MenuPropsProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <Link href={href}>
      <p
        className={`font-custom text-xs md:text-base transition-all duration-200 ${
          isActive
            ? "text-dark-gold font-medium underline decoration-dark-gold"
            : "text-font-light hover:text-font-white font-normal"
        }`}
      >
        {title}
      </p>
    </Link>
  );
};

export default MenuProps;
