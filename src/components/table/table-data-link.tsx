import Link from 'next/link';

const TableDataLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <td className="px-3 py-2 min-w-24 md:min-w-72 border-font-gray text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base ">
      <Link href={href} className="truncate w-24 md:w-72 block">
        {children}
      </Link>
    </td>
  );
};
export default TableDataLink;
