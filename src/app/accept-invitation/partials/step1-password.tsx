import Image from 'next/image';
import { useState } from 'react';
import type { Password } from '@/types/authTypes';
import FormHeader from '@/components/layout/auth-form-header';
import FailCard from '@/components/status/fail-card';
import FailText from '@/components/status/fail-text';

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
  email,
  step,
  errorMessage,
  password,
  setPassword,
  setErrorMessage,
  onNext,
}) => {
  const [isOnClick, setIsOnClick] = useState<boolean | null>(null);

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
      {' '}
      <FormHeader
        title="Kolaborasi Akun"
        subtitle="Masukkan Kata Sandi"
        description="Silahkan Masukkan Kata Sandi"
        step={step}
        page_name="register-employee"
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
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy "
      />
      {/* password */}
      <label
        htmlFor="password"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Kata Sandi
      </label>
      <input
        name="password"
        type="password"
        value={password?.password}
        onChange={(e) => setPassword({ ...password, password: e.target.value })}
        placeholder="Masukkan kata sandi"
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none  rounded-lg bg-light-white focus:border-dark-navy  ${
          isOnClick && !password.password ? 'error-fields' : 'border-font-gray'
        } `}
      />
      {isOnClick && password.password == '' && (
        <FailText>Kata sandi tidak boleh kosong</FailText>
      )}
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
        Lanjut
      </button>
    </div>
  );
};

export default Password;
