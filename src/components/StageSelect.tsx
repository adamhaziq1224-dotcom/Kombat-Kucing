import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GameMode, DifficultyLevel } from '../types';
import { STAGES_MODES } from '../data/gameData';
import { playSelectSound } from '../utils/audio';
import { getCyberCoins } from '../utils/economy';
import { ArrowLeft, ChevronRight, ChevronLeft, Shield, Zap, Skull, ShoppingBag, Coins } from 'lucide-react';

interface StageSelectProps {
  selectedDifficulty: DifficultyLevel;
  onChangeDifficulty: (diff: DifficultyLevel) => void;
  onSelectStage: (mode: GameMode) => void;
  onBack: () => void;
  onOpenStore?: () => void;
}

export const StageSelect: React.FC<StageSelectProps> = ({
  selectedDifficulty,
  onChangeDifficulty,
  onSelectStage,
  onBack,
  onOpenStore
}) => {
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    setCoins(getCyberCoins());
  }, []);

  const [hoveredIdx, setHoveredIdx] = React.useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (mode: GameMode) => {
    playSelectSound();
    onSelectStage(mode);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      playSelectSound();
    }
  };

  // Allow horizontal scrolling with standard vertical mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const difficultyOptions: {
    id: DifficultyLevel;
    name: string;
    icon: React.ReactNode;
    color: string;
    bgActive: string;
    desc: string;
  }[] = [
    {
      id: 'easy',
      name: 'CASUAL',
      icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
      color: 'border-emerald-400 text-emerald-300',
      bgActive: 'bg-emerald-950/90 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]',
      desc: 'Slower AI'
    },
    {
      id: 'medium',
      name: 'STANDARD',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      color: 'border-amber-400 text-amber-300',
      bgActive: 'bg-amber-950/90 border-amber-400 text-white shadow-[0_0_10px_rgba(245,158,11,0.3)]',
      desc: 'Normal AI'
    },
    {
      id: 'hard',
      name: 'EXPERT',
      icon: <Skull className="w-3.5 h-3.5 text-rose-500 animate-pulse" />,
      color: 'border-rose-500 text-rose-400',
      bgActive: 'bg-rose-950/90 border-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.3)]',
      desc: 'Aggressive AI'
    }
  ];

  return (
    <div className="relative flex-1 flex flex-col select-none overflow-hidden min-h-0 bg-slate-950 text-slate-100 justify-between">
      
      {/* 1. Compact Top Navigation */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-2.5 sm:p-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 shrink-0">
        <button
          onClick={() => {
            playSelectSound();
            onBack();
          }}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-300" />
          <span className="font-bold text-xs text-slate-300 hidden sm:inline">BACK</span>
        </button>

        <div className="flex-1 text-center font-['Press_Start_2P'] text-xs sm:text-sm text-cyan-400 drop-shadow">
          SELECT MODE
        </div>

        <div className="flex items-center space-x-2">
          {onOpenStore && (
            <button
              id="btn-stage-store"
              onClick={() => {
                playSelectSound();
                onOpenStore();
              }}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-amber-950/80 border border-amber-500/70 hover:bg-amber-900 text-amber-300 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
              title="Cyber Store & Upgrades"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-xs font-bold text-amber-300 hidden sm:inline">{coins}</span>
              <span className="text-[10px] text-amber-400/80 font-bold hidden md:inline">STORE</span>
            </button>
          )}

          <div className="text-[10px] text-slate-500 font-mono hidden sm:flex items-center gap-1">
            <span>{STAGES_MODES.length} MODES</span>
          </div>
        </div>
      </div>

      {/* 2. Compact Difficulty Bar (Horizontal strip to save vertical height) */}
      <div className="shrink-0 flex items-center justify-center gap-2 sm:gap-3 px-3 py-1.5 bg-slate-900/90 border-b border-slate-800/60">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
          DIFFICULTY:
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {difficultyOptions.map((opt) => {
            const isActive = selectedDifficulty === opt.id;
            return (
              <button
                key={opt.id}
                id={`btn-diff-${opt.id}`}
                onClick={() => {
                  playSelectSound();
                  onChangeDifficulty(opt.id);
                }}
                className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  isActive
                    ? opt.bgActive
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {opt.icon}
                <span className="text-[10px] sm:text-xs">{opt.name}</span>
                <span className="text-[9px] text-slate-400 hidden md:inline font-normal">({opt.desc})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Horizontal Scrollable Mode Cards Container */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 w-full px-2 sm:px-4 py-2">
        
        {/* Left Scroll Arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-1 sm:left-2 z-10 p-1.5 sm:p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Scroll Area */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="w-full flex flex-row items-center gap-3 sm:gap-4 px-12 sm:px-16 py-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory custom-scrollbar min-h-0 justify-start"
        >
          {STAGES_MODES.map((stage, idx) => {
            const isSelected = hoveredIdx === idx;

            return (
              <motion.div
                key={stage.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => handleSelect(stage.id)}
                className={`relative snap-center shrink-0 w-52 sm:w-60 rounded-2xl p-3 sm:p-3.5 border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group shadow-lg ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-102 z-10'
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500 opacity-90'
                }`}
              >
                {/* Mode Top Info */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-[9px] font-bold px-2 py-0.5 bg-slate-950/80 text-cyan-300 rounded-full uppercase tracking-wider mb-2 border border-slate-700/60">
                    {stage.badge}
                  </div>

                  <div className="text-3xl sm:text-4xl text-center mb-2 group-hover:scale-110 transition-transform duration-200 drop-shadow">
                    {stage.emoji}
                  </div>

                  <h3 className="font-['Press_Start_2P'] text-[11px] sm:text-xs text-white text-center mb-1 leading-tight">
                    {stage.title}
                  </h3>
                  <div className="text-[10px] text-cyan-400 text-center mb-1.5 font-bold tracking-wide">
                    {stage.subtitle}
                  </div>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed line-clamp-2">
                    {stage.description}
                  </p>
                </div>

                {/* Mode Action Button */}
                <div className="relative z-10 mt-3 pt-2.5 border-t border-slate-700/50">
                  <button
                    id={`btn-select-stage-${stage.id}`}
                    className={`w-full py-2 sm:py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1.5 ${
                      isSelected
                        ? 'bg-cyan-600 text-white shadow-[0_3px_0_rgb(8,145,178)] active:shadow-none active:translate-y-[2px] border border-cyan-400'
                        : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white'
                    }`}
                  >
                    <span>SELECT MODE</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Scroll Arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-1 sm:right-2 z-10 p-1.5 sm:p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* 4. Bottom Horizontal Navigation Hint */}
      <div className="shrink-0 flex items-center justify-center gap-2 py-1.5 px-3 bg-slate-950/90 border-t border-slate-800/40 text-[10px] text-slate-400 font-mono">
        <span className="hidden sm:inline">← Scroll or Swipe Left/Right to explore all modes →</span>
        <div className="flex items-center gap-1.5">
          {STAGES_MODES.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                hoveredIdx === idx ? 'w-4 bg-cyan-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
