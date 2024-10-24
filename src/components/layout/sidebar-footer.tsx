interface SidebarFooterProps {
  children: React.ReactNode;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ children }) => {
  return (
    <div className="sticky bottom-0 bg-dark-navy dark:bg-dark-navy z-10 p-4 flex justify-end space-x-2">
      {children}
    </div>
  );
};

export default SidebarFooter;
