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
          <div className="p-5 text-start sm:text-center">
            <p className="text-base font-bold lg:text-2xl lg:block text-font-brown sm:order-2">
              Logo
            </p>
          </div>

          <div className="p-5 text-center">
            <p className="lg:text-2xl text-font-brown sm:order-1">Stepper</p>
          </div>
        </div>

        <div className="p-5 text-start sm:text-center">
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
        <div className="grid md:grid-cols-12">
          <div className="px-5 md:col-span-8 md:col-start-3">
            {/* Form Component */}
            <FormComponent
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              buttonText="Kirim"
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <p className="text-xs md:text-base  font-custom font-medium">
            Sudah punya akun?{" "}
            <a
              href="/register-email"
              className="text-xs md:text-base font-custom text-light-gold font-bold ml-1 hover:underline"
            >
              Masuk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifiedEmail;
