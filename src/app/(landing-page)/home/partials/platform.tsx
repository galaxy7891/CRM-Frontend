"use client";

import React from "react";
import CardPlatform from "./card-platform";
import { motion } from "framer-motion";
import Title from "@/components/landing-page/layout/title";

const Platform = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <div className="relative z-[10] p-6 lg:p-10">
      {/* Background Layer */}
      <div className="absolute inset-0 z-[1]">
        <div className="h-1/2 bg-dark-navy"></div>
        <div className="h-1/2 bg-light-white"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-[2] flex justify-center items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="bg-font-white shadow-md p-8 md:p-6 lg:p-14 rounded-3xl w-full max-w-6xl">
          <Title>Platform Terbaik untuk Mengelola Bisnis Anda</Title>
          <div className="flex flex-col lg:flex-row gap-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                className="" 
              >
                {i === 0 && (
                  <CardPlatform
                    icons={
                      <svg
                        width="48"
                        height="52"
                        viewBox="0 0 48 52"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 0V51.4336H47.1445V51.3521V47.1445V4.28907V0H0ZM6.68201 6.35205H40.0723V10.6353H6.68201V6.35205ZM6.68201 14.9243H28.1097V19.2075H6.68201V14.9243ZM6.68201 23.4966H19.5375V27.7798H6.68201V23.4966ZM36.5161 32.3973C36.5161 33.8141 36.0466 35.1129 35.2627 36.1425C38.476 37.8711 40.682 41.3518 40.682 45.3521H37.3502C37.3502 41.5407 34.3602 38.4425 30.682 38.4425C27.0038 38.4425 24.0138 41.5407 24.0138 45.3521H20.682C20.682 41.3471 22.8835 37.8663 26.1013 36.1425C25.3174 35.1129 24.8479 33.8094 24.8479 32.3973C24.8479 29.0582 27.4596 26.3521 30.682 26.3521C33.9044 26.3521 36.5161 29.0582 36.5161 32.3973ZM33.1843 32.402C33.1843 30.971 32.0585 29.8092 30.682 29.8092C29.301 29.8092 28.1797 30.971 28.1797 32.402C28.1797 33.833 29.3055 34.9949 30.682 34.9949C32.063 34.9949 33.1843 33.8283 33.1843 32.402Z"
                          fill="#374952"
                        />
                      </svg>
                    }
                    title="Manajemen Pelanggan"
                    description="Kami menyediakan fitur pengelolaan customer leads, kontak, dan perusahaan"
                  />
                )}
                {i === 1 && (
                  <CardPlatform
                    icons={
                      <svg
                        width="55"
                        height="55"
                        viewBox="0 0 51 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.8384 9.5605H30.8231L39.5797 0.786468C39.8272 0.537263 40.1215 0.339464 40.4459 0.20448C40.7702 0.0694963 41.1181 0 41.4694 0C41.8208 0 42.1687 0.0694963 42.493 0.20448C42.8174 0.339464 43.1117 0.537263 43.3592 0.786468L50.226 7.67276C50.7218 8.17091 51 8.84479 51 9.54721C51 10.2496 50.7218 10.9235 50.226 11.4217L44.131 17.5369H22.8384V22.8545C22.8384 23.5597 22.558 24.2359 22.0589 24.7346C21.5597 25.2332 20.8827 25.5133 20.1768 25.5133C19.471 25.5133 18.794 25.2332 18.2948 24.7346C17.7957 24.2359 17.5153 23.5597 17.5153 22.8545V14.8781C17.5153 13.4678 18.0761 12.1152 19.0744 11.118C20.0727 10.1207 21.4266 9.5605 22.8384 9.5605ZM6.86897 22.8545V33.4897L0.773967 39.5783C0.278246 40.0765 0 40.7504 0 41.4528C0 42.1552 0.278246 42.8291 0.773967 43.3272L7.64083 50.2135C7.88826 50.4627 8.18263 50.6605 8.50697 50.7955C8.83131 50.9305 9.17919 51 9.53055 51C9.88191 51 10.2298 50.9305 10.5541 50.7955C10.8785 50.6605 11.1728 50.4627 11.4203 50.2135L22.8384 38.8073H33.4847C34.1906 38.8073 34.8676 38.5272 35.3667 38.0285C35.8659 37.5299 36.1463 36.8536 36.1463 36.1485V33.4897H38.8079C39.5138 33.4897 40.1908 33.2096 40.6899 32.7109C41.189 32.2123 41.4694 31.536 41.4694 30.8309V28.1721H44.131C44.8369 28.1721 45.5139 27.892 46.013 27.3933C46.5122 26.8947 46.7926 26.2185 46.7926 25.5133V22.8545H28.1616V25.5133C28.1616 26.9236 27.6007 28.2762 26.6025 29.2734C25.6042 30.2706 24.2502 30.8309 22.8384 30.8309H17.5153C16.1035 30.8309 14.7495 30.2706 13.7512 29.2734C12.753 28.2762 12.1921 26.9236 12.1921 25.5133V17.5369L6.86897 22.8545Z"
                          fill="#374952"
                        />
                      </svg>
                    }
                    title="Manajemen Data Deals"
                    description="Kami menyediakan fitur pengelolaan data deals untuk memanajemen bisnis anda"
                  />
                )}
                {i === 2 && (
                  <CardPlatform
                    icons={
                      <svg
                        width="53"
                        height="48"
                        viewBox="0 0 53 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0H53V10.6667H0V0ZM45.05 13.3333H2.65V42.6667C2.65 44.0812 3.20839 45.4377 4.20233 46.4379C5.19628 47.4381 6.54435 48 7.95 48H45.05C46.4557 48 47.8037 47.4381 48.7977 46.4379C49.7916 45.4377 50.35 44.0812 50.35 42.6667V13.3333H45.05ZM37.1 29.3333H15.9V24H37.1V29.3333Z"
                          fill="#374952"
                        />
                      </svg>
                    }
                    title="Manajemen Produk"
                    description="Kami menyediakan fitur manajemen produk barang maupun jasa"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Platform;
