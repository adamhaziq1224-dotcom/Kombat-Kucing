import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Map, MapPin, Skull, Trophy, ChevronRight, Lock } from 'lucide-react';
import { playSelectSound } from '../utils/audio';

interface StoryMapScreenProps {
  onSelectNode: (nodeIndex: number) => void;
  onBack: () => void;
}

export const StoryMapScreen: React.FC<StoryMapScreenProps> = ({ onSelectNode, onBack }) => {
  const [currentNode, setCurrentNode] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem('storyProgress');
    if (savedProgress) {
      setCurrentNode(parseInt(savedProgress, 10));
    }
  }, []);

  const nodes = [
    { name: 'Sector 1: Neon Alleys', icon: <MapPin />, enemy: 'Cyber Punk', color: 'text-cyan-400' },
    { name: 'Sector 2: Scrap Yard', icon: <MapPin />, enemy: 'Mecha Scrapper', color: 'text-emerald-400' },
    { name: 'Sector 3: High-Rise', icon: <MapPin />, enemy: 'Rooftop Ninja', color: 'text-purple-400' },
    { name: 'Sector 4: Final Core', icon: <Skull />, enemy: 'Giga-Hound', color: 'text-red-500' }
  ];

  const handleSelect = (idx: number) => {
    if (idx <= currentNode) {
      playSelectSound();
      onSelectNode(idx);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-neutral-900/90 border-2 border-cyan-500/50 p-8 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] w-full relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%)] bg-[length:4px_4px]" />
        
        <h2 className="text-2xl font-['Press_Start_2P'] text-cyan-400 mb-8 flex items-center justify-center gap-3 relative z-10">
          <Map className="w-8 h-8" />
          STORY JOURNEY
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 my-12">
          {nodes.map((node, idx) => {
            const isUnlocked = idx <= currentNode;
            const isCurrent = idx === currentNode;
            
            return (
              <React.Fragment key={idx}>
                <motion.div
                  whileHover={isUnlocked ? { scale: 1.1 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  onClick={() => handleSelect(idx)}
                  className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 w-full md:w-1/4 ${
                    isCurrent 
                      ? 'bg-cyan-950/50 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                      : isUnlocked 
                        ? 'bg-neutral-800 border-2 border-neutral-600 hover:border-cyan-400' 
                        : 'bg-neutral-950 border-2 border-neutral-800 opacity-50 grayscale'
                  }`}
                >
                  <div className={`mb-3 ${isUnlocked ? node.color : 'text-neutral-500'}`}>
                    {isUnlocked ? node.icon : <Lock />}
                  </div>
                  <h3 className="font-['Silkscreen'] text-sm mb-1 text-center text-white">{node.name}</h3>
                  <p className="text-[10px] text-neutral-400 font-['Press_Start_2P'] text-center">
                    {isUnlocked ? `VS: ${node.enemy}` : 'LOCKED'}
                  </p>
                  
                  {isCurrent && (
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="absolute -top-6 text-yellow-400 font-['Press_Start_2P'] text-[10px]"
                    >
                      YOU ARE HERE
                    </motion.div>
                  )}
                </motion.div>

                {idx < nodes.length - 1 && (
                  <div className={`hidden md:block w-12 h-1 ${isUnlocked && idx < currentNode ? 'bg-cyan-400' : 'bg-neutral-800'} relative`}>
                    <ChevronRight className={`absolute -right-3 -top-2 w-5 h-5 ${isUnlocked && idx < currentNode ? 'text-cyan-400' : 'text-neutral-800'}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-12 relative z-10">
          <button
            onClick={() => {
              playSelectSound();
              onBack();
            }}
            className="px-6 py-3 bg-neutral-800 text-neutral-300 font-['Silkscreen'] text-sm rounded hover:bg-neutral-700 hover:text-white transition-colors border border-neutral-600"
          >
            [ESC] BACK
          </button>
          
          <div className="text-right">
            <div className="font-['Press_Start_2P'] text-[10px] text-cyan-400 mb-1">PROGRESS</div>
            <div className="w-32 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentNode / (nodes.length - 1)) * 100}%` }}
                className="h-full bg-cyan-400"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
