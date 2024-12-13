import React, { useState } from 'react';

const PasswordInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <label
        htmlFor="password"
        className="block text-black text-xs font-custom font-medium my-3 md:text-base"
      >
        Kata Sandi
      </label>
      <input
        required
        name="password"
        type={`${showPassword ? 'text' : 'password'}`}
        value={value}
        onChange={onChange}
        placeholder="Masukkan kata sandi"
        className={`w-full ps-4 h-12 lg:h-15 text-xs md:text-base font-custom border-2 text-black focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy  
          
        } `}
      />
      <span
        className="absolute right-4 top-10 md:top-12 z-40 bg-light-white"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="size-6"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="size-6"
            >
              <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
            </svg>
          </>
        )}
      </span>
    </div>
  );
};

export default PasswordInput;