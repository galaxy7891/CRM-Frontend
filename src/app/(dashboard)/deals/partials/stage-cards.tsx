import Image from 'next/image';
import React, { useEffect } from 'react';
import { QualificationCardProps } from '@/types/dealsTypes';
import { dealsDataTypes } from '@/types/dealsTypes';
import { getLeads } from '@/redux/actions/leadsActions';
import { getContacts } from '@/redux/actions/contactsActions';
import { getCompanies } from '@/redux/actions/companiesActions';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import StageAction from './stage-action';
import QualificationInsideCard from '@/components/layout/stage-item';
import StageOutsideLayout from '@/components/layout/stage-outside-layout';
import StatusBadge from '@/components/table/status-badge';
import DataDealsNotFound from '@/components/status/data-deals-not-found';

const QualificationCard: React.FC<QualificationCardProps> = ({
  title,
  dealsProps,
  handleDeleteConfirmation,
  handleEdit,
  handleEditStageDeal,
  setSelectedId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { leads } = useSelector((state: RootState) => state.leads);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const { companies } = useSelector((state: RootState) => state.companies);

  useEffect(() => {
    dispatch(getLeads('terbaru', '', 'semua', 1, () => {}));
    dispatch(getContacts('terbaru', '', 'semua', 1, () => {}));
    dispatch(getCompanies('terbaru', '', 'semua', 1, () => {}));
  }, [dispatch]);

  const getCustomerName = (deal: dealsDataTypes): string => {
    const lead = leads.find((lead) => lead.id === deal?.customer_id);
    if (lead) return `${lead.first_name} ${lead.last_name || ''}`.trim();

    const contact = contacts.find(
      (contact) => contact.id === deal?.customer_id
    );
    if (contact)
      return `${contact.first_name} ${contact.last_name || ''}`.trim();

    const company = companies.find(
      (company) => company.id === deal?.customers_company_id
    );
    if (company) return company.name;

    return 'Memuat...';
  };

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
                  <p className="text-xs font-medium">Kategori Pelanggan</p>
                  <p className="text-base font-bold">{deal?.category}</p>
                  <p className="text-xs font-medium">Nama Pelanggan</p>
                  <p className="text-base font-bold">{getCustomerName(deal)}</p>
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
