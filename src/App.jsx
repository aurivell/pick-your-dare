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
  const [currentDare, setCurrentDare] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (passwordInput === CONFIG.PASSWORD) setView('selection');
    else alert("Access Denied");
  };

  const handleRandomize = () => {
    const list = CONFIG.DARES[gender];
    setCurrentDare(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: GATEKEEPER */}
        {view === 'gatekeeper' && (
          <motion.div 
            key="gate" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 glass-panel p-10 w-[90%] max-w-[400px] text-center"
          >
            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Lock size={24} className="text-white/70" />
            </div>
            <h1 className="text-3xl font-light tracking-tighter mb-2">Vault</h1>
            <p className="text-white/40 text-sm mb-8">Enter the secret key to proceed</p>
            <form onSubmit={handleAuth} className="space-y-4">
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-center text-xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                placeholder="••••"
              />
              <button className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-opacity-90 transition-all active:scale-95">
                Unlock Experience
              </button>
            </form>
          </motion.div>
        )}

        {/* VIEW 2: SELECTION */}
        {view === 'selection' && (
          <motion.div 
            key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-10 w-full max-w-[500px] px-6"
          >
            <h2 className="text-center text-2xl font-extralight tracking-widest mb-10 opacity-80 uppercase">Identity</h2>
            <div className="grid grid-cols-2 gap-6">
              <SelectionCard 
                icon={<Mars size={48}/>} 
                label="Masculine" 
                color="hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] hover:border-blue-500/50"
                accent="text-blue-400"
                onClick={() => { setGender('male'); setView('game'); }}
              />
              <SelectionCard 
                icon={<Venus size={48}/>} 
                label="Feminine" 
                color="hover:shadow-[0_0_50px_-12px_rgba(217,70,239,0.5)] hover:border-fuchsia-500/50"
                accent="text-fuchsia-400"
                onClick={() => { setGender('female'); setView('game'); }}
              />
            </div>
          </motion.div>
        )}

        {/* VIEW 3: GAME SCREEN */}
        {view === 'game' && (
          <motion.div 
            key="game" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="z-10 glass-panel p-8 w-[90%] max-w-[450px] min-h-[400px] flex flex-col justify-between items-center text-center relative overflow-hidden"
          >
            {/* Background Accent for the chosen gender */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full ${gender === 'male' ? 'bg-blue-600/30' : 'bg-fuchsia-600/30'}`} />
            
            <button onClick={() => { setView('selection'); setCurrentDare(''); }} className="absolute top-6 left-6 opacity-30 hover:opacity-100 transition-opacity">
              <ChevronLeft size={24} />
            </button>

            <div className="mt-12">
              <p className={`text-[10px] uppercase tracking-[0.4em] mb-4 font-bold ${gender === 'male' ? 'text-blue-400' : 'text-fuchsia-400'}`}>
                {gender === 'male' ? 'Mars Edition' : 'Venus Edition'}
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
            </div>

            <button 
              onClick={handleRandomize}
              className={`group relative w-full py-5 rounded-2xl font-bold tracking-widest overflow-hidden transition-all active:scale-95 ${gender === 'male' ? 'bg-blue-600 text-white' : 'bg-fuchsia-600 text-white'}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                REVEAL DARE
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

const SelectionCard = ({ icon, label, onClick, color, accent }) => (
  <button 
    onClick={onClick}
    className={`glass-panel flex flex-col items-center justify-center p-8 transition-all duration-500 group border-white/5 ${color}`}
  >
    <div className={`mb-4 transition-transform duration-500 group-hover:scale-125 group-active:scale-90 ${accent} opacity-60 group-hover:opacity-100`}>
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </button>
);

export default App;