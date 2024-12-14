interface dataUser {
  id: string;
  image_url: string;
  first_name: string;
  last_name: string;
  job_position: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
}

interface dashboardUser {
  date: string;
  greeting: string;
  user: string;
}

interface dashboardActivities {
  business: number;
  regular: number;
  trial: number;
  professional: number;
  unactive: number;
}

export interface clientTypes {
  id: string;
  account_type: string;
  end_date: string;
  user_company: userCompany;
  quantity?: number | null;
  category?: string;
}

interface userCompany {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface EditCustomerProps {
  onClose: () => void;
  clientProps: clientTypes;
}

export interface administratorState {
  user: dataUser | null;
  clients: clientTypes[];
  dashboardUser: dashboardUser;
  dashboardActivities: dashboardActivities;
}
