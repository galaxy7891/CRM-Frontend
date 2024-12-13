import { FC } from "react";
import Image from "next/image";

interface CardLeftProps {
  title: string;
  image: string;
  description: string;
}

const CardLeft: FC<CardLeftProps> = ({ title, image, description }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
      {/* dekstop */}
      <div className="lg:order-2 hidden lg:inline-block font-custom text-font-black ">
        <p className=" text-[28px] font-bold">{title}</p>
        <p className="font-medium text-base">{description}</p>
      </div>
      {/* mobile */}
      <div className="order-1 lg:hidden font-custom text-font-black ">
        <p className=" text-xl font-bold">{title}</p>
      </div>
      <div className="order-3 lg:hidden font-custom text-font-black ">
        <p className="font-medium text-base">{description}</p>
      </div>
      <div className="order-1 lg:order2 flex items-center justify-center">
        <Image src={image} alt="CardLeft" height={500} width={300} />
      </div>
    </div>
  );
};

export default CardLeft;
