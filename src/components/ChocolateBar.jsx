import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const ChocolateBar = () => {
  const { chocolateBroken, setChocolateBroken, setCurrentSection } = useAppContext();
  const [shattering, setShattering] = useState(false);

  const segments = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    row: Math.floor(i / 3),
    col: i % 3,
  }));

  const handleShatter = () => {
    if (shattering) return;
    setShattering(true);
    setTimeout(() => {
      setChocolateBroken(true);
    }, 2500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-chocolate overflow-hidden">
      {!chocolateBroken && (
        <div 
          className="relative w-64 h-80 md:w-72 md:h-96 cursor-pointer transform hover:scale-105 transition-transform duration-500"
          onClick={handleShatter}
        >
          {segments.map((s) => (
            <motion.div
              key={s.id}
              initial={false}
              animate={shattering ? {
                y: -1000 - Math.random() * 500,
                x: (s.col - 1) * 800 + (Math.random() - 0.5) * 500,
                rotate: Math.random() * 720 - 360,
                opacity: 0,
              } : {
                y: 0,
                x: 0,
                rotate: 0,
                opacity: 1
              }}
              transition={{ 
                duration: 2.5, 
                ease: [0.23, 1, 0.32, 1],
                delay: Math.random() * 0.2
              }}
              className="absolute bg-[#3d2819] border border-[#2d1e13] rounded-sm shadow-inner"
              style={{
                width: '32%',
                height: '24%',
                left: `${s.col * 34}%`,
                top: `${s.row * 25}%`,
              }}
            >
                <div className="absolute inset-1 border border-white/5 bg-[#4a3221]" />
                <div className="absolute top-1 left-1 w-full h-1 bg-white/5" />
            </motion.div>
          ))}
          
          <AnimatePresence>
            {!shattering && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-12 w-full text-center font-serif text-gold/50 italic text-sm"
              >
                Touch to break...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {chocolateBroken && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center p-6 md:p-8"
          >
            <div className="relative w-[92%] max-w-lg max-h-[80vh] overflow-y-auto scrollbar-hide border-2 border-[#D4AF37] rounded-xl bg-[#442D1C] shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] p-5 md:p-8">
              {/* Salutation */}
              <h2 className="text-xl font-serif italic text-[#D4AF37] mb-3">My Dearest,</h2>
              
              {/* Body Paragraphs */}
              <p className="text-sm leading-relaxed text-[#F5EFE6] mb-3">
                As I was catching those small moments of sweetness, I couldn't help but think about every single second we've shared. 
                Like a perfect bar of chocolate, life with you is rich, warm, and something I want to savor forever.
              </p>
              <p className="text-sm leading-relaxed text-[#F5EFE6] mb-3">
                Every heart captured today represents a reason why my world is brighter because of you. 
                You are my favorite melody, my most precious adventure, and the "surprise" that makes every day worth celebrating.
              </p>
              
              {/* Horizontal Line */}
              <div className="w-full h-px bg-[#D4AF37]/30 my-4" />
              
              {/* Closing */}
              <p className="text-base text-[#F5EFE6] mb-3">
                Happy Valentine's Day. I love you more than words can carry.
              </p>
              
              {/* Signature Block */}
              <div className="pt-3 pb-12">
                <p className="text-sm italic text-[#D4AF37]">Forever yours,</p>
                <p className="text-lg italic text-[#D4AF37]">gezi</p>
              </div>

              {/* Continue button - absolute positioned bottom-right */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={() => setCurrentSection(3)}
                className="absolute bottom-4 right-4 text-xs text-[#D4AF37]/60 italic hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                Continue to the end...
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChocolateBar;
