'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutLoyalCustProps {
  title: string;
  image: string;
  description: JSX.Element;
}

const AboutLoyalCust: FC<AboutLoyalCustProps> = ({
  title,
  image,
  description,
}) => {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center bg-white shadow-lg rounded-lg p-4 gap-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      viewport={{ once: false }}>
      <motion.div
        className="lg:order-1 hidden lg:inline-block font-custom text-font-black md:ps-5 ps-10 pe-20"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <p className="text-[28px] font-bold ">{title}</p>
        <p className="font-medium text-base mt-2">{description}</p>
      </motion.div>

      <motion.div
        className="order-1 lg:hidden font-custom text-font-black"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <p className="text-lg font-bold text-center">{title}</p>
      </motion.div>

      <motion.div
        className="order-3 lg:hidden font-custom text-font-black"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <p className="font-normal text-sm lg:text-base text-justify">
          {description}
        </p>
      </motion.div>

      <motion.div
        className="order-2 flex items-center  justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: false }}>
        <Image
          src={image}
          className="rounded-lg "
          alt="ServiceCard"
          height={200}
          width={500}
          quality={100}
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutLoyalCust;
