'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CarouselItem from './carousel-item';
import BgLightWhite from '@/components/landing-page/layout/bg-light-white';

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
          className="order-2 md:order-1 flex items-center justify-center "
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
            quality={100}
          />
        </motion.div>

        {/* Desktop */}
        <motion.div
          className="md:order-2 hidden md:inline-block pr-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn}
        >
          <p className="font-custom text-font-black text-xl lg:text-[32px] mt-2 font-bold pb-5 ">
            Testimoni Pelanggan{' '}
          </p>
          <CarouselItem />
        </motion.div>

        {/* Mobile Title */}
        <motion.div
          className="order-1 md:hidden "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn}
        >
          <p className="font-custom text-font-black text-xl font-bold mb-6 text-center ">
            Testimoni Pelanggan{' '}
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <motion.div
          className="order-3 md:hidden mt-8"
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
