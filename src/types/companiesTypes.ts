export interface companiesTypes {
  id: string;
  name: string;
  industry: string;
  email: string;
  status: string;
  phone: string;
  owner: string;
  website: string;
  address: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
  description: string;
}

export interface activityLogTypes {
  title: string;
  datetime: string;
  description: string;
}

export interface formActionPropsTypes {
  onClose: () => void;
  companyProps: companiesTypes;
}

export interface companiesState {
  companies: companiesTypes[];
  company: companiesTypes | null;
  companyLog: activityLogTypes[];
}
