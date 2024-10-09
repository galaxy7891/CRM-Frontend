import PasswordValidation from "@/components/password-validation";
import React from "react";

const changePassword: React.FC = () => {
  return (
    <div className="bg-light-white h-screen p-7">
      <div className="bg-font-white w-full mx-auto lg:w-full lg:mx-auto rounded-xs h-full lg:max-h-screen">
        <div className="flex flex-col lg:flex-col-reverse">
          <div className="p-5 text-start md:text-center">
            <p className="text-base font-bold lg:text-2xl lg:block text-font-brown md:order-2">
              Logo
            </p>
          </div>

          <div className="p-5 text-center">
            <p className="lg:text-2xl text-font-brown md:order-1">Stepper</p>
          </div>
        </div>

        <div className="p-5 md:text-center">
          <h1 className="text-2xl font-bold text-font-brown">Atur Ulang Kata Sandi</h1>
          <p className="text-font-black text-xs lg:text-base mt-2">
            Silakan masukkan kata sandi Anda yang baru
          </p>
        </div>

        {/* Membungkus PasswordValidation */}
        <div className="flex justify-start md:justify-center lg:px-32 px-5 mx-auto">
          <div className="w-full max-w-xl"> 
            <PasswordValidation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default changePassword;
