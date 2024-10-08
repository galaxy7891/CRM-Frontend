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
      name: "jabatan",
      type: "text",
      placeholder: "Contoh : General Manager",
      required: true,
      label: "Jabatan",
    },
    {
        name: "nama Perusahaan",
        type: "text",
        placeholder: "Contoh : PT Campus Digital Indonesia",
        required: true,
        label: "Nama Perusahaan",
      },
      {
        name: "jenis perusahaan",
        type: "text",
        placeholder: "Contoh : Teknologi Informasi",
        required: true,
        label: "Jenis Perusahaan",
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
          <button
            type="button"
            className="w-full px-1 h-12 lg:h-15  mt-3 flex items-center justify-center border border-light-gold py-2 rounded-md"
          >
            <p className="font-custom text-dark-gold lg:text-base font-bold">
             Kembali
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmail;
