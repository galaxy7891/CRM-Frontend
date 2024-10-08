"use client";

import { useState } from "react";
import FormHeader from "@/components/form-header";
import FormComponent from "@/components/form-login";
import LeftIconSection from "@/components/icon-left";
import Stepper from "@/components/stepper";
import React from "react";

const RegisterEmail: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "user@gmail.com",
      required: true,
      label: "Email",
    },
    {
      name: "nama depan",
      type: "text",
      placeholder: "Contoh : Jhon",
      required: true,
      label: "Nama Depan",
    },
    {
      name: "nama belakang",
      type: "text",
      placeholder: "Contoh: Sucipto",
      required: true,
      label: "Nama Belakang",
    },
    {
      name: "password",
      type: "password",
      placeholder: "masukkan kata sandi",
      required: true,
      label: "Kata Sandi",
    },
    {
      name: "telepon",
      type: "number",
      placeholder: "Contoh: 08xxxxxxxxxx",
      required: true,
      label: "Nomor Telepon",
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
    <div className="flex flex-col lg:flex-row min-h-screen">
      <LeftIconSection />
      <div className="flex flex-col p-7 lg:flex-row h-screen items-center justify-center w-full lg:w-1/2 bg-light-white">
        <div className="bg-font-white w-full mx-auto lg:w-full lg:mx-auto rounded-lg h-full lg:max-h-screen flex flex-col p-3 lg:px-14 overflow-auto">
          <FormHeader
            logoText="Logo"
            title="Buat Akun"
            subtitle="Verifikasi"
            description="Masukan email untuk verifikasi "
            stepper={<Stepper />}
          />
          <FormComponent
            fields={fields}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Masuk"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterEmail;
