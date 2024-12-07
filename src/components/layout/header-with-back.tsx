import RouterBackButton from '../button/route-back-button';

interface HeaderWithBackButtonProps {
  title: string;
}

const HeaderWithBackButton: React.FC<HeaderWithBackButtonProps> = ({
  title,
}) => {
  return (
    <div className="flex space-x-4 mb-4 lg:mb-8">
      <RouterBackButton />
      <h1 className="text base md:text-2xl font-medium font-custom text-font-black dark:text-font-white">
        {title}
      </h1>
    </div>
  );
};

export default HeaderWithBackButton;
