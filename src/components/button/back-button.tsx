interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="mt-2 bg-white w-full px-1 h-12 lg:h-15 text-xs md:text-base flex items-center font-bold justify-center border-2 text-light-gold border-dark-gold py-2 rounded-md hover:opacity-80 transition-opacity duration-200 hover:shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BackButton;
