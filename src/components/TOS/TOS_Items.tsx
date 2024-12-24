import React from 'react';

const TC = ({
  title,
  items,
  description,
}: {
  title: string;
  items?: string[];
  description?: string;
}) => {
  return (
    <section className="mb-2">
      <h2 className="text-xs md:text-base font-bold font-custom text-font-black mb-2">
        {title}
      </h2>
      <p className="text-xs md:text-base">{description}</p>
      <ul className="list-disc text-xs md:text-base font-custom text-font-black ml-6 space-y-2">
        {items?.map((item, index) => (
          <li className="text-xs md:text-base " key={index}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TC;
