import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import GameCard from '../components/GameCard';
import LockedModal from '../components/LockedModal';

const GameMenu = () => {
  const { 
    game1Completed, 
    game2Completed,
    itemsCaught,
    showLockedModal, 
    setShowLockedModal,
    setCurrentSection 
  } = useAppContext();

  const handleGame1Click = () => {
    if (game1Completed) {
      // Already complete, but can replay
      setCurrentSection(2);
    } else {
      setCurrentSection(2);
    }
  };

  const handleGame2Click = () => {
    if (!game1Completed) {
      setShowLockedModal(true);
    } else {
      setCurrentSection(3);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#442D1C] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-10 md:mb-14 px-4"
      >
        <p className="text-[#D4AF37]/50 text-xs tracking-[0.3em] uppercase mb-3 font-serif">
          Choose Your Adventure
        </p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#F5EFE6] italic leading-snug">
          Two paths to sweetness
        </h2>
      </motion.div>

      {/* Cards Container */}
      <div className="
        flex flex-row gap-6 px-6 md:px-12 w-full max-w-5xl
        overflow-x-auto md:overflow-visible
        justify-start md:justify-center
        snap-x snap-mandatory
        scrollbar-hide
        pb-4
      ">
        {/* Card 1: Collect Our Memories (Game 1) */}
        <GameCard
          title="Collect Our Memories"
          subtitle="Catch every falling piece of love"
          icons={['📸', '💌', '🎵', '✨']}
          locked={false}
          progress={itemsCaught}
          maxProgress={11}
          onClick={handleGame1Click}
          buttonLabel={game1Completed ? '✓ Completed' : 'Play'}
        />

        {/* Card 2: Catch the Sweetness (Game 2) */}
        <GameCard
          title="Catch the Sweetness"
          subtitle="Unscramble the words of love"
          icons={['🍫', '❤️', '🍫', '❤️']}
          locked={!game1Completed}
          onClick={handleGame2Click}
          lockedMessage="Complete memories first"
          buttonLabel={game2Completed ? '✓ Completed' : 'Play'}
        />
      </div>

      {/* Scroll hint on mobile */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-6 text-[#F5EFE6]/20 text-xs tracking-widest md:hidden"
      >
        ← Swipe to explore →
      </motion.p>

      {/* Locked Modal */}
      <LockedModal 
        isOpen={showLockedModal} 
        onClose={() => setShowLockedModal(false)} 
      />
    </motion.section>
  );
};

export default GameMenu;
