"use client";

import { newPassword } from "@/types/profileTypes";
import { resetPassword } from "@/redux/actions/profileActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import AuthLeftSection from "@/components/layout/auth-left-section";
import AuthRightSection from "@/components/layout/auth-right-section";
import FormHeader from "@/components/layout/auth-form-header";
import FailText from "@/components/status/fail-text";
import SuccessModal from "@/components/status/success-modal";

const ResetPassword: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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

  const handleResetPassword = async () => {
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
          <FormHeader
            title="Atur Ulang Kata Sandi"
            subtitle="Atur Kata Sandi"
            description="Silakan masukkan kata sandi yang baru"
            step={4}
            page_name="forget-password"
          />

          <label
            htmlFor="new_password"
            className="block text-black text-xs font-custom font-medium my-3 md:text-base"
          >
            Kata Sandi
          </label>
          <input
            required
            name="new_password"
            type="password"
            value={newPassword.new_password}
            onChange={(e) =>
              setNewPassword({ ...newPassword, new_password: e.target.value })
            }
            placeholder="Masukkan kata sandi"
            className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none rounded-lg bg-light-white focus:border-dark-navy border-font-gray"
          />

          {errorMessage.new_password && (
            <FailText>{errorMessage.new_password[0]}</FailText>
          )}

          <label
            htmlFor="password_confirmation"
            className="block text-black text-xs font-custom font-medium my-3 md:text-base"
          >
            Konfirmasi Kata Sandi
          </label>
          <input
            required
            name="password_confirmation"
            type="password"
            value={newPassword.confirm_new_password}
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                confirm_new_password: e.target.value,
              })
            }
            placeholder="Masukkan kembali kata sandi"
            className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none rounded-lg bg-light-white focus:border-dark-navy border-font-gray"
          />
          {errorMessage.confirm_new_password && (
            <FailText>{errorMessage.confirm_new_password[0]}</FailText>
          )}
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

          <button
            disabled={isLoading || !isPasswordValid}
            onClick={handleResetPassword}
            className="mt-4 w-full px-1 h-12 lg:h-15 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md disabled:opacity-60 disabled:hover:shadow-none"
          >
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>

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

const ResetPasswordPage = () => (
  <Suspense>
    <ResetPassword />
  </Suspense>
);

export default ResetPasswordPage;
