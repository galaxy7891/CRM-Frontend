"use client"

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  image: string;
  description: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, image, description }) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: false }}
    >
      <motion.div
        className="md:order-1 hidden md:inline-block font-custom text-font-black"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <p className="text-[28px] font-bold">{title}</p>
        <p className="font-medium text-base text-justify mt-2">{description}</p>
      </motion.div>

      <motion.div
        className="order-1 md:hidden font-custom text-font-black"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <p className="text-xl font-bold">{title}</p>
      </motion.div>

      <motion.div
        className="order-3 md:hidden font-custom text-font-black"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <p className="font-medium text-base text-justify">{description}</p>
      </motion.div>

      <motion.div
        className="order-2 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: false }}
      >
        <Image src={image} alt="ServiceCard" height={500} width={300} />
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;
