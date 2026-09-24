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
    <div className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-hidden min-h-0 h-full">
      {/* Background with Map Ambient */}
      <ArenaBackground map={map} />

      {/* Top Banner Round Info */}
      <div className="flex flex-col items-center w-full my-auto shrink-0 py-2 sm:py-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 mb-2 sm:mb-4 flex flex-col items-center space-y-1"
        >
          <div className="inline-block px-3 py-0.5 sm:px-4 sm:py-1 rounded bg-yellow-400 text-black font-['Press_Start_2P'] text-[10px] sm:text-xs font-bold shadow-[0_0_20px_#eab308]">
            ROUND {roundNumber}
          </div>
          <div className="flex items-center space-x-2 font-['Silkscreen'] text-[10px] sm:text-xs">
            <span className="text-cyan-300">📍 ARENA: {map.name.toUpperCase()}</span>
            <span
              className={`px-1.5 py-0.2 rounded border text-[9px] sm:text-[10px] font-bold ${
                difficulty === 'easy'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_8px_#10b981]'
                  : difficulty === 'hard'
                  ? 'bg-rose-950 text-rose-300 border-rose-500 shadow-[0_0_10px_#f43f5e] animate-pulse'
                  : 'bg-amber-950 text-amber-300 border-amber-500 shadow-[0_0_8px_#f59e0b]'
              }`}
            >
              {difficulty === 'easy' ? '🟢 EASY' : difficulty === 'hard' ? '🔴 HARD' : '🟡 MEDIUM'}
            </span>
          </div>
        </motion.div>

        {/* Versus Center Stage */}
        <div className="relative z-10 flex items-center justify-center w-full max-w-4xl px-2 my-1 sm:my-2">
          {/* Left Player Fighter */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="w-20 h-20 xs:w-28 xs:h-28 sm:w-44 sm:h-44 flex items-center justify-center">
              <div className="scale-[0.6] xs:scale-[0.8] sm:scale-100 origin-center">
                <PixelSprite character={player} action="idle" />
              </div>
            </div>
            <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-base text-yellow-300 mt-1 drop-shadow-[0_0_10px_#eab308] truncate max-w-[120px] sm:max-w-none">
              {player.name}
            </h3>
            <span className="font-['Silkscreen'] text-[9px] sm:text-[11px] text-neutral-300 truncate max-w-[120px] sm:max-w-none">
              {player.title}
            </span>
          </motion.div>

          {/* Center Big Animated VS Emblem */}
          <motion.div
            initial={{ scale: 2.5, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', damping: 10 }}
            className="mx-2 sm:mx-4 flex flex-col items-center shrink-0"
          >
            <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 rounded-full bg-red-600 border-2 sm:border-4 border-yellow-400 flex items-center justify-center shadow-[0_0_30px_#ef4444] animate-pulse">
              <span className="font-['Press_Start_2P'] text-sm xs:text-base sm:text-3xl text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                VS
              </span>
            </div>
          </motion.div>

          {/* Right Enemy Fighter */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="w-20 h-20 xs:w-28 xs:h-28 sm:w-44 sm:h-44 flex items-center justify-center">
              <div className="scale-[0.6] xs:scale-[0.8] sm:scale-100 origin-center">
                <PixelSprite character={enemy} action="idle" isFlipped={true} />
              </div>
            </div>
            <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-base text-rose-400 mt-1 drop-shadow-[0_0_10px_#f43f5e] truncate max-w-[120px] sm:max-w-none">
              {enemy.name}
            </h3>
            <span className="font-['Silkscreen'] text-[9px] sm:text-[11px] text-neutral-300 truncate max-w-[120px] sm:max-w-none">
              {enemy.title}
            </span>
          </motion.div>
        </div>

        {/* Fight Intro Slogan */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.15, 1], opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 mt-2 sm:mt-5"
        >
          <div className="font-['Press_Start_2P'] text-sm xs:text-base sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-rose-500 animate-pulse drop-shadow-[0_0_20px_#ef4444]">
            READY... FIGHT!!
          </div>
        </motion.div>

        {/* Skip button if user doesn't want to wait */}
        <button
          id="btn-skip-vs"
          onClick={onProceedToBattle}
          className="relative z-10 mt-2 sm:mt-5 px-3 py-1 rounded bg-neutral-900/80 border border-neutral-700 text-neutral-400 hover:text-white font-['Silkscreen'] text-[9px] sm:text-xs cursor-pointer"
        >
          CLICK TO SKIP
        </button>
      </div>
    </div>
  );
};
