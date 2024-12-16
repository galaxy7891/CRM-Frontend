import React from 'react';

interface StatusBadgeProps {
  status: 'Rendah' | 'Sedang' | 'Tinggi' | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: Record<string, string> = {
    Rendah:
      'border border-font-green bg-light-greenLight font-custom text-font-green text-xs dark:border-light-greenLight dark:text-light-greenLight dark:bg-dark-green',
    Sedang:
      'border border-light-brownLight bg-light-yellowLight text-light-brownLight font-custom text-xs dark:border-dark-yellowLight dark:text-dark-yellowLight dark:bg-dark-brownLight',
    Tinggi:
      'border border-dark-red bg-dark-redLight font-custom text-xs text-dark-red dark:border-dark-redLight dark:text-dark-redLight dark:bg-dark-red',
  };

  const badgeStyle = statusStyles[status] || 'border-gray-500 text-gray-500';

  return (
    <div
      className={`flex justify-center items-center  md:w-[79px] md:h-[32px] w-[69px] h-[22px] rounded-[5px] p-2 ${badgeStyle}`}
    >
      <p>{status}</p>
    </div>
  );
};

export default StatusBadge;
