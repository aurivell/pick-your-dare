import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Venus, Mars, Lock, RefreshCw } from 'lucide-react';

// --- Configuration & Data ---
const CONFIG = {
  PASSWORD: "our-secret-password", // Change this!
  DARES: {
    male: Array.from({ length: 10 }, (_, i) => `Masculine Dare ${String.fromCharCode(65 + i)}`),
    female: Array.from({ length: 10 }, (_, i) => `Feminine Dare ${String.fromCharCode(65 + i)}`),
  }
};

const App = () => {
  const [view, setView] = useState('gatekeeper'); // gatekeeper, selection, game
  const [gender, setGender] = useState(null);
  const [currentDare, setCurrentDare] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  // --- Logic ---
  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === CONFIG.PASSWORD) setView('selection');
    else alert("Incorrect password.");
  };

  const selectGender = (g) => {
    setGender(g);
    setView('game');
  };

  const handleRandomize = () => {
    const list = CONFIG.DARES[gender];
    const randomDare = list[Math.floor(Math.random() * list.length)];
    setCurrentDare(randomDare);
  };

  // --- Animation Variants ---
  const fadeVar = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0c] text-white overflow-hidden relative">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900 blur-[120px]" />
      </div>

      <main className="z-10 w-full max-w-md p-6">
        <AnimatePresence mode="wait">
          
          {/* 1. GATEKEEPER VIEW */}
          {view === 'gatekeeper' && (
            <motion.div 
              key="gate" {...fadeVar}
              className="glass-panel p-8 text-center"
            >
              <Lock className="mx-auto mb-6 opacity-50" size={32} />
              <h1 className="text-2xl font-light tracking-widest mb-8 uppercase">Private Access</h1>
              <form onSubmit={handleAuth} className="space-y-4">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-center focus:outline-none focus:border-purple-500 transition-all"
                />
                <button type="submit" className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg transition-colors font-medium">
                  Enter
                </button>
              </form>
            </motion.div>
          )}

          {/* 2. SELECTION VIEW */}
          {view === 'selection' && (
            <motion.div key="select" {...fadeVar} className="space-y-6">
              <h2 className="text-center text-xl font-light mb-8 italic">Choose your path...</h2>
              <div className="flex gap-4">
                <GenderCard icon={<Mars size={40}/>} label="Male" onClick={() => selectGender('male')} />
                <GenderCard icon={<Venus size={40}/>} label="Female" onClick={() => selectGender('female')} />
              </div>
            </motion.div>
          )}

          {/* 3. GAME VIEW */}
          {view === 'game' && (
            <motion.div key="game" {...fadeVar} className="glass-panel p-8 text-center min-h-[300px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2 block">
                  {gender} Edition
                </span>
                <div className="h-24 flex items-center justify-center">
                  <p className="text-xl font-serif italic text-purple-100">
                    {currentDare || "Ready to begin?"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleRandomize}
                  className="w-full bg-white text-black py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-purple-200 transition-colors"
                >
                  <RefreshCw size={18} /> Get Dare
                </button>
                <button 
                  onClick={() => { setView('selection'); setCurrentDare(''); }}
                  className="text-xs opacity-40 hover:opacity-100 transition-opacity"
                >
                  Change Gender
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
};

const GenderCard = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="glass-panel flex-1 py-12 flex flex-col items-center gap-4 hover:border-purple-500/50 transition-all group"
  >
    <div className="group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-100">
      {icon}
    </div>
    <span className="text-xs uppercase tracking-widest opacity-60">{label}</span>
  </button>
);

export default App;