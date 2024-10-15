import FormHeader from '@/components/form/form-header';
import FailPopUp from '@/components/pop-up/fail';
import FailText from '@/components/pop-up/fail-text';
import Image from 'next/image';
import { useState } from 'react';

interface PasswordProps {
  email: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  validation: string;
  setValidation: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}
const Password: React.FC<PasswordProps> = ({
  step,
  password,
  setPassword,
  email,
  validation,
  setValidation,
  onNext,
}) => {
  const rules = [
    { regex: /.{8,}/, label: 'Minimal 8 karakter' },
    { regex: /[a-z]/, label: 'Satu karakter huruf kecil' },
    { regex: /[A-Z]/, label: 'Satu karakter huruf besar' },
    { regex: /[\d\W]/, label: 'Satu angka, simbol, atau karakter spasi' },
  ];

  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [isOnClick, setIsOnClick] = useState<boolean>(false);
  const isPasswordValid = rules.every((rule) => rule.regex.test(password));

  const handleIsPasswordSame = () => {
    setIsOnClick(true);
    if (!isPasswordValid && password && passwordConfirmation) {
      setValidation('Kata Sandi tidak memenuhi kriteria');
    } else if (password !== passwordConfirmation) {
      setValidation('Kata Sandi tidak sama');
    } else if (isPasswordValid && password && passwordConfirmation) {
      setValidation('');
      onNext();
    }
  };

  return (
    <div>
      {' '}
      <FormHeader
        logoText="Logo"
        title="Daftar Akun"
        subtitle="Masukkan Password"
        description="Masukkan kata sandi"
        step={step}
        step1_name="Verifikasi"
        step2_name="Akun"
        step3_name="Data Diri"
        step4_name="Perusahaan"
      />
      {validation && <FailPopUp message={validation} />}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan kata sandi"
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none  rounded-lg bg-light-white focus:border-dark-navy  ${
          isOnClick && !password ? 'error-fields' : 'border-font-gray'
        } `}
      />
      {isOnClick && password == '' && (
        <FailText message="Kata sandi tidak boleh kosong" />
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
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Masukkan kembali kata sandi"
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black  focus:outline-none  rounded-lg bg-light-white focus:border-dark-navy  ${
          isOnClick && !passwordConfirmation
            ? 'error-fields'
            : 'border-font-gray'
        } `}
      />
      {isOnClick && passwordConfirmation == '' && (
        <FailText message="Ketik ulang kata sandi" />
      )}
      <ul className="list-none space-y-2 mt-4">
        {rules.map((rule, index) => {
          const isValid = rule.regex.test(password);
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
                className={
                  isValid
                    ? 'text-font-green font-small lg:text-base font-custom'
                    : 'text-light-redLight font-small lg:text-base font-custom'
                }
              >
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>
      <button
        onClick={handleIsPasswordSame}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default Password;