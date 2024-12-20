import React, { useRef } from 'react';
import Image from 'next/image';

const ImageArticle = ({
  onChange,
  preview,
  disabled,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
  disabled?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onClick={handleButtonClick}
      className={`relative w-full h-72 bg-light-white dark:bg-dark-darkGray rounded-lg flex flex-col items-center justify-center ${
        disabled ? '' : 'cursor-pointer'
      }`}
    >
      {!disabled && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={onChange}
          accept="image/png, image/jpg, image/jpeg" // Optional: restrict to image files
          style={{ display: 'none' }} // Hide the file input
        />
      )}

      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          width={200}
          height={200}
          className="w-full h-full"
        />
      ) : (
        <>
          <div className="w-12 h-12 rounded flex items-center justify-center">
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.11111 46C3.70556 46 2.50274 45.5 1.50267 44.4999C0.502593 43.4998 0.0017037 42.2961 0 40.8889V5.11111C0 3.70556 0.500889 2.50274 1.50267 1.50267C2.50444 0.502593 3.70726 0.0017037 5.11111 0H40.8889C42.2944 0 43.4981 0.500889 44.4999 1.50267C45.5017 2.50444 46.0017 3.70726 46 5.11111V40.8889C46 42.2944 45.5 43.4981 44.4999 44.4999C43.4998 45.5017 42.2961 46.0017 40.8889 46H5.11111ZM7.66667 35.7778H38.3333L28.75 23L21.0833 33.2222L15.3333 25.5556L7.66667 35.7778Z"
                fill="#193442"
              />
            </svg>
          </div>
          <p className="mt-4 text-center text-xs md:text-base text-font-black dark:text-font-white">
            Unggah Foto Artikel
          </p>
        </>
      )}
      {!disabled && (
        <div className="absolute bottom-[-30px] right-[-30px]">
          <Image
            src="/icons/profile/camera.svg"
            alt="camera"
            width={24}
            height={24}
            className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
          />
        </div>
      )}
    </div>
  );
};

export default ImageArticle;
