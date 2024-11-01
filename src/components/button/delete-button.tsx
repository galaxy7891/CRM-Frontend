import Image from 'next/image';
import useTheme from '@/components/dark-mode';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  const { isDarkMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className="hover:shadow-[0_4px_8px_rgba(255,202,202,0.5)] transition-shadow duration-200"
    >
      <Image
        src={
          isDarkMode
            ? '/icons/table/dustbin-dark.svg'
            : '/icons/table/trash.svg'
        }
        alt="deletebtn"
        width={44}
        height={44}
        className="w-7 h-7 lg:w-[44px] lg:h-[44px]"
      />
    </button>
  );
};

export default DeleteButton;
