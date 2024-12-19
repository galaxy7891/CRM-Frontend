"use client";

import Image from "next/image";
import { useState } from "react";
import { changePasswordTypes } from "@/types/profileTypes";
import {
  sendForgotPasswordEmail,
  changePassword,
} from "@/redux/actions/profileActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import EmailSend from "./partials/email-send";
import FailText from "@/components/status/fail-text";
import DashboardCard from "@/components/layout/dashboard-card";
import SuccessModal from "@/components/status/success-modal";
import HeaderWithBackButton from "@/components/layout/header-with-back";
import InputPassword from "@/components/form-input/password-input";

const ChangePasswordForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [password, setPassword] = useState<changePasswordTypes>({
    password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const rules = [
    { regex: /.{8,}/, label: "Minimal 8 karakter" },
    { regex: /[a-z]/, label: "Satu karakter huruf kecil" },
    { regex: /[A-Z]/, label: "Satu karakter huruf besar" },
    { regex: /[\d\W]/, label: "Satu angka, simbol, atau karakter spasi" },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(password.new_password)
  );

  const handleBackButton = () => {
    setIsEmailSent(false);
  };

  const handleChangePassword = async () => {
    dispatch(changePassword(password, setIsSuccess, setErrorMessage));
  };

  const handleSendEmail = () => {
    dispatch(
      sendForgotPasswordEmail(
        null,
        setIsLoading,
        () => {},
        undefined,
        setIsEmailSent
      )
    );
  };

  return (
    <>
      {isEmailSent ? (
        <EmailSend
          handleSendEmail={handleSendEmail}
          handleBackButton={handleBackButton}
          isLoading={isLoading}
        />
      ) : (
        <>
          {" "}
          <HeaderWithBackButton title="Perbarui Kata Sandi" />
          <DashboardCard>
            <div className="sm:px-32 2xl:px-80">
              {/* New Password */}
              <InputPassword
                label="Kata Sandi Lama"
                value={password.password}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
              {errorMessage && <FailText>{errorMessage?.password}</FailText>}
              <InputPassword
                label="Kata Sandi Baru"
                value={password.new_password}
                onChange={(e) =>
                  setPassword({ ...password, new_password: e.target.value })
                }
              />
              {errorMessage && (
                <FailText>{errorMessage?.new_password}</FailText>
              )}
              {/* Confirm New Password */}
              <InputPassword
                label="Konfirmasi Kata Sandi Baru"
                value={password.confirm_new_password}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    confirm_new_password: e.target.value,
                  })
                }
              />
              {errorMessage && (
                <FailText>{errorMessage?.confirm_new_password}</FailText>
              )}

              <div className="flex justify-end mt-4">
                <button
                  className="text-xs text-light-gold font-custom font-bold ml-1 md:text-base  hover:underline hover:cursor-pointer"
                  onClick={handleSendEmail}
                >
                  {isLoading
                    ? "Mengirim Link Reset Password"
                    : "Lupa Kata Sandi ?"}
                </button>
              </div>

              <ul className="list-none space-y-2 mt-4">
                {rules.map((rule, index) => {
                  const isValid = rule.regex.test(password.new_password);
                  return (
                    <li key={index} className="flex items-center">
                      <Image
                        src={
                          isValid
                            ? "/icons/checked.svg"
                            : "/icons/red-cross.svg"
                        }
                        alt={isValid ? "Valid" : "Invalid"}
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      <span
                        className={`text-xs lg:text-base font-custom ${
                          isValid
                            ? "text-font-green "
                            : "text-light-redLight dark:text-dark-redGlow "
                        }
                `}
                      >
                        {rule.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={handleChangePassword}
                disabled={!isPasswordValid}
                className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md disabled:opacity-60 disabled:hover:shadow-none"
              >
                Selanjutnya
              </button>
            </div>
            {isSuccess && (
              <SuccessModal
                header="Berhasil!"
                description="Kata sandi berhasil diubah"
                actionButton_name="Kembali ke Beranda"
                actionButton_href="/homepage"
              />
            )}
          </DashboardCard>
        </>
      )}
    </>
  );
};

export default ChangePasswordForm;
