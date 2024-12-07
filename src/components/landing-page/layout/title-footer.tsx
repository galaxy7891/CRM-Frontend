interface TitleFooterProps {
  children: React.ReactNode;
}

const TitleFooter: React.FC<TitleFooterProps> = ({ children }) => {
  return (
    <div className="font-custom text-xs text-font-white font-medium md:text-sm">
      {children}
    </div>
  );
};

export default TitleFooter;
