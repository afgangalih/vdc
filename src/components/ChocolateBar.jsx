import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const ChocolateBar = () => {
  const { chocolateBroken, setChocolateBroken, setCurrentSection } = useAppContext();
  const [shattering, setShattering] = useState(false);

  // Generate 12 segments for the chocolate bar (3x4)
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
    }, 2500); // Duration matches animation cleanup
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-8 min-h-screen">
      {!chocolateBroken && (
        <div 
          className="relative w-72 h-96 cursor-pointer transform hover:scale-105 transition-transform duration-500"
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
                ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for floating effect
                delay: Math.random() * 0.2
              }}
              className="absolute bg-[#3d2819] border border-[#2d1e13] rounded-sm shadow-inner overflow-hidden"
              style={{
                width: '32%',
                height: '24%',
                left: `${s.col * 34}%`,
                top: `${s.row * 25}%`,
              }}
            >
                {/* Visual depth for chocolate square */}
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
                className="absolute -bottom-12 w-full text-center font-serif text-gold/50 italic"
              >
                Touch to break...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Love Letter Reveal */}
      <AnimatePresence>
        {chocolateBroken && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="max-w-2xl w-full luxury-card p-12 md:p-16 text-left"
          >
            <h2 className="text-3xl font-serif premium-gradient-text mb-8 italic">My Dearest,</h2>
            <div className="space-y-6 font-serif text-cream/90 text-lg md:text-xl leading-relaxed">
              <p>
                As I was catching those small moments of sweetness, I couldn't help but think about every single second we've shared. 
                Like a perfect bar of chocolate, life with you is rich, warm, and something I want to savor forever.
              </p>
              <p>
                Every heart captured today represents a reason why my world is brighter because of you. 
                You are my favorite melody, my most precious adventure, and the "surprise" that makes every day worth celebrating.
              </p>
              <p>
                Happy Valentine's Day. I love you more than words can carry.
              </p>
              <p className="pt-8 text-gold italic font-medium">
                Forever yours, <br />
                <span className="text-2xl mt-2 block">[Your Name]</span>
              </p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="pt-12 text-center"
              >
                <button 
                  onClick={() => setCurrentSection(3)}
                  className="text-gold/60 font-serif italic border-b border-gold/20 hover:text-gold hover:border-gold transition-all duration-700"
                >
                  Continue to the end...
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChocolateBar;
