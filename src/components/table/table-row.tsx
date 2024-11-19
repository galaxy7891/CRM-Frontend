const TableRow = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  return (
    <tr
      key={index}
      className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
    >
      {children}
    </tr>
  );
};

export default TableRow;
