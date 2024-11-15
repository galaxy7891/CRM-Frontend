import React from "react";
import HeaderWithBackButton from "../layout/header-with-back";
import DashBoardCard from "../layout/dashboard-card";
import TableHeadLog from "./table-head-log";
import FilterActivityLogButton from "../button/filter-activity-log-button";

const TableDetailLog = () => {
  const headers = ["Properti", "Sebelum", "Sesudah"];
  return (
    <>
      <HeaderWithBackButton title="Aktivitas" />
      <div>
        <DashBoardCard>
          <div className="flex justify-end mb-4">
            <FilterActivityLogButton />
          </div>
          <div className="relative  overflow-auto lg:w-full ">
            <table className="w-full mb-4">
              <TableHeadLog headers={headers} />
              <tbody>
                {/* {leads.map((lead: leadsTypes, index: number) => ( */}
                <tr
                  // key={index}
                  className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                >
                  <td className="border-r  py-2 text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base w-full border px-2 min-w-[80px] border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                    <div className="truncate max-w-[200px] block">
                      Aktivitas
                    </div>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base w-full">
                    <div className="truncate max-w-[200px] block">Properti</div>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    <div className="truncate max-w-[200px] block">Sebelum</div>
                  </td>
                  <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                    <div className="truncate max-w-[200px] block">Sesudah</div>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </DashBoardCard>
      </div>
    </>
  );
};

export default TableDetailLog;
