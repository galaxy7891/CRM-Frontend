const AuthPositiveButton = ({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className={`w-full px-1 h-12 lg:h-15 font-custom  bg-light-gold text-font-brown font-bold text-xs md:text-base rounded-lg mt-4 ${
        disabled
          ? 'opacity-50 hover:opacity-50'
          : ' transition-opacity duration-200 hover:shadow-md hover:opacity-80'
      }`}
    >
      {children}
    </button>
  );
};

export default AuthPositiveButton;
