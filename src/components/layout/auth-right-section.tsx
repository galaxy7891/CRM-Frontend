import Image from 'next/image';

interface AuthRightSectionProps {
  children: React.ReactNode;
}

const AuthRightSection: React.FC<AuthRightSectionProps> = ({ children }) => {
  return (
    <div className="bg-font-white w-full h-full rounded-lg px-4 py-7 sm:p-10 lg:px-20 lg:py-7">
      <div className="flex">
        <Image src="icons/logo.svg" width={188} height={369} alt="logo" />
      </div>
      {children}
    </div>
  );
};

export default AuthRightSection;
