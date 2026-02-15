import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { setCurrentSection } = useAppContext();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="h-screen w-full flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-serif text-cream font-light tracking-widest leading-relaxed max-w-4xl"
      >
        A small surprise for the one I love...
      </motion.h1>
      
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={() => setCurrentSection(1)}
        className="mt-12 text-gold font-serif italic tracking-widest border-b border-gold/30 pb-1 hover:border-gold transition-colors duration-500"
      >
        Click to begin
      </motion.button>
    </motion.section>
  );
};

export default Hero;
