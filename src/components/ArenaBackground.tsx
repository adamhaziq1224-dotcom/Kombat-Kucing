import React from 'react';
import { motion } from 'motion/react';
import { ArenaMap } from '../types';

interface ArenaBackgroundProps {
  map: ArenaMap;
}

const RainEffect = ({ intensity = 20 }: { intensity?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
    {[...Array(intensity)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 0 }}
        animate={{ 
          y: window.innerHeight + 100, 
          x: `+=${Math.random() * 50 - 25}`,
          opacity: [0, 0.5, 0.2]
        }}
        transition={{
          duration: 0.5 + Math.random() * 0.3,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2
        }}
        className="absolute w-[1px] h-8 sm:h-12 bg-cyan-200/40 rotate-[15deg]"
        style={{
          left: `${(i / intensity) * 100}%`
        }}
      />
    ))}
  </div>
);

const FloatingEmbers = ({ intensity = 15 }: { intensity?: number }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
    {[...Array(intensity)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          y: window.innerHeight, 
          x: Math.random() * window.innerWidth,
          opacity: 0,
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{ 
          y: -100, 
          x: `+=${Math.random() * 100 - 50}`,
          opacity: [0, 0.8, 0],
          rotate: Math.random() * 360
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 3
        }}
        className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]"
        style={{
          left: `${(i / intensity) * 100}%`
        }}
      />
    ))}
  </div>
);

export const ArenaBackground: React.FC<ArenaBackgroundProps> = ({ map }) => {
  const mapId = map.id || 'cyberpunk_city';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Base Gradient Layer */}
      <div className={`absolute inset-0 bg-gradient-to-b ${map.bgGradient} opacity-90`} />

      {/* 1. CYBERPUNK NEON METROPOLIS */}
      {mapId === 'cyberpunk_city' && (
        <div className="absolute inset-0 flex flex-col justify-between">
          <RainEffect intensity={30} />
          {/* Distant Skyscrapers Skyline */}
          <div className="absolute top-0 inset-x-0 h-2/3 flex items-end justify-between opacity-40 px-2">
            <div className="w-16 h-48 bg-slate-900 border-t-2 border-x border-cyan-500/40 flex flex-col justify-around p-1">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
                  className="h-2 bg-cyan-400/50 w-full rounded-xs" 
                />
              ))}
            </div>
            <div className="w-24 h-64 bg-indigo-950 border-t-2 border-x border-purple-500/50 flex flex-wrap gap-1 p-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-3 w-4 bg-yellow-400/60 rounded-xs" />
              ))}
            </div>
            <div className="w-28 h-56 bg-slate-950 border-t-2 border-x border-pink-500/50 flex flex-col items-center justify-around p-2">
              <motion.div 
                animate={{ opacity: [1, 0.2, 1, 1, 0.5, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="font-['Press_Start_2P'] text-[8px] text-pink-400 text-center"
              >
                CYBER<br />TUNA
              </motion.div>
              <div className="w-full h-1 bg-pink-500/80 shadow-[0_0_10px_#ec4899]" />
              <div className="w-full h-1 bg-pink-500/80 shadow-[0_0_10px_#ec4899]" />
            </div>
            <div className="w-20 h-72 bg-slate-900 border-t-2 border-x border-cyan-400/40 flex flex-wrap gap-1.5 p-2">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="h-2 w-3 bg-cyan-300/70" />
              ))}
            </div>
            <div className="w-16 h-40 bg-indigo-900 border-t-2 border-x border-purple-400/40" />
          </div>

          {/* Flying Speeder Cars Animation */}
          <motion.div
            initial={{ x: '-10%' }}
            animate={{ x: '110%' }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 z-10 flex items-center space-x-1"
          >
            <div className="w-8 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]" />
            <div className="w-12 h-0.5 bg-cyan-300/80" />
          </motion.div>

          <motion.div
            initial={{ x: '110%' }}
            animate={{ x: '-10%' }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 3 }}
            className="absolute top-1/3 z-10 flex items-center space-x-1 flex-row-reverse"
          >
            <div className="w-10 h-2 bg-rose-500 rounded-full shadow-[0_0_12px_#f43f5e]" />
            <div className="w-16 h-0.5 bg-rose-400/80" />
          </motion.div>

          {/* Giant Neon Billboard Banner in Sky */}
          <motion.div 
            animate={{ opacity: [1, 0.8, 1, 0.9, 1, 0.5, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-xl bg-black/80 border-2 border-cyan-400 shadow-[0_0_20px_#06b6d4] flex items-center space-x-3"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-yellow-300 drop-shadow-[0_0_8px_#eab308]">
              🌃 CYBER METROPOLIS ARENA
            </span>
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          </motion.div>

          {/* Perspective Grid Floor */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent border-t-2 border-cyan-400/60 shadow-[0_-10px_30px_rgba(6,182,212,0.3)]">
            <motion.div 
              animate={{ backgroundPosition: ['0px 0px', '0px 20px'] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full opacity-40 bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)] bg-[size:40px_20px] [transform:perspective(500px)_rotateX(60deg)] origin-top" 
            />
          </div>
        </div>
      )}

      {/* 2. BACK ALLEY GANG HIDEOUT */}
      {mapId === 'back_alley' && (
        <div className="absolute inset-0 flex flex-col justify-between">
          <RainEffect intensity={20} />
          {/* Brick Wall & Fences */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Brick Wall Texture Graphic */}
          <div className="absolute top-0 inset-x-0 h-3/4 border-b-4 border-stone-800 flex flex-col justify-around p-4 opacity-50">
            {/* Gang Graffiti Tags */}
            <div className="flex justify-between items-center px-8">
              <div className="font-['Press_Start_2P'] text-xs text-rose-500 -rotate-6 drop-shadow-[0_0_10px_#f43f5e] bg-black/60 p-2 rounded border border-rose-800">
                🐾 OYEN CATS TURF
              </div>
              {/* Hanging Lantern */}
              <div className="flex flex-col items-center animate-bounce">
                <div className="w-0.5 h-12 bg-amber-600" />
                <motion.div 
                  animate={{ opacity: [1, 0.7, 1, 0.5, 1, 0.9, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-3 py-2 bg-amber-500 rounded-lg text-black font-['Press_Start_2P'] text-[9px] font-bold shadow-[0_0_20px_#f59e0b]"
                >
                  🏮 居酒屋
                </motion.div>
              </div>
              <div className="font-['Press_Start_2P'] text-xs text-emerald-400 rotate-6 drop-shadow-[0_0_10px_#10b981] bg-black/60 p-2 rounded border border-emerald-800">
                ⚡ NO DOGS ALLOWED!
              </div>
            </div>

            {/* Steaming Cyber Pipes */}
            <div className="w-full h-4 bg-stone-700 border-y border-stone-500 flex justify-around items-center">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-5, -25], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-6 h-6 rounded-full bg-emerald-300/30 blur-sm"
                />
              ))}
            </div>
          </div>

          {/* Wet Alley Pavement Floor */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-stone-950 via-stone-900 to-transparent border-t-2 border-emerald-500/70 shadow-[0_-10px_30px_rgba(16,185,129,0.25)]">
            {/* Neon Puddle Reflections */}
            <div className="absolute bottom-8 left-1/4 w-40 h-8 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
            <div className="absolute bottom-12 right-1/4 w-48 h-10 rounded-full bg-amber-500/20 blur-md animate-pulse" />
          </div>
        </div>
      )}

      {/* 3. MEGACORP TOWER ROOFTOP */}
      {mapId === 'rooftop_helipad' && (
        <div className="absolute inset-0 flex flex-col justify-between">
          <RainEffect intensity={40} />
          {/* Storm Lightning Flash Simulation */}
          <motion.div
            animate={{ opacity: [0, 0.25, 0, 0.4, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-fuchsia-500 pointer-events-none mix-blend-screen"
          />

          {/* Megacorp Sky Backdrop */}
          <div className="absolute top-4 inset-x-0 flex justify-between px-8 opacity-60">
            {/* Blinking Red Beacons */}
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping shadow-[0_0_10px_#f43f5e]" />
              <span className="font-['Silkscreen'] text-xs text-fuchsia-300">MEGACORP TOWER ALPHA</span>
            </div>
            <div className="font-['Press_Start_2P'] text-[10px] text-pink-400">
              ELEVATION: 2,400M
            </div>
          </div>

          {/* Rooftop Air Ducts */}
          <div className="absolute top-16 inset-x-0 flex justify-around items-end opacity-40 px-12">
            <div className="w-16 h-20 bg-neutral-900 border border-fuchsia-500/40 rounded-t-lg flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-fuchsia-400 animate-spin border-t-transparent" />
            </div>
            <div className="w-24 h-28 bg-neutral-900 border border-pink-500/40 rounded-t-lg flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-pink-400 animate-spin border-t-transparent" />
            </div>
          </div>

          {/* Concrete Helipad Deck Floor */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black via-slate-950 to-transparent border-t-2 border-fuchsia-500/80 shadow-[0_-10px_35px_rgba(217,70,239,0.35)] flex items-center justify-center">
            {/* Helipad 'H' Landing Circle */}
            <div className="w-48 h-24 sm:w-64 sm:h-32 rounded-[100%] border-4 border-yellow-400/60 flex items-center justify-center shadow-[0_0_20px_#eab308] [transform:rotateX(65deg)]">
              <span className="font-['Press_Start_2P'] text-3xl sm:text-4xl text-yellow-300 font-bold opacity-80">
                H
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. UNDERGROUND CYBER CORE */}
      {mapId === 'power_core' && (
        <div className="absolute inset-0 flex flex-col justify-between">
          <FloatingEmbers intensity={20} />
          {/* Pulsing Fusion Reactor Core in Center */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-40 h-40 sm:w-56 sm:h-56 rounded-full border-4 border-dashed border-cyan-400/60 flex items-center justify-center shadow-[0_0_50px_#06b6d4]"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cyan-400/30 blur-md animate-pulse" />
            </motion.div>
          </div>

          {/* High Voltage Energy Pipes */}
          <div className="absolute top-8 inset-x-0 flex justify-between px-4 opacity-70">
            <div className="font-['Press_Start_2P'] text-[9px] text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded border border-cyan-500">
              ⚡ FUSION CORE ONLINE: 99.8%
            </div>
            <div className="font-['Press_Start_2P'] text-[9px] text-yellow-400 bg-amber-950/80 px-3 py-1.5 rounded border border-amber-500 animate-pulse">
              ⚠️ HIGH VOLTAGE HAZARD
            </div>
          </div>

          {/* Grating Floor with Hazard Stripes */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-900 to-transparent border-t-4 border-cyan-400 shadow-[0_-10px_35px_rgba(6,182,212,0.4)]">
            {/* Caution Stripe Bar */}
            <div className="w-full h-3 bg-[repeating-linear-gradient(45deg,#eab308,#eab308_10px,#000_10px,#000_20px)] border-b border-cyan-500" />
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
        </div>
      )}

      {/* 5. TROPICAL BEACH ARENA (REAL NATURAL ENVIRONMENT - NO CYBER/GAME EFFECTS) */}
      {mapId === 'beach_coast' && (
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden">
          {/* Real High-Resolution Landscape Photography Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
            style={{
              backgroundImage: `url(${map.realBgImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'})`
            }}
          />

          {/* Natural Sunlit Atmosphere & Gentle Sea Haze */}
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/40 via-transparent to-amber-100/10 pointer-events-none" />

          {/* Natural Sunlight Flare & Caustics Shimmer */}
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/25 via-yellow-100/10 to-transparent blur-3xl pointer-events-none"
          />

          {/* Gentle Natural Ocean Breeze & Rolling Waves Ambience */}
          <motion.div
            animate={{ y: [0, -6, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-12 inset-x-0 h-28 bg-gradient-to-t from-cyan-400/20 via-teal-300/10 to-transparent blur-sm pointer-events-none"
          />

          {/* Natural Sand & Shoreline Ground Shadow */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-amber-950/70 via-stone-900/30 to-transparent pointer-events-none" />
        </div>
      )}

      {/* 6. DEEP JUNGLE SANCTUARY (REAL NATURAL ENVIRONMENT - NO CYBER/GAME EFFECTS) */}
      {mapId === 'jungle_sanctuary' && (
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden">
          {/* Real High-Resolution Rainforest Photography Layer */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
            style={{
              backgroundImage: `url(${map.realBgImage || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80'})`
            }}
          />

          {/* Deep Forest Canopy Shadow & Natural Mist */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-slate-950/20 to-emerald-900/20 pointer-events-none" />

          {/* Dappled Sunbeams filtering through natural leaves */}
          <motion.div
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-1/4 w-80 h-full bg-gradient-to-b from-yellow-100/15 via-emerald-200/10 to-transparent [transform:skewX(-20deg)] blur-2xl pointer-events-none"
          />

          {/* Floating Spores / Jungle Atmosphere Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, 400],
                  x: [0, (i % 2 === 0 ? 30 : -30)],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: 'linear'
                }}
                className="absolute w-2 h-2 rounded-full bg-emerald-300/40 blur-[1px]"
                style={{ left: `${15 + i * 14}%`, top: '-10px' }}
              />
            ))}
          </div>

          {/* Natural Rainforest Ground Shadow */}
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-stone-950/80 via-emerald-950/40 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Stage Spotlight / Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />
    </div>
  );
};
