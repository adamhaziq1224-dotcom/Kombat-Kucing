import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ComboFxOverlayProps {
  activeFx: 'none' | 'fire_slash' | 'laser' | 'shadow_strike' | 'rocket_punch' | 'thunder' | 'healing' | 'explosion' | 'guard_shield';
  bannerText: string | null;
  flashColor: string | null;
}

export const ComboFxOverlay: React.FC<ComboFxOverlayProps> = ({
  activeFx,
  bannerText,
  flashColor
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden select-none">
      {/* 1. Full-screen flash color (hardware-accelerated opacity) */}
      {flashColor && (
        <div
          className="absolute inset-0 transition-opacity duration-150 pointer-events-none"
          style={{ backgroundColor: flashColor, opacity: 0.28 }}
        />
      )}

      {/* 2. FIRE SLASH FX (Flame Claw / Nova / Slashing Fury) */}
      <AnimatePresence>
        {activeFx === 'fire_slash' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Blazing Crescent Arc 1 */}
            <motion.div
              initial={{ scale: 0.1, rotate: -60, opacity: 0 }}
              animate={{ scale: [0.1, 1.5, 1.8], rotate: [-60, 15, 35], opacity: [0, 1, 0] }}
              transition={{ duration: 0.36, ease: "easeOut" }}
              className="absolute w-72 sm:w-[420px] h-20 sm:h-28 bg-gradient-to-r from-yellow-300 via-amber-500 to-red-600 rounded-full shadow-[0_0_35px_#f97316] will-change-transform"
            />
            {/* Blazing Crescent Arc 2 (Counter-slash) */}
            <motion.div
              initial={{ scale: 0.1, rotate: 60, opacity: 0 }}
              animate={{ scale: [0.1, 1.5, 1.8], rotate: [60, -20, -40], opacity: [0, 1, 0] }}
              transition={{ duration: 0.38, delay: 0.04, ease: "easeOut" }}
              className="absolute w-72 sm:w-[420px] h-20 sm:h-28 bg-gradient-to-r from-amber-200 via-rose-500 to-purple-600 rounded-full shadow-[0_0_40px_#ef4444] will-change-transform"
            />
            {/* Fiery Triple Claw Marks */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2 }}
              animate={{ opacity: [0, 1, 0], scaleY: [0.2, 1.3, 1] }}
              transition={{ duration: 0.34, delay: 0.08 }}
              className="absolute flex space-x-6 sm:space-x-10 will-change-transform -rotate-12"
            >
              <div className="w-3 sm:w-4 h-48 sm:h-64 bg-gradient-to-b from-yellow-200 via-orange-500 to-red-600 rounded-full shadow-[0_0_20px_#ea580c]" />
              <div className="w-4 sm:w-5 h-56 sm:h-72 bg-gradient-to-b from-yellow-100 via-amber-400 to-red-600 rounded-full shadow-[0_0_25px_#f59e0b]" />
              <div className="w-3 sm:w-4 h-48 sm:h-64 bg-gradient-to-b from-yellow-200 via-orange-500 to-red-600 rounded-full shadow-[0_0_20px_#ea580c]" />
            </motion.div>
            {/* Comic Hit Spark */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.8, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 0.32, delay: 0.1 }}
              className="absolute w-24 h-24 bg-yellow-300 rounded-full blur-xs shadow-[0_0_40px_#facc15]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 3. CYBER LASER BEAM FX (Mega Cannon / Nine Lives Beam) */}
      <AnimatePresence>
        {activeFx === 'laser' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Wide Energy Wave */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="w-full h-20 sm:h-28 bg-gradient-to-r from-purple-600 via-cyan-400 to-pink-500 shadow-[0_0_40px_#06b6d4] will-change-transform"
            />
            {/* High-Intensity Laser Core */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1.15, 0.9], opacity: [0, 1, 0] }}
              transition={{ duration: 0.32 }}
              className="absolute w-full h-8 sm:h-12 bg-white shadow-[0_0_30px_#ffffff] will-change-transform"
            />
            {/* Impact Charging Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [0.2, 2.2], opacity: [1, 0] }}
              transition={{ duration: 0.4 }}
              className="absolute right-1/4 w-32 h-32 rounded-full border-4 border-cyan-200 shadow-[0_0_30px_#22d3ee]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 4. SHADOW STRIKE FX (Fish Shuriken / Void Strike / Thousand Claws) */}
      <AnimatePresence>
        {activeFx === 'shadow_strike' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Dimensional Dark Rift Slice */}
            <motion.div
              initial={{ scaleX: 0.1, scaleY: 0.05, rotate: -25, opacity: 0 }}
              animate={{ scaleX: [0.1, 1.6, 1.8], scaleY: [0.05, 1, 0], rotate: [-25, -20, -15], opacity: [0, 1, 0] }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="w-full h-16 bg-gradient-to-r from-cyan-400 via-purple-600 to-slate-950 shadow-[0_0_35px_#a855f7] will-change-transform"
            />
            {/* Spinning Fish Shurikens */}
            <motion.div
              initial={{ rotate: 0, scale: 0.3, opacity: 1, x: -150 }}
              animate={{ rotate: 720, scale: [0.3, 1.4, 0.8], opacity: [1, 1, 0], x: 150 }}
              transition={{ duration: 0.36, ease: "easeOut" }}
              className="absolute w-28 h-28 border-4 border-dashed border-cyan-300 rounded-full shadow-[0_0_30px_#06b6d4] will-change-transform flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-cyan-200">✦</span>
            </motion.div>
            {/* Secondary Cross Blade Slash */}
            <motion.div
              initial={{ scaleX: 0, rotate: 45, opacity: 0 }}
              animate={{ scaleX: [0, 1.4, 1.2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.32, delay: 0.08 }}
              className="absolute w-96 h-3 bg-cyan-300 shadow-[0_0_20px_#38bdf8] will-change-transform"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 5. THUNDER / ELECTRIC SHOCK FX (Electro Spark / Cyber Storm / Thunder Slam) */}
      <AnimatePresence>
        {activeFx === 'thunder' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Giant Lightning Bolt Striking Down */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: [0, 1.2, 1], opacity: [0, 1, 0.8, 0] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-b from-amber-200 via-yellow-400 to-cyan-300 shadow-[0_0_50px_#fde047] origin-top will-change-transform"
            />
            {/* Electric Zigzag Arcs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.6, 1.8] }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="absolute w-64 h-64 border-4 border-dashed border-yellow-300 rounded-full shadow-[0_0_35px_#facc15] will-change-transform"
            />
            {/* Ground EMP Shockwave Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [0.2, 2.5], opacity: [1, 0] }}
              transition={{ duration: 0.42, delay: 0.08 }}
              className="absolute w-44 h-24 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_#06b6d4] translate-y-24"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 6. ROCKET PUNCH / HEAVY KINETIC SLAM FX (Titan Bite / Heavy Charge / Iron Hook) */}
      <AnimatePresence>
        {activeFx === 'rocket_punch' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Thruster Sonic Wave Blast */}
            <motion.div
              initial={{ x: -140, scale: 0.5, opacity: 0 }}
              animate={{ x: [ -140, 20, 40], scale: [0.5, 1.5, 1.2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.34, ease: "easeOut" }}
              className="absolute w-36 h-36 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_40px_#f97316] will-change-transform flex items-center justify-center"
            >
              <div className="font-['Press_Start_2P'] text-black font-bold text-xs sm:text-sm tracking-wider">
                BAM!
              </div>
            </motion.div>
            {/* Sonic Shockwave Expansion Ring */}
            <motion.div
              initial={{ scale: 0.3, opacity: 1 }}
              animate={{ scale: [0.3, 2.2], opacity: [1, 0] }}
              transition={{ duration: 0.38, delay: 0.06 }}
              className="absolute w-56 h-56 rounded-full border-6 border-amber-300 shadow-[0_0_30px_#f59e0b] will-change-transform"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 7. EXPLOSION FX (Missile Barrage / Titan Overdrive) */}
      <AnimatePresence>
        {activeFx === 'explosion' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Core Fireball Expansion */}
            <motion.div
              initial={{ scale: 0.1, opacity: 1 }}
              animate={{ scale: [0.1, 2.8], opacity: [1, 0.9, 0] }}
              transition={{ duration: 0.44, ease: "easeOut" }}
              className="w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_60px_#ef4444] will-change-transform flex items-center justify-center"
            >
              <div className="font-['Press_Start_2P'] text-white font-bold text-sm sm:text-lg tracking-widest drop-shadow-[0_2px_4px_#000]">
                BOOM!
              </div>
            </motion.div>
            {/* Secondary Blast Halo Ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: [0.2, 3.2], opacity: [1, 0] }}
              transition={{ duration: 0.48, delay: 0.05 }}
              className="absolute w-64 h-64 rounded-full border-4 border-yellow-200 shadow-[0_0_35px_#facc15] will-change-transform"
            />
          </div>
        )}
      </AnimatePresence>

      {/* 8. GUARD SHIELD FX (Defend / Titanium Plating / Nano Barrier) */}
      <AnimatePresence>
        {activeFx === 'guard_shield' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Hexagonal Forcefield Bubble */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="w-56 sm:w-72 h-56 sm:h-72 rounded-full border-4 border-cyan-300 bg-cyan-950/70 shadow-[0_0_40px_#38bdf8] flex flex-col items-center justify-center will-change-transform"
            >
              <div className="text-cyan-200 font-['Press_Start_2P'] text-xs sm:text-sm tracking-widest mb-1">
                🛡️ GUARD!
              </div>
              <div className="text-[10px] text-cyan-300 font-mono tracking-wider">
                DEFENSE MATRIX +35%
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. HEALING / RECOVERY FX (Adrenaline / Nanite Repair) */}
      <AnimatePresence>
        {activeFx === 'healing' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ascending Emerald Pulse */}
            <motion.div
              initial={{ y: 60, scale: 0.5, opacity: 0 }}
              animate={{ y: [60, -40, -80], scale: [0.5, 1.3, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-48 sm:w-64 h-48 sm:h-64 rounded-full border-4 border-emerald-400 bg-emerald-950/50 shadow-[0_0_40px_#10b981] flex flex-col items-center justify-center will-change-transform"
            >
              <div className="text-emerald-200 font-['Press_Start_2P'] text-xs sm:text-sm tracking-widest mb-1">
                💚 REPAIR
              </div>
              <div className="text-[10px] text-emerald-300 font-mono">
                NANITE RESTORE
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. ARCADE ACTION MOVE CALLOUT BANNER */}
      <AnimatePresence>
        {bannerText && (
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none px-4">
            {(() => {
              const isUlt = bannerText.includes('ULTIMATE');
              let borderColor = 'border-cyan-400';
              let shadowColor = 'shadow-[0_0_20px_#06b6d4]';
              let textColor = 'text-cyan-300';
              let tagBg = 'bg-cyan-950/80 border-cyan-700';

              if (isUlt) {
                borderColor = 'border-yellow-400';
                shadowColor = 'shadow-[0_0_30px_#eab308]';
                textColor = 'text-yellow-300';
                tagBg = 'bg-amber-950/90 border-amber-500';
              } else if (bannerText.startsWith('ENEMY')) {
                borderColor = 'border-rose-500';
                shadowColor = 'shadow-[0_0_25px_#f43f5e]';
                textColor = 'text-rose-300';
                tagBg = 'bg-rose-950/90 border-rose-600';
              }

              return (
                <motion.div
                  initial={{ scale: 0.75, y: 15, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 1.08, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`px-4 py-2.5 sm:px-8 sm:py-3.5 bg-slate-950/95 border-2 sm:border-3 ${borderColor} ${shadowColor} rounded-xl text-center will-change-transform max-w-[90vw]`}
                >
                  <div className={`font-['Press_Start_2P'] ${textColor} ${isUlt ? 'animate-text-glow' : ''} text-xs sm:text-base md:text-xl drop-shadow-md relative z-10 break-words leading-relaxed`}>
                    {bannerText}
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-1 relative z-10">
                    <span className={`text-[8px] sm:text-[10px] font-['Silkscreen'] px-2 py-0.5 rounded border ${tagBg} text-slate-200 tracking-wider`}>
                      {isUlt ? '★ SPECIAL OVERDRIVE MOVE ★' : 'TACTICAL SKILL EXECUTION'}
                    </span>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
