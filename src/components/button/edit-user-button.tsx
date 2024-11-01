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
        width={44}
        height={44}
        className="w-7 h-7 lg:w-[44px] lg:h-[44px]"
      />
    </button>
  );
};

export default EditUserButton;
