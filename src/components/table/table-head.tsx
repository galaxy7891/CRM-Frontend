import Checkbox from "../button/checkbox";

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <thead className="bg-light-grayBright dark:bg-dark-darkGray sticky top-0 z-10  ">
      <tr>
        {/* Kolom Checkbox (Sticky Vertikal dan Horizontal) */}
        <th
          className="border-r border-font-gray px-6 rounded-tl-lg dark:rounded-tl-lg 
          sticky left-0 top-0 z-20 bg-light-grayBright dark:bg-dark-darkGray"
        >
          <input
            type="checkbox"
            value=""
            className="w-4 h-4 flex items-start bg-font-white border-dark-navy 
            rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
          />
          {/* <Checkbox/> */}
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

export default TableHeader;
