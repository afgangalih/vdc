import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [voucherVisible, setVoucherVisible] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [itemsCaught, setItemsCaught] = useState(0);
  const [chocolateBroken, setChocolateBroken] = useState(false);
  const [currentSection, setCurrentSection] = useState(0); // 0: Hero, 1: GameMenu, 2: Game1, 3: Game2, 4: Chocolate, 5: Footer

  // NEW: Game progression state
  const [game1Completed, setGame1Completed] = useState(false);
  const [game2Completed, setGame2Completed] = useState(false);
  const [game2Progress, setGame2Progress] = useState(0); // 0-4
  const [showLockedModal, setShowLockedModal] = useState(false);

  // Audio Logic (UNTOUCHED)
  const audioRef = React.useRef(null);

  useEffect(() => {
    // Initialize audio instance once
    if (!audioRef.current) {
      console.log('🔧 [AUDIO DEBUG] Initializing Audio object...');
      
      // Create audio element
      audioRef.current = new Audio();
      
      // CRITICAL FIX: Use full URL construction for Vite dev environment
      const audioUrl = `${window.location.origin}/music.mp3`;
      console.log('🔧 [AUDIO DEBUG] Constructed URL:', audioUrl);
      
      audioRef.current.src = audioUrl;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
      audioRef.current.preload = 'auto';
      
      // Debug logs on initialization
      console.log('🔧 [AUDIO DEBUG] Audio object created:', audioRef.current);
      console.log('🔧 [AUDIO DEBUG] Audio src:', audioRef.current.src);
      console.log('🔧 [AUDIO DEBUG] networkState:', audioRef.current.networkState);
      console.log('🔧 [AUDIO DEBUG] readyState:', audioRef.current.readyState);
      
      // Add event listeners for debugging
      audioRef.current.addEventListener('loadstart', () => {
        console.log('📡 [AUDIO DEBUG] loadstart - Loading started');
      });
      
      audioRef.current.addEventListener('loadeddata', () => {
        console.log('✅ [AUDIO DEBUG] loadeddata - Media data loaded');
        console.log('✅ [AUDIO DEBUG] readyState:', audioRef.current.readyState);
      });
      
      audioRef.current.addEventListener('canplay', () => {
        console.log('✅ [AUDIO DEBUG] canplay - Ready to play');
      });
      
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('✅ [AUDIO DEBUG] canplaythrough - Can play without interruption');
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('❌ [AUDIO DEBUG] Error event fired:', e);
        console.error('❌ [AUDIO DEBUG] audio.error:', audioRef.current.error);
        console.error('❌ [AUDIO DEBUG] error.code:', audioRef.current.error?.code);
        console.error('❌ [AUDIO DEBUG] error.message:', audioRef.current.error?.message);
        
        // Try fallback paths
        if (audioRef.current.error) {
          console.warn('🔄 [AUDIO DEBUG] Attempting fallback path...');
          audioRef.current.src = '/music.mp3';
          audioRef.current.load();
        }
      });
      
      // CRITICAL: Force load after setting src
      console.log('🔄 [AUDIO DEBUG] Calling load()...');
      audioRef.current.load();
    }

    const audio = audioRef.current;
    
    console.log('🎵 [AUDIO DEBUG] useEffect triggered. musicPlaying:', musicPlaying);
    console.log('🎵 [AUDIO DEBUG] Current audio.src:', audio.src);
    console.log('🎵 [AUDIO DEBUG] Current audio.paused:', audio.paused);
    console.log('🎵 [AUDIO DEBUG] Current readyState:', audio.readyState);
    console.log('🎵 [AUDIO DEBUG] Current networkState:', audio.networkState);

    const handlePlay = async () => {
      try {
        // SRC VALIDATION before play
        if (!audio.src || audio.src === window.location.href) {
          console.error('❌ [AUDIO DEBUG] Audio src is empty or invalid!');
          console.log('🔄 [AUDIO DEBUG] Setting src and reloading...');
          audio.src = `${window.location.origin}/music.mp3`;
          audio.load();
          
          // Wait a moment for load to complete
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        if (musicPlaying) {
          console.log('▶️ [AUDIO DEBUG] Attempting to play...');
          console.log('▶️ [AUDIO DEBUG] readyState before play:', audio.readyState);
          
          // If not ready, wait for canplay event
          if (audio.readyState < 3) {
            console.log('⏳ [AUDIO DEBUG] Waiting for media to be ready...');
            await new Promise(resolve => {
              const canPlayHandler = () => {
                console.log('✅ [AUDIO DEBUG] Media ready, attempting play...');
                audio.removeEventListener('canplay', canPlayHandler);
                resolve();
              };
              audio.addEventListener('canplay', canPlayHandler);
              
              // Timeout after 5 seconds
              setTimeout(() => {
                audio.removeEventListener('canplay', canPlayHandler);
                resolve();
              }, 5000);
            });
          }
          
          const playPromise = audio.play();
          console.log('▶️ [AUDIO DEBUG] play() returned:', playPromise);
          
          if (playPromise !== undefined) {
            await playPromise;
            console.log('✅ [AUDIO DEBUG] Playback started successfully!');
            console.log('✅ [AUDIO DEBUG] audio.paused:', audio.paused);
            console.log('✅ [AUDIO DEBUG] audio.currentTime:', audio.currentTime);
          }
        } else {
          console.log('⏸️ [AUDIO DEBUG] Pausing audio...');
          audio.pause();
          console.log('⏸️ [AUDIO DEBUG] Audio paused. audio.paused:', audio.paused);
        }
      } catch (err) {
        console.error('❌ [AUDIO DEBUG] Audio playback failed:', err);
        console.error('❌ [AUDIO DEBUG] Error name:', err.name);
        console.error('❌ [AUDIO DEBUG] Error message:', err.message);
        
        // If NotAllowedError (autoplay policy), inform user
        if (err.name === 'NotAllowedError') {
          console.warn('⚠️ [AUDIO DEBUG] Autoplay blocked by browser. User interaction required.');
        }
      }
    };

    handlePlay();
  }, [musicPlaying]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Helper methods for game progression
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
    itemsCaught,
    setItemsCaught,
    chocolateBroken,
    setChocolateBroken,
    currentSection,
    setCurrentSection,
    // NEW game state
    game1Completed,
    setGame1Completed,
    game2Completed,
    setGame2Completed,
    game2Progress,
    setGame2Progress,
    showLockedModal,
    setShowLockedModal,
    // Helper methods
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
