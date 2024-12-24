import { usePathname } from 'next/navigation';

const TableDataAction = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isCmsCustomer = pathname === '/clients';

  return (
    <td
      className={`border px-2 ${
        isCmsCustomer ? 'w-1' : 'min-w-[80px]'
      } border-font-gray bg-font-white dark:bg-dark-navy 
      sticky top-0 left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue `}
    >
      <div className="flex items-center space-x-2 justify-center">
        {children}
      </div>
    </td>
  );
};

export default TableDataAction;
