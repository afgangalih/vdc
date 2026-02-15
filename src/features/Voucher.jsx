import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Voucher = () => {
  const { voucherVisible, setVoucherVisible } = useAppContext();

  if (!voucherVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-chocolate/95"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-md w-full p-8 md:p-12 border border-gold bg-cream/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-lg overflow-hidden"
          style={{
            background: 'rgba(245, 239, 230, 0.08)',
          }}
        >
          {/* Subtle gold specular highlight effect */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          
          <button
            onClick={() => setVoucherVisible(false)}
            className="absolute top-4 right-4 text-gold/60 hover:text-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif text-gold tracking-wide uppercase italic">
              Exclusive Chocolate Redemption
            </h2>
            
            <div className="h-[1px] w-12 bg-gold/30 mx-auto" />

            <p className="text-cream/90 font-serif text-lg leading-relaxed italic">
              "This voucher is redeemable for one box of premium chocolates for the most special person."
            </p>

            <div className="pt-8">
              <motion.p
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-gold/80 text-sm font-serif tracking-widest uppercase"
              >
                Keep this moment. <br />
                Please screenshot this card <br />
                to claim your gift.
              </motion.p>
            </div>
            
            <div className="mt-8 border-[0.5px] border-gold/20 p-4 inline-block">
              <span className="text-gold/40 text-xs font-mono">SERIAL: VAL-2026-LOVE</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Voucher;
