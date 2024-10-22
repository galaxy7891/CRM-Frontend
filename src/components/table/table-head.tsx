import React from "react";

interface TableHeadProps {
  headers: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ headers }) => {
  return (
    <thead>
      <tr>
        <th className="p-4">
          <input
            type="checkbox"
            className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] focus:ring-0"
          />
        </th>
        {headers.map((header, index) => (
          <th key={index} className="text-left p-4 text-font-black dark:text-font-white">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
