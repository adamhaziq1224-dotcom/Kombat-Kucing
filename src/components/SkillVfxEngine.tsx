import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface SkillVfxEngineProps {
  activeFx: string; // e.g., 'embercub_light', 'tidefin_ult'
  flashColor: string | null;
  bannerText: string | null;
}

export const SkillVfxEngine: React.FC<SkillVfxEngineProps> = ({ activeFx, flashColor, bannerText }) => {
  const parts = activeFx.split('_');
  const charId = parts[0];
  const skillType = parts.length > 1 ? parts.slice(1).join('_') : 'none';

  const elementMap: Record<string, string> = {
    embercub: 'fire',
    tidefin: 'water',
    thornox: 'nature',
    zappit: 'electric',
    frostbit: 'ice',
    gravox: 'dark',
    lumina: 'light',
    terrabun: 'earth',
    mystwing: 'psychic',
    aquadrake: 'dragon'
  };

  const element = elementMap[charId] || 'neutral';

  const renderParticles = (count: number, color: string, spread: number) => (
    [...Array(count)].map((_, i) => (
      <motion.div key={`p-${i}`}
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{ 
          x: (Math.random() - 0.5) * spread, 
          y: (Math.random() - 0.5) * spread, 
          opacity: 0,
          scale: 0
        }}
        transition={{ duration: 0.5 + Math.random() * 0.3, ease: 'easeOut' }}
        className={`absolute w-3 h-3 rounded-full ${color} mix-blend-screen blur-[1px]`}
      />
    ))
  );

  const getElementColor = (el: string) => {
    switch(el) {
      case 'fire': return 'bg-red-500';
      case 'water': return 'bg-blue-500';
      case 'nature': return 'bg-green-500';
      case 'electric': return 'bg-yellow-400';
      case 'ice': return 'bg-cyan-300';
      case 'dark': return 'bg-purple-800';
      case 'light': return 'bg-yellow-200';
      case 'earth': return 'bg-amber-700';
      case 'psychic': return 'bg-fuchsia-500';
      case 'dragon': return 'bg-blue-600';
      default: return 'bg-slate-400';
    }
  };

  const getElementEmoji = (el: string) => {
    switch(el) {
      case 'fire': return '🔥';
      case 'water': return '🌊';
      case 'nature': return '🌿';
      case 'electric': return '⚡';
      case 'ice': return '❄️';
      case 'dark': return '🌑';
      case 'light': return '✨';
      case 'earth': return '🪨';
      case 'psychic': return '🔮';
      case 'dragon': return '🐉';
      default: return '💥';
    }
  };

  const c = getElementColor(element);
  const em = getElementEmoji(element);

  const renderVfx = () => {
    if (element === 'fire') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{ scale: [0, 4, 6], opacity: [0, 1, 0], y: -50 }}
              transition={{ duration: 1.5 }}
              className="absolute w-40 h-80 bg-red-600 blur-2xl mix-blend-screen rounded-t-full"
            />
            {[...Array(15)].map((_, i) => (
              <motion.div key={i}
                initial={{ scale: 1, y: 0, x: (Math.random()-0.5)*200, opacity: 1 }}
                animate={{ scale: 3, y: -400, opacity: 0 }}
                transition={{ duration: 0.8 + Math.random()*0.5, ease: 'easeOut' }}
                className="absolute text-6xl drop-shadow-2xl"
              >🔥</motion.div>
            ))}
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 1, rotate: -45, opacity: 1 }}
              animate={{ scale: 3, rotate: 45, opacity: 0, x: 200 }}
              transition={{ duration: 0.4 }}
              className="absolute w-64 h-16 bg-orange-500 rounded-full blur-md mix-blend-screen"
            />
            {renderParticles(20, 'bg-red-500', 300)}
          </div>
        );
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, x: -100 }}
            animate={{ scale: 1.5, x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-5xl"
          >🔥</motion.div>
        </div>
      );
    }

    if (element === 'water') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: -50, opacity: [0, 1, 0], scaleX: [1, 1.5, 2] }}
              transition={{ duration: 1.2 }}
              className="absolute w-full h-96 bg-blue-500 blur-3xl mix-blend-screen rounded-t-[100%]"
            />
            {[...Array(10)].map((_, i) => (
              <motion.div key={i}
                initial={{ scale: 1, y: 100, x: (Math.random()-0.5)*300, opacity: 1 }}
                animate={{ scale: 3, y: -300, opacity: 0 }}
                transition={{ duration: 1 + Math.random()*0.5, ease: 'easeOut' }}
                className="absolute text-6xl drop-shadow-2xl"
              >🌊</motion.div>
            ))}
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
             <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-40 h-40 border-[16px] border-cyan-400 rounded-full mix-blend-screen blur-sm"
             />
             {renderParticles(20, 'bg-blue-400', 250)}
          </div>
        );
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, y: -100 }}
            animate={{ scale: 2, y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-5xl"
          >💧</motion.div>
        </div>
      );
    }

    if (element === 'electric') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
               <motion.div key={i}
                 initial={{ scale: 1, opacity: 1, rotate: Math.random()*360 }}
                 animate={{ scale: [1, 3], opacity: 0, rotate: Math.random()*360 }}
                 transition={{ duration: 0.4, delay: i * 0.1 }}
                 className="absolute w-80 h-4 bg-yellow-300 blur-sm mix-blend-screen"
               />
            ))}
            <motion.div
              initial={{ scale: 5, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute text-8xl"
            >⚡</motion.div>
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {[...Array(3)].map((_, i) => (
               <motion.div key={i}
                 initial={{ opacity: 1, scale: 0.5, rotate: (i*45) }}
                 animate={{ opacity: 0, scale: 2.5 }}
                 transition={{ duration: 0.2, delay: i*0.05 }}
                 className="absolute w-64 h-8 bg-yellow-400 mix-blend-screen blur-md"
               />
             ))}
             {renderParticles(15, 'bg-yellow-200', 200)}
          </div>
        );
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
             initial={{ scale: 2, opacity: 1 }}
             animate={{ scale: 0.5, opacity: 0, rotate: 180 }}
             transition={{ duration: 0.2 }}
             className="absolute text-5xl"
          >⚡</motion.div>
        </div>
      );
    }

    if (element === 'ice') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 4, 6], rotate: 180, opacity: [0, 1, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute w-64 h-64 border-8 border-cyan-200 rounded-lg blur-md mix-blend-screen"
            />
            {[...Array(12)].map((_, i) => (
              <motion.div key={i}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{ scale: 2, x: (Math.random()-0.5)*400, y: (Math.random()-0.5)*400, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute text-5xl drop-shadow-2xl"
              >❄️</motion.div>
            ))}
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 3, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4 }}
              className="absolute text-8xl blur-sm"
            >❄️</motion.div>
          </div>
        );
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, y: -100 }}
            animate={{ scale: 2, y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-32 h-4 bg-cyan-200 blur-sm mix-blend-screen"
          />
        </div>
      );
    }
    
    if (element === 'nature') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div key={i}
                initial={{ scale: 0, y: 200, opacity: 1, rotate: (Math.random()-0.5)*60 }}
                animate={{ scale: [0, 3], y: -200, opacity: 0 }}
                transition={{ duration: 1.2, delay: i * 0.1 }}
                className="absolute w-8 h-40 bg-green-500 rounded-full blur-md mix-blend-screen origin-bottom"
              />
            ))}
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="absolute text-6xl"
            >🌿</motion.div>
          </div>
        );
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {renderParticles(15, 'bg-green-400', 150)}
        </div>
      );
    }

    if (element === 'dark') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 8, opacity: [1, 1, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute w-32 h-32 bg-purple-900 rounded-full blur-xl mix-blend-multiply"
            />
            <motion.div
              initial={{ scale: 5, opacity: 0, rotate: 360 }}
              animate={{ scale: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="absolute text-8xl"
            >🌑</motion.div>
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div
               initial={{ scale: 0, opacity: 1 }}
               animate={{ scale: [0, 4, 0], opacity: 0 }}
               transition={{ duration: 0.6 }}
               className="absolute w-40 h-40 border-8 border-purple-600 rounded-full blur-md mix-blend-difference"
             />
          </div>
        );
      }
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
             initial={{ scale: 2, opacity: 1, rotate: 45 }}
             animate={{ scale: 0, opacity: 0, rotate: -45 }}
             transition={{ duration: 0.3 }}
             className="absolute w-32 h-8 bg-purple-800 blur-md mix-blend-screen"
          />
        </div>
      );
    }
    
    if (element === 'light') {
      if (skillType === 'ultimate') {
        return (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div
               initial={{ scale: 0, opacity: 1 }}
               animate={{ scale: 15, opacity: 0 }}
               transition={{ duration: 1.5 }}
               className="absolute w-20 h-20 bg-white rounded-full blur-2xl mix-blend-screen"
             />
             <motion.div
               initial={{ scale: 0, opacity: 0, rotate: 0 }}
               animate={{ scale: [0, 5, 0], opacity: [0, 1, 0], rotate: 180 }}
               transition={{ duration: 1.2 }}
               className="absolute text-9xl"
             >✨</motion.div>
           </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {[...Array(4)].map((_, i) => (
                <motion.div key={i}
                  initial={{ scale: 0, opacity: 1, rotate: i*45 }}
                  animate={{ scale: 5, opacity: 0, rotate: i*45 + 90 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-2 h-40 bg-yellow-100 blur-sm mix-blend-screen"
                />
             ))}
          </div>
        );
      }
      return (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-20 h-20 bg-yellow-200 rounded-full blur-md mix-blend-screen"
            />
         </div>
      );
    }

    if (element === 'dragon') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, x: -300, y: 200 }}
              animate={{ scale: [0, 3, 5], x: [ -300, 0, 300 ], y: [ 200, 0, -200 ], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute text-[120px] drop-shadow-2xl"
            >🐉</motion.div>
            {renderParticles(40, 'bg-blue-600', 500)}
          </div>
        );
      }
    }

    if (element === 'earth') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i}
                initial={{ scale: 1, y: 200, opacity: 0 }}
                animate={{ scale: [1, 4], y: -50 - (i*20), opacity: [0, 1, 0] }}
                transition={{ duration: 1.0, delay: i*0.15 }}
                className="absolute text-8xl"
              >🪨</motion.div>
            ))}
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div
               initial={{ scale: 0, y: -200, opacity: 1 }}
               animate={{ scale: 4, y: 50, opacity: 0 }}
               transition={{ duration: 0.4 }}
               className="absolute text-8xl"
             >🪨</motion.div>
          </div>
        );
      }
    }

    if (element === 'psychic') {
      if (skillType === 'ultimate') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div
               initial={{ scale: 0, opacity: 1, rotate: 0 }}
               animate={{ scale: 10, opacity: 0, rotate: 360 }}
               transition={{ duration: 1.5 }}
               className="absolute w-40 h-40 border-dashed border-4 border-fuchsia-500 rounded-full mix-blend-screen"
             />
             <motion.div
               initial={{ scale: 5, opacity: 0 }}
               animate={{ scale: 0, opacity: 1 }}
               transition={{ duration: 1 }}
               className="absolute text-[120px]"
             >🔮</motion.div>
          </div>
        );
      }
      if (skillType === 'combo' || skillType === 'heavy') {
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 5, 0], opacity: [1, 0.5, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute w-32 h-32 bg-fuchsia-500 rounded-full blur-xl mix-blend-screen"
            />
          </div>
        );
      }
    }

    // FALLBACK GENERIC SCRIPTS (For original/legacy heroes)
    if (skillType === 'gen1' || skillType === 'gen2' || skillType === 'light' || skillType === 'tactical' || skillType === 'fast') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 1, rotate: -45 }}
            animate={{ scale: 1.5, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.3 }}
            className={`absolute w-48 h-10 ${c} rounded-full blur-md mix-blend-screen`}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`absolute w-32 h-32 ${c} rounded-full blur-lg opacity-50`}
          />
          {renderParticles(8, c, 150)}
        </div>
      );
    }
    
    if (skillType === 'heavy') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.2, opacity: 0, y: -200 }}
            animate={{ scale: [0.2, 2.5, 0], opacity: [0, 1, 0], y: 50 }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
            className={`absolute w-72 h-72 ${c} rounded-full blur-2xl mix-blend-screen opacity-80`}
          />
          {renderParticles(20, c, 300)}
        </div>
      );
    }

    if (skillType === 'combo') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(6)].map((_, i) => (
             <motion.div key={i}
               initial={{ scale: 0.2, x: (Math.random()-0.5)*300, y: (Math.random()-0.5)*300, opacity: 0 }}
               animate={{ scale: 1.5, opacity: [0, 1, 0] }}
               transition={{ duration: 0.2, delay: i * 0.08 }}
               className={`absolute w-40 h-40 ${c} rounded-full blur-xl mix-blend-screen`}
             />
          ))}
        </div>
      );
    }

    if (skillType === 'ultimate' || skillType === 'ult') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: [0, 8, 12], opacity: [0, 1, 0], rotate: 360 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className={`w-[400px] h-[400px] ${c} rounded-full blur-3xl mix-blend-screen`}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 4], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
            className={`absolute w-[200px] h-[200px] bg-white rounded-full blur-xl mix-blend-screen`}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -100 }}
            animate={{ scale: [0, 2.5, 3], opacity: [0, 1, 0], y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute text-[120px] drop-shadow-2xl"
          >
            {em}
          </motion.div>
          {renderParticles(50, c, 600)}
        </div>
      );
    }

    // Fallback for generic legacy fx like 'thunder', 'healing', 'explosion'
    return (
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`absolute w-40 h-40 bg-white rounded-full blur-lg opacity-50 mix-blend-screen`}
          />
       </div>
    );
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden select-none flex items-center justify-center">
      {flashColor && (
        <div
          className="absolute inset-0 transition-opacity duration-150 pointer-events-none"
          style={{ backgroundColor: flashColor, opacity: 0.28 }}
        />
      )}
      <AnimatePresence>
        {activeFx !== 'none' && renderVfx()}
      </AnimatePresence>
    </div>
  );
};
