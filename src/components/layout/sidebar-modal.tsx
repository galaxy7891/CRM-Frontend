import Image from 'next/image';
import useTheme from '../dark-mode';

interface SidebarModalProps {
  children: React.ReactNode;
  onClose: () => void;
  SidebarModalTitle: string;
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  children,
  onClose,
  SidebarModalTitle,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <>
      <div
        onClick={onClose} // <-- Klik pada overlay akan menutup sidebar
        className="fixed inset-0 bg-black bg-opacity-50 z-50 " // <-- Overlay dengan warna hitam transparan
      />

      <div className="fixed rounded-lg md:rounded-none top-0 right-0 md:w-1/2 w-full h-full bg-light-white dark:bg-dark-darkGray shadow-lg z-[99] flex flex-col overflow-hidden ">
        <div className="top-0 py-4 px-4">
          <div className="flex">
            <button onClick={onClose}>
              <Image
                src={
                  isDarkMode
                    ? '/icons/profile/back-white.svg'
                    : '/icons/profile/back.svg'
                }
                alt="back"
                width={24}
                height={24}
                className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
              />
            </button>
            <h2 className="md:text-2xl text-base font-medium text-font-black dark:text-font-white ps-2">
              {SidebarModalTitle}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default SidebarModal;
