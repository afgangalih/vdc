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
    if (game1Completed) return;
    setCurrentSection(2);
  };

  const handleGame2Click = () => {
    if (game2Completed) return;
    if (!game1Completed) {
      setShowLockedModal(true);
      return;
    }
    setCurrentSection(3);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#442D1C] flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-8 md:mb-14 px-4"
      >
        <p className="text-[#D4AF37]/50 text-xs tracking-[0.3em] uppercase mb-3 font-serif">
          Choose Your Adventure
        </p>
        <h2 className="text-2xl md:text-4xl font-serif text-[#F5EFE6] italic leading-snug">
          Two paths to sweetness
        </h2>
      </motion.div>

      <div className="flex flex-row gap-4 md:gap-8 px-4 md:px-12 justify-center items-center">
        <GameCard
          title="Collect Our Memories"
          subtitle="Catch every falling piece of love"
          icons={['📸', '💌', '🎵', '✨']}
          locked={false}
          completed={game1Completed}
          progress={itemsCaught}
          maxProgress={11}
          onClick={handleGame1Click}
          buttonLabel="Play"
        />

        <GameCard
          title="Catch the Sweetness"
          subtitle="Unscramble the words of love"
          icons={['🍫', '❤️', '🍫', '❤️']}
          locked={!game1Completed && !game2Completed}
          completed={game2Completed}
          onClick={handleGame2Click}
          lockedMessage="Complete memories first"
          maxProgress={4}
          buttonLabel="Play"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-6 flex items-center gap-2 md:hidden"
      >
        <span className={`w-2 h-2 rounded-full ${!game1Completed ? 'bg-[#D4AF37]' : 'bg-[#F5EFE6]/20'}`} />
        <span className={`w-2 h-2 rounded-full ${!game1Completed ? 'bg-[#F5EFE6]/20' : 'bg-[#D4AF37]'}`} />
      </motion.div>

      <LockedModal
        isOpen={showLockedModal}
        onClose={() => setShowLockedModal(false)}
      />
    </motion.section>
  );
};

export default GameMenu;
