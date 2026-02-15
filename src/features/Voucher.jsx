import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Voucher = () => {
  const { voucherVisible, setVoucherVisible } = useAppContext();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!voucherVisible) return null;

  const CloseButton = () => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setVoucherVisible(false);
        setIsFlipped(false);
      }}
      className="absolute top-4 right-4 text-inherit opacity-60 hover:opacity-100 transition-opacity z-[120]"
    >
      <X className="w-6 h-6" />
    </button>
  );

  return (
    <AnimatePresence>
      {voucherVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#442D1C]"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-[95vw] max-w-[600px] aspect-[16/11] cursor-pointer"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full h-full shadow-[0_25px_60px_rgba(0,0,0,0.6)] transform-style-3d"
            >
              <div 
                className="absolute inset-0 w-full h-full bg-[#F5EFE6] rounded-2xl flex flex-col items-center justify-center p-10 border-2 border-[#F5EFE6] backface-hidden overflow-hidden scrollbar-hide text-[#442D1C]"
              >
                <CloseButton />
                
                <Heart className="absolute top-6 left-6 opacity-10 w-8 h-8" />
                <Heart className="absolute top-6 right-16 opacity-20 w-10 h-10" />
                <Heart className="absolute bottom-6 left-6 opacity-30 w-9 h-9" />
                <Heart className="absolute bottom-6 right-6 opacity-10 w-12 h-12" />
                <Heart className="absolute top-1/2 left-4 opacity-5 w-16 h-16 -translate-y-1/2" />
                <Heart className="absolute top-1/2 right-4 opacity-5 w-16 h-16 -translate-y-1/2" />
                
                <div className="z-10 text-center space-y-3">
                  <h2 className="text-6xl md:text-7xl font-serif leading-none italic">
                    Valentine
                  </h2>
                  <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
                  <p className="font-sans text-xs tracking-[0.3em] font-bold uppercase pt-2">
                    VOUCHER
                  </p>
                </div>

                <p className="absolute bottom-6 opacity-60 text-xs font-serif italic tracking-widest animate-pulse">
                  Click to reveal
                </p>
              </div>

              <div 
                className="absolute inset-0 w-full h-full bg-[#442D1C] rounded-2xl flex flex-col border-2 border-[#D4AF37] backface-hidden rotate-y-180 overflow-hidden scrollbar-hide py-10 px-10 text-[#F5EFE6]"
              >
                <CloseButton />

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <header className="text-center shrink-0">
                    <h3 className="text-2xl md:text-3xl font-serif text-[#D4AF37] uppercase tracking-wider">
                      Exclusive Chocolate Redemption
                    </h3>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4" />
                  </header>

                  <p className="font-serif text-base md:text-lg leading-relaxed italic text-center px-6">
                    "A little treat to brighten your day. This voucher is my way of saying thank you for everything you are. Whenever you're ready, I've got some chocolate waiting for you."
                  </p>

                  <div className="flex gap-10 px-6">
                    <div className="flex-1 flex flex-col text-left">
                      <span className="text-[#D4AF37] text-xs uppercase font-bold tracking-widest mb-1">TO:</span>
                      <div className="border-b border-[#F5EFE6]/40 h-8 flex items-end pb-1 italic text-sm md:text-base">The One I Love</div>
                    </div>
                    <div className="flex-1 flex flex-col text-left">
                      <span className="text-[#D4AF37] text-xs uppercase font-bold tracking-widest mb-1">FROM:</span>
                      <div className="border-b border-[#F5EFE6]/40 h-8 flex items-end pb-1 italic text-sm md:text-base">gezi</div>
                    </div>
                  </div>

                  <footer className="text-center space-y-4 shrink-0 pb-2">
                    <p className="opacity-50 text-xs tracking-widest font-mono">
                      VALID UNTIL: FOREVER
                    </p>
                    
                    <motion.p
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[#D4AF37] text-base md:text-lg font-serif italic font-bold"
                    >
                      Screenshot to claim your gift
                    </motion.p>
                  </footer>
                  
                  <Heart className="absolute bottom-0 right-0 opacity-5 w-24 h-24 -mr-8 -mb-8 rotate-12 pointer-events-none" />
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