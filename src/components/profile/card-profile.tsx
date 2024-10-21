import { USERDATA } from "@/constants/page";
import Image from "next/image";

interface UserData {
  label: string;
  value: string;
}

const CardProfile = () => {
  return (
    <div className="grid grid-rows">
      <div className="p-4">
        <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full">
          <div className="grid grid-cols-12 w-full h-full">
            <div className="col-span-12 grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4 flex items-center justify-center relative">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Image
                      src="/images/barantam.png"
                      alt="image"
                      width={160}
                      height={160}
                      className="rounded-full mb-2 w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
                    />

                    <Image
                      src="/icons/profile/camera.svg"
                      alt="camera"
                      width={24}
                      height={24}
                      className="absolute bottom-[-10px] right-0 w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                    />
                  </div>
                  <p className="text-black dark:text-font-white text-lg font-medium font-custom md:text-lg">
                    Nama Lengkap
                  </p>
                </div>
              </div>

              {/* Kolom Kanan */}
              <div className="col-span-12 md:col-start-5 md:col-span-8">
                <div className="flex justify-between items-center mb-4">
                  <p className="dark:text-font-white text-base font-medium md:text-2xl font-custom tex-font-black">
                    Data Diri
                  </p>
                  <Image
                    src="/icons/profile/edits.svg"
                    alt="editbtn"
                    width={32}
                    height={32}
                    className="w-[18px] h-[18px] md:w-8 md:h-8"
                  />
                </div>

                {/* Mapping Data Diri */}
                <div className="p-4 bg-light-white dark:bg-dark-darkGray rounded-[10px]">
                  {USERDATA.map((item: UserData, index: number) => (
                    <div key={index} className="mb-4">
                      <p className="font-bold dark:text-font-white font-custom text-font-black text-xs md:text-base mb-1">
                        {item.label}
                      </p>
                      <p className="font-custom dark:text-font-white text-font-black text-xs md:text-base">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
