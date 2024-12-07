"use client";
import React, { useState } from "react";
import Accordion from "./accordion";

const AccordionItems: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <Accordion
        title="Apa Itu Loyalcust?"
        isOpen={activeIndex === 0}
        onClick={() => handleAccordionClick(0)}
      >
        <p>
          Loyalcust adalah Website CRM yang akan membantu anda dalam
          meningkatkan bisnis anda.
        </p>
      </Accordion>

      <Accordion
        title="Apa Manfaat Loyalcust?"
        isOpen={activeIndex === 1}
        onClick={() => handleAccordionClick(1)}
      >
        <ul className="list-disc pl-6 space-y-2">
          <li>Meningkatkan loyalitas pelanggan</li>
          <li>Meningkatkan efisiensi aktivitas bisnis</li>
          <li>Manajemen data yang terstruktur</li>
        </ul>
      </Accordion>

      <Accordion
        title="Bagaimana Cara Kerja Loyalcust?"
        isOpen={activeIndex === 2}
        onClick={() => handleAccordionClick(2)}
      >
        <p>
          Memasukkan dan mengelola data pelanggan secara efektif, serta
          menghubungkannya dengan kesepakatan yang telah dibuat untuk
          memaksimalkan potensi bisnis.
        </p>
      </Accordion>

      <Accordion
        title="Bagaimana Cara Memulai Loyalcust?"
        isOpen={activeIndex === 3}
        onClick={() => handleAccordionClick(3)}
      >
        <p>
          Hubungi kami dan lakukan register atau masuk ke dalam website untuk
          memulai Loyalcust.
        </p>
      </Accordion>
    </div>
  );
};

export default AccordionItems;
