import React from 'react';
import { motion } from 'motion/react';
import { ArenaMap } from '../types';
import { MAPS } from '../data/gameData';
import { playSelectSound } from '../utils/audio';
import { ArrowLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

interface MapSelectProps {
  onSelectMap: (map: ArenaMap) => void;
  onBack: () => void;
}

export const MapSelect: React.FC<MapSelectProps> = ({ onSelectMap, onBack }) => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number>(0);

  const handleSelect = (map: ArenaMap) => {
    playSelectSound();
    onSelectMap(map);
  };

  return (
    <div className="relative flex-1 flex flex-col h-full select-none overflow-hidden min-h-0 bg-slate-950 text-slate-100 justify-between">
      
      {/* Top Header Bar - Compact */}
      <div className="flex-shrink-0 z-20 flex items-center justify-between px-3 py-2 sm:px-6 sm:py-2.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <button
          onClick={() => {
            playSelectSound();
            onBack();
          }}
          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-slate-300" />
          <span className="font-bold text-xs text-slate-300">BACK</span>
        </button>

        <div className="text-center font-['Press_Start_2P'] text-xs sm:text-sm text-cyan-400 drop-shadow flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>CHOOSE BATTLEGROUND</span>
        </div>

        <div className="text-[10px] text-slate-400 hidden sm:flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded border border-slate-800">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>6 ARENAS</span>
        </div>
      </div>

      {/* Grid Container - Fitted to Window without Scroll */}
      <div className="flex-1 min-h-0 p-2 sm:p-4 flex items-center justify-center overflow-y-auto sm:overflow-hidden custom-scrollbar">
        <div className="grid grid-cols-2 landscape:grid-cols-3 md:grid-cols-3 gap-1.5 sm:gap-3.5 max-w-6xl w-full content-center">
          {MAPS.map((map, idx) => {
            const isSelected = hoveredIdx === idx;
            const isReal = !!map.isRealEnvironment;

            return (
              <motion.div
                key={map.id}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => handleSelect(map)}
                className={`relative rounded-xl sm:rounded-2xl p-1.5 sm:p-3 border-2 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group min-h-[95px] sm:min-h-[110px] max-h-[185px] ${
                  isSelected
                    ? 'border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.45)] ring-1 ring-cyan-400/50 scale-[1.02] z-10'
                    : 'border-slate-800/80 hover:border-slate-600 bg-slate-900/80'
                }`}
              >
                {/* Background Atmosphere / Real Photo Backdrop */}
                {isReal && map.realBgImage ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${map.realBgImage})` }}
                  >
                    {/* Natural ambient dark vignette for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/40" />
                  </div>
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${map.bgGradient} opacity-40 group-hover:opacity-60 transition-opacity`}
                  />
                )}

                {/* Top Info Badge & Emoji */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-2xl sm:text-3xl drop-shadow-md group-hover:scale-110 transition-transform">
                    {map.emoji}
                  </span>

                  {isReal ? (
                    <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 bg-emerald-950/90 text-emerald-300 rounded border border-emerald-600/60 shadow-sm flex items-center space-x-1">
                      <span>🍃 REAL NATURE</span>
                    </span>
                  ) : (
                    <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 bg-cyan-950/80 text-cyan-300 rounded border border-cyan-800/50">
                      CYBER
                    </span>
                  )}
                </div>

                {/* Center Title & Tagline */}
                <div className="relative z-10 my-0.5">
                  <h3 className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-white truncate drop-shadow">
                    {map.name}
                  </h3>
                  <div className="text-[9px] sm:text-[10px] text-slate-300 font-medium truncate mt-0.5">
                    {map.tagline}
                  </div>
                  <p className="text-[8px] sm:text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                    {map.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="relative z-10 mt-1">
                  <button
                    id={`btn-select-map-${map.id}`}
                    className={`w-full py-1 sm:py-1.5 rounded-lg font-bold text-[9px] sm:text-[10px] transition-all flex items-center justify-center space-x-1 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_2px_0_rgb(6,182,212)]'
                        : 'bg-slate-800/90 text-slate-300 group-hover:bg-slate-700'
                    }`}
                  >
                    <span>SELECT ARENA</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
