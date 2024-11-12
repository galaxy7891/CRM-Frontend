export interface InviteEmployeeProps {
  onClose: () => void;
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

export interface employeesState {
  employee: employeesTypes | null;
  employees: employeesTypes[];
}

export interface formActionPropsTypes {
  onClose: () => void;
  employeeProps: employeesTypes;
}
