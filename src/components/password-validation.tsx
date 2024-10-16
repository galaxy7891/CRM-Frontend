'use client';

import Image from 'next/image';

interface PasswordValidationProps {
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  handleResetPassword: (e: React.FormEvent) => void;
}

const PasswordValidation: React.FC<PasswordValidationProps> = ({
  newPassword,
  setNewPassword,
  handleResetPassword,
}) => {
  const rules = [
    { regex: /.{8,}/, label: 'Minimal 8 karakter' },
    { regex: /[a-z]/, label: 'Satu karakter huruf kecil' },
    { regex: /[A-Z]/, label: 'Satu karakter huruf besar' },
    { regex: /[\d\W]/, label: 'Satu angka, simbol, atau karakter spasi' },
  ];

  return (
    <div>
      {/* Password */}
      <label
        htmlFor="password"
        className="block mb-2 text-base font-medium text-font-black"
      >
        Kata Sandi Baru
      </label>

      <input
        id="password"
        type="password"
        placeholder="Masukkan Kata Sandi Baru"
        className="w-full px-4 py-2 text-black text-opacity-70 border focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {/* Repeat Password */}
      {/* <label
        htmlFor="passwordConfirmation"
        className="block mb-2 text-base font-medium text-font-black"
      >
        Konfirmasi Kata Sandi
      </label>

      <input
        id="passwordConfirmation"
        type="password"
        placeholder="Tulis Ulang Kata Sandi Baru"
        className="w-full px-4 py-2 text-black text-opacity-70 border focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      /> */}

      {/* Validasi Password */}
      <ul className="list-none space-y-2 mt-4">
        {rules.map((rule, index) => {
          const isValid = rule.regex.test(newPassword);
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
                    ? 'text-font-green text-xs lg:text-base font-custom'
                    : 'text-light-redLight text-xs lg:text-base font-custom'
                }
              >
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Wrapper untuk Tombol Kembali dan Simpan */}
      <div className="flex flex-col mt-3 min-h-[120px]">
        <button
          type="submit"
          className="w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
          onClick={handleResetPassword}
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default PasswordValidation;
