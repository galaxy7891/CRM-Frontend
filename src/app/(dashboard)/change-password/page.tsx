import Image from "next/image";
import useTheme from "../../../components/dark-mode";
// import OldPassword from "@/components/change-password/step-1-old-password";
// import Waiting from "@/components/change-password/step1-waiting";
// import NewPassword from "@/components/change-password/step-2-new-password";

interface FormEditProps {
  onClose: () => void;
}

const ChangePassword = ({ onClose }: FormEditProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed top-0 right-0 md:w-1/2 w-full h-full bg-light-white dark:bg-dark-darkGray shadow-lg z-50 flex flex-col overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-light-white dark:bg-dark-darkGray z-10 p-4 md:p-8">
        <div className="flex space-x-6 items-center">
          <button onClick={onClose}>
            <Image
              src={
                isDarkMode
                  ? "/icons/profile/back-white.svg"
                  : "/icons/profile/back.svg"
              }
              alt="back"
              width={24}
              height={24}
              className="w-[12px] h-[12px] md:w-[15px] md:h-[15px]"
            />
          </button>
          <h2 className="md:text-2xl text-base font-medium text-font-black dark:text-font-white">
            Ubah Kata Sandi
          </h2>
        </div>
      </div>

      <div className="flex-grow">
        {/* <OldPassword /> */}
        {/* <Waiting /> */}
        {/* <NewPassword /> */}
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 bg-dark-navy dark:bg-dark-navy z-10 p-4">
        <button
          type="submit"
          className="px-4 py-2 rounded-[10px] bg-light-gold w-full text-font-brown font-custom font-medium"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
