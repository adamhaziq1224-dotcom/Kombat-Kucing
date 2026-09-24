import React from 'react';
import { motion } from 'motion/react';
import { Character, ArenaMap, DifficultyLevel } from '../types';
import { PixelSprite } from './PixelSprite';
import { ArenaBackground } from './ArenaBackground';
import { playFightAnnounce } from '../utils/audio';

interface VsSplashScreenProps {
  player: Character;
  enemy: Character;
  map: ArenaMap;
  roundNumber: number;
  difficulty?: DifficultyLevel;
  onProceedToBattle: () => void;
}

export const VsSplashScreen: React.FC<VsSplashScreenProps> = ({
  player,
  enemy,
  map,
  roundNumber,
  difficulty = 'medium',
  onProceedToBattle
}) => {
  React.useEffect(() => {
    playFightAnnounce();
    const timer = setTimeout(() => {
      onProceedToBattle();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onProceedToBattle]);

  return (
    <div className="relative flex-1 flex flex-col items-center p-2 sm:p-4 text-center select-none overflow-y-auto min-h-0">
      {/* Background with Map Ambient */}
      <ArenaBackground map={map} />

      {/* Top Banner Round Info */}
      <div className="flex flex-col items-center w-full my-auto shrink-0 py-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-2 sm:mb-6 flex flex-col items-center space-y-1.5"
      >
        <div className="inline-block px-4 py-1 rounded bg-yellow-400 text-black font-['Press_Start_2P'] text-xs font-bold shadow-[0_0_20px_#eab308]">
          ROUND {roundNumber}
        </div>
        <div className="flex items-center space-x-3 font-['Silkscreen'] text-xs">
          <span className="text-cyan-300">📍 ARENA: {map.name.toUpperCase()}</span>
          <span
            className={`px-2 py-0.5 rounded border text-[10px] font-bold ${
              difficulty === 'easy'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_8px_#10b981]'
                : difficulty === 'hard'
                ? 'bg-rose-950 text-rose-300 border-rose-500 shadow-[0_0_10px_#f43f5e] animate-pulse'
                : 'bg-amber-950 text-amber-300 border-amber-500 shadow-[0_0_8px_#f59e0b]'
            }`}
          >
            {difficulty === 'easy' ? '🟢 EASY AI' : difficulty === 'hard' ? '🔴 HARD AI' : '🟡 MEDIUM AI'}
          </span>
        </div>
      </motion.div>

      {/* Versus Center Stage */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-4xl px-4 my-2">
        {/* Left Player Fighter */}
        <motion.div
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex-1 flex flex-col items-center"
        >
          <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <PixelSprite character={player} action="idle" />
          </div>
          <h3 className="font-['Press_Start_2P'] text-xs sm:text-base text-yellow-300 mt-2 drop-shadow-[0_0_10px_#eab308]">
            {player.name}
          </h3>
          <span className="font-['Silkscreen'] text-[11px] text-neutral-300">
            {player.title}
          </span>
        </motion.div>

        {/* Center Big Animated VS Emblem */}
        <motion.div
          initial={{ scale: 3, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', damping: 10 }}
          className="mx-4 flex flex-col items-center"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600 border-4 border-yellow-400 flex items-center justify-center shadow-[0_0_40px_#ef4444] animate-pulse">
            <span className="font-['Press_Start_2P'] text-2xl sm:text-3xl text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              VS
            </span>
          </div>
        </motion.div>

        {/* Right Enemy Fighter */}
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="flex-1 flex flex-col items-center"
        >
          <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <PixelSprite character={enemy} action="idle" isFlipped={true} />
          </div>
          <h3 className="font-['Press_Start_2P'] text-xs sm:text-base text-rose-400 mt-2 drop-shadow-[0_0_10px_#f43f5e]">
            {enemy.name}
          </h3>
          <span className="font-['Silkscreen'] text-[11px] text-neutral-300">
            {enemy.title}
          </span>
        </motion.div>
      </div>

      {/* Fight Intro Slogan */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 mt-6"
      >
        <div className="font-['Press_Start_2P'] text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-rose-500 animate-pulse drop-shadow-[0_0_20px_#ef4444]">
          READY... FIGHT!!
        </div>
      </motion.div>

      {/* Skip button if user doesn't want to wait */}
      <button
        id="btn-skip-vs"
        onClick={onProceedToBattle}
        className="relative z-10 mt-6 px-4 py-1.5 rounded bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:text-white font-['Silkscreen'] text-xs cursor-pointer"
      >
        PRESS SPACE OR CLICK TO SKIP
      </button>
      </div>
    </div>
  );
};
