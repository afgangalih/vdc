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
          {/* Main Card Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-[90vw] max-w-[400px] h-[85vh] cursor-pointer"
            style={{ perspective: 1000 }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full h-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d"
            >
              {/* FRONT SIDE */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#F5EFE6] rounded-xl flex flex-col items-center justify-center p-6 border-4 border-[#F5EFE6] backface-hidden overflow-hidden scrollbar-hide text-[#442D1C]"
              >
                <CloseButton />
                
                <Heart className="absolute top-4 left-4 opacity-10 w-6 h-6" />
                <Heart className="absolute top-6 right-12 opacity-20 w-8 h-8" />
                <Heart className="absolute bottom-10 left-8 opacity-30 w-7 h-7" />
                <Heart className="absolute bottom-4 right-4 opacity-10 w-10 h-10" />
                
                <div className="z-10 text-center space-y-2">
                  <h2 className="text-4xl md:text-7xl font-serif mb-2 leading-none italic">
                    Valentine
                  </h2>
                  <div className="h-[2px] w-20 bg-[#D4AF37] mx-auto" />
                  <p className="font-sans text-[10px] tracking-[0.2em] font-bold uppercase pt-2">
                    VOUCHER
                  </p>
                </div>

                <p className="absolute bottom-8 opacity-60 text-[10px] font-serif italic tracking-widest animate-pulse">
                  Click to reveal
                </p>
              </div>

              {/* BACK SIDE */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#442D1C] rounded-xl flex flex-col border-2 border-[#D4AF37] backface-hidden rotate-y-180 overflow-y-auto scrollbar-hide pt-10 pb-12 px-6 text-[#F5EFE6]"
              >
                <CloseButton />

                <div className="relative z-10 flex flex-col min-h-full space-y-6">
                  <header className="text-center">
                    <h3 className="text-lg md:text-2xl font-serif text-[#D4AF37] uppercase tracking-wide px-2">
                      Exclusive Chocolate <br /> Redemption
                    </h3>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4" />
                  </header>

                  <p className="font-serif text-sm md:text-lg leading-relaxed italic text-center px-2">
                    "A little treat to brighten your day. This voucher is my way of saying thank you for everything you are. Whenever you're ready, I've got some chocolate waiting for you."
                  </p>

                  <div className="space-y-6 pt-4 grow">
                    <div className="flex flex-col text-left">
                      <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest">TO:</span>
                      <div className="border-b border-[#F5EFE6]/30 h-8 flex items-end ml-1 italic text-sm md:text-base">The One I Love</div>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest">FROM:</span>
                      <div className="border-b border-[#F5EFE6]/30 h-8 flex items-end ml-1 italic text-sm md:text-base">gezi</div>
                    </div>
                  </div>

                  <footer className="text-center pt-8 space-y-4">
                    <p className="opacity-40 text-[10px] tracking-widest font-mono">
                      VALID UNTIL: FOREVER
                    </p>
                    
                    <motion.p
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[#D4AF37] text-xs md:text-sm font-serif italic font-bold"
                    >
                      Screenshot to claim your gift
                    </motion.p>
                  </footer>
                  
                  <Heart className="absolute bottom-0 right-0 opacity-5 w-20 h-20 -mr-6 -mb-6 rotate-12 pointer-events-none" />
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
