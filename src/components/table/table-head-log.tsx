interface TableHeadLogProps {
  headers: string[];
}

const TableHeadLog: React.FC<TableHeadLogProps> = ({ headers }) => {
  return (
    <thead className="bg-light-grayBright dark:bg-dark-darkGray sticky top-0 z-10  ">
      <tr>
        {/* Kolom Checkbox (Sticky Vertikal dan Horizontal) */}
        <th
          className="border-r border-font-gray px-6 rounded-tl-lg dark:rounded-tl-lg 
            sticky left-0 top-0 z-20 bg-light-grayBright dark:bg-dark-darkGray font-custom text-dark-darkGray dark:text-font-white font-bold 
              text-xs md:text-base text-left"
        >
          Aktivitas
        </th>
        {headers.map((header, index) => (
          <th
            key={index}
            className={`p-3 font-custom text-dark-darkGray dark:text-font-white font-bold 
              text-xs md:text-base text-left ${
                index === headers.length - 1 ? "rounded-tr-lg" : ""
              }`}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadLog;
