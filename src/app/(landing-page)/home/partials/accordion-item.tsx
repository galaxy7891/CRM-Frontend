'use client';

import React from 'react';
import Accordion from './accordion';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const accordionItems = [
    {
      id: 1,
      title: 'Apa Itu Loyalcust',
      content:
        'Loyalcust adalah Website CRM yang akan membantu anda dalam meningkatkan bisnis anda.',
    },
    {
      id: 2,
      title: 'Apa Manfaat Loyalcust?',
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>Meningkatkan loyalitas pelanggan</li>
          <li>Meningkatkan efisiensi aktivitas bisnis</li>
          <li>Manajemen data yang terstruktur</li>
        </ul>
      ),
    },
    {
      id: 3,
      title: 'Bagaimana Cara Kerja Loyalcust?',
      content:
        'Memasukkan dan mengelola data pelanggan secara efektif, serta menghubungkannya dengan kesepakatan yang telah dibuat untuk memaksimalkan potensi bisnis.',
    },
    {
      id: 4,
      title: 'Bagaimana Cara Memulai Loyalcust?',
      content:
        'Hubungi kami dan lakukan register atau masuk ke dalam website untuk memulai Loyalcust.',
    },
  ];

  const accordionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {accordionItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={index}
          variants={accordionVariants}
        >
          <Accordion key={item.id} items={[item]} />
        </motion.div>
      ))}
    </div>
  );
};

export default Home;
