"use client";

import Stepper from "@/components/stepper";
import IconForget from "@/components/icon-forget";
import PasswordValidation from "@/components/password-validation";

const ChangePassword: React.FC = () => {
  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <IconForget />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <p className="text-2xl lg:text-4xl text-font-brown font-custom pb-2">
            Logo
          </p>
          <div className="pb-2">
            <h1 className="text-2xl md:text-[28px] font-bold text-font-brown lg:mt-5">
              Atur Ulang Kata Sandi
            </h1>
            <div className="flex justify-center mt-4">
              <Stepper />
            </div>
            <p className="text-font-black text-xl font-custom font-medium mt-2 lg:text-2xl lg:mt-4">
              Atur Kata Sandi
            </p>
            <p className="font-small text-font-black font-custom lg:text-base lg:mt-3">
              Silakan masukkan kata sandi yang baru
            </p>
            <div className="mt-4">
            <PasswordValidation/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
