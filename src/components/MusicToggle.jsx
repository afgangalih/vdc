import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MusicToggle = () => {
  const { musicPlaying, setMusicPlaying, currentSection } = useAppContext();

  const hiddenSections = [2, 3, 4];
  if (hiddenSections.includes(currentSection)) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full text-gold flex items-center justify-center shadow-lg hover:bg-gold/20 transition-colors"
        animate={{
          scale: musicPlaying ? [1, 1.08, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        {musicPlaying ? (
          <Volume2 className="w-7 h-7" />
        ) : (
          <VolumeX className="w-7 h-7 opacity-70" />
        )}

        {musicPlaying && (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent rounded-full"
          />
        )}
      </motion.button>
    </div>
  );
};

export default MusicToggle;
