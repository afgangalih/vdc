import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';

const GameCard = ({
  title,
  subtitle,
  icons,
  locked = false,
  completed = false,
  progress,
  maxProgress,
  onClick,
  lockedMessage = 'Complete memories first',
  buttonLabel = 'Play'
}) => {
  const isInteractive = !locked && !completed;

  const getBorderClass = () => {
    if (completed) return 'border-2 border-dashed border-[#D4AF37]/40';
    if (locked) return 'border-2 border-[#F5EFE6]/20';
    return 'border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.1)]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`
        relative flex-shrink-0
        w-[160px] h-[260px] md:w-[280px] md:h-[400px]
        bg-[#442D1C] rounded-2xl p-4 md:p-6
        flex flex-col items-center justify-between
        select-none snap-center
        shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        transition-shadow duration-500
        ${getBorderClass()}
        ${isInteractive ? 'cursor-pointer hover:shadow-[0_15px_50px_rgba(212,175,55,0.2)]' : 'cursor-default'}
        ${(locked || completed) ? 'opacity-75' : ''}
      `}
    >
      {!locked && !completed && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />
        </div>
      )}

      {completed && (
        <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-[#D4AF37] rounded-full p-1 z-10">
          <Check className="w-3 h-3 md:w-4 md:h-4 text-[#442D1C]" strokeWidth={3} />
        </div>
      )}

      <div className="flex items-center justify-center pt-2 md:pt-4">
        <div className={`text-2xl md:text-4xl space-x-1 md:space-x-2 flex items-center ${locked ? 'opacity-40 grayscale' : ''}`}>
          {icons.map((icon, i) => (
            <span key={i} className="select-none">{icon}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 md:gap-4 flex-1 justify-center w-full">
        <h3 className={`text-sm md:text-xl font-serif text-center leading-snug ${
          locked ? 'text-[#F5EFE6]/40' : 'text-[#F5EFE6]'
        }`}>
          {title}
        </h3>

        {subtitle && (
          <p className={`text-[10px] md:text-sm text-center leading-snug ${
            locked ? 'text-[#F5EFE6]/25' : 'text-[#F5EFE6]/60'
          }`}>
            {subtitle}
          </p>
        )}

        {locked && (
          <div className="flex flex-col items-center gap-2 md:gap-3 mt-1 md:mt-2">
            <Lock className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37]/40" />
            <span className="text-[10px] md:text-sm text-[#F5EFE6]/35 uppercase tracking-widest font-medium">
              Locked
            </span>
            <span className="text-[9px] md:text-xs text-[#F5EFE6]/25 text-center max-w-[130px] md:max-w-[200px]">
              {lockedMessage}
            </span>
          </div>
        )}

        {completed && (
          <div className="flex items-center justify-center mt-1 md:mt-2">
            <span className="text-[#D4AF37] font-bold text-[10px] md:text-sm uppercase tracking-widest border border-[#D4AF37]/50 px-3 py-1 md:px-4 md:py-1.5 rounded-md -rotate-6">
              Completed
            </span>
          </div>
        )}

        {!locked && !completed && progress !== undefined && maxProgress !== undefined && (
          <div className="w-full space-y-1 md:space-y-2 px-1">
            <div className="w-full h-1.5 md:h-2 bg-[#F5EFE6]/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#D4AF37] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(progress / maxProgress) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-[10px] md:text-sm text-[#F5EFE6]/50 text-center tracking-wide">
              {progress}/{maxProgress} collected
            </p>
          </div>
        )}
      </div>

      <div className="pb-1 md:pb-2 w-full flex justify-center">
        {!locked && !completed && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F5EFE6] text-[#442D1C] px-5 py-2 md:px-8 md:py-3 rounded-full uppercase tracking-widest text-[10px] md:text-sm font-bold
              shadow-[0_4px_15px_rgba(245,239,230,0.2)]"
          >
            {buttonLabel}
          </motion.div>
        )}
        {completed && (
          <div className="text-[#D4AF37]/50 text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-1">
            <Check className="w-3 h-3 md:w-4 md:h-4" />
            <span>{maxProgress}/{maxProgress} ✓</span>
          </div>
        )}
        {locked && <div className="h-[32px] md:h-[44px]" />}
      </div>
    </motion.div>
  );
};

export default GameCard;
