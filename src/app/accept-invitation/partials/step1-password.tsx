import Image from "next/image";
import { useState } from "react";
import { PasswordProps } from "@/types/authTypes";
import InputAuth from "@/components/form-input/auth-input";
import InputPassword from "@/components/form-input/password-input";
import FormHeader from "@/components/layout/auth-form-header";
import FailCard from "@/components/status/fail-card";
import FailText from "@/components/status/fail-text";
import AuthPositiveButton from "@/components/button/auth-positive-button";

const Password: React.FC<PasswordProps> = ({
  step,
  password,
  setPassword,
  email,
  errorMessage,
  setErrorMessage,
  onNext,
}) => {
  const [isOnClick, setIsOnClick] = useState<boolean | null>(null);

  const rules = [
    { regex: /.{8,}/, label: "Minimal 8 karakter" },
    { regex: /[a-z]/, label: "Satu karakter huruf kecil" },
    { regex: /[A-Z]/, label: "Satu karakter huruf besar" },
    { regex: /[\d\W]/, label: "Satu angka, simbol, atau karakter spasi" },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(password.password)
  );

  const handleIsPasswordSame = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOnClick(true);
    if (
      isPasswordValid &&
      password.password === password.password_confirmation
    ) {
      setErrorMessage("");
      onNext();
    }
  };

  return (
    <div>
      <FormHeader
        title="Kolaborasi Akun"
        subtitle="Masukkan Kata Sandi"
        description="Silahkan Masukkan Kata Sandi"
        step={step}
        page_name="register-employee"
      />
      {errorMessage && <FailCard>{errorMessage}</FailCard>}
      {/* email */}
      <form onSubmit={handleIsPasswordSame}>
        <InputAuth
          required
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={() => setErrorMessage("")}
        />
        {/* password */}
        <InputPassword
          value={password?.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
        />
        <InputPassword
          value={password?.password_confirmation}
          label="Konfirmasi Kata Sandi"
          onChange={(e) =>
            setPassword({
              ...password,
              password_confirmation: e.target.value,
            })
          }
        />

        {isOnClick &&
          password.password_confirmation !== "" &&
          password.password_confirmation !== password.password && (
            <FailText>Kata sandi tidak sama</FailText>
          )}

        <AuthPositiveButton disabled={!isPasswordValid}>
          Selanjutnya
        </AuthPositiveButton>
      </form>

      <ul className="list-none space-y-2 mt-4">
        {rules.map((rule, index) => {
          const isValid = rule.regex.test(password.password);
          return (
            <li key={index} className="flex items-center">
              <Image
                src={isValid ? "/icons/checked.svg" : "/icons/red-cross.svg"}
                alt={isValid ? "Valid" : "Invalid"}
                width={16}
                height={16}
                className="mr-2"
              />
              <span
                className={`text-xs lg:text-base font-custom ${
                  isValid ? "text-font-green " : "text-light-redLight "
                }
                `}
              >
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Password;
