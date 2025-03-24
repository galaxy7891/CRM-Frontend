'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TutorialText from './tutorial-text';
import CarouselTutorials from './carousel-tutorials';
import { TutorialsItems } from './content';

const Tutorials: React.FC = () => {
  return (
    <div className="space-y-10 ">
      {TutorialsItems.map((tutorial, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`flex flex-col md:flex-row px-10 lg:px-20  bg-white rounded-xl shadow-xl p-4 ${
              isEven ? 'md:flex-row-reverse' : ''
            } items-center gap-6`}>
            <div className="flex-1 ">
              <TutorialText
                title={tutorial.title}
                content={
                  <ul className="list-decimal list-inside space-y-2">
                    {tutorial.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                }
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex-1">
              <CarouselTutorials
                items={tutorial.images.map((image) => ({ image }))}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Tutorials;
