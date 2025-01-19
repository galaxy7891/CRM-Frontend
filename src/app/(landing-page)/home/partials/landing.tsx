'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BgDarkNavy from '@/components/landing-page/layout/bg-dark-navy';

const Landing = () => {
  return (
    <>
      <BgDarkNavy>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Bagian Teks */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center lg:ps-16"
          >
            <p className="text-font-white font-custom font-bold text-2xl md:text-5xl md:mb-2">
              Membangun Loyalitas,
            </p>
            <p className="text-font-white font-custom font-bold text-2xl md:text-5xl">
              Menguatkan Hubungan
            </p>
            <div className='md:w-3/4'>
              <p className="mt-5 text-font-white font-custom font-medium text-xs md:text-base mb-1">
                Kami menyediakan aplikasi CRM untuk pengelolaan pelanggan,
                membantu bisnis Anda tumbuh lebih cepat dan efisien
              </p>
            </div>

            <div className="md:flex items-center gap-3 mt-12 hidden">
              <Link href="/register">
                <button className="bg-light-gold  text-font-brown font-bold py-3 px-10 rounded-[5px] hover:bg-dark-gold transition">
                  Coba 7 Hari
                </button>
              </Link>
              <Link
                href="/login"
                className="text-center font-custom rounded-[5px] py-3 px-10 text-xs md:text-base font-medium border border-light-gold text-light-gold hover:bg-dark-gold hover:bg-opacity-30"
              >
                Masuk
              </Link>
            </div>
          </motion.div>

          {/* Bagian Gambar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.2 }}
            className="flex justify-center"
          >
            <Image
              src="/images/landing.png"
              alt="landing"
              width={500}
              height={500}
            />
          </motion.div>

          {/* Tombol di Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1 }}
            className="md:hidden mt-4"
          >
            <Link href="/register">
              <button className="w-full bg-light-gold text-base text-font-brown font-bold py-3 px-10 rounded-[5px] hover:bg-dark-gold transition">
                Coba 7 Hari
              </button>
            </Link>
            <Link href="/login">
              <button className="mt-2 w-full text-center font-custom rounded-[5px] py-3 px-10 text-base md:text-base font-medium border border-light-gold text-light-gold hover:bg-dark-gold hover:bg-opacity-30">
                Masuk
              </button>
            </Link>
          </motion.div>
        </div>
      </BgDarkNavy>
    </>
  );
};

export default Landing;
