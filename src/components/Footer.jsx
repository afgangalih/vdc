import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { setVoucherVisible } = useAppContext();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-chocolate"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="space-y-12"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-cream italic tracking-wide">
          Claim Your Sweet Gift
        </h2>
        
        <p className="text-gold/60 font-serif italic text-lg max-w-md mx-auto">
          A final token of my affection, gathered from every heart you've caught.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setVoucherVisible(true)}
          className="bg-cream text-chocolate px-12 py-5 rounded-full font-serif text-xl tracking-widest shadow-2xl hover:bg-white transition-colors duration-500 uppercase font-medium"
        >
          View Voucher
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
