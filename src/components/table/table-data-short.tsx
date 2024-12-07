const TableDataShort = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="px-3 py-2 md:py-3 min-w-36 min-w- border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base w-full">
      <div className="truncate w-36 block">{children}</div>
    </td>
  );
};

export default TableDataShort;
