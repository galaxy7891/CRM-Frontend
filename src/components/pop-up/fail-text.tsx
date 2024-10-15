interface FailTextProps {
  message: string;
}

const FailText: React.FC<FailTextProps> = ({ message }) => {
  return (
    <>
      <p className="text-red-500 text-xs md:text-base pt-1">{message}</p>
    </>
  );
};

export default FailText;
