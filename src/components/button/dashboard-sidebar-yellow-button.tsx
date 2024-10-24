interface DashboardSidebarYellowButtonProps {
  children: React.ReactNode;
  onClick: (e: React.FormEvent) => void;
}

const DashboardSidebarYellowButton: React.FC<
  DashboardSidebarYellowButtonProps
> = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="px-4 py-2 rounded-[10px] bg-light-gold  text-font-brown text-xs md:text-base font-custom font-medium  duration-200 hover:shadow-md hover:shadow-light-gold"
    >
      {children}
    </button>
  );
};

export default DashboardSidebarYellowButton;
