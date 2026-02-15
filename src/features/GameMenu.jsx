import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import LockedModal from '../components/LockedModal';

const CARDS = [
  {
    id: 'catch',
    icon: '📸',
    title: 'The Memories',
    subtitle: 'Catch every falling moment',
    section: 2,
    gameKey: 'game1Completed',
  },
  {
    id: 'scramble',
    icon: '💌',
    title: 'The Sweetness',
    subtitle: 'Unscramble the words of love',
    section: 3,
    gameKey: 'game2Completed',
    requiresKey: 'game1Completed',
  },
];

const GameMenu = () => {
  const {
    game1Completed,
    game2Completed,
    showLockedModal,
    setShowLockedModal,
    setCurrentSection,
  } = useAppContext();

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const completionMap = { game1Completed, game2Completed };

  const handleCardClick = (card) => {
    const isCompleted = completionMap[card.gameKey];
    if (isCompleted) return;

    if (card.requiresKey && !completionMap[card.requiresKey]) {
      setShowLockedModal(true);
      return;
    }

    setCurrentSection(card.section);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const getCardState = (card) => {
    if (completionMap[card.gameKey]) return 'completed';
    if (card.requiresKey && !completionMap[card.requiresKey]) return 'locked';
    return 'active';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#442D1C] flex flex-col items-center justify-center overflow-hidden p-6"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-10 md:mb-14"
      >
        <p className="text-[#D4AF37]/50 text-xs tracking-[0.3em] uppercase mb-3 font-serif">
          Choose Your Path
        </p>
        <h2 className="text-2xl md:text-3xl font-serif text-[#F5EFE6] italic leading-snug">
          Two paths to sweetness
        </h2>
      </motion.div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide w-full max-w-[400px] md:max-w-none md:justify-center md:gap-8 md:overflow-visible"
      >
        {CARDS.map((card, i) => {
          const state = getCardState(card);
          const isCompleted = state === 'completed';
          const isLocked = state === 'locked';
          const isActive = state === 'active';

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleCardClick(card)}
              className={`
                flex-shrink-0 w-full md:w-[360px] snap-center
                flex flex-col items-center justify-center
                bg-[#442D1C] rounded-2xl
                px-8 py-12 md:px-10 md:py-14
                transition-all duration-500
                ${isActive ? 'border border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.1)] cursor-pointer' : ''}
                ${isLocked ? 'border border-[#F5EFE6]/15 opacity-50 cursor-pointer' : ''}
                ${isCompleted ? 'border border-[#D4AF37]/30 opacity-60 cursor-default' : ''}
              `}
            >
              <span className={`text-6xl mb-8 block ${isLocked ? 'grayscale opacity-50' : ''}`}>
                {card.icon}
              </span>

              <h3 className={`text-2xl font-serif mb-2 ${
                isLocked ? 'text-[#F5EFE6]/40' : 'text-[#F5EFE6]'
              }`}>
                {card.title}
              </h3>

              <div className={`w-12 h-[1px] mx-auto mb-4 ${
                isLocked ? 'bg-[#F5EFE6]/15' : 'bg-[#D4AF37]'
              }`} />

              <p className={`text-sm italic mb-8 text-center ${
                isLocked ? 'text-[#F5EFE6]/25' : 'text-[#F5EFE6]/60'
              }`}>
                {card.subtitle}
              </p>

              {isActive && (
                <motion.span
                  className="text-[#D4AF37] text-sm tracking-widest flex items-center gap-1 group"
                  whileHover={{ x: 4 }}
                >
                  Enter
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.span>
              )}

              {isLocked && (
                <span className="text-[#F5EFE6]/30 text-sm tracking-widest flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Locked
                </span>
              )}

              {isCompleted && (
                <span className="text-[#D4AF37]/60 text-sm tracking-widest uppercase">
                  ✓ Completed
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 flex items-center gap-3"
      >
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeIndex === i ? 'bg-[#D4AF37] scale-125' : 'bg-[#F5EFE6]/20'
            }`}
          />
        ))}
      </motion.div>

      <LockedModal
        isOpen={showLockedModal}
        onClose={() => setShowLockedModal(false)}
      />
    </motion.section>
  );
};

export default GameMenu;
