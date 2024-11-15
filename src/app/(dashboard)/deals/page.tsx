"use client"

import React, { useState } from "react";
import QualificationCard from "./partials/qualification-card";
import DashBoardCard from "@/components/layout/dashboard-card";
import NewDeals from "./partials/new-deals";

const Deals = () => {
  const [isAddDeals, setIsAddDeals] = useState<boolean>(false);

  const handleAddDealsClick = () => {
    setIsAddDeals(true);
  };

  const handleCloseAddDeals = () => {
    setIsAddDeals(false);
  };
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <p className="text-font-black dark:text-font-white text-base font-custom md:text-[32px]">
          Data Deals
        </p>
        <button
          onClick={handleAddDealsClick}
          className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
        >
          Tambah Data
        </button>
      </div>
      <div>
        <DashBoardCard>
          <div className="relative overflow-x-auto lg:w-full">
            <div className="grid grid-flow-col gap-4">
              <QualificationCard />
              <QualificationCard />
              <QualificationCard />
            </div>
          </div>
        </DashBoardCard>
        {isAddDeals && <NewDeals onClose={handleCloseAddDeals} />}
      </div>
    </>
  );
};

export default Deals;
