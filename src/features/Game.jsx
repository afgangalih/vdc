import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FallingItem = ({ id, onCatch, type }) => {
  const xPos = 10 + Math.random() * 80;
  const duration = 5 + Math.random() * 5;
  const drift = (Math.random() - 0.5) * 30;

  return (
    <motion.div
      initial={{ y: -100, x: `${xPos}vw`, opacity: 0 }}
      animate={{ 
        y: '110vh', 
        x: `${xPos + (drift / 10)}vw`,
        opacity: 1 
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration, ease: "linear" }}
      onAnimationComplete={() => onCatch(id, false)}
      className="absolute cursor-pointer select-none p-4 -m-4 group z-20"
      style={{ top: 0 }}
    >
      <div className="transform group-hover:scale-110 active:scale-90 transition-transform p-2">
        {type === 'heart' ? (
          <svg 
            onClick={(e) => {
              e.stopPropagation();
              onCatch(id, true);
            }}
            width="44" 
            height="44" 
            viewBox="0 0 24 24" 
            fill="#F5EFE6" 
            className="drop-shadow-lg"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        ) : (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onCatch(id, true);
            }}
            className="w-10 h-10 md:w-12 md:h-12 bg-[#442D1C] border border-[#5d3e2a] rounded-sm shadow-xl flex items-center justify-center overflow-hidden"
          >
               <div className="w-full h-full border-r border-b border-[#2d1e13] opacity-50" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Game = () => {
  const { itemsCaught, setItemsCaught, setCurrentSection, setGameCompleted } = useAppContext();
  const [items, setItems] = useState([]);
  const target = 11;

  const spawnItem = useCallback(() => {
    const id = Date.now() + Math.random();
    const type = Math.random() > 0.4 ? 'heart' : 'chocolate';
    setItems(prev => [...prev, { id, type }]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnItem, 1200);
    return () => clearInterval(interval);
  }, [spawnItem]);

  const handleCatch = (id, caught) => {
    if (caught) {
      setItemsCaught(prev => {
        const next = prev + 1;
        if (next >= target) {
          setTimeout(() => {
            setGameCompleted(true);
            setCurrentSection(2);
          }, 500);
        }
        return next;
       });
    }
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-screen w-full overflow-hidden bg-[#442D1C]"
    >
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <p className="font-serif text-[#D4AF37]/60 text-xs tracking-widest mb-1 uppercase">Catch the Sweetness</p>
        <div className="text-5xl font-serif premium-gradient-text">
          {itemsCaught} <span className="text-[#F5EFE6]/30 text-2xl">/ {target}</span>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {items.map(item => (
          <FallingItem 
            key={item.id} 
            id={item.id} 
            type={item.type}
            onCatch={handleCatch} 
          />
        ))}
      </AnimatePresence>

      <div className="absolute inset-4 pointer-events-none border-[1px] border-[#D4AF37]/10 m-4 rounded-3xl z-10" />
    </motion.section>
  );
};

export default Game;
