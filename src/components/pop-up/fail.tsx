interface FailPopUpProps {
  message: string;
}

const FailPopUp: React.FC<FailPopUpProps> = ({ message }) => {
  return (
    <div className="alert alert-danger bg-red-200 border-red-300 border-2 rounded-lg p-2">
      <p className=" text-red-700">{message}</p>
    </div>
  );
};

export default FailPopUp;
