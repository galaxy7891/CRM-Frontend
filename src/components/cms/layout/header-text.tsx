"use client";

import { usePathname } from "next/navigation";

interface HeaderTitleProps {
  title: string;
  link: string;
}

interface HeaderTextProps {
  headerTitles: HeaderTitleProps[];
}

const HeaderText: React.FC<HeaderTextProps> = ({ headerTitles }) => {
  const pathname = usePathname();

  let matchedPage = { title: "Unknown Page" };

  for (const menuItem of headerTitles) {
    if (pathname.startsWith(menuItem.link)) {
      matchedPage = {
        title: menuItem.title,
      };
      break;
    }
  }

  return (
    <div className="text-center">
      <p className="text-base lg:text-xl font-custom text-font-light">
        {matchedPage.title}
      </p>
    </div>
  );
};

export default HeaderText;
