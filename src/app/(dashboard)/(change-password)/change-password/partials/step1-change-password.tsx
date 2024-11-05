import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import FailText from '@/components/status/fail-text';

interface ChangePasswordForm {
  handleSendEmail: () => void;
}

interface password {
  password: string;
  new_password: string;
  confirm_new_password: string;
}
const ChangePasswordForm: React.FC<ChangePasswordForm> = ({
  handleSendEmail,
}) => {
  const [errorMessage, setErrorMessage] = useState<password | null>(null);
  const [password, setPassword] = useState<password>({
    password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const rules = [
    { regex: /.{8,}/, label: 'Minimal 8 karakter' },
    { regex: /[a-z]/, label: 'Satu karakter huruf kecil' },
    { regex: /[A-Z]/, label: 'Satu karakter huruf besar' },
    { regex: /[\d\W]/, label: 'Satu angka, simbol, atau karakter spasi' },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(password.new_password)
  );

  const handleResetPassword = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/change`,
        {
          ...password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Berhasil!');
        console.log(response.data);
      } else {
        console.error(response.data.message);
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:px-32 2xl:px-80">
      <label
        htmlFor="oldPassword"
        className="block text-black dark:text-white text-xs font-custom font-medium my-3 md:text-base"
      >
        Kata Sandi Lama
      </label>
      <input
        name="oldPassword"
        type="password"
        value={password.password}
        onChange={(e) => setPassword({ ...password, password: e.target.value })}
        placeholder="Masukkan Kata Sandi Lama"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
      />
      {errorMessage && <FailText>{errorMessage?.password}</FailText>}
      {/* New Password */}
      <label
        htmlFor="newPassword"
        className="block text-black dark:text-white text-xs font-custom font-medium my-3 md:text-base"
      >
        Kata Sandi Baru
      </label>
      <input
        name="newPassword"
        type="password"
        value={password.new_password}
        onChange={(e) =>
          setPassword({ ...password, new_password: e.target.value })
        }
        placeholder="Masukkan Kata Sandi Baru"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-blackfocus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
      />
      {errorMessage && <FailText>{errorMessage?.new_password}</FailText>}
      {/* Confirm New Password */}
      <label
        htmlFor="confirmNewPassword"
        className="block text-black dark:text-white text-xs font-custom font-medium my-3 md:text-base"
      >
        Konfirmasi Kata Sandi Baru
      </label>
      <input
        name="confirmNewPassword"
        type="password"
        value={password.confirm_new_password}
        onChange={(e) =>
          setPassword({ ...password, confirm_new_password: e.target.value })
        }
        placeholder="Masukkan Kembali Kata Sandi Baru"
        className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
      />
      {errorMessage && (
        <FailText>{errorMessage?.confirm_new_password}</FailText>
      )}

      <div className="flex justify-end mt-4">
        <a
          className="text-xs text-light-gold font-custom font-bold ml-1 md:text-base  hover:underline hover:cursor-pointer"
          onClick={handleSendEmail}
        >
          Lupa Kata Sandi?
        </a>
      </div>

      <ul className="list-none space-y-2 mt-4">
        {rules.map((rule, index) => {
          const isValid = rule.regex.test(password.new_password);
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
                  isValid
                    ? 'text-font-green '
                    : 'text-light-redLight dark:text-dark-redGlow '
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
        onClick={handleResetPassword}
        disabled={!isPasswordValid}
        className="mt-4 w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md disabled:opacity-60 disabled:hover:shadow-none"
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default ChangePasswordForm;
