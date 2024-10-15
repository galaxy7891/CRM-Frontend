import React from 'react';

interface StepperProps {
  step: number;
  step1_name: string;
  step2_name: string;
  step3_name: string;
  step4_name: string;
}

const StepperComponent: React.FC<StepperProps> = ({
  step,
  step1_name,
  step2_name,
  step3_name,
  step4_name,
}) => {
  return (
    <div className="flex justify-center w-full items-center mb-4 px-2 md:px-5 ">
      <div className="flex space-x-4 w-full justify-center ">
        <ol className="flex items-center w-full ">
          {/* step 1 */}
          <li
            className={`flex w-full items-center text-white  after:content-[''] after:w-full after:h-1 after:border-b ${
              step >= 3 ? 'after:border-dark-gold' : 'after:border-font-gray'
            } after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            <span className="flex items-center relative justify-center w-10 h-10 bg-dark-gold rounded-full lg:h-12 lg:w-12 shrink-0">
              {step >= 3 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <p className="text-2xl font-bold">1</p>
              )}
              <p className="flex justify-center absolute top-14 text-black text-xs md:text-sm">
                {step1_name}
              </p>
            </span>
          </li>
          {/* step2 */}
          <li
            className={`flex w-full items-center text-white  after:content-[''] after:w-full after:h-1 after:border-b ${
              step >= 4 ? 'after:border-dark-gold' : 'after:border-font-gray'
            } after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            <span
              className={`flex items-center relative justify-center w-10 h-10 ${
                step >= 3 ? 'bg-dark-gold' : 'bg-font-gray'
              }  rounded-full lg:h-12 lg:w-12 shrink-0`}
            >
              {step >= 4 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <p className="text-2xl font-bold">2</p>
              )}
              <p className="flex justify-center absolute top-14 text-black text-xs md:text-sm">
                {step2_name}
              </p>
            </span>
          </li>
          <li
            className={`flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b  ${
              step >= 5 ? 'after:border-dark-gold' : 'after:border-font-gray'
            } after:border-4 after:inline-block dark:after:border-gray-700`}
          >
            <span
              className={`flex items-center relative justify-center w-10 h-10 ${
                step >= 4 ? 'bg-dark-gold' : 'bg-font-gray'
              } rounded-full lg:h-12 lg:w-12  shrink-0`}
            >
              {step >= 5 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="4.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <p className="text-2xl font-bold">3</p>
              )}
              <p className="absolute top-14 text-black text-xs md:text-sm whitespace-nowrap">
                {step3_name}
              </p>
            </span>
          </li>
          <li className="flex items-center ">
            <span
              className={`flex items-center text-white relative justify-center w-10 h-10 ${
                step >= 5 ? 'bg-dark-gold' : 'bg-font-gray'
              } rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}
            >
              <p className="text-2xl font-bold">4</p>
              <p className="absolute top-14 text-black text-xs md:text-sm  whitespace-nowrap">
                {step4_name}
              </p>
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default StepperComponent;
