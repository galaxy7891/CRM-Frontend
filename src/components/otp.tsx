import React, { useState } from "react";

interface OtpProps {
    count: number;
}

const Otp: React.FC<OtpProps> = ({ count }) => {
    const [values, setValues] = useState(Array(count).fill(""));

    const handleInputChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
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
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-light-white text-center border-2 border-font-gray rounded-2xl text-lg focus:outline-none focus:border-dark-navy"
                />
            ))}
        </div>
    );
};

export default Otp;
