import React from "react";

interface SectionProps {
   title: string;
   items: string[];
}

const TC = ({ title, items }: SectionProps) => {
   return (
      <section className="mb-6">
         <h2 className="md:text-base font-bold font-custom text-font-black mb-2">{title}</h2>
         <ul className="list-disc md:text-base font-custom text-font-black ml-6 space-y-2">
            {items.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
         </ul>
      </section>
   );
};

export default TC;
