"use client";

import { newPassword } from "@/types/profileTypes";
import { resetPassword } from "@/redux/actions/profileActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InputPassword from "@/components/form-input/password-input";
import Image from "next/image";
import AuthLeftSection from "@/components/layout/auth-left-section";
import AuthRightSection from "@/components/layout/auth-right-section";
import FailText from "@/components/status/fail-text";
import SuccessModal from "@/components/status/success-modal";

const ResetPassword: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState<newPassword>({
    new_password: "",
    confirm_new_password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const rules = [
    { regex: /.{8,}/, label: "Minimal 8 karakter" },
    { regex: /[a-z]/, label: "Satu karakter huruf kecil" },
    { regex: /[A-Z]/, label: "Satu karakter huruf besar" },
    { regex: /[\d\W]/, label: "Satu angka, simbol, atau karakter spasi" },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(newPassword.new_password)
  );

  const handlePasswordChange =
    (field: keyof newPassword) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword({ ...newPassword, [field]: e.target.value });
    };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.new_password !== newPassword.confirm_new_password) {
      setErrorMessage({ confirm_new_password: "Kata sandi tidak sama" });
      return;
    }

    setErrorMessage({});
    dispatch(
      resetPassword(
        token!,
        email!,
        newPassword,
        setIsLoading,
        setIsSuccess,
        setErrorMessage
      )
    );
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block">
        <AuthLeftSection
          title="Amankan akun Anda, kendalikan akses Anda"
          imageSrc="/images/forget-password.png"
        />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <AuthRightSection>
          <div className="pb-2 pt-3">
            <h1 className="text-2xl md:text-[28px] font-bold text-black ">
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-font-black text-xs font-custom mt-2 md:text-base lg:mt-4">
              Silakan masukkan kata sandi yang baru
            </p>
          </div>
          <form onSubmit={handleResetPassword}>
            <InputPassword
              value={newPassword.new_password}
              onChange={handlePasswordChange("new_password")}
            />
            <InputPassword
              label="Konfirmasi Kata Sandi"
              value={newPassword.confirm_new_password}
              onChange={handlePasswordChange("confirm_new_password")}
            />

            {errorMessage.confirm_new_password && (
              <FailText>{errorMessage.confirm_new_password}</FailText>
            )}

            <button
              disabled={isLoading || !isPasswordValid}
              className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md disabled:opacity-60 disabled:hover:shadow-none"
            >
              {isLoading ? "Mengubah Kata Sandi..." : "Ubah Kata Sandi"}
            </button>
          </form>

          <ul className="list-none space-y-2 mt-4">
            {rules.map((rule, index) => {
              const isValid = rule.regex.test(newPassword.new_password);
              return (
                <li key={index} className="flex items-center">
                  <Image
                    src={
                      isValid ? "/icons/checked.svg" : "/icons/red-cross.svg"
                    }
                    alt={isValid ? "Valid" : "Invalid"}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <span
                    className={`text-xs lg:text-base font-custom ${
                      isValid ? "text-font-green" : "text-light-redLight"
                    }`}
                  >
                    {rule.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {isSuccess && (
            <SuccessModal
              header="Kata Sandi Berhasil Diubah"
              description="Silahkan masuk kembali untuk melanjutkan"
              closeModal={false}
              actionButton={true}
              actionButton_href="/login"
              actionButton_name="Login"
            />
          )}
        </AuthRightSection>
      </div>
    </div>
  );
};

const ChangePasswordEmail = () => (
  <Suspense>
    <ResetPassword />
  </Suspense>
);

export default ChangePasswordEmail;
