"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CarouselItem from "./carousel-item";
import BgLightWhite from "@/components/landing-page/layout/bg-light-white";

const Testimonial = () => {
  return (
    <>
      <BgLightWhite>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          {/* Gambar dengan animasi */}
          <motion.div
            className="order-2 lg:order-1 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="/images/testimonial.png"
              alt="Testimonial"
              height={500}
              width={300}
            />
          </motion.div>

          {/* Teks desktop dengan animasi */}
          <motion.div
            className="lg:order-2 hidden lg:inline-block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <p className="font-custom text-font-black text-[32px] mt-2 font-bold">
              Testimoni Pelanggan{" "}
            </p>
            <CarouselItem />
          </motion.div>

          {/* Teks mobile dengan animasi */}
          <motion.div
            className="order-1 lg:hidden"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <p className="font-custom text-font-black text-xl font-bold">
              Testimoni Pelanggan{" "}
            </p>
          </motion.div>

          <motion.div
            className="order-3 lg:hidden mt-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <CarouselItem />
          </motion.div>
        </div>
      </BgLightWhite>
    </>
  );
};

export default Testimonial;
