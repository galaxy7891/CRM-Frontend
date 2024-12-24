import Image from 'next/image';
import React from 'react';
import { QualificationCardProps } from '@/types/dealsTypes';
import { dealsDataTypes } from '@/types/dealsTypes';
import StageAction from './stage-action';
import QualificationInsideCard from '@/components/layout/stage-item';
import StageOutsideLayout from '@/components/layout/stage-outside-layout';
import StatusBadge from '@/components/table/status-badge';
import DataDealsNotFound from '@/components/status/data-deals-not-found';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const QualificationCard: React.FC<QualificationCardProps> = ({
  title,
  dealsProps,
  dealsValue,
  total,
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
          <p className="text-xs">Rp {dealsValue}</p>
          <p className="text-xs">{total} Data</p>
        </div>
        {dealsProps.length === 0 ? (
          <DataDealsNotFound />
        ) : (
          <>
            {dealsProps.map((deal: dealsDataTypes, index: number) => (
              <QualificationInsideCard key={index}>
                <div className="font-custom text-font-black dark:text-font-white space-y-1">
                  <div className="flex items-center justify-between">
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
                    Deadline :{' '}
                    <span className="text-xs font-bold">
                      {moment(deal?.expected_close_date).format('DD MMMM YYYY')}
                    </span>
                  </p>
                  {/* (value_estimated) */}
                  <p className="text-base font-bold">
                    {deal?.value_estimated}{' '}
                  </p>
                  <p className="text-xs font-medium">Kategori Pelanggan</p>
                  <p className="text-base font-bold">{deal?.category}</p>
                  <p className="text-xs font-medium">Nama Pelanggan</p>

                  {deal.customer_name && (
                    <p className="text-base font-bold">{deal.customer_name}</p>
                  )}
                  {deal.customers_company_name && (
                    <p className="text-base font-bold">
                      {deal.customers_company_name}
                    </p>
                  )}

                  <p className="text-xs font-medium">Nama Produk</p>
                  <p className="text-base font-bold">{deal?.product?.name}</p>
                  {deal?.product?.quantity !== null && (
                    <>
                      <p className="text-xs font-medium">Jumlah Produk</p>
                      <p className="text-base font-bold">
                        {deal?.product?.quantity} {deal?.product?.unit}
                      </p>
                    </>
                  )}

                  <div>
                    <div className="flex items-center gap-x-2">
                      <StatusBadge status={deal?.status} />
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
