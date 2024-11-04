interface FailPopUpProps {
  children: React.ReactNode;
}

const FailPopUp: React.FC<FailPopUpProps> = ({ children }) => {
  return (
    <div className="alert alert-danger bg-red-200 border-red-300 border-2 rounded-lg p-2">
      <p className=" text-red-700 text-xs md:text-base">{children}</p>
    </div>
  );
};

export default FailPopUp;
