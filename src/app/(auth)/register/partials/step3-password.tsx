import FormHeader from '@/components/layout/auth-form-header';
import FailCard from '@/components/status/fail-card';
import FailText from '@/components/status/fail-text';
import Image from 'next/image';
import { useState } from 'react';

interface Password {
  password: string;
  password_confirmation: string;
}
interface PasswordProps {
  email: string;
  password: Password;
  step: number;
  setPassword: (data: Password) => void;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}
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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const rules = [
    { regex: /.{8,}/, label: 'Minimal 8 karakter' },
    { regex: /[a-z]/, label: 'Satu karakter huruf kecil' },
    { regex: /[A-Z]/, label: 'Satu karakter huruf besar' },
    { regex: /[\d\W]/, label: 'Satu angka, simbol, atau karakter spasi' },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(password.password)
  );

  const handleIsPasswordSame = () => {
    setIsOnClick(true);
    if (
      isPasswordValid &&
      password.password === password.password_confirmation
    ) {
      setErrorMessage('');
      onNext();
    }
  };

  return (
    <div>
      <FormHeader
        title="Daftar Akun"
        subtitle="Masukkan Password"
        description="Masukkan kata sandi"
        step={step}
        page_name="register"
      />
      {errorMessage && <FailCard>{errorMessage}</FailCard>}
      {/* email */}
      <label
        htmlFor="email"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Email
      </label>
      <input
        value={email}
        type="email"
        disabled
        placeholder="user@example.com"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
      />
      {/* password */}

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-black text-xs font-custom font-medium my-3 md:text-base"
        >
          Kata Sandi
        </label>
        <input
          name="password"
          type={`${!showPassword ? 'text' : 'password'}`}
          value={password?.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
          placeholder="Masukkan kata sandi"
          className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none  rounded-lg bg-light-white focus:border-dark-navy  ${
            isOnClick && !password.password
              ? 'error-fields'
              : 'border-font-gray'
          } `}
        />
        <span className="absolute right-3 top-10 md:top-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="gray"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </span>
        <button onClick={() => setShowPassword(!showPassword)}></button>
        {isOnClick && password.password == '' && (
          <FailText>Kata sandi tidak boleh kosong</FailText>
        )}
      </div>

      {/* confirm password */}
      <label
        htmlFor="password_confirmation"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Konfirmasi Kata Sandi
      </label>
      <input
        name="password_confirmation"
        type="password"
        value={password?.password_confirmation}
        onChange={(e) =>
          setPassword({
            ...password,
            password_confirmation: e.target.value,
          })
        }
        placeholder="Masukkan kembali kata sandi"
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none  rounded-lg bg-light-white focus:border-dark-navy  ${
          isOnClick && !password.password_confirmation
            ? 'error-fields'
            : 'border-font-gray'
        } `}
      />
      {isOnClick && password.password_confirmation == '' && (
        <FailText>Ketik ulang kata sandi</FailText>
      )}
      {isOnClick &&
        password.password_confirmation !== '' &&
        password.password_confirmation !== password.password && (
          <FailText>Kata sandi tidak sama</FailText>
        )}

      <ul className="list-none space-y-2 mt-4">
        {rules.map((rule, index) => {
          const isValid = rule.regex.test(password.password);
          return (
            <li key={index} className="flex items-center">
              <Image
                src={isValid ? '/icons/checked.svg' : '/icons/red-cross.svg'}
                alt={isValid ? 'Valid' : 'Invalid'}
                width={16}
                height={16}
                className="mr-2"
              />
              <span
                className={`text-xs lg:text-base font-custom ${
                  isValid ? 'text-font-green ' : 'text-light-redLight '
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
        onClick={handleIsPasswordSame}
        disabled={!isPasswordValid}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md disabled:opacity-60 disabled:hover:shadow-none"
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default Password;
