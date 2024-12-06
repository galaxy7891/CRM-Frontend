"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hook/redux";
import { login } from "@/redux/actions/authActions";
import FormComponent from "@/app/(auth)/login/partials/form-login";
import AuthLeftSection from "@/components/layout/auth-left-section";
import AuthRightSection from "@/components/layout/auth-right-section";
import FailPopUp from "@/components/status/fail-card";

const LoginPageCms: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "user@gmail.com",
      required: true,
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "masukkan kata sandi",
      required: true,
      label: "Kata Sandi",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await dispatch(
      login(formData.email, formData.password, setErrorMessage)
    );
    if (response?.success) {
      router.push("/cms-homepage");
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block ">
        <AuthLeftSection 
        title="Jalin Hubungan, Raih Kesuksesan"
        imageSrc="/images/vector-login-cms.png"/>
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <AuthRightSection>
          <div className="pb-2 pt-3">
            <h1 className="text-2xl md:text-[28px] font-bold text-font-brown ">
              Masuk Admin
            </h1>
            <p className="text-font-black text-xs font-custom mt-2 md:text-base lg:mt-4">
              Selamat datang kembali! Silahkan masuk ke dalam akun Anda.
            </p>
          </div>
          {errorMessage && <FailPopUp>{errorMessage}</FailPopUp>}
          <div className="w-full">
            <FormComponent
              fields={fields}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={loginHandler}
              buttonText="Masuk"
            />
          </div>
        </AuthRightSection>
      </div>
    </div>
  );
};

export default LoginPageCms;
