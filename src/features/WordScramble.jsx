import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Word data with scrambled letters and clues
const WORDS = [
  {
    word: 'SWEET',
    scrambled: ['T', 'E', 'W', 'E', 'S'],
    clue: 'Unscramble the word that describes what we feel...',
    hint: 'Starts with S...',
  },
  {
    word: 'HEART',
    scrambled: ['T', 'R', 'A', 'E', 'H'],
    clue: 'The organ that beats only for you...',
    hint: 'Starts with H...',
  },
  {
    word: 'LOVE',
    scrambled: ['E', 'V', 'O', 'L'],
    clue: 'Four letters, infinite meaning...',
    hint: 'Starts with L...',
  },
  {
    word: 'FOREVER',
    scrambled: ['R', 'E', 'V', 'R', 'E', 'O', 'F'],
    clue: 'How long I want us to last...',
    hint: 'Starts with F...',
  },
];

// Letter Cell Component
const LetterCell = ({ letter, index, isSelected, isHeart, onClick, status }) => {
  const getStatusStyles = () => {
    if (status === 'correct') return 'bg-emerald-500/80 border-emerald-400 text-white scale-110';
    if (status === 'wrong') return 'bg-red-500/60 border-red-400 text-white';
    if (isSelected) return 'bg-[#D4AF37] text-[#442D1C] scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]';
    return 'bg-[#F5EFE6]/10 text-[#F5EFE6] hover:bg-[#F5EFE6]/20';
  };

  return (
    <motion.button
      layout
      layoutId={`letter-${index}`}
      onClick={() => onClick(index)}
      whileTap={{ scale: 0.9 }}
      className={`
        w-16 h-16 md:w-20 md:h-20
        border-2 border-[#D4AF37] rounded-lg
        flex items-center justify-center
        text-2xl md:text-3xl font-bold
        cursor-pointer select-none
        transition-colors duration-200
        ${getStatusStyles()}
      `}
    >
      {isHeart ? (
        <span className="text-3xl select-none">❤️</span>
      ) : (
        <span>{letter}</span>
      )}
    </motion.button>
  );
};

// Progress Dots Component
const ProgressDots = ({ current, total }) => (
  <div className="flex items-center gap-3">
    {Array.from({ length: total }, (_, i) => (
      <motion.div
        key={i}
        initial={false}
        animate={{
          scale: i === current ? 1.3 : 1,
          backgroundColor: i < current ? '#D4AF37' : i === current ? '#D4AF37' : 'rgba(245,239,230,0.2)',
        }}
        className="w-3 h-3 rounded-full"
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    ))}
  </div>
);

const WordScramble = () => {
  const { 
    game2Progress, 
    setGame2Progress, 
    completeGame2, 
    setCurrentSection 
  } = useAppContext();

  const [currentWordIndex, setCurrentWordIndex] = useState(game2Progress);
  const [letters, setLetters] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [cellStatus, setCellStatus] = useState(null); // null, 'correct', 'wrong'
  const [isChecking, setIsChecking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentWord = WORDS[currentWordIndex];

  // Initialize letters for current word (add heart emoji)
  const initializeLetters = useCallback((wordIndex) => {
    const word = WORDS[wordIndex];
    // Create letters array: scrambled letters + heart
    const letterArray = [...word.scrambled, '❤️'];
    setLetters(letterArray);
    setSelectedIndex(null);
    setCellStatus(null);
    setIsChecking(false);
    setShowSuccess(false);
  }, []);

  useEffect(() => {
    initializeLetters(currentWordIndex);
  }, [currentWordIndex, initializeLetters]);

  // Handle letter tap
  const handleLetterTap = (index) => {
    if (isChecking || cellStatus || showSuccess) return;

    // Skip heart emoji taps for swapping
    if (letters[index] === '❤️') return;

    if (selectedIndex === null) {
      // First tap: select
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      // Tap same: deselect
      setSelectedIndex(null);
    } else {
      // Second tap: swap
      if (letters[selectedIndex] === '❤️') {
        setSelectedIndex(index);
        return;
      }
      const newLetters = [...letters];
      [newLetters[selectedIndex], newLetters[index]] = [newLetters[index], newLetters[selectedIndex]];
      setLetters(newLetters);
      setSelectedIndex(null);
    }
  };

  // Check answer
  const handleCheck = () => {
    if (isChecking) return;
    setIsChecking(true);

    // Extract only non-heart letters
    const answer = letters.filter(l => l !== '❤️').join('');

    if (answer === currentWord.word) {
      // Correct!
      setCellStatus('correct');
      
      setTimeout(() => {
        setShowSuccess(true);
        const nextIndex = currentWordIndex + 1;
        setGame2Progress(nextIndex);
        
        if (nextIndex >= WORDS.length) {
          // All words completed!
          setTimeout(() => {
            setShowCompletion(true);
            completeGame2();
            setTimeout(() => {
              setCurrentSection(4); // Go to Chocolate Bar
            }, 2000);
          }, 800);
        } else {
          // Next word
          setTimeout(() => {
            setCurrentWordIndex(nextIndex);
          }, 1200);
        }
      }, 600);
    } else {
      // Wrong!
      setCellStatus('wrong');
      setTimeout(() => {
        setCellStatus(null);
        setIsChecking(false);
        setSelectedIndex(null);
      }, 800);
    }
  };

  const handleBack = () => {
    setCurrentSection(1); // Back to GameMenu
  };

  // Calculate grid columns based on letter count
  const getGridCols = () => {
    const count = letters.length;
    if (count <= 5) return 'grid-cols-3';
    if (count <= 6) return 'grid-cols-3';
    if (count <= 8) return 'grid-cols-4';
    return 'grid-cols-4';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#442D1C] flex flex-col items-center justify-center p-6 relative"
    >
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={handleBack}
        className="absolute top-6 left-6 text-[#F5EFE6] flex items-center gap-2 
          hover:text-[#D4AF37] transition-colors z-10 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm tracking-widest uppercase font-serif">Menu</span>
      </motion.button>

      {/* Progress Dots */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-7 left-1/2 -translate-x-1/2"
      >
        <ProgressDots current={currentWordIndex} total={WORDS.length} />
      </motion.div>

      {/* Completion Overlay */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#442D1C]/95"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl md:text-4xl font-serif text-[#D4AF37] italic mb-2">
                Unlocked!
              </h2>
              <p className="text-[#F5EFE6]/60 text-sm tracking-widest">
                A sweet surprise awaits...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clue Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-md w-full bg-[#442D1C] border border-[#D4AF37]/30 rounded-xl p-6 mb-8"
      >
        <p className="text-[#F5EFE6] text-center italic font-serif text-base md:text-lg leading-relaxed">
          "{currentWord?.clue}"
        </p>
      </motion.div>

      {/* Word Counter */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#D4AF37]/40 text-xs tracking-[0.3em] uppercase mb-6 font-serif"
      >
        Word {currentWordIndex + 1} of {WORDS.length}
      </motion.p>

      {/* Letter Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`grid ${getGridCols()} gap-3 md:gap-4 mb-8`}
      >
        <AnimatePresence mode="popLayout">
          {letters.map((letter, index) => (
            <LetterCell
              key={`${currentWordIndex}-${index}`}
              letter={letter}
              index={index}
              isSelected={selectedIndex === index}
              isHeart={letter === '❤️'}
              onClick={handleLetterTap}
              status={cellStatus}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Tap instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.8 }}
        className="text-[#F5EFE6]/30 text-xs tracking-widest mb-6 font-serif"
      >
        Tap two letters to swap
      </motion.p>

      {/* Check Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: isChecking ? 1 : 1.05 }}
        whileTap={{ scale: isChecking ? 1 : 0.95 }}
        onClick={handleCheck}
        disabled={isChecking || cellStatus === 'correct'}
        className={`
          bg-[#F5EFE6] text-[#442D1C] px-10 py-4 rounded-full
          uppercase tracking-widest font-bold text-sm
          shadow-[0_4px_20px_rgba(245,239,230,0.15)]
          transition-all duration-300
          ${(isChecking || cellStatus === 'correct') 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:shadow-[0_4px_30px_rgba(245,239,230,0.25)]'
          }
        `}
      >
        {cellStatus === 'correct' ? '✓ Correct!' : 'Check Answer'}
      </motion.button>

      {/* Success Flash */}
      <AnimatePresence>
        {showSuccess && !showCompletion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-[#D4AF37] font-serif italic text-lg">
              ✨ Beautiful! Next word... ✨
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-[#F5EFE6]/20 text-xs font-serif italic tracking-wider"
      >
        Hint: {currentWord?.hint}
      </motion.p>

      {/* Shake animation for wrong answer */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </motion.section>
  );
};

export default WordScramble;
