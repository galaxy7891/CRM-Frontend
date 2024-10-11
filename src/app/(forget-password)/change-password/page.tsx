"use client";

// import Stepper from "@/components/stepper";
import IconForget from "@/components/icon-forget";
import PasswordValidation from "@/components/password-validation";
import FormHeader from "@/components/form-header";

const ChangePassword: React.FC = () => {
  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <IconForget />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <FormHeader
            logoText="Logo"
            title=" Atur Ulang Kata Sandi"
            subtitle=" Atur Kata Sandi"
            description="Silakan masukkan kata sandi yang baru"
          />

          <div className="mt-4">
            <PasswordValidation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
