import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Voucher = () => {
  const { voucherVisible, setVoucherVisible } = useAppContext();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!voucherVisible) return null;

  return (
    <AnimatePresence>
      {voucherVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#442D1C]"
        >
          {/* Viewport Close Button */}
          <button
            onClick={() => {
              setVoucherVisible(false);
              setIsFlipped(false);
            }}
            className="absolute top-8 right-8 text-[#F5EFE6] hover:text-[#D4AF37] transition-colors z-[110]"
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          {/* 3D Card Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-[90vw] max-w-[400px] h-[70vh] max-h-[600px] cursor-pointer"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full h-full w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d group"
            >
              {/* FRONT SIDE */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#F5EFE6] rounded-xl flex flex-col items-center justify-center p-8 border-4 border-[#F5EFE6] backface-hidden overflow-hidden"
              >
                {/* Decorative Hearts */}
                <Heart className="absolute top-4 left-4 text-[#442D1C] opacity-20 w-8 h-8" />
                <Heart className="absolute top-6 right-6 text-[#442D1C] opacity-40 w-12 h-12" />
                <Heart className="absolute bottom-10 left-8 text-[#442D1C] opacity-60 w-10 h-10" />
                <Heart className="absolute bottom-4 right-4 text-[#442D1C] opacity-20 w-14 h-14" />
                
                {/* Center Content */}
                <div className="z-10 text-center space-y-2">
                  <h2 className="text-5xl md:text-7xl font-serif text-[#442D1C] mb-2 leading-none italic">
                    Valentine
                  </h2>
                  <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
                  <p className="text-[#442D1C] font-sans text-xs tracking-[0.2em] font-bold uppercase pt-2">
                    VOUCHER
                  </p>
                </div>

                <p className="absolute bottom-8 text-[#442D1C]/60 text-xs font-serif italic tracking-widest animate-pulse">
                  Click to reveal
                </p>
              </div>

              {/* BACK SIDE */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#442D1C] rounded-xl flex flex-col p-8 border-2 border-[#D4AF37] backface-hidden rotate-y-180"
              >
                {/* Gold Inset Border Detail */}
                <div className="absolute inset-2 border border-[#D4AF37]/30 rounded-lg pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full space-y-6">
                  <header className="text-center pt-4">
                    <h3 className="text-xl md:text-2xl font-serif text-[#D4AF37] uppercase tracking-wide">
                      Exclusive Chocolate <br /> Redemption
                    </h3>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4" />
                  </header>

                  <p className="text-[#F5EFE6] font-serif text-base md:text-lg leading-relaxed italic text-center px-2">
                    "A little treat to brighten your day. This voucher is my way of saying thank you for everything you are. Whenever you're ready, I've got some chocolate waiting for you.""
                  </p>

                  <div className="space-y-4 pt-4 grow">
                    <div className="flex flex-col">
                      <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest">TO:</span>
                      <div className="border-b border-[#F5EFE6]/30 h-8 flex items-end ml-1 italic text-[#F5EFE6]">The One I Love</div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest">FROM:</span>
                      <div className="border-b border-[#F5EFE6]/30 h-8 flex items-end ml-1 italic text-[#F5EFE6]">gezi</div>
                    </div>
                  </div>

                  <footer className="text-center pb-4 space-y-6">
                    <p className="text-[#F5EFE6]/40 text-[10px] tracking-widest font-mono">
                      VALID UNTIL: DECEMBER 31, 2026
                    </p>
                    
                    <motion.p
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[#D4AF37] text-sm font-serif italic font-bold"
                    >
                      Screenshot to claim your gift
                    </motion.p>
                  </footer>
                  
                  {/* Subtle Watermark */}
                  <Heart className="absolute bottom-0 right-0 text-[#F5EFE6] opacity-10 w-24 h-24 -mr-8 -mb-8 rotate-12" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Voucher;
