"use client";

// import Stepper from "@/components/stepper";
import FormComponent from "@/components/form-login";
import { useState } from "react";

const VerifiedEmail: React.FC = () => {
  const [formData, setFormData] = useState({ email: "" });

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "user@gmail.com",
      required: true,
      label: "Alamat Email",
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
    <div className="bg-light-white h-screen p-7">
      <div className="bg-font-white w-full mx-auto lg:w-full lg:mx-auto rounded-xs h-full lg:max-h-screen relative">
        <div className="flex flex-col lg:flex-col-reverse">
          {/* Logo */}
          <div className="p-5 text-start lg:text-center">
            <p className="text-base font-bold lg:text-2xl lg:block text-font-brown lg:order-2">
              Logo
            </p>
          </div>

          {/* Stepper */}
          <div className="p-5 text-center">
            <p className="lg:text-2xl text-font-brown lg:order-1">Stepper</p>
          </div>
        </div>

        <div className="p-5 lg:text-center">
          <h1 className="text-2xl font-bold text-font-brown">
            Atur Ulang Kata Sandi
          </h1>
          <p className="text-font-black text-xs lg:text-base mt-2">
            Silakan masukkan alamat email Anda untuk menerima informasi
          </p>
          <p className="text-font-black text-xs lg:text-base">
            mengenai pengaturan ulang kata sandi.
          </p>
        </div>
        <div className="px-5">
        {/* Form Component */}
        <FormComponent
          fields={fields}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Kirim"
        />
</div>
        {/* Kembali ke Masuk */}
        <div className="absolute bottom-0 left-0 w-full text-center flex items-center justify-center mb-4">
          <a className="text-xs">Kembali ke</a>
          <a href="/login" className="text-xs text-light-gold font-bold ml-1">
            Masuk
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
