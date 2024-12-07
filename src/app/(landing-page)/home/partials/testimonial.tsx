import React from "react";
import Image from "next/image";
import CarouselItem from "./carousel-item";

const Testimonial = () => {
  return (
    <div className="bg-light-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <div className="order-2 lg:order-1 flex items-center justify-center">
          <Image
            src="/images/testimonial.png"
            alt="Testimonial"
            height={500}
            width={300}
          />
        </div>
        {/* dekstop */}
        <div className="lg:order-2 hidden lg:inline-block">
          <p className="font-custom text-font-black text-[32px] mt-2 font-bold">
            Testimoni Pelanggan{" "}
          </p>
          <CarouselItem />
        </div>
        {/* mobile */}
        <div className="order-1 lg:hidden">
          <p className="font-custom text-font-black text-xl font-bold">
            Testimoni Pelanggan{" "}
          </p>
        </div>
        <div className="order-3 lg:hidden mt-2">
          <CarouselItem />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
