"use client";

import React, { useState } from "react";
import Image from "next/image";

const PasswordValidation: React.FC = () => {
  const [password, setPassword] = useState("");

  const rules = [
    { regex: /.{8,}/, label: "Minimal 8 karakter" }, // Mengubah menjadi 8 karakter
    { regex: /[a-z]/, label: "Satu karakter huruf kecil" },
    { regex: /[A-Z]/, label: "Satu karakter huruf besar" },
    { regex: /[\d\W]/, label: "Satu angka, simbol, atau karakter spasi" },
  ];

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="">
      {/* Label untuk Input Password */}
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        Kata Sandi Baru
      </label>

      {/* Input Password */}
      <input
        id="password"
        type="password"
        placeholder="Masukkan Kata Sandi Baru"
        className="w-full px-4 py-2 text-black text-opacity-70 border focus:outline-none border-font-gray rounded-lg bg-light-white focus:border-dark-navy"
        value={password}
        onChange={handlePasswordChange}
      />

      {/* Validasi Password */}
      <ul className="list-none space-y-2 mt-4">
        {rules.map((rule, index) => {
          const isValid = rule.regex.test(password);
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
                className={
                  isValid
                    ? "text-font-green font-small lg:text-base font-custom"
                    : "text-light-redLight font-small lg:text-base font-custom"
                }
              >
                {rule.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col sm:flex-row justify-between mt-4 sm:gap-3">
        {/* Tombol Kembali */}
        <button
          type="button"
          className="w-full sm:w-1/2 h-10 mb-2 sm:mb-0 sm:order-first font-bold font-custom text-xs md:text-base border text-light-gold border-dark-gold py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
        >
          Kembali
        </button>

        {/* Tombol Simpan */}
        <button
          type="submit"
          className="w-full sm:w-1/2 h-10 font-custom bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg hover:opacity-80 transition-opacity duration-200 hover:shadow-md sm:order-last"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default PasswordValidation;
