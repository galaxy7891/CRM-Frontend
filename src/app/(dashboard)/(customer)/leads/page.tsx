"use client";

import { useState, useEffect } from "react";
import { leadsTypes } from "@/types/leads";
import StatusBadge from "@/components/table/status-badge";
import TableHeader from "@/components/table/table-head";
import axios from "axios";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import EditLeads from "./partials/edit-leads";
import DeleteButton from "@/components/button/delete-button";
import EmptyTable from "@/components/table/empty-table";
import handleExport from "@/utils/export_CSV";
import EditTableButton from "@/components/button/edit-table-button";
import ExportButton from "@/components/button/export-button";
import FilterActivityLogButton from "@/components/button/filter-activity-log-button";
import Checkbox from "@/components/button/checkbox";

const Leads = () => {
  const [sortBy, setSortBy] = useState<string>("terbaru");
  const [statusBy, setStatusBy] = useState<string>("rendah");
  const [perPage, setPerPage] = useState<string>("10");
  const [isEditLead, setIsEditLead] = useState<boolean>(false);
  const [leadsData, setLeadsData] = useState<leadsTypes[]>([]);
  const [leadDataProps, setLeadDataProps] = useState<leadsTypes>(
    {} as leadsTypes
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const headers = ["Nama", "Email", "No Telpon", "Status", "Penanggung Jawab"];
  let getLeadData: leadsTypes | null = null;

  const handleEdit = async (id: string) => {
    await getLeadDataById(id);
    setLeadDataProps(getLeadData!);
    setIsEditLead(true);
  };

  const handleCloseEdit = () => {
    setIsEditLead(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        // If the ID is already selected, remove it
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        // Otherwise, add it
        return [...prevSelectedIds, id];
      }
    });
  };

  const deleteLead = async (ids: string | string[]) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.request({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/leads/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { id: Array.isArray(ids) ? ids : [ids] },
      });

      if (response.data.success) {
        getLeadsData();
      }
    } catch (error) {
      console.error("Error deleting lead(s):", error);
    }
  };

  const getLeadDataById = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        getLeadData = response.data.data;
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const getLeadsData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/leads?sort=${sortBy}&status=${statusBy}&per_page=${perPage}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setLeadsData(response.data.data.data);
        console.log(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching leads data:", error);
    }
  };

  useEffect(() => {
    getLeadsData();
  }, [sortBy, statusBy, perPage]); // Only run once when the component mounts
  return (
    <>
      {/* Search Input */}
      <div className="lg:items-center mb-4 grid grid-cols-12">
        {/* Search Bar */}
        <div className="col-span-12 md:col-span-4 relative">
          {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Image
                  src="/icons/table/search.svg"
                  alt="search icon"
                  width={20}
                  height={20}
                  className="w-[12px] h-[12px] lg:w-[20px] lg:h-[20px]"
                />
              </div>
              <input
                type="text"
                placeholder="Cari Leads"
                className="pl-10 p-2 border-2 font-custom text-xs lg:text-base border-font-gray bg-light-white rounded-[10px] focus:outline-none  dark:bg-dark-darkGray w-full"
              /> */}
        </div>

        <div className="col-span-12 md:col-span-8 flex justify-end gap-2 pt-2 md:pt-0">
          {/* Trash Icon, Export, and Filter Buttons */}
          {/* Delete Button */}
          <DeleteButton onClick={() => deleteLead(selectedIds)} />
          <ExportButton onClick={() => handleExport(leadsData)} />
          <FilterActivityLogButton
            setSortBy={setSortBy}
            setStatusBy={setStatusBy}
            setPerPage={setPerPage}
          />
        </div>
      </div>
      {leadsData.length == 0 ? (
        <EmptyTable />
      ) : (
        <>
          {" "}
          {/* Table */}
          <div className="relative  overflow-auto lg:w-full ">
            <table className="w-full ">
              <TableHeader headers={headers} />
              <tbody>
                {leadsData.map((lead, index) => (
                  <tr
                    key={index}
                    className="border-l border-r border-b border-font-gray hover:bg-dropdown-gray dark:hover:bg-dropdown-darkBlue group"
                  >
                    <td className="border px-2 border-font-gray bg-font-white dark:bg-dark-navy sticky top-o left-0 group-hover:bg-dropdown-gray dark:group-hover:bg-dropdown-darkBlue">
                      <div className="flex items-center space-x-1">
                        <input
                          id={`checkbox-${lead.id}`} // Unique ID for each checkbox
                          type="checkbox"
                          checked={selectedIds.includes(lead.id)} // Check if the ID is in the selectedIds state
                          onChange={() => handleCheckboxChange(lead.id)} // Call the handler
                          className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
                        />
                        {/* <Checkbox
                          id={`checkbox-${lead.id}`} 
                          checked={selectedIds.includes(lead.id)} 
                          onChange={() => handleCheckboxChange(lead.id)} 
                        /> */}
                        <EditTableButton onClick={() => handleEdit(lead.id)} />
                        <button>
                          <Image
                            src="/icons/table/dustbin.svg"
                            alt="deletebtn"
                            width={16}
                            height={16}
                            className="w-5 h-5"
                            onClick={() => deleteLead(lead.id)}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray fpnt text-dark-navy hover:underline dark:text-font-white font-custom font-bold text-xs md:text-base ">
                      <Link href={`/leads/${lead.id}`}>
                        {lead.first_name} {lead.last_name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {lead.email}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {lead.phone}
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-3 py-2 min-w-[200px] border-font-gray text-font-black dark:text-font-white font-custom font-normal text-xs md:text-base">
                      {lead.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditLead && (
            <EditLeads onClose={handleCloseEdit} leadData={leadDataProps} />
          )}
        </>
      )}
    </>
  );
};

export default Leads;
