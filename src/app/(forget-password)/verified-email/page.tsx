"use client";

import { useState } from "react";
import FormComponent from "@/components/form-login";
// import Stepper from '@/components/stepper';
import IconForget from "@/components/icon-forget";
import FormHeader from "@/components/form-header";

const VerifiedEmail: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "user@gmail.com",
      required: true,
      label: "Email",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <IconForget />
      </div>
      <div className="flex flex-col p-4 lg:p-10 w-full sm:w-1/2">
        <div className="bg-font-white w-full h-full rounded-lg px-4 sm:p-10 lg:px-20 lg:py-4">
          <FormHeader
            logoText="Logo"
            title="Atur Ulang Kata Sandi"
            subtitle=" Masukkan Email"
            description=" Silakan masukkan email anda untuk reset kata sandi.
"
          />
        
        <div className="w-full">
          <FormComponent
            fields={fields}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Masuk"
          />
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs md:text-base  font-custom font-medium">
            Kembali{" "}
            <a
              href="/login"
              className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
            >
              Masuk
            </a>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
