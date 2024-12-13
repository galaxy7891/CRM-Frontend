'use client';

import React, { useState, useEffect } from 'react';
import NewDeals from './partials/new-deals';
import DealsCardSectionButton from '@/components/button/deals-card-section-button';
import DealsTableSectionButton from '@/components/button/deals-table-section-button';
import DealsTableView from './partials/deals-table-view';
import DealsCardView from './partials/deals-card-view';
const Deals = () => {
  const [isTableView, setIsTableView] = useState<boolean>(true);
  const [isAddDeals, setIsAddDeals] = useState<boolean>(false);
  const [owner, setOwner] = useState<string | null>(null);

  const handleTableView = () => {
    setIsTableView(true);
  };

  const handleCardView = () => {
    setIsTableView(false);
  };

  const handleAddDealsClick = () => {
    setIsAddDeals(!isAddDeals);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOwner(localStorage.getItem('email'));
    }
  }, []);
  return (
    <div className="flex flex-col h-full mb-6">
      {/* Header */}
      <div className="flex flex-shrink-0 items-center mb-4 lg:mb-8">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-4 flex items-center">
            <p className="text-font-black dark:text-font-white text-base font-custom md:text-[32px]">
              Data Deals
            </p>
          </div>
          <div className="col-span-8 flex justify-end gap-2 pt-2 md:pt-0 ">
            <DealsTableSectionButton
              onClick={handleTableView}
              isTableView={isTableView}
            />
            <DealsCardSectionButton
              onClick={handleCardView}
              isTableView={!isTableView}
            />
            <button
              onClick={handleAddDealsClick}
              className="lg:p-[10px] p-[8px] bg-light-gold text-font-brown text-xs lg:text-base font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-gold"
            >
              Tambah Data
            </button>
          </div>
        </div>
      </div>

      {isTableView && <DealsTableView />}
      {!isTableView && <DealsCardView />}
      {isAddDeals && <NewDeals onClose={handleAddDealsClick} owner={owner!} />}
    </div>
  );
};

export default Deals;
