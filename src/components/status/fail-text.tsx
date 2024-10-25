import React from 'react';

interface FailTextProps {
  children: React.ReactNode;
}

const FailText: React.FC<FailTextProps> = ({ children }) => {
  return (
    <>
      <p className="text-dark-redGlow text-xs md:text-base pt-1">{children}</p>
    </>
  );
};

export default FailText;
