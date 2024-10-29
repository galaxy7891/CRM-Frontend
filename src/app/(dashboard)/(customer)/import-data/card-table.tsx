import React from "react";

const TableFailedImpor = () => {
  const headers = ["Baris", "Properti", "Jenis Kesalahan"];

  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 mt-5">
      <p className="font-custom text-lg text-font-black dark:text-font-white md:text-[28px] font-medium">
        Kesalahan Impor
      </p>
      <p className="mt-4 mb-4 text-xs font-custom text-font-black dark:text-font-white md:text-lg font-medium">
        Total Kesalahan
      </p>
      <div className="relative h-[320px] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-light-grayBright dark:bg-dark-darkGray sticky top-0 z-10">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`p-3 font-custom text-dark-darkGray dark:text-font-white font-bold 
                    text-base text-left ${
                      index === headers.length - 1 ? "rounded-tr-lg" : ""
                    }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group">
              <td className="px-3 py-2 min-w-[200px] text-dark-navy dark:text-font-white font-custom font-bold text-xs"></td>
              <td className="px-3 py-2 min-w-[200px] text-font-black dark:text-font-white font-custom font-normal text-xs"></td>
              <td className="px-3 py-2 min-w-[200px] text-font-black dark:text-font-white font-custom font-normal text-xs"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableFailedImpor;
