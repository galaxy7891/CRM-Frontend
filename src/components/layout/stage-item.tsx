const StageItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-font-white dark:bg-dark-navy rounded-[10px] px-3 py-[14px] mt-5">
      {children}
    </div>
  );
};

export default StageItem;
