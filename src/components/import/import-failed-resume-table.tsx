import React from "react";
import DashboardCard from "../layout/dashboard-card";
import { ImportErrorMessageDetailTypes } from "@/types/otherTypes";

interface TableFailedImportProps {
  errorMessageDetail: ImportErrorMessageDetailTypes;
}

type RowData = {
  row: string;
  data: {
    property: string | string[]; // Bisa berupa string tunggal atau array
    fail: string | string[]; // Bisa berupa string tunggal atau array
  };
};

type GroupedData = RowData[][];

const TableFailedImport: React.FC<TableFailedImportProps> = ({
  errorMessageDetail,
}) => {
  const headers = ["Baris", "Properti", "Jenis Kesalahan"];

  // Inisialisasi groupedRows sebagai objek kosong
  const groupedRows: Record<string, RowData[]> = {};

  // Cek apakah failedData.data adalah array sebelum melakukan forEach
  if (Array.isArray(errorMessageDetail?.failedData.data)) {
    errorMessageDetail?.failedData.data.forEach((currentRow: RowData) => {
      const rowNumber = currentRow.row;
      if (!groupedRows[rowNumber]) {
        groupedRows[rowNumber] = [];
      }
      groupedRows[rowNumber].push(currentRow);
    });
  }

  // Konversi groupedRows ke bentuk GroupedData (array of arrays)
  const groupedData: GroupedData = Object.values(groupedRows);

  return (
    <div className="pt-4 lg:pt-8">
      <div >
        <DashboardCard>
          <p className="font-custom text-lg text-font-black dark:text-font-white md:text-[28px] font-medium">
            Kesalahan Impor
          </p>
          <p className="mt-4 mb-4 text-xs font-custom text-font-black dark:text-font-white md:text-lg font-medium">
            {errorMessageDetail?.summaryData.invalid_data} Kesalahan
          </p>
          <div className="relative overflow-auto">
            <table className="w-full border-collapse">
              <thead className="bg-light-grayBright dark:bg-dark-darkGray sticky top-0 z-10">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className={`p-3 font-custom text-dark-darkGray dark:text-font-white font-bold 
                    text-base text-left border border-font-gray ${
                      index === headers.length - 1 ? "rounded-tr-lg" : ""
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
                    {rows.map((rowDetail, index) => (
                      <tr
                        key={`${rowDetail.row}-${rowDetail.data.property}-${index}`}
                        className="border border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                      >
                        {/* Render row cell with rowSpan only on the first item of each group */}
                        {index === 0 && (
                          <td
                            rowSpan={rows.length}
                            className="px-3 py-2 text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base border-r border-font-gray"
                          >
                            {rowDetail.row}
                          </td>
                        )}
                        <td className="px-3 py-2 text-dark-navy dark:text-font-white font-custom font-bold text-xs md:text-base border-r border-font-gray">
                          {Array.isArray(rowDetail.data.property)
                            ? rowDetail.data.property.map((item, idx) => (
                                <React.Fragment key={idx}>
                                  {item}
                                  {idx < rowDetail.data.property.length - 1 && (
                                    <br />
                                  )}
                                </React.Fragment>
                              ))
                            : rowDetail.data.property}
                        </td>
                        <td className="px-3 py-2 text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                          {Array.isArray(rowDetail.data.fail)
                            ? rowDetail.data.fail.map((item, idx) => (
                                <React.Fragment key={idx}>
                                  {item}
                                  {idx < rowDetail.data.fail.length - 1 && (
                                    <br />
                                  )}
                                </React.Fragment>
                              ))
                            : rowDetail.data.fail}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default TableFailedImport;
