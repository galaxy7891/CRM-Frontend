export interface dealsTypes {
  id: string;
  category: string;
  customer_id: string;
  customers_company_id: null;
  name: string;
  description: string;
  tag: string;
  status: string;
  stage: string;
  open_date: string;
  close_date: null;
  expected_close_date: string;
  value_estimated: string;
  value_actual: string;
  payment_category: string;
  payment_duration: number;
  owner: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  products: [
    {
      id: string;
      name: string;
      price: string;
      pivot: {
        deals_id: string;
        product_id: string;
        quantity: number;
        unit: string;
      };
    }
  ];
}

export interface dealsState {
  dealsQualification: dealsTypes[];
  dealsProposal: dealsTypes[];
  dealsNegotiation: dealsTypes[];
  dealsWon: dealsTypes[];
  dealsLose: dealsTypes[];
}
