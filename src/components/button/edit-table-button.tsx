interface EditTableButtonProps {
  onClick: () => void;
}

const EditTableButton: React.FC<EditTableButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-dark-navy dark:fill-font-gray"
      >
        <path
          d="M12.7888 3.41918C13.0704 3.13755 13.0704 2.66817 12.7888 2.40099L11.099 0.711221C10.8318 0.429593 10.3624 0.429593 10.0808 0.711221L8.75212 2.0327L11.4601 4.74066M0 10.792V13.5H2.70796L10.6946 5.50611L7.98667 2.79815L0 10.792Z"
          
        />
      </svg>
    </button>
  );
};

export default EditTableButton;
