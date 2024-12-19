import React from "react";

interface StageBadgeProps {
  status:
    | "Proposal"
    | "Kualifikasi"
    | "Negosiasi"
    | "Tercapai"
    | "Gagal"
    | string;
}

const StageBadge: React.FC<StageBadgeProps> = ({ status }) => {
  const defaultStyle =
    "border border-dark-navy bg-light-white font-custom text-dark-navy text-xs";

  const statusStyles: Record<string, string> = {
    Tercapai:
      "border border-dark-navy bg-dark-green font-custom text-dropdown-lightGreen text-xs",
    Gagal:
      "border border-dark-navy bg-light-redLight font-custom text-dark-redLight text-xs",
  };

  const badgeStyle = ["Proposal", "Kualifikasi", "Negosiasi"].includes(status)
    ? defaultStyle
    : statusStyles[status] || defaultStyle;

  return (
    <div
      className={`flex justify-center items-center md:w-[79px] md:h-[32px] w-[69px] h-[22px] rounded-[5px] p-2 ${badgeStyle}`}
    >
      <p>{status}</p>
    </div>
  );
};

export default StageBadge;
