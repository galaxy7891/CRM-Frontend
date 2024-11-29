export interface dealsTypes {
  id: string;
  category: string;
  customer_id: string;
  customers_company_id: string;
  name: string;
  product_id: string;
  quantity: string;
  unit: string;
  description: string;
  tag: string;
  status: string;
  stage: string;
  open_date: string;
  close_date: string;
  expected_close_date: string;
  value_estimated: string;
  value_actual: string;
  payment_category: string;
  payment_duration: string;
  owner: string;
}

export interface dealsDataTypes {
  id: string;
  category: string;
  customer_id: string;
  customers_company_id: string;
  name: string;
  description: string;
  tag: string;
  status: string;
  stage: string;
  open_date: string;
  close_date: string;
  expected_close_date: string;
  value_estimated: string;
  value_actual: string;
  payment_category: string;
  payment_duration: string;
  owner: string;
  products: productsDeals[];
}

export interface productsDeals {
  id: string;
  name: string;
  price: string;
  pivot: pivotDeals;
}

export interface pivotDeals {
  deals_id: string;
  product_id: string;
  quantity: number;
  unit: string;
}

export interface dealsState {
  dealsQualification: dealsDataTypes[];
  dealsProposal: dealsDataTypes[];
  dealsNegotiation: dealsDataTypes[];
  dealsWon: dealsDataTypes[];
  dealsLose: dealsDataTypes[];
  deal: dealsTypes | null;
}
