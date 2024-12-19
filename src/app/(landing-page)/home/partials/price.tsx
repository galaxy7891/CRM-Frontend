"use client";

import React from "react";
import CardPriceLight from "./card-price-light";
import CardPriceDark from "./card-price-dark";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";
import Title from "@/components/landing-page/layout/title";
import { motion } from "framer-motion";

const Price = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <BgLightWhite>
      <Title>Harga yang ditawarkan</Title>
      <div className="grid gap-9 md:grid-cols-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={0}
          variants={cardVariants}
        >
          <CardPriceLight
            title="Regular"
            description={
              <>
                <p>Cocok untuk usaha kecil dan menengah.</p>
                <br />
                <p>Kelola data pelanggan dan tindak lanjut dengan mudah.</p>
              </>
            }
            price="300.000"
            dataProduk="50"
            dataPelanggan="100"
            dataPengguna="10"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={1}
          variants={cardVariants}
        >
          <CardPriceDark
            title="Profesional"
            description={
              <>
                <p>
                  Cocok untuk bisnis yang ingin lebih dari sekadar manajemen
                  kontak dasar.
                </p>
                <br />
                <p>
                  Ideal untuk bisnis yang membutuhkan efisiensi lebih tinggi.
                </p>
              </>
            }
            price="500.000"
            dataProduk="100"
            dataPelanggan="500"
            dataPengguna="25"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={2}
          variants={cardVariants}
        >
          <CardPriceLight
            title="Bisnis"
            description="Cocok untuk perusahaan besar atau bisnis yang mengandalkan CRM sebagai inti dari operasional mereka."
            price="800.000"
            dataProduk="200"
            dataPelanggan="1000"
            dataPengguna="50"
          />
        </motion.div>
      </div>
    </BgLightWhite>
  );
};

export default Price;
