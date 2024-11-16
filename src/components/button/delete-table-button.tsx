interface DeleteTableButtonProps {
  onClick: () => void;
}

const DeleteTableButton: React.FC<DeleteTableButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 11 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1.22222H8.25L7.46429 0.5H3.53571L2.75 1.22222H0V2.66667H11M0.785714 12.0556C0.785714 12.4386 0.951275 12.806 1.24597 13.0769C1.54067 13.3478 1.94037 13.5 2.35714 13.5H8.64286C9.05963 13.5 9.45932 13.3478 9.75402 13.0769C10.0487 12.806 10.2143 12.4386 10.2143 12.0556V3.38889H0.785714V12.0556Z"
          fill="#BD2F3D"
        />
      </svg>
    </button>
  );
};

export default DeleteTableButton;
