const TableData = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="px-3 py-3 min-w-7 md:min-w-60 border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base ">
      <div className="truncate w-60 block">{children}</div>
    </td>
  );
};

export default TableData;
