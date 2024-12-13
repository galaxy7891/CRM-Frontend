import React, { useState, useEffect, useRef } from "react";

type AccordionItem = {
  id: number;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = (id: number) => {
    // Buka jika belum aktif, tutup jika sudah aktif
    setActiveId((prevActiveId) => (prevActiveId === id ? null : id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setActiveId(null); // Tutup semua accordion
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-2">
      {items.map((item) => {
        const isOpen = activeId === item.id;
        return (
          <div key={item.id} className="border rounded-[10px]">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full font-custom bg-font-white flex justify-between items-center py-4 px-6 text-left text-xl font-bold text-font-black"
            >
              <span>{item.title}</span>
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 ${
                  isOpen ? "bg-light-gold rotate-180" : ""
                }`}
              >
                <svg
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300"
                >
                  <path
                    d="M1.18638 3.93009L9.82953 12.307C10.4849 12.9421 11.5474 12.9421 12.2027 12.307L12.2264 12.284C12.8817 11.6489 12.8817 10.6191 12.2264 9.98397L3.58324 1.60707C2.9279 0.97192 1.8654 0.97192 1.21006 1.60707L1.18638 1.63002C0.531044 2.26517 0.531044 3.29495 1.18638 3.93009Z"
                    fill="#542D0A"
                  />
                  <path
                    d="M9.77362 12.284L9.7973 12.307C10.4526 12.9421 11.5151 12.9421 12.1705 12.307L20.8136 3.93009C21.469 3.29495 21.469 2.26517 20.8136 1.63002L20.7899 1.60707C20.1346 0.97192 19.0721 0.97192 18.4168 1.60707L9.77362 9.98397C9.11828 10.6191 9.11828 11.6489 9.77362 12.284Z"
                    fill="#542D0A"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-6 py-2 bg-font-white font-custom text-font-black text-xl font-normal">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
