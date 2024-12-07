const TableDataAction = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue ">
      <div className="flex justify-center items-center space-x-2">{children}</div>
    </td>
  );
};

export default TableDataAction;
