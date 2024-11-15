const QualificationOutsideCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-light-white dark:bg-dark-darkGray rounded-[10px] px-3 pt-[22px] pb-14">
      {children}
    </div>
  );
};

export default QualificationOutsideCard;
