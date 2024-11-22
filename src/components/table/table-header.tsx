import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const TableHeader = ({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) => {
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  return (
    <table className="w-full mb-4">
      <thead className="bg-light-grayBright dark:bg-dark-darkGray sticky top-0 z-10 ">
        <tr>
          {/* Kolom Checkbox (Sticky Vertikal dan Horizontal) */}
          {!(role === 'admin' && pathname === '/employee') && (
            <th
              className="border-r border-font-gray px-6 rounded-tl-lg dark:rounded-tl-lg 
              sticky left-0 top-0 z-20 bg-light-grayBright dark:bg-dark-darkGray"
            ></th>
          )}

          {headers.map((header, index) => (
            <th
              key={index}
              className={`p-3 font-custom text-dark-darkGray dark:text-font-white font-bold 
              text-xs md:text-base text-left ${
                index === headers.length - 1 ? 'rounded-tr-lg' : ''
              } ${
                pathname === '/employee' &&
                index === 0 &&
                role === 'admin' &&
                'rounded-tl-lg'
              }`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TableHeader;
