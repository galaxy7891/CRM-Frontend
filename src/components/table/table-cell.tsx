// components/TableCell.tsx
import { ReactNode } from 'react';

interface TableCellProps {
  children: ReactNode;
}

const TableCell = ({ children }: TableCellProps) => {
  return (
    <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-normal text-xs">
      {children}
    </td>
  );
};

export default TableCell;
