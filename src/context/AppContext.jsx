import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [voucherVisible, setVoucherVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [itemsCaught, setItemsCaught] = useState(0);
  const [chocolateBroken, setChocolateBroken] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [game1Completed, setGame1Completed] = useState(false);
  const [game2Completed, setGame2Completed] = useState(false);
  const [game2Progress, setGame2Progress] = useState(0);
  const [showLockedModal, setShowLockedModal] = useState(false);

  const audioRef = useRef(null);
  const errorCountRef = useRef(0);
  const isTogglingRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) return;

    const audio = new Audio(`${window.location.origin}/music.mp3`);
    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => {
      setAudioReady(true);
    });

    audio.addEventListener('error', () => {
      errorCountRef.current += 1;
      if (errorCountRef.current >= 2) return;
      audio.load();
    });

    audio.load();

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncPlayback = async () => {
      try {
        if (musicPlaying) {
          if (audio.readyState < 3) {
            await new Promise((resolve) => {
              const handler = () => {
                audio.removeEventListener('canplay', handler);
                resolve();
              };
              audio.addEventListener('canplay', handler);
              setTimeout(() => {
                audio.removeEventListener('canplay', handler);
                resolve();
              }, 3000);
            });
          }
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setMusicPlaying(false);
        }
      }
    };

    syncPlayback();
  }, [musicPlaying]);

  const toggleMusic = useCallback(async () => {
    if (isTogglingRef.current) return;
    isTogglingRef.current = true;
    setMusicPlaying(prev => !prev);
    setTimeout(() => {
      isTogglingRef.current = false;
    }, 300);
  }, []);

  const completeGame1 = () => {
    setGame1Completed(true);
    setGameCompleted(true);
  };

  const completeGame2 = () => {
    setGame2Completed(true);
  };

  const toggleLockedModal = () => {
    setShowLockedModal(prev => !prev);
  };

  const value = {
    gameCompleted,
    setGameCompleted,
    voucherVisible,
    setVoucherVisible,
    musicPlaying,
    setMusicPlaying,
    toggleMusic,
    audioReady,
    itemsCaught,
    setItemsCaught,
    chocolateBroken,
    setChocolateBroken,
    currentSection,
    setCurrentSection,
    game1Completed,
    setGame1Completed,
    game2Completed,
    setGame2Completed,
    game2Progress,
    setGame2Progress,
    showLockedModal,
    setShowLockedModal,
    completeGame1,
    completeGame2,
    toggleLockedModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
