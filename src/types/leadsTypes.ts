export interface leadsTypes {
  id: string;
  first_name: string;
  last_name: string;
  customerCategory?: string;
  job: string;
  description: string;
  status: string;
  birthdate: null;
  organization?: string;
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

export interface leadsState {
  leads: leadsTypes[];
  lead: leadsTypes | null;
  logLead: leadsTypes[];
}

export interface editLeadsPropsTypes {
  onClose: () => void;
  leadProps: leadsTypes;
}

export interface organizationsTypes {
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
}

export interface editOrganizationPropsTypes {
  onClose: () => void;
  organizationProps: organizationsTypes;
}
