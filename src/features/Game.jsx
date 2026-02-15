import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FallingItem = ({ id, onCatch, type }) => {
  const xPos = 10 + Math.random() * 80; // Keeping items more centered (10-90%)
  const duration = 5 + Math.random() * 5; // Much slower: 5-10 seconds
  const drift = (Math.random() - 0.5) * 30; // Reduced horizontal drift

  return (
    <motion.div
      initial={{ y: -100, x: `${xPos}vw`, opacity: 0 }}
      animate={{ 
        y: '110vh', 
        x: `${xPos + (drift / 10)}vw`,
        opacity: 1 
      }}
      transition={{ duration, ease: "linear" }}
      onAnimationComplete={() => onCatch(id, false)} // Missed
      onClick={() => onCatch(id, true)} // Caught
      className="absolute cursor-pointer select-none p-4 -m-4 group" // p-4 and -m-4 increases the clickable hit area without changing visual size
      style={{ top: 0 }}
    >
      <div className="transform group-hover:scale-110 transition-transform">
        {type === 'heart' ? (
          <Heart className="text-red-400 fill-red-400 w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" />
        ) : (
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#442D1C] border border-[#5d3e2a] rounded-sm shadow-xl flex items-center justify-center overflow-hidden">
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
  const target = 11; // Reduced from 14 to 11

  const spawnItem = useCallback(() => {
    const id = Date.now() + Math.random();
    const type = Math.random() > 0.4 ? 'heart' : 'chocolate'; // Slightly more hearts
    setItems(prev => [...prev, { id, type }]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnItem, 1200); // Slower spawn rate: 1.2s instead of 0.8s
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
      className="relative h-screen w-full overflow-hidden bg-chocolate/20"
    >
      {/* Target Display */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="font-serif text-gold/60 text-sm tracking-widest mb-1 uppercase">Catch the Sweetness</p>
        <div className="text-5xl font-serif premium-gradient-text">
          {itemsCaught} <span className="text-cream/30 text-2xl">/ {target}</span>
        </div>
      </div>

      <AnimatePresence>
        {items.map(item => (
          <FallingItem 
            key={item.id} 
            id={item.id} 
            type={item.type}
            onCatch={handleCatch} 
          />
        ))}
      </AnimatePresence>

      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-gold/10 m-4 rounded-3xl" />
    </motion.section>
  );
};

export default Game;
