interface ListFooterProps {
  children: React.ReactNode;
}

const ListFooter: React.FC<ListFooterProps> = ({ children }) => {
  return (
    <div className="font-custom text-xs text-font-light font-normal md:text-sm hover:font-medium hover:text-font-white">
      {children}
    </div>
  );
};

export default ListFooter;
