const DashBoardCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-4 md:p-6 h-full flex flex-col">
      {children}
    </div>
  );
};

export default DashBoardCard;
