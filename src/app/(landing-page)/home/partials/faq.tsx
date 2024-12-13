import React from "react";
import AccordionItems from "./accordion-item";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";
import Title from "@/components/landing-page/layout/title";

const Faq = () => {
  return (
    <>
      <BgLightWhite>
        <Title>Pertanyaan Yang Sering Ditanyakan</Title>
        <AccordionItems />
      </BgLightWhite>
    </>
  );
};

export default Faq;
