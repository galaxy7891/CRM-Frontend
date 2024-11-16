export interface contactsTypes {
  id: string;
  customers_company_id: string;
  first_name: string;
  last_name: string;
  customerCategory: string;
  job: string;
  description: string;
  status: string;
  birthdate: string;
  email: string;
  customers_company?: {
    name: string;
    id: string;
  };
  phone: string;
  owner: string;
  address: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}

export type selectedIds = {
  provinceId: string;
  cityId: string;
  subdistrictId: string;
  villageId: string;
  zipCodeId: string;
};

export interface activityLogTypes {
  title: string;
  datetime: string;
  description: string;
}

export interface formActionPropsTypes {
  onClose: () => void;
  contactProps: contactsTypes;
}

export interface contactsState {
  contact: contactsTypes | null;
  contacts: contactsTypes[];
  contactLog: activityLogTypes[];
}
