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
            className="relative w-[90vw] max-w-[480px] h-[300px] md:h-[320px] cursor-pointer"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full h-full shadow-[0_25px_60px_rgba(0,0,0,0.6)] transform-style-3d"
            >
              {/* FRONT FACE */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#F5EFE6] rounded-xl flex flex-col items-center justify-center border-2 border-[#F5EFE6] backface-hidden overflow-hidden text-[#442D1C]"
              >
                <CloseButton />
                
                <Heart className="absolute top-4 left-4 opacity-10 w-6 h-6" />
                <Heart className="absolute top-4 right-4 opacity-20 w-8 h-8" />
                <Heart className="absolute bottom-4 left-4 opacity-30 w-7 h-7" />
                <Heart className="absolute bottom-4 right-4 opacity-10 w-10 h-10" />
                
                <div className="z-10 text-center space-y-2">
                  <h2 className="text-5xl md:text-6xl font-serif leading-none italic">
                    Valentine
                  </h2>
                  <div className="h-[2px] w-20 bg-[#D4AF37] mx-auto" />
                  <p className="font-sans text-xs tracking-[0.3em] font-bold uppercase pt-2">
                    VOUCHER
                  </p>
                </div>

                <p className="absolute bottom-4 opacity-60 text-xs font-serif italic tracking-widest animate-pulse">
                  Click to reveal
                </p>
              </div>

              {/* BACK FACE */}
              <div 
                className="absolute inset-0 w-full h-full bg-[#442D1C] rounded-xl border-2 border-[#D4AF37] backface-hidden rotate-y-180 overflow-y-auto scrollbar-hide text-[#F5EFE6]"
              >
                <CloseButton />

                <div className="flex flex-col justify-between py-6 px-8 min-h-full gap-4">
                  <header className="text-center shrink-0">
                    <h3 className="text-lg font-serif text-[#D4AF37] uppercase tracking-wide">
                      Exclusive Chocolate Redemption
                    </h3>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-2" />
                  </header>

                  <p className="font-serif text-xs leading-relaxed italic text-center line-clamp-3">
                    "A little treat to brighten your day. This voucher is my way of saying thank you for everything you are. Whenever you're ready, I've got some chocolate waiting for you."
                  </p>

                  <div className="flex gap-6 shrink-0">
                    <div className="flex-1 flex flex-col text-left">
                      <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest mb-1">TO:</span>
                      <div className="border-b border-[#F5EFE6]/40 h-6 flex items-end pb-1 italic text-xs">The One I Love</div>
                    </div>
                    <div className="flex-1 flex flex-col text-left">
                      <span className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest mb-1">FROM:</span>
                      <div className="border-b border-[#F5EFE6]/40 h-6 flex items-end pb-1 italic text-xs">gezi</div>
                    </div>
                  </div>

                  <footer className="text-center space-y-2 shrink-0">
                    <p className="opacity-50 text-[10px] tracking-widest font-mono">
                      VALID UNTIL: FOREVER
                    </p>
                    
                    <motion.p
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[#D4AF37] text-xs font-serif italic font-bold"
                    >
                      Screenshot to claim your gift
                    </motion.p>
                  </footer>
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