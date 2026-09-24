import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, ShoppingBag, Coins, Zap, Shield, Cpu, Terminal } from 'lucide-react';
import { playSelectSound } from '../utils/audio';
import { getCyberCoins } from '../utils/economy';
import { CHARACTERS } from '../data/gameData';
import { PixelSprite } from './PixelSprite';

interface TitleScreenProps {
  onStart: () => void;
  onOpenStore?: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, onOpenStore }) => {
  const [coins, setCoins] = useState<number>(0);
  const oyen = CHARACTERS[0];
  const mechaDog = CHARACTERS[1];

  useEffect(() => {
    setCoins(getCyberCoins());
  }, []);

  const handleStart = () => {
    playSelectSound();
    onStart();
  };

  const handleStore = () => {
    playSelectSound();
    if (onOpenStore) onOpenStore();
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-y-auto overflow-x-hidden min-h-0 bg-slate-950 text-slate-100 font-sans">
      
      {/* --- FUTURISTIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {/* Dynamic Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
        
        {/* Dark vignette to center focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_80%)]" />

        {/* Diagonal Tech Lines (Left & Right framing) */}
        <div className="absolute top-0 left-0 w-32 h-full border-r border-cyan-500/10 skew-x-[-15deg] origin-bottom opacity-50 bg-gradient-to-r from-cyan-950/20 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full border-l border-pink-500/10 skew-x-[15deg] origin-bottom opacity-50 bg-gradient-to-l from-pink-950/20 to-transparent" />
        
        {/* Background Particles/Nodes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899] animate-[ping_3s_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-500/5 rounded-full animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-pink-500/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      {/* --- MAIN CONTENT OVERLAY --- */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center justify-center shrink-0 py-2 sm:py-6 landscape:py-1 space-y-2.5 sm:space-y-6 landscape:space-y-1 my-auto">
        
        {/* HUD Top-Right Elements (Decorative) */}
        <div className="absolute top-0 right-0 hidden md:flex flex-col items-end opacity-40 font-mono text-[8px] text-cyan-400">
          <div className="flex items-center space-x-1"><Cpu className="w-3 h-3" /><span>SYS.CORE.ONLINE</span></div>
          <div className="mt-1">MEM: 0x4F92</div>
          <div className="mt-1">NET: STABLE</div>
        </div>
        
        {/* LOGO & TITLE SECTION */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative flex flex-col items-center justify-center w-full"
        >
          {/* Cyberpunk Tech Bracket (Left) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-20 border-l-2 border-y-2 border-cyan-500/30 opacity-50 hidden sm:block" />
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-none bg-slate-900/80 border-l-[3px] border-cyan-400 text-cyan-300 text-[7px] sm:text-[9px] font-bold tracking-[0.2em] mb-1 sm:mb-2 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
            <span>SYS_VERSION // 1.0.0</span>
          </div>
          
          <div className="relative">
            {/* Glitch Shadow Effect underneath text */}
            <h1 className="absolute top-[1.5px] left-[1.5px] font-['Press_Start_2P'] text-xl sm:text-3xl md:text-5xl landscape:text-lg text-pink-500/50 py-0.5 sm:py-1 text-center leading-tight blur-[1px]">
              KOMBAT<br/>KUCING
            </h1>
            <h1 className="absolute -top-[1.5px] -left-[1.5px] font-['Press_Start_2P'] text-xl sm:text-3xl md:text-5xl landscape:text-lg text-cyan-500/50 py-0.5 sm:py-1 text-center leading-tight blur-[1px]">
              KOMBAT<br/>KUCING
            </h1>
            
            <h1 className="relative font-['Press_Start_2P'] text-xl sm:text-3xl md:text-5xl landscape:text-lg text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_16px_rgba(34,211,238,0.8)] py-0.5 sm:py-1 text-center leading-tight">
              KOMBAT<br/>KUCING
            </h1>
          </div>
          
          <div className="mt-1 sm:mt-2 landscape:mt-0.5 flex items-center space-x-3 sm:space-x-4">
            <div className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-pink-500" />
            <div className="font-['Silkscreen'] text-[10px] sm:text-sm md:text-base landscape:text-[8px] text-pink-400 tracking-[0.3em] sm:tracking-[0.6em] uppercase font-bold drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">
              CYBER CITY
            </div>
            <div className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-pink-500" />
          </div>

          {/* Cyberpunk Tech Bracket (Right) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-20 border-r-2 border-y-2 border-pink-500/30 opacity-50 hidden sm:block" />
        </motion.div>

        {/* CHARACTER SHOWCASE (Animated Sprites) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative flex justify-center items-end h-20 sm:h-36 landscape:h-15 w-full max-w-xs sm:max-w-md mt-1 sm:mt-4 landscape:mt-0"
        >
          {/* Ground Platform */}
          <div className="absolute bottom-0 inset-x-6 sm:inset-x-12 h-4 sm:h-8 landscape:h-3 bg-slate-900 border-t border-cyan-500/50 shadow-[0_-10px_30px_rgba(6,182,212,0.15)] rounded-[100%] [transform:perspective(200px)_rotateX(60deg)]" />
          
          <div className="relative flex items-end justify-between w-full px-6 sm:px-12 z-10">
            {/* Player 1 (Oyen) */}
            <motion.div 
              animate={{ y: [0, -3, 0] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex flex-col items-center"
            >
              <div className="scale-[0.8] sm:scale-[1.15] landscape:scale-[0.55] origin-bottom">
                <PixelSprite character={oyen} action="idle" />
              </div>
              <div className="absolute -bottom-4 landscape:-bottom-3 text-[6px] sm:text-[8px] landscape:text-[5px] font-mono text-cyan-400 bg-cyan-950/80 px-1 py-0.2 rounded border border-cyan-800">P1_RDY</div>
            </motion.div>

            {/* VS Badge */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-['Press_Start_2P'] text-xs sm:text-base landscape:text-[9px] text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)] z-20 mb-3 sm:mb-6 landscape:mb-1"
            >
              VS
            </motion.div>

            {/* Player 2 (Mecha Dog) */}
            <motion.div 
              animate={{ y: [0, -3, 0] }} 
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="relative flex flex-col items-center"
            >
              <div className="scale-[0.8] sm:scale-[1.15] landscape:scale-[0.55] origin-bottom [transform:scaleX(-1)]">
                <PixelSprite character={mechaDog} action="idle" />
              </div>
              <div className="absolute -bottom-4 landscape:-bottom-3 text-[6px] sm:text-[8px] landscape:text-[5px] font-mono text-pink-400 bg-pink-950/80 px-1 py-0.2 rounded border border-pink-800">CPU_ACT</div>
            </motion.div>
          </div>
        </motion.div>

        {/* MAIN MENU CONTROLS */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="flex flex-col w-full max-w-xs sm:max-w-sm space-y-1.5 sm:space-y-3 landscape:space-y-1 px-2 sm:px-4 z-20 mt-1 sm:mt-4 landscape:mt-0"
        >
          {/* Start Game Button (Primary) */}
          <button
            id="btn-start-game"
            onClick={handleStart}
            className="group relative w-full h-11 sm:h-15 landscape:h-8 bg-slate-900 border border-cyan-500 rounded-none overflow-hidden cursor-pointer active:scale-95 transition-transform"
          >
            {/* Animated Hover Background */}
            <div className="absolute inset-0 bg-cyan-500 w-0 group-hover:w-full transition-all duration-300 ease-out" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 z-10" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 z-10" />
            
            <div className="absolute inset-0 flex items-center justify-center space-x-2 sm:space-x-3 z-20">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 landscape:w-3.5 landscape:h-3.5 text-cyan-400 group-hover:text-slate-950 transition-colors" fill="currentColor" />
              <span className="font-['Press_Start_2P'] text-[11px] sm:text-sm landscape:text-[9px] text-cyan-300 group-hover:text-slate-950 transition-colors tracking-widest drop-shadow-sm">
                INITIALIZE
              </span>
            </div>
            
            {/* Tech Decoration */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col space-y-1 opacity-50">
              <div className="w-4 h-[2px] bg-cyan-400 group-hover:bg-slate-900" />
              <div className="w-2 h-[2px] bg-cyan-400 group-hover:bg-slate-900" />
              <div className="w-3 h-[2px] bg-cyan-400 group-hover:bg-slate-900" />
            </div>
          </button>
          
          {/* Secondary Buttons Row */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
            {/* Store Button */}
            <button
              id="btn-cyber-store"
              onClick={handleStore}
              className="relative group w-full py-1.5 sm:py-3 landscape:py-1 bg-slate-900/60 hover:bg-amber-950/60 text-amber-400 border border-slate-700 hover:border-amber-500 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer rounded-none"
            >
              <ShoppingBag className="w-3.5 h-3.5 landscape:w-3 landscape:h-3 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-[9px] sm:text-xs landscape:text-[8px] font-bold tracking-wide">STORE</span>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-amber-500/0 group-hover:bg-amber-500 transition-colors" />
            </button>

            {/* Coins Display Panel */}
            <div className="relative w-full py-1.5 sm:py-3 landscape:py-1 bg-slate-900/80 text-slate-300 border border-slate-700 flex items-center justify-between px-2.5 sm:px-3 overflow-hidden">
              <div className="absolute top-0 right-0 w-6 h-6 bg-slate-800 rotate-45 translate-x-3 -translate-y-3" />
              <div className="flex flex-col z-10">
                <span className="text-[6.5px] sm:text-[8px] landscape:text-[5.5px] text-slate-500 font-mono">WALLET</span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Coins className="w-3 h-3 landscape:w-2.5 landscape:h-2.5" />
                  <span className="font-mono font-bold text-[10px] sm:text-sm landscape:text-[9px] tracking-wide">{coins}</span>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>

        {/* Footer / Subtext */}
        <div className="text-center w-full pt-1">
          <p className="text-[7.5px] sm:text-[9px] font-mono text-slate-600 tracking-[0.2em]">
            SYSTEM_SECURE // READY_FOR_COMBAT
          </p>
        </div>

      </div>
    </div>
  );
};
