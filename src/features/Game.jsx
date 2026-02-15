import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FallingItem = ({ id, onCatch, type }) => {
  const xPos = useRef(10 + Math.random() * 80).current;
  const duration = useRef(5 + Math.random() * 5).current;
  const drift = useRef((Math.random() - 0.5) * 30).current;

  return (
    <motion.div
      initial={{ y: -100, x: `${xPos}vw`, opacity: 0 }}
      animate={{
        y: '110vh',
        x: `${xPos + (drift / 10)}vw`,
        opacity: 1
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration, ease: 'linear' }}
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
  const { itemsCaught, setItemsCaught, setCurrentSection, game1Completed, completeGame1 } = useAppContext();
  const [items, setItems] = useState([]);
  const caughtIdsRef = useRef(new Set());
  const target = 11;

  const spawnItem = useCallback(() => {
    const id = Date.now() + Math.random();
    const type = Math.random() > 0.4 ? 'heart' : 'chocolate';
    setItems(prev => [...prev, { id, type }]);
  }, []);

  useEffect(() => {
    if (game1Completed) return;
    const interval = setInterval(spawnItem, 1200);
    return () => clearInterval(interval);
  }, [spawnItem, game1Completed]);

  useEffect(() => {
    if (itemsCaught >= target && !game1Completed) {
      completeGame1();
      const timer = setTimeout(() => {
        setCurrentSection(1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [itemsCaught, target, game1Completed, completeGame1, setCurrentSection]);

  const handleCatch = (id, caught) => {
    if (caughtIdsRef.current.has(id)) return;
    caughtIdsRef.current.add(id);

    if (caught) {
      setItemsCaught(prev => prev + 1);
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
      {game1Completed ? (
        <div className="flex flex-col items-center justify-center h-full p-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h2 className="text-2xl font-serif text-[#F5EFE6] italic">Memories Collected!</h2>
            <p className="text-sm text-[#F5EFE6]/50">Returning to menu...</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSection(1)}
              className="mt-4 bg-[#F5EFE6] text-[#442D1C] px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Menu
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </motion.section>
  );
};

export default Game;
