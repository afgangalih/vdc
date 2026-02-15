import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const LockedModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#442D1C]/95 px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 24,
              delay: 0.05 
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-[#442D1C] border border-[#D4AF37] rounded-xl p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Subtle gold gradient glow */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/8 via-transparent to-[#D4AF37]/5" />
            </div>

            {/* Lock Icon */}
            <motion.div
              initial={{ rotate: -15 }}
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-[#D4AF37]/70" />
              </div>
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl font-serif text-[#F5EFE6] mb-3 italic">
              Patience, love...
            </h3>

            {/* Message */}
            <p className="text-sm text-[#F5EFE6]/60 leading-relaxed mb-8 max-w-[260px] mx-auto">
              Some sweetness must be earned. Complete your memories first.
            </p>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-[#F5EFE6] text-[#442D1C] px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold
                shadow-[0_4px_15px_rgba(245,239,230,0.15)] hover:shadow-[0_4px_20px_rgba(245,239,230,0.25)] transition-shadow"
            >
              I Understand
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LockedModal;
