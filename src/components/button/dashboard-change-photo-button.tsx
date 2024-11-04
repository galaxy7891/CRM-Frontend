import { useRef } from 'react';

interface DashboardChangePhotoButtonProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}
const DashboardChangePhotoButton: React.FC<DashboardChangePhotoButtonProps> = ({
  onChange,
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    // Trigger click on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleButtonClick}
        className="px-4 py-2 text-font-brown text-xs md:text-base bg-font-white border-2 border-light-brownLight  font-medium rounded-[10px] duration-200 hover:shadow-md hover:shadow-light-brownLight"
      >
        {children}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChange}
        accept="image/png, image/jpg, image/jpeg" // Optional: restrict to image files
        style={{ display: 'none' }} // Hide the file input
      />
    </div>
  );
};

export default DashboardChangePhotoButton;
