"use client";

import React, { useState } from "react";

// Definisikan props untuk CustomCheckbox
interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (id: string) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
}) => {
  return (
    <label className="relative flex items-center cursor-pointer ">
      <div
        onClick={() => onChange(id)} // Call onChange handler with the id
        className={`w-5 h-5 flex items-center justify-center border rounded-[5px] 
          ${
            checked
              ? "border-2 border-dark-navy dark:border-font-white"
              : "border-dark-navy dark:border-font-white"
          } 
          bg-none focus:ring-0`}
      >
        {checked && (
          <svg
            className="w-3 h-3 fill-dark-navy dark:fill-font-white"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7363 0.752652C11.9052 0.914289 12 1.13349 12 1.36204C12 1.5906 11.9052 1.8098 11.7363 1.97143L4.98687 8.43196C4.89768 8.51736 4.79178 8.5851 4.67523 8.63132C4.55868 8.67754 4.43376 8.70132 4.3076 8.70132C4.18145 8.70132 4.05653 8.67754 3.93998 8.63132C3.82343 8.5851 3.71753 8.51736 3.62833 8.43196L0.274909 5.22267C0.188903 5.14316 0.120302 5.04805 0.073108 4.94289C0.0259142 4.83773 0.001073 4.72463 3.39995e-05 4.61018C-0.001005 4.49573 0.021779 4.38223 0.0670565 4.2763C0.112334 4.17037 0.179198 4.07414 0.263748 3.99321C0.348297 3.91228 0.448838 3.84827 0.559505 3.80494C0.670172 3.7616 0.788749 3.73979 0.908315 3.74078C1.02788 3.74178 1.14604 3.76555 1.25591 3.81073C1.36577 3.8559 1.46513 3.92157 1.5482 4.00389L4.3073 6.64487L10.4625 0.752652C10.5461 0.672555 10.6454 0.609015 10.7547 0.565664C10.864 0.522313 10.9811 0.5 11.0994 0.5C11.2177 0.5 11.3348 0.522313 11.4441 0.565664C11.5534 0.609015 11.6527 0.672555 11.7363 0.752652Z"
            />
          </svg>
        )}
      </div>
    </label>
  );
};

export default CustomCheckbox;
