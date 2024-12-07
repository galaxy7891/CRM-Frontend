export interface InviteEmployeeProps {
  onClose: () => void;
}

export interface inviteEmployeeDataTypes {
  email: string;
  role: string;
  job_position: string;
}

export interface employeesTypes {
  id: string;
  user_company_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  job_position: string;
  role: string;
  gender: string;
  image_url: string;
  image_public_id: string;
}

export interface activityLogTypes {
  title: string;
  datetime: string;
  description: string;
}

export interface employeesState {
  employee: employeesTypes | null;
  employees: employeesTypes[];
  employeeLog: activityLogTypes[];
}

export interface formActionPropsTypes {
  onClose: () => void;
  employeeProps: employeesTypes;
}
