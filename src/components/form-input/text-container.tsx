import React from 'react';

interface TextContainerProps {
  label: string;
  value: string;
}

const TextContainer: React.FC<TextContainerProps> = ({ label, value }) => (
  <div className="flex-1">
    <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
      {label}
    </label>

    <div
      className="w-full bg-font-white mt-2 p-2 border text-xs md:text-base font-custom rounded-[4px] border-font-black focus:border-dark-navy dark:bg-dark-navy dark:border-none dark:text-font-white"
    >
      {value}
    </div>
  </div>
);

export default TextContainer;
