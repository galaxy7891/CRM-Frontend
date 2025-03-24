'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CardLeftProps {
  title: string;
  image: string;
  description: string;
}

const CardLeft: FC<CardLeftProps> = ({ title, image, description }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 items-center justify-center bg-white p-4 shadow-xl rounded-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      viewport={{ once: false }}>
      {/* dekstop */}
      <motion.div
        className="md:order-2 hidden md:inline-block font-custom text-font-black ps-10 pe-20 "
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <p className=" text-[28px] font-bold ">{title}</p>
        <p className="font-medium text-base mt-2 text-justify">{description}</p>
      </motion.div>
      {/* mobile */}
      <motion.div
        className="order-1 md:hidden font-custom text-font-black "
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <p className="text-xl font-bold text-center">{title}</p>
      </motion.div>

      <motion.div
        className="order-3 md:hidden font-custom text-font-black "
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <p className="font-normal text-sm md:text-base text-justify">
          {description}
        </p>
      </motion.div>

      <motion.div
        className="order-1 md:order2 flex items-center justify-center "
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <Image
          className="pb-4 md:pb-0"
          src={image}
          alt="CardLeft"
          height={500}
          width={400}
          quality={100}
        />
      </motion.div>
    </motion.div>
  );
};

export default CardLeft;
