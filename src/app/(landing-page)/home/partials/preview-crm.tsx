import React from "react";
import Image from "next/image";

const PreviewCrm = () => {
  return (
    <div className="bg-light-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <div className="order-2 md:order-1">
          <Image
            src="/images/preview.png"
            alt="preview"
            height={300}
            width={500}
          />
        </div>
        <div className="hidden font-custom text-font-black md:order-2 md:inline-block">
          <p className="font-bold text-xl md:text-[28px]">
            Mengelola pelanggan anda <br />
            dimanapun dan kapanpun
          </p>
          <p className="mt-4 font-medium text-sm md:text-base md:order-2 md:inline-block">
            Kami menyediakan website CRM untuk pengelolaan pelanggan, <br />
            membantu bisnis Anda tumbuh lebih cepat dan efisien
          </p>
        </div>

        <div className="font-bold text-xl md:text-[28px] md:hidden font-custom text-font-black order-1 ">
          Mengelola pelanggan anda <br />
          dimanapun dan kapanpun
        </div>
        <div className="font-medium text-sm md:text-base md:hidden font-custom text-font-black order-3 ">
          Kami menyediakan website CRM untuk pengelolaan pelanggan, <br />
          membantu bisnis Anda tumbuh lebih cepat dan efisien
        </div>
      </div>
    </div>
  );
};

export default PreviewCrm;
