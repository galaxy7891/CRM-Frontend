const CurrentMonthYear = () => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("id-ID", { month: "long" }); // Nama bulan dalam Bahasa Indonesia
  const year = currentDate.getFullYear();

  return (
    <div className="text-xs font-custom  dark:text-font-white text-font-black font-medium md:text-base">
      {month} {year}
    </div>
  );
};

export default CurrentMonthYear;
