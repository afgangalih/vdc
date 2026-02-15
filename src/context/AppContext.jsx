import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [voucherVisible, setVoucherVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [itemsCaught, setItemsCaught] = useState(0);
  const [chocolateBroken, setChocolateBroken] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 0: Hero, 1: Game, 2: Chocolate, 3: Footer

  // Audio Logic
  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    
    if (musicPlaying) {
      audio.play().catch(err => {
        console.log("Autoplay prevented or audio file missing:", err);
        setMusicPlaying(false);
      });
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [musicPlaying, setMusicPlaying]);

  const value = {
    gameCompleted,
    setGameCompleted,
    voucherVisible,
    setVoucherVisible,
    musicPlaying,
    setMusicPlaying,
    itemsCaught,
    setItemsCaught,
    chocolateBroken,
    setChocolateBroken,
    currentSection,
    setCurrentSection,
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
