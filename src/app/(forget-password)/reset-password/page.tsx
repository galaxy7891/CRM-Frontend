'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import AuthLeftSection from '@/components/icon-forget';
import AuthRightSection from '@/components/auth-right-section';
import FormHeader from '@/components/form/form-header';
import FailText from '@/components/status/fail-text';
import FailCard from '@/components/status/fail-card';
import SuccessModal from '@/components/status/success-modal';

interface Password {
  new_password: string;
  confirm_new_password: string;
}
const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState<Password>({
    new_password: '',
    confirm_new_password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  console.log('Token:', token, 'Email:', email);

  const rules = [
    { regex: /.{8,}/, label: 'Minimal 8 karakter' },
    { regex: /[a-z]/, label: 'Satu karakter huruf kecil' },
    { regex: /[A-Z]/, label: 'Satu karakter huruf besar' },
    { regex: /[\d\W]/, label: 'Satu angka, simbol, atau karakter spasi' },
  ];

  const isPasswordValid = rules.every((rule) =>
    rule.regex.test(newPassword.new_password)
  );

  const handleResetPassword = async () => {
    setAttemptedSubmit(true);
    if (
      !isPasswordValid ||
      newPassword.new_password !== newPassword.confirm_new_password
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/reset`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            email,
            ...newPassword,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        console.error(data.message);
        // setStatus(data.message);
      }
    } catch (Exception) {
      console.error(Exception);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row min-h-screen justify-center">
      <div className="sm:w-1/2 hidden md:block">
        <AuthLeftSection />
      </div>
      <div className="sm:w-1/2 flex flex-col w-full p-4 lg:px-10 lg:py-5">
        <AuthRightSection>
          <FormHeader
            title=" Atur Ulang Kata Sandi"
            subtitle=" Atur Kata Sandi"
            description="Silakan masukkan kata sandi yang baru"
            step={4}
            page_name="forget-password"
          />
          {attemptedSubmit && status !== '' && status !== 'success' && (
            <FailCard message={status} />
          )}

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
            className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none rounded-lg bg-light-white focus:border-dark-navy ${
              attemptedSubmit && !newPassword.new_password
                ? 'error-fields'
                : 'border-font-gray'
            }`}
          />
          {attemptedSubmit && newPassword.new_password === '' && (
            <FailText message="Kata sandi tidak boleh kosong" />
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
            className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none rounded-lg bg-light-white focus:border-dark-navy ${
              attemptedSubmit && !newPassword.confirm_new_password
                ? 'error-fields'
                : 'border-font-gray'
            }`}
          />
          {attemptedSubmit && newPassword.confirm_new_password === '' && (
            <FailText message="Ketik ulang kata sandi" />
          )}
          {attemptedSubmit &&
            newPassword.confirm_new_password !== '' &&
            newPassword.confirm_new_password !== newPassword.new_password && (
              <FailText message="Kata sandi tidak sama" />
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
                      isValid ? 'text-font-green' : 'text-light-redLight'
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
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>

          {status == 'success' && (
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

export default ResetPassword;
