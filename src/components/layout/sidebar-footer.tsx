interface SidebarFooterProps {
  children: React.ReactNode;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ children }) => {
  return (
    <div className="flex justify-end  items-center sticky  bg-dark-navy dark:bg-dark-navy z-10 p-2 md:p-4 space-x-2 mt-auto">
      {children}
    </div>
  );
};

export default SidebarFooter;
