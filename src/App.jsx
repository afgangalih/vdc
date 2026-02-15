import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useAppContext } from './context/AppContext';
import MusicToggle from './components/MusicToggle';
import Hero from './components/Hero';
import Game from './features/Game';
import ChocolateBar from './components/ChocolateBar';
import Footer from './components/Footer';
import Voucher from './features/Voucher';

const MainContent = () => {
  const { currentSection } = useAppContext();

  return (
    <main className="min-h-screen relative overflow-hidden bg-chocolate">
      {/* Grain Noise Overlay */}
      <div className="noise-overlay" />
      
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.div key="hero" className="w-full h-full">
            <Hero />
          </motion.div>
        )}
        
        {currentSection === 1 && (
          <motion.div key="game" className="w-full h-full">
            <Game />
          </motion.div>
        )}
        
        {currentSection === 2 && (
          <motion.div key="reveal" className="w-full h-full">
            <ChocolateBar />
          </motion.div>
        )}

        {currentSection === 3 && (
          <motion.div key="footer" className="w-full h-full">
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Voucher />
      <MusicToggle />

    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
