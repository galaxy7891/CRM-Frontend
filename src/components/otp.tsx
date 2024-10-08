import React, { useState } from "react";

interface OtpProps {
    count: number;
    onOtpChange: (otp: string) => void;  // Tambah props ini
  }
  
  const Otp: React.FC<OtpProps> = ({ count, onOtpChange }) => {
    const [values, setValues] = useState(Array(count).fill(""));
  
    const handleInputChange = (index: number, value: string) => {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
      onOtpChange(newValues.join(""));  
    };
  
    return (
      <div className="flex space-x-2">
        {values.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="w-12 h-12 bg-light-white text-center border-2 border-font-gray rounded-2xl text-lg focus:outline-none focus:border-dark-navy"
          />
        ))}
      </div>
    );
  };
  

export default Otp;
