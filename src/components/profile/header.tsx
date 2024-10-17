import Image from "next/image";


const HeaderProfile = () => {
  return <div className="flex items-center justify-between px-8 py-4 ">
    <button>
        <Image
        src="/icons/profile/back.svg"
        alt= ""
        width={24}
        height={24}/>
    </button>
    <p className="font-custom font-medium text-font-black md:text-2xl ">Detail Personal</p>
  </div>;
};

export default HeaderProfile;
