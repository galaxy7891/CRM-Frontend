interface DashboardSidebarRedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const DashboardSidebarRedButton: React.FC<DashboardSidebarRedButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 text-dark-red text-xs md:text-base bg-dark-redLight font-custom font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-dark-red"
    >
      {children}
    </button>
  );
};

export default DashboardSidebarRedButton;
