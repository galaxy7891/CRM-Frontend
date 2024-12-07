'use client';
import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { resetPassword } from '@/redux/actions/profileActions';
import { useSearchParams } from 'next/navigation';
import FailText from '@/components/status/fail-text';
import SuccessModal from '@/components/status/success-modal';
import DashboardCard from '@/components/layout/dashboard-card';
import HeaderWithBackButton from '@/components/layout/header-with-back';
interface Password {
  new_password: string;
  confirm_new_password: string;
}
const ChangePasswordEmail = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {}
  );
  const [newPassword, setNewPassword] = useState<Password>({
    new_password: '',
    confirm_new_password: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const rules = [
    { regex: /.{8,}/, label: 'Minimal 8 karakter' },
    { regex: /[a-z]/, label: 'Satu karakter huruf kecil' },
    { regex: /[A-Z]/, label: 'Satu karakter huruf besar' },
    { regex: /[\d\W]/, label: 'Satu angka, simbol, atau karakter spasi' },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(newPassword.new_password)
  );

  const handleResetPassword = () => {
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
    <>
      <HeaderWithBackButton title="Perbarui Kata Sandi" />
      <DashboardCard>
        <div className="sm:px-32 2xl:px-80 flex flex-col md:justify-center">
          <label
            htmlFor="newPassword"
            className="block text-black dark:text-white text-xs font-custom font-medium mb-3 md:text-base"
          >
            Kata Sandi Baru
          </label>
          <input
            name="newPassword"
            type="password"
            value={newPassword.new_password}
            onChange={(e) =>
              setNewPassword({ ...newPassword, new_password: e.target.value })
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
            value={newPassword.confirm_new_password}
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                confirm_new_password: e.target.value,
              })
            }
            placeholder="Masukkan Kembali Kata Sandi Baru"
            className="w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
          />
          {errorMessage && (
            <FailText>{errorMessage?.confirm_new_password}</FailText>
          )}

          <ul className="list-none space-y-2 mt-4">
            {rules.map((rule, index) => {
              const isValid = rule.regex.test(newPassword.new_password);
              return (
                <li key={index} className="flex items-center">
                  <Image
                    src={
                      isValid ? '/icons/checked.svg' : '/icons/red-cross.svg'
                    }
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
            {isLoading ? 'Mengubah Kata Sandi...' : 'Ubah Kata Sandi'}
          </button>
        </div>
        {isSuccess && (
          <SuccessModal
            header="Berhasil!"
            description="Berhasil!"
            actionButton_name="Kembali"
            actionButton_href="/homepage"
          />
        )}
      </DashboardCard>
    </>
  );
};

const ChangePasswordEmailPage = () => (
  <Suspense>
    <ChangePasswordEmail />
  </Suspense>
);

export default ChangePasswordEmailPage;
