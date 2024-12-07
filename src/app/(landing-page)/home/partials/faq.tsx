import React from "react";
import AccordionItems from "./accordion-item";

const Faq = () => {
  return (
    <div className="bg-light-white p-8">
      <p className="font-custom text-center mb-9 font-bold text-font-black text-xl lg:text-[32px]">
        Pertanyaan Yang Sering Ditanyakan
      </p>
      <AccordionItems />
    </div>
  );
};

export default Faq;
