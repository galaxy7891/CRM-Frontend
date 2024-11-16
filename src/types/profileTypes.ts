interface dashboardActivities {
  leads: number;
  contacts: number;
  customers_companies: number;
}

interface dashboardDealsCount {
  qualification: number;
  proposal: number;
  negotiation: number;
  won: number;
  lose: number;
}

interface dashboardDealsValue {
  qualification: string;
  proposal: string;
  negotiation: string;
  won: string;
  lose: string;
}

interface dashboardUser {
  date: string;
  greeting: string;
  user: string;
}

export interface profileState {
  logProfile: activityLogTypes[];
  dashboardUser: dashboardUser;
  dashboardActivities: dashboardActivities;
  dashboardDealsValue: dashboardDealsValue;
  dashboardDealsCount: dashboardDealsCount;
}

export interface dataUser {
  image_url: string;
  first_name: string;
  last_name: string;
  job_position: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
}

export interface dataCompany {
  name: string;
  description: string;
  image_url: string;
  industry: string;
  email: string;
  phone: string;
  website: string;
}

export interface userInfoProps {
  profileProps: dataUser;
}

export interface companyInfoProps {
  companyProps: dataCompany;
}
export interface SendForgotPasswordEmailProps {
  email: string;
  step: number;
  setEmail: (email: string) => void;
  onNext: () => void;
  isLoading: boolean;
  errorMessage: string;
}

export interface SendStatusForgotPasswordProps {
  step: number;
  onBack: () => void;
}

export interface newPassword {
  new_password: string;
  confirm_new_password: string;
}

export interface changePasswordTypes {
  password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface activityLogTypes {
  title: string;
  datetime: string;
  description: string;
}
