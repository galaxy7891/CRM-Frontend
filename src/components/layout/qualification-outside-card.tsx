const QualificationOutsideCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-light-white flex-shrink-0  dark:bg-dark-darkGray rounded-[10px] p-4 w-[390px] ">
      {children}
    </div>
  );
};

export default QualificationOutsideCard;
