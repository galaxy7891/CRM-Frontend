export interface contactsTypes {
  id: string;
  first_name: string;
  last_name: string;
  customerCategory: string;
  job: string;
  description: string;
  status: string;
  birthdate: string;
  email: string;
  customers_company?: {
    id: string;
    name: string;
  };
  phone: string;
  owner: string;
  address: string;
  country: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}

export interface formActionPropsTypes {
  onClose: () => void;
  contactProps: contactsTypes;
}

export interface contactsState {
  contact: contactsTypes | null;
  contacts: contactsTypes[];
}
