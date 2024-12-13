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

export interface SendEmailProps {
  email: string;
  step: number;
  setEmail: (email: string) => void;
  onNext: (e: React.FormEvent) => void;
  errorMessage: string;
  isLoading: string;
}

export interface SendOtpProps {
  email: string;
  OTP: string; // Current OTP value
  step: number;
  setOTP: (OTP: string) => void; // Function to set the OTP
  errorMessage: string;
  isLoading: string;
  countdown: number | null;
  handleVerifyOTP: () => void; // Function to call on OTP verification
  handleBackButton: () => void; // Function for back to prev step
  handleSendOTP: (e: React.FormEvent) => void;
}

export interface PasswordProps {
  email: string;
  password: Password;
  step: number;
  setPassword: (data: PasswordTypes) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

export interface PersonalDataStepProps {
  personalData: PersonalData;
  step: number;
  onNext: () => void;
  setPersonalData: (data: PersonalData) => void;
  handleBackButton: () => void;
}

interface CompanyData {
  name: string;
  industry: string;
  job_position: string;
}

export interface CompanyDataStepProps {
  companyData: CompanyData;
  step: number;
  isLoading: string;
  setCompanyData: (data: CompanyData) => void;
  handleRegister: (e: React.FormEvent) => void;
  handleBackButton: () => void;
}
