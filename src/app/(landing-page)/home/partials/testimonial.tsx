"use client"

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CarouselItem from "./carousel-item";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";

const Testimonial = () => {
  // Variants untuk animasi
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <BgLightWhite>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        {/* Animasi untuk Gambar */}
        <motion.div
          className="order-2 lg:order-1 flex items-center justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn}
        >
          <Image
            src="/images/testimonial.png"
            alt="Testimonial"
            height={500}
            width={300}
          />
        </motion.div>

        {/* Desktop */}
        <motion.div
          className="lg:order-2 hidden lg:inline-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn}
        >
          <p className="font-custom text-font-black text-[32px] mt-2 font-bold">
            Testimoni Pelanggan{" "}
          </p>
          <CarouselItem />
        </motion.div>

        {/* Mobile Title */}
        <motion.div
          className="order-1 lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn}
        >
          <p className="font-custom text-font-black text-xl font-bold">
            Testimoni Pelanggan{" "}
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <motion.div
          className="order-3 lg:hidden mt-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn}
        >
          <CarouselItem />
        </motion.div>
      </div>
    </BgLightWhite>
  );
};

export default Testimonial;
