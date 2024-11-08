import React from 'react';

interface TableFailedImportProps {
  errorMessageDetail: any;
}

const TableFailedImport: React.FC<TableFailedImportProps> = ({
  errorMessageDetail,
}) => {
  const headers = ['Baris', 'Properti', 'Jenis Kesalahan'];

  // Group data by row number first, then by property
  const groupedData = Object.values(
    errorMessageDetail.failedData.data.reduce(
      (acc: Record<number, any[]>, data: any) => {
        const row = data.row;
        if (!acc[row]) acc[row] = [];
        acc[row].push(data);
        return acc;
      },
      {}
    )
  );

  return (
    <div className="mt-8">
      <p className="font-custom text-lg text-font-black dark:text-font-white md:text-[28px] font-medium">
        Kesalahan Impor
      </p>
      <p className="mt-4 mb-4 text-xs font-custom text-font-black dark:text-font-white md:text-lg font-medium">
        {errorMessageDetail.invalid_data} Kesalahan
      </p>
      <div className="relative h-[320px] overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-light-grayBright dark:bg-dark-darkGray sticky top-0 z-10">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`p-3 font-custom text-dark-darkGray dark:text-font-white font-bold 
            text-base text-left border border-font-gray ${
              index === headers.length - 1 ? 'rounded-tr-lg' : ''
            }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupedData.map((rows, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {rows.map((data: any, index: number) => (
                  <tr
                    key={`${data.row}-${data.data.property}-${index}`}
                    className="border border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                  >
                    {/* Render row cell with rowSpan only on the first item of each group */}
                    {index === 0 && (
                      <td
                        rowSpan={rows.length}
                        className="px-3 py-2 text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base border-r border-font-gray"
                      >
                        {data.row}
                      </td>
                    )}
                    <td className="px-3 py-2 text-dark-navy dark:text-font-white font-custom font-bold text-xs md:text-base border-r border-font-gray">
                      {data.data.property}
                    </td>
                    <td className="px-3 py-2 text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {data.data.fail}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableFailedImport;
