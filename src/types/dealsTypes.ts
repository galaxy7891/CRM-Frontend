export interface dealsDataTypes {
  id: string;
  category: string;
  customer_id: string | null;
  customers_company_id: string | null;
  name: string;
  deals_customer?: string;
  product_id: string | null;
  product?: {
    product_id?: string;
    name?: string;
    price?: string;
    quantity: number | null;
    unit?: string | null;
  };
  quantity: number | null;
  unit: string | null;
  description: string;
  tag: string;
  status: string;
  stage: string;
  open_date: string;
  close_date: string;
  expected_close_date: string;
  value_estimated: string;
  value_actual?: string;
  payment_expected?: string;
  payment_category: string;
  payment_duration: string;
  owner: string;
}

export interface activityLogTypes {
  title: string;
  datetime: string;
  description: string;
}

export interface dealsState {
  dealsQualification: dealsDataTypes[];
  dealsProposal: dealsDataTypes[];
  dealsNegotiation: dealsDataTypes[];
  dealsWon: dealsDataTypes[];
  dealsLose: dealsDataTypes[];
  deals: dealsDataTypes[];
  deal: dealsDataTypes | null;
  dealLog: activityLogTypes[];
}

export interface QualificationCardProps {
  title: string;
  dealsProps: dealsDataTypes[];
  handleDeleteConfirmation: () => void;
  handleEdit: (id: string) => void;
  handleEditStageDeal: (id: string, stageChangeValue: string) => void;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}
