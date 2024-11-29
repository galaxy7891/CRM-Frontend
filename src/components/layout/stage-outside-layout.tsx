const StageOutsideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-light-white dark:bg-dark-darkGray flex-shrink-0dark:bg-dark-darkGray rounded-[10px] p-4 w-80 lg:w-96 ">
      {children}
    </div>
  );
};

export default StageOutsideLayout;
