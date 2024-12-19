"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";

const PreviewCrm = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <BgLightWhite>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <motion.div
          className="order-2 md:order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={0}
          variants={textVariants}
        >
          <Image
            src="/images/preview.png"
            alt="preview"
            height={300}
            width={500}
          />
        </motion.div>
        <motion.div
          className="hidden font-custom text-font-black md:order-2 md:inline-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={1}
          variants={textVariants}
        >
          <p className="font-bold text-xl md:text-[28px]">
            Mengelola pelanggan anda <br />
            dimanapun dan kapanpun
          </p>
          <p className="mt-4 font-medium text-sm md:text-base md:order-2 md:inline-block">
            Kami menyediakan website CRM untuk pengelolaan pelanggan, <br />
            membantu bisnis Anda tumbuh lebih cepat dan efisien
          </p>
        </motion.div>
        <motion.div
          className="font-bold text-xl md:text-[28px] md:hidden font-custom text-font-black order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={2}
          variants={textVariants}
        >
          Mengelola pelanggan anda <br />
          dimanapun dan kapanpun
        </motion.div>
        <motion.div
          className="font-medium text-sm md:text-base md:hidden font-custom text-font-black order-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={3}
          variants={textVariants}
        >
          Kami menyediakan website CRM untuk pengelolaan pelanggan, <br />
          membantu bisnis Anda tumbuh lebih cepat dan efisien
        </motion.div>
      </div>
    </BgLightWhite>
  );
};

export default PreviewCrm;
