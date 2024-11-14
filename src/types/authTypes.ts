interface InputField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  label: string;
}

export interface FormComponentProps {
  fields: InputField[];
  formData: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  afterInputText?: string;
  afterInputTextHref?: string;
}

export interface PersonalDataTypes {
  first_name: string;
  last_name: string;
  phone: string;
}

export interface CompanyDataTypes {
  name: string;
  industry: string;
  job_position: string;
}

export interface PasswordTypes {
  password: string;
  password_confirmation: string;
}

export interface ParamsData {
  email: string;
  token: string;
}

export interface PersonalData {
  first_name: string;
  last_name: string;
  phone: string;
}

export interface Password {
  password: string;
  password_confirmation: string;
}
