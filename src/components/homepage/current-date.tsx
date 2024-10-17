import React from 'react';

const CurrentDate: React.FC = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('id-ID', options); // Locale Indonesia

  return (
    <div className="text-font-black text-[10px] lg:text-base font-custom">
      {formattedDate}
    </div>
  );
};

export default CurrentDate;
