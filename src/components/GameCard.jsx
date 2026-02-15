import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const GameCard = ({ 
  title, 
  subtitle, 
  icons, 
  locked = false, 
  progress, 
  maxProgress, 
  onClick, 
  lockedMessage = 'Complete memories first',
  buttonLabel = 'Play'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={!locked ? { y: -8, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
      className={`
        relative w-[280px] md:w-[320px] h-[400px] md:h-[450px] flex-shrink-0
        bg-[#442D1C] rounded-2xl p-6
        flex flex-col items-center justify-between
        cursor-pointer select-none
        transition-all duration-500
        shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        snap-center
        ${locked 
          ? 'border-2 border-[#F5EFE6]/20' 
          : 'border-2 border-[#D4AF37] shadow-[0_10px_40px_rgba(212,175,55,0.15)]'
        }
      `}
    >
      {/* Subtle gold shimmer for unlocked */}
      {!locked && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />
        </div>
      )}

      {/* Top Section: Icons */}
      <div className="flex items-center justify-center pt-4">
        <div className={`text-4xl space-x-2 flex items-center ${locked ? 'opacity-40 grayscale' : ''}`}>
          {icons.map((icon, i) => (
            <span key={i} className="select-none">{icon}</span>
          ))}
        </div>
      </div>

      {/* Middle Section: Title & Content */}
      <div className="flex flex-col items-center gap-4 flex-1 justify-center">
        <h3 className={`text-xl font-serif text-center leading-snug ${
          locked ? 'text-[#F5EFE6]/40' : 'text-[#F5EFE6]'
        }`}>
          {title}
        </h3>

        {subtitle && (
          <p className={`text-sm text-center ${
            locked ? 'text-[#F5EFE6]/25' : 'text-[#F5EFE6]/60'
          }`}>
            {subtitle}
          </p>
        )}

        {/* Locked State */}
        {locked && (
          <div className="flex flex-col items-center gap-3 mt-2">
            <Lock className="w-12 h-12 text-[#D4AF37]/40" />
            <span className="text-sm text-[#F5EFE6]/35 uppercase tracking-widest font-medium">
              Locked
            </span>
            <span className="text-xs text-[#F5EFE6]/25 text-center max-w-[200px]">
              {lockedMessage}
            </span>
          </div>
        )}

        {/* Progress Bar (only for unlocked with progress) */}
        {!locked && progress !== undefined && maxProgress !== undefined && (
          <div className="w-full space-y-2">
            <div className="w-full h-2 bg-[#F5EFE6]/15 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#D4AF37] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / maxProgress) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-sm text-[#F5EFE6]/50 text-center tracking-wide">
              {progress}/{maxProgress} collected
            </p>
          </div>
        )}
      </div>

      {/* Bottom Section: Button or Lock Info */}
      <div className="pb-2 w-full flex justify-center">
        {!locked ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F5EFE6] text-[#442D1C] px-8 py-3 rounded-full uppercase tracking-widest text-sm font-bold
              shadow-[0_4px_15px_rgba(245,239,230,0.2)]"
          >
            {buttonLabel}
          </motion.div>
        ) : (
          <div className="h-[44px]" /> /* Spacer to match button height */
        )}
      </div>
    </motion.div>
  );
};

export default GameCard;
