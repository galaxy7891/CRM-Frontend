import React from "react";

const Stepper: React.FC = () => {
  return (
    <div className="flex justify-center mb-4">
      {/* Gaya visual untuk stepper */}
      <div className="flex space-x-4">
        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
        <div className="h-2 w-2 bg-green-400 rounded-full"></div>
        <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Stepper;
