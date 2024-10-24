import Image from 'next/image';

interface EditUserButtonProps {
  onClick: () => void;
}

const EditUserButton: React.FC<EditUserButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Image
        src="/icons/profile/edits.svg"
        alt="editbtn"
        width={32}
        height={32}
        className="w-[18px] h-[18px] md:w-8 md:h-8 hover:opacity-80"
      />
    </button>
  );
};

export default EditUserButton;
