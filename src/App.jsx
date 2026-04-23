import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Venus, Mars, Lock, RefreshCw, ChevronLeft } from 'lucide-react';

const CONFIG = {
  PASSWORD: "adishi",
  DARES: {
    male: Array.from({ length: 10 }, (_, i) => `Masculine Dare ${String.fromCharCode(65 + i)}`),
    female: Array.from({ length: 10 }, (_, i) => `Feminine Dare ${String.fromCharCode(65 + i)}`),
  }
};

const App = () => {
  const [view, setView] = useState('gatekeeper'); 
  const [gender, setGender] = useState(null);
  const [currentGender, setCurrentGender] = useState(null);
  const [currentDare, setCurrentDare] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === CONFIG.PASSWORD) setView('selection');
    else alert("Access Denied");
  };

  const handleRandomize = () => {
    const list = CONFIG.DARES[currentGender];
    setCurrentDare(list[Math.floor(Math.random() * list.length)]);
    setCurrentGender(currentGender === 'male' ? 'female' : 'male');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden" style={{ fontFamily: "'Quicksand', sans-serif", background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #db2777 100%)' }}>
      
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")' }} />

      <AnimatePresence mode="wait">
        {/* VIEW 1: GATEKEEPER */}
        {view === 'gatekeeper' && (
          <motion.div 
            key="gate" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 glass-panel-enhanced p-8 sm:p-12 w-[95%] max-w-[500px] text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-lg"
            >
              <Lock size={24} className="text-white/80" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="display-font text-4xl font-light tracking-tighter mb-2"
            >
              Vault
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.6 }}
              className="text-white/60 text-sm mb-8"
            >
              Enter the secret key to proceed
            </motion.p>
            <motion.form 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8 }}
              onSubmit={handleAuth} 
              className="space-y-4"
            >
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder-white/30"
                placeholder="••••"
              />
              <button className="w-full bg-white/20 text-white font-bold py-4 rounded-2xl hover:bg-white/30 transition-all active:scale-95 border border-white/10">
                Unlock Experience
              </button>
            </motion.form>
          </motion.div>
        )}

        {/* VIEW 2: SELECTION */}
        {view === 'selection' && (
          <motion.div 
            key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-10 fixed inset-0 flex"
          >
            <motion.div 
              initial={{ x: -50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.2 }}
              className="flex-1 flex items-center justify-center bg-gradient-to-r from-blue-600/20 to-blue-500/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full" />
              <SelectionHalf 
                icon={<Mars size={64}/>} 
                label="Masculine" 
                color="hover:shadow-[0_0_80px_-12px_rgba(59,130,246,0.8)] hover:border-blue-300/60"
                accent="text-blue-200"
                onClick={() => { setGender('male'); setCurrentGender('male'); setView('game'); }}
              />
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 0.4 }}
              className="flex-1 flex items-center justify-center bg-gradient-to-l from-fuchsia-600/20 to-fuchsia-500/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-fuchsia-600/5 blur-3xl rounded-full" />
              <SelectionHalf 
                icon={<Venus size={64}/>} 
                label="Feminine" 
                color="hover:shadow-[0_0_80px_-12px_rgba(217,70,239,0.8)] hover:border-fuchsia-300/60"
                accent="text-fuchsia-200"
                onClick={() => { setGender('female'); setCurrentGender('female'); setView('game'); }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* VIEW 3: GAME SCREEN */}
        {view === 'game' && (
          <motion.div 
            key="game" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="z-10 glass-panel-enhanced p-8 sm:p-12 w-[95%] max-w-[500px] min-h-[450px] flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Gender-based gradient accent */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[100px] rounded-full transition-all duration-1000 ${currentGender === 'male' ? 'bg-blue-500/40' : 'bg-fuchsia-500/40'}`} />
            <div className={`absolute -bottom-20 -left-20 w-40 h-40 blur-[100px] rounded-full transition-all duration-1000 ${currentGender === 'male' ? 'bg-blue-400/30' : 'bg-fuchsia-400/30'}`} />
            
            <motion.button 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.2 }}
              onClick={() => { setView('selection'); setCurrentDare(''); }} 
              className="absolute top-6 left-6 opacity-40 hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <p className={`text-[10px] uppercase tracking-[0.4em] mb-4 font-bold ${currentGender === 'male' ? 'text-blue-300' : 'text-fuchsia-300'}`}>
                {currentGender === 'male' ? 'Mars Edition' : 'Venus Edition'}
              </p>
              <div className="min-h-[120px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentDare}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-serif italic leading-relaxed px-4"
                  >
                    {currentDare || "Touch the button to reveal your fate..."}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              onClick={handleRandomize}
              className={`group relative w-full py-5 rounded-2xl font-bold tracking-widest overflow-hidden transition-all active:scale-95 ${currentGender === 'male' ? 'bg-blue-500/80 text-white hover:bg-blue-400/90' : 'bg-fuchsia-500/80 text-white hover:bg-fuchsia-400/90'} border border-white/20`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                REVEAL DARE
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass-panel-enhanced {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .glass-panel-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }
        .display-font {
          font-family: 'Abril Fatface', serif;
        }
      `}</style>
    </div>
  );
};

const SelectionHalf = ({ icon, label, onClick, color, accent }) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`glass-panel-enhanced flex flex-col items-center justify-center p-12 transition-all duration-500 group border-white/20 cursor-pointer ${color} rounded-none`}
  >
    <div className={`mb-6 transition-transform duration-500 group-hover:scale-125 group-active:scale-90 ${accent} opacity-70 group-hover:opacity-100`}>
      {icon}
    </div>
    <span className="display-font text-4xl uppercase tracking-[0.1em] font-bold opacity-50 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </motion.button>
);

export default App;