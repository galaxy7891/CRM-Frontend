// components/TableRow.tsx
import { ReactNode } from 'react';

interface TableRowProps {
  children: ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return (
    <tr className="border-l-2 border-r-2 border-b-2 border-font-gray ">
      {children}
    </tr>
  );
};

export default TableRow;
