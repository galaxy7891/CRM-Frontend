interface DashboardPositiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DashboardPositiveButton: React.FC<DashboardPositiveButtonProps> = ({
  children,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-light-gold hover:opacity-80 transition-opacity duration-200 hover:shadow-md text-font-brown font-medium px-8 py-2 text-xs lg:text-base rounded-xl"
    >
      {children}
    </button>
  );
};

export default DashboardPositiveButton;
