"use client";

import React, { useState } from "react";

const Password = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleClick = () => {
    setIsClicked(!isClicked);
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  return (
    <div>
      <label className="block poppins-bold text-sm font-medium leading-6 text-[#176B87]">
        Password
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type={passwordType}
          className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#64CCC5] sm:text-sm sm:leading-6"
          placeholder="Masukkan password"
        />
        <div className="absolute inset-y-0 right-0 flex items-center mr-3">
          <button onClick={handleClick}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke={isClicked ? "#176B87" : "#8A8A8A"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                stroke={isClicked ? "#176B87" : "#8A8A8A"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
