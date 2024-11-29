import { dealsDataTypes } from '@/types/dealsTypes';
import QualificationInsideCard from '@/components/layout/stage-item';
import StageOutsideLayout from '@/components/layout/stage-outside-layout';
import StatusBadge from '@/components/table/status-badge';
import React from 'react';
import Image from 'next/image';
import StageAction from './stage-action';
import DataDealsNotFound from '@/components/status/data-deals-not-found';

interface QualificationCardProps {
  title: string;
  dealsProps: dealsDataTypes[];
  handleDeleteConfirmation: () => void;
  handleEdit: (id: string) => void;
  handleEditStageDeal: (id: string, stageChangeValue: string) => void;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const QualificationCard: React.FC<QualificationCardProps> = ({
  title,
  dealsProps,
  handleDeleteConfirmation,
  handleEdit,
  handleEditStageDeal,
  setSelectedId,
}) => {
  return (
    <div>
      <StageOutsideLayout>
        {/* (stage) */}
        <p className="font-custom text-font-black dark:text-font-white font-bold text-2xl">
          {title}
        </p>
        <div className="mt-1 flex justify-between items-center font-bold font-custom text-font-black dark:text-font-white">
          {/* (total value_estimated) */}
          <p className="text-xs">Rp 1.000.000</p>
          <p className="text-xs">Total Data</p>
        </div>
        {dealsProps.length === 0 ? (
          <DataDealsNotFound />
        ) : (
          <>
            {dealsProps.map((deal: dealsDataTypes, index: number) => (
              <QualificationInsideCard key={index}>
                <div className="font-custom text-font-black dark:text-font-white space-y-1">
                  <div className="flex items-center justify-between">
                    {/* (name) */}
                    <p className="text-base font-bold">{deal?.name}</p>
                    <StageAction
                      handleDeleteConfirmation={() => {
                        handleDeleteConfirmation();
                        setSelectedId(deal.id);
                      }}
                      handleEdit={() => handleEdit(deal.id)}
                      handleEditStageDeal={handleEditStageDeal}
                      deal_id={deal.id}
                    />
                  </div>
                  <p className="text-xs font-medium">
                    Deadline :{/* (expected_close_date) */}
                    <span className="text-xs font-bold">
                      {deal?.expected_close_date}
                    </span>
                  </p>
                  {/* (value_estimated) */}
                  <p className="text-base font-bold">
                    {deal?.value_estimated}{' '}
                  </p>
                  <p className="text-xs font-medium">Nama Pelanggan</p>
                  {/* (customer_name) */}
                  <p className="text-base font-bold">Tejo Wijaya </p>
                  <p className="text-xs font-medium">Nama Produk</p>
                  <p className="text-base font-bold">
                    {deal?.products[0]?.name}
                  </p>
                  <p className="text-xs font-medium">Jumlah Produk</p>
                  <p className="text-base font-bold">
                    {deal?.products[0]?.pivot?.quantity}{' '}
                    {deal?.products[0]?.pivot?.unit}
                  </p>
                  <div>
                    <div className="flex items-center gap-x-2">
                      <StatusBadge status="rendah" />
                      <Image
                        className="w-10 h-10 rounded-full cursor-pointer"
                        src={'/images/default.jpg'}
                        alt="User dropdown"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
              </QualificationInsideCard>
            ))}
          </>
        )}
      </StageOutsideLayout>
    </div>
  );
};

export default QualificationCard;
