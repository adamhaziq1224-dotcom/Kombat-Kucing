import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Character, ArenaMap, BattleStats } from '../types';
import { PixelSprite } from './PixelSprite';
import { playVictorySound, playKoSound, playSelectSound } from '../utils/audio';
import { Trophy, RefreshCw, Home, Sparkles, Award, Coins } from 'lucide-react';

interface VictoryScreenProps {
  isVictory: boolean;
  player: Character;
  enemy: Character;
  map: ArenaMap;
  stats: BattleStats;
  mode?: string;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  isVictory,
  player,
  enemy,
  stats,
  mode,
  onPlayAgain,
  onMainMenu
}) => {
  const [displayedCoins, setDisplayedCoins] = React.useState(0);
  const [isCoinPulsing, setIsCoinPulsing] = React.useState(false);

  useEffect(() => {
    if (isVictory) {
      playVictorySound();
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else {
      playKoSound();
    }
  }, [isVictory]);

  // Cyber Coins count-up animation with subtle pulse
  useEffect(() => {
    const target = stats.coinsEarned ?? 0;
    if (target <= 0) {
      setDisplayedCoins(0);
      return;
    }

    const duration = 1200; // 1.2s count up
    const startTime = Date.now();
    let animationFrameId: number;
    let lastPulsedValue = 0;

    const animateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setDisplayedCoins(current);

      if (current !== lastPulsedValue && current % Math.max(1, Math.floor(target / 8)) === 0) {
        lastPulsedValue = current;
        setIsCoinPulsing(true);
        setTimeout(() => setIsCoinPulsing(false), 90);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayedCoins(target);
        setIsCoinPulsing(true);
        setTimeout(() => setIsCoinPulsing(false), 200);
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animateCount);
    }, 200);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVictory, stats.coinsEarned]);

  // Calculate battle grade
  let grade = 'A';
  if (stats.comboCount >= 2 || stats.maxDamage > 50) grade = 'S';
  else if (!isVictory) grade = 'C';

  return (
    <div className="relative flex-1 w-full h-full flex flex-col items-center justify-center select-none overflow-y-auto min-h-0 bg-slate-950 text-slate-100 p-2 sm:p-4">
      {/* Background Ambient Glow */}
      <div
        className={`absolute inset-0 opacity-40 pointer-events-none ${
          isVictory ? 'bg-gradient-to-b from-yellow-900/30 via-slate-950 to-slate-950' : 'bg-gradient-to-b from-rose-900/30 via-slate-950 to-slate-950'
        }`}
      />
      
      <div className="relative z-10 max-w-md w-full flex flex-col items-center justify-center my-auto py-1 space-y-2 sm:space-y-2.5">
        {/* Layer 1: Title Announcement */}
        <motion.div
          initial={{ scale: 0.8, y: -10, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center w-full"
        >
          {isVictory ? (
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/50 text-yellow-300 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest shadow-sm">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span>CHAMPION</span>
              </div>
              <h1 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 drop-shadow py-0.5">
                VICTORY!
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                You proved your strength and emerged victorious.
              </p>
            </div>
          ) : (
            <div className="space-y-0.5 sm:space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/50 text-rose-300 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">
                <span>DEFEAT</span>
              </div>
              <h1 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-rose-500 drop-shadow py-0.5">
                GAME OVER
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
                You fought bravely, but the opponent was stronger...
              </p>
            </div>
          )}
        </motion.div>

        {/* Layer 2: Character Spotlight Stage & Quote Box */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full flex flex-col items-center relative"
        >
          {/* Spotlight Glow */}
          <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-24 rounded-full blur-xl pointer-events-none ${
            isVictory ? 'bg-amber-500/20' : 'bg-rose-600/20'
          }`} />
          
          {/* Sprite Box with strict bounded height and centered scaling */}
          <div className="relative h-20 sm:h-24 w-full flex flex-col items-center justify-end overflow-visible">
            <div className="scale-[0.55] sm:scale-[0.65] origin-bottom flex items-center justify-center -mb-2">
              <PixelSprite
                character={isVictory ? player : enemy}
                action={isVictory ? 'victory' : 'idle'}
              />
            </div>
            {/* Ground Shadow under Sprite */}
            <div className="w-24 sm:w-28 h-2 bg-black/60 rounded-full blur-[2px] mt-1 shrink-0" />
          </div>

          {/* Character Name & Role badge - clearly positioned below sprite */}
          <div className="flex items-center space-x-2 mt-2 z-10">
            <div className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-white drop-shadow tracking-wide">
              {isVictory ? player.name : enemy.name}
            </div>
            <span className={`text-[7px] sm:text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${
              isVictory ? 'bg-amber-950/80 text-amber-300 border-amber-500/50' : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
            }`}>
              {isVictory ? player.archetype : enemy.archetype}
            </span>
          </div>

          {/* Dialogue Quote Box - dedicated row with distinct spacing */}
          <div className="w-full max-w-sm mt-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-sm text-center z-10">
            <p className="text-[10px] sm:text-xs text-slate-300 italic line-clamp-2">
              "{isVictory ? player.quotes.win : (enemy.quotes.win || enemy.quotes.loss)}"
            </p>
          </div>
        </motion.div>

        {/* Layer 3: Match Statistics Card */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-2.5 grid grid-cols-3 gap-2 shadow-lg"
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">MAX COMBO</span>
            <span className="font-['Press_Start_2P'] text-xs sm:text-sm text-amber-400 drop-shadow-sm">
              {stats.comboCount}x
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-l border-r border-slate-800/60 px-2">
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">DAMAGE</span>
            <span className="font-['Press_Start_2P'] text-xs sm:text-sm text-rose-400 drop-shadow-sm">
              {stats.maxDamage}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">RANK</span>
            <span className="font-['Press_Start_2P'] text-sm sm:text-base text-yellow-400 drop-shadow-sm">
              {grade}
            </span>
          </div>
        </motion.div>

        {/* Layer 3B: Cyber Coins Victory Reward with Count-up & Pulse */}
        {(stats.coinsEarned ?? 0) > 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.18 }}
            className={`w-full bg-amber-950/80 border-2 rounded-2xl px-3 py-1.5 sm:py-2 flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-colors duration-150 ${
              isCoinPulsing ? 'border-amber-300 bg-amber-900/90 shadow-[0_0_20px_rgba(251,191,36,0.5)]' : 'border-amber-500/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={isCoinPulsing ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.18 }}
                className="p-1 rounded-xl bg-amber-500/20 border border-amber-400/40"
              >
                <Coins className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 transition-transform ${isCoinPulsing ? 'text-yellow-200' : ''}`} />
              </motion.div>
              <div>
                <div className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-amber-300">
                  CYBER COINS EARNED
                </div>
                <div className="text-[8px] text-amber-400/80 font-medium">
                  Added to Cyber Workshop wallet
                </div>
              </div>
            </div>
            <motion.div
              animate={isCoinPulsing ? { scale: [1, 1.18, 1] } : { scale: 1 }}
              transition={{ duration: 0.15 }}
              className="font-['Press_Start_2P'] text-xs sm:text-sm text-amber-300 font-bold tracking-wider"
            >
              +{displayedCoins}
            </motion.div>
          </motion.div>
        )}

        {/* Layer 3C: Survival Mode Progression Summary */}
        {mode === 'survival' && isVictory && (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="w-full bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-2 shadow-lg flex flex-col gap-1"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1">
              <span className="font-['Press_Start_2P'] text-[8px] text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> SURVIVAL UPGRADE
              </span>
              <span className="font-mono text-[9px] text-slate-300 font-bold">
                STAGE {(stats.survivalStreak ?? 0) + 1} CLEARED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="bg-slate-950/80 rounded-xl p-1 border border-emerald-500/30 flex flex-col items-center">
                <span className="text-[7px] font-bold text-emerald-400 uppercase">HP RECOVERED</span>
                <span className="font-mono text-xs font-bold text-emerald-300">+30 HP</span>
                <span className="text-[7px] text-slate-400">
                  {Math.min(player.maxHp, (stats.remainingPlayerHp ?? player.maxHp) + 30)} / {player.maxHp} HP
                </span>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-1 border border-cyan-500/30 flex flex-col items-center">
                <span className="text-[7px] font-bold text-cyan-400 uppercase">PLAYER BUFF</span>
                <span className="font-mono text-xs font-bold text-cyan-300">+5 ATK</span>
                <span className="text-[7px] text-slate-400">
                  Total: +{((stats.survivalStreak ?? 0) + 1) * 5} ATK
                </span>
              </div>

              <div className="bg-slate-950/80 rounded-xl p-1 border border-rose-500/30 flex flex-col items-center">
                <span className="text-[7px] font-bold text-rose-400 uppercase">OPPONENT BUFF</span>
                <span className="font-mono text-xs font-bold text-rose-300">+10 HP / +10 ATK</span>
                <span className="text-[7px] text-slate-400">Next Challenger</span>
              </div>
            </div>
          </motion.div>
        )}

        {mode === 'survival' && !isVictory && (
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="w-full bg-slate-900/95 border border-rose-500/40 rounded-2xl p-2 text-center"
          >
            <div className="font-['Press_Start_2P'] text-[8px] text-rose-400 mb-0.5">
              SURVIVED {stats.survivalStreak ?? 0} OPPONENTS
            </div>
            <p className="text-[10px] text-slate-300">
              Your survival streak ended here. Ready to challenge survival mode again?
            </p>
          </motion.div>
        )}

        {/* Layer 4: Action Controls */}
        <div className="flex flex-row items-center justify-center gap-2.5 w-full pt-1">
          <button
            id="btn-play-again"
            onClick={() => {
              playSelectSound();
              onPlayAgain();
            }}
            className="flex-1 px-4 py-2 sm:py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-[0_3px_0_rgb(8,145,178)] active:shadow-none hover:translate-y-[1px] active:translate-y-[3px] transition-all cursor-pointer border border-cyan-400 flex items-center justify-center space-x-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              {isVictory
                ? mode === 'survival'
                  ? `NEXT OPPONENT (STAGE ${(stats.survivalStreak ?? 0) + 2})`
                  : 'PLAY AGAIN'
                : mode === 'survival'
                ? 'RETRY SURVIVAL'
                : 'TRY AGAIN'}
            </span>
          </button>

          <button
            id="btn-victory-main-menu"
            onClick={() => {
              playSelectSound();
              onMainMenu();
            }}
            className="flex-1 px-4 py-2 sm:py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>MAIN MENU</span>
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono text-center">
          <span className="text-cyan-400">[ENTER / SPACE]</span> {isVictory ? 'Play Again' : 'Try Again'} • <span className="text-slate-300">[ESC]</span> Main Menu
        </div>
      </div>
    </div>
  );
};
