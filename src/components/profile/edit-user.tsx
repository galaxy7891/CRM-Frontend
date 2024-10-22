import Image from "next/image";
import useTheme from "../dark-mode";

interface FormEditProps {
  onClose: () => void;
}

const EditUser = ({ onClose }: FormEditProps) => {
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
            Edit Profil
          </h2>
        </div>
      </div>

      {/* Scrollable Form */}
      <form className="flex-grow overflow-y-auto p-2 md:p-4 space-y-4">
        {/* Nama Depan dan Nama Belakang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Nama Depan
              <span className="font-custom text-dark-red md:text-base text-xs">
                *
              </span>
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2 border  text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              placeholder="Nama Depan"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Nama Belakang
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2 text-xs md:text-base font-custom border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              placeholder="Nama Belakang"
            />
          </div>
        </div>

        {/* Jabatan dan Akses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Jabatan
              <span className="font-custom text-dark-red md:text-base text-xs">
                *
              </span>
            </label>
            <select
              className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              defaultValue=""
            >
              <option value="CEO">CEO</option>
              <option value="Wakil CEO">Wakil CEO</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Akses
              <span className="font-custom text-dark-red md:text-base text-xs">
                *
              </span>
            </label>
            <select
              className="w-full mt-2 p-2 text-xs md:text-base font-custom border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              defaultValue=""
            >
              <option value="SuperAdmin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Karyawan">Karyawan</option>
            </select>
          </div>
        </div>

        {/* Email dan Nomor Telepon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              placeholder="Email"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Nomor Telepon
              <span className="font-custom text-dark-red md:text-base text-xs">
                *
              </span>
            </label>
            <div className="flex mt-2">
              <span className="inline-flex text-xs md:text-base font-custom items-center px-3 border border-r-0 rounded-l-[4px] bg-gray-200 dark:bg-dark-navy dark:text-font-white border-font-black">
                +62
              </span>
              <input
                type="tel"
                className="w-full p-2 border text-xs md:text-base font-custom focus:border-dark-navy focus:outline-none border-font-black rounded-r-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
                placeholder="81234567890"
              />
            </div>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex-1">
            <label className="block text-xs md:text-base font-custom text-font-black dark:text-font-white">
              Jenis Kelamin
            </label>
            <select
              className="w-full mt-2 p-2 text-xs md:text-base font-custom border focus:border-dark-navy focus:outline-none border-font-black rounded-[4px] bg-font-white dark:bg-dark-navy dark:border-none dark:text-font-white"
              defaultValue=""
            >
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
              <option value="Lain-Lain">Lain-Lain</option>
            </select>
          </div>
        </div>
      </form>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 bg-dark-navy dark:bg-dark-navy z-10 p-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-dark-red bg-dark-redLight font-custom font-medium rounded-[10px]"
        >
          Hapus Semua
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-[10px] bg-light-gold text-font-brown font-custom font-medium"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default EditUser;
