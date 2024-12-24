export interface leadsTypes {
  id: string;
  first_name: string;
  last_name: string;
  customerCategory?: string;
  job: string;
  description: string;
  status: string;
  birthdate: string;
  customers_company?: string;
  email: string;
  phone: string;
  owner: string;
  address: string;
  province: string;
  city: string;
  subdistrict: string;
  village: string;
  zip_code: string;
}
export interface activityLogTypes {
  title: string;
  datetime: string;
  description: string;
}

export interface leadsState {
  leads: leadsTypes[];
  lead: leadsTypes | null;
  leadLog: activityLogTypes[];
}

export type selectedIds = {
  provinceId: string;
  cityId: string;
  subdistrictId: string;
  villageId: string;
  zipCodeId: string;
};

export interface editLeadsPropsTypes {
  onClose: () => void;
  leadProps: leadsTypes;
}

export interface newLeadsProps {
  onClose: () => void;
  emailLocal: string;
}
