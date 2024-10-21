import React from "react";

interface StatusBadgeProps {
  status: "Rendah" | "Sedang" | "Tinggi" | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: Record<string, string> = {
    Rendah: "border border-font-green bg-light-greenLight font-custom text-font-green text-xs",
    Sedang: "border border-light-brownLight bg-light-yellowLight text-light-brownLight font-custom text-xs",
    Tinggi: "border border-dark-red bg-dark-redLight font-custom text-xs text-dark-red",
  };

  const badgeStyle = statusStyles[status] || "border-gray-500 text-gray-500";

  return (
    <div
      className={`flex justify-center items-center w-[79px] h-[32px] rounded-[5px] p-2 ${badgeStyle}`}
    >
      <p>{status}</p>
    </div>
  );
};

export default StatusBadge;
