interface EmployeeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DashboardSidebarEmployeeButton: React.FC<EmployeeButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-light-gold hover:opacity-80 transition-opacity duration-200 hover:shadow-md text-font-brown font-medium px-8 py-2 text-xs lg:text-base rounded-[10px]"
    >
      {children}
    </button>
  );
};

export default DashboardSidebarEmployeeButton;
