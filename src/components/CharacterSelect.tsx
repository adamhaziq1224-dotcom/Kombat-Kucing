import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Character } from '../types';
import { CHARACTERS } from '../data/gameData';
import { PixelSprite } from './PixelSprite';
import { playSelectSound, playGuardSound } from '../utils/audio';
import { isCharacterUnlocked } from '../utils/economy';
import { ArrowLeft, Zap, Heart, Flame, Shield, Swords, Lock } from 'lucide-react';

interface CharacterSelectProps {
  onSelectCharacter: (char: Character) => void;
  onBack: () => void;
  isOpponentSelect?: boolean;
  playerChar?: Character;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onSelectCharacter,
  onBack,
  isOpponentSelect = false,
  playerChar
}) => {
  // Default to second fighter if selecting opponent and P1 is first fighter
  const defaultIdx = isOpponentSelect && playerChar && CHARACTERS[0].id === playerChar.id ? 1 : 0;
  const [selectedIdx, setSelectedIdx] = React.useState<number>(defaultIdx);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const selectedChar = CHARACTERS[selectedIdx];
  const isUnlocked = isCharacterUnlocked(selectedChar.id);

  const handleSelect = (char: Character) => {
    if (!isCharacterUnlocked(char.id) && !isOpponentSelect) {
      playGuardSound();
      setErrorMsg('CHARACTER LOCKED! BUY IN STORE.');
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }
    playSelectSound();
    onSelectCharacter(char);
  };


  return (
    <div className="relative flex-1 flex flex-col select-none overflow-y-auto min-h-0 bg-slate-950 text-slate-100">
      
      {/* Top Navigation */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-3 sm:p-5 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/60 shadow-md">
        <button
          onClick={() => {
            playSelectSound();
            onBack();
          }}
          className="p-2 sm:px-4 sm:py-2 rounded-xl bg-slate-900 border-2 border-slate-700 hover:bg-slate-800 transition-colors flex items-center space-x-2 shadow-sm cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
          <span className="font-bold text-xs sm:text-sm text-slate-300 hidden sm:block">
            {isOpponentSelect ? 'CHANGE P1' : 'BACK'}
          </span>
        </button>

        <div className="flex-1 flex flex-col items-center px-2">
          {isOpponentSelect ? (
            <>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>ARCADE 1V1 • COM OPPONENT</span>
              </div>
              <div className="font-['Press_Start_2P'] text-xs sm:text-sm text-rose-400 drop-shadow">
                CHOOSE OPPONENT
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>PLAYER 1 FIGHTER</span>
              </div>
              <div className="font-['Press_Start_2P'] text-xs sm:text-sm text-cyan-400 drop-shadow">
                CHOOSE FIGHTER
              </div>
            </>
          )}
        </div>

        {/* P1 status banner if choosing opponent */}
        <div className="shrink-0 flex items-center">
          {isOpponentSelect && playerChar ? (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-cyan-500/40 rounded-xl px-2.5 py-1.5 shadow-sm">
              <span className="text-[10px] font-bold text-cyan-400 uppercase">P1:</span>
              <span className="text-xs font-bold text-slate-200 hidden sm:inline">{playerChar.name}</span>
              <span className="text-sm sm:text-base">{playerChar.avatarEmoji}</span>
            </div>
          ) : (
            <div className="w-10 sm:w-20" />
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-4 sm:p-6 gap-6 max-w-6xl mx-auto w-full">
        
        {/* Left/Top: Character Visuals & Stats */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-4">
          <div className="relative bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-lg overflow-hidden group">
            {/* Background Glow */}
            <div
              className="absolute inset-0 opacity-20 transition-colors duration-500"
              style={{ background: `radial-gradient(circle at center, ${selectedChar.accentColor} 0%, transparent 70%)` }}
            />
            
            <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
              <PixelSprite character={selectedChar} action="idle" />
            </div>

            <div className="relative z-10 mt-4 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ backgroundColor: `${selectedChar.accentColor}30`, color: selectedChar.accentColor }}
                >
                  {selectedChar.type} TYPE
                </div>
                <div className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 uppercase">
                  {selectedChar.archetype}
                </div>
              </div>
              <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl text-white text-center mb-1">
                {selectedChar.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold text-center mb-1">
                {selectedChar.role}
              </p>
              <p className="text-xs text-slate-400 font-medium text-center">
                Lv. 1 • {selectedChar.title} • <span className="text-amber-400 font-bold">{selectedChar.preferredDamageType} DMG</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col items-center shadow-sm">
              <Heart className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="text-xs text-slate-400 font-bold">HP</span>
              <span className="font-['Press_Start_2P'] text-sm text-emerald-100">{selectedChar.maxHp}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col items-center shadow-sm">
              <Flame className="w-5 h-5 text-rose-400 mb-1" />
              <span className="text-xs text-slate-400 font-bold">ATK</span>
              <span className="font-['Press_Start_2P'] text-sm text-rose-100">{selectedChar.attack}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col items-center shadow-sm">
              <Zap className="w-5 h-5 text-cyan-400 mb-1" />
              <span className="text-xs text-slate-400 font-bold">SPD</span>
              <span className="font-['Press_Start_2P'] text-sm text-cyan-100">{selectedChar.speed}</span>
            </div>
          </div>

          {/* Strategic Overview: Strengths & Weaknesses */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 text-xs space-y-1.5 shadow-sm">
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-emerald-400 shrink-0">STRENGTHS:</span>
              <span className="text-slate-300">{selectedChar.strengths}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-bold text-rose-400 shrink-0">WEAKNESS:</span>
              <span className="text-slate-400">{selectedChar.weaknesses}</span>
            </div>
          </div>
        </div>

        {/* Right/Bottom: Roster & Details */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          
          {/* Roster Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                {isOpponentSelect ? 'Choose Rival Fighter' : 'Available Fighters'}
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">
                {CHARACTERS.length} FIGHTERS AVAILABLE
              </span>
            </div>
            <div className="flex overflow-x-auto pb-4 space-x-3 custom-scrollbar snap-x snap-mandatory">
              {CHARACTERS.map((char, idx) => {
                const isSelected = idx === selectedIdx;
                const isPlayerFighter = isOpponentSelect && playerChar && char.id === playerChar.id;

                return (
                  <button
                    key={char.id}
                    onClick={() => {
                      setSelectedIdx(idx);
                      playSelectSound();
                    }}
                    className={`relative snap-center shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? isOpponentSelect
                          ? 'bg-slate-800 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.35)] scale-105 z-10'
                          : 'bg-slate-800 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105 z-10'
                        : 'bg-slate-900 border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100'
                    } ${!isOpponentSelect && !isCharacterUnlocked(char.id) ? 'grayscale brightness-50' : ''}`}
                  >
                    {!isOpponentSelect && !isCharacterUnlocked(char.id) && (
                      <div className="absolute top-1 right-1 z-20 text-rose-500 drop-shadow-md">
                        <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-rose-950" />
                      </div>
                    )}
                    {isPlayerFighter && (
                      <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black text-[8px] uppercase tracking-tighter shadow-md">
                        MIRROR
                      </div>
                    )}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 relative flex items-center justify-center overflow-hidden rounded mb-1">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      <div className="scale-[0.35] sm:scale-[0.4] origin-center translate-y-3">
                        <PixelSprite character={char} action="idle" />
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 truncate w-full px-1">{char.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lore & Skills */}
          <div className="flex-1 flex flex-col space-y-4 min-h-[300px]">
            {/* Passive */}
            <div className="bg-indigo-950/40 border border-indigo-900/50 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center space-x-2 text-indigo-300 mb-2">
                <Shield className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold tracking-widest uppercase">Passive: {selectedChar.passiveTraitName}</span>
              </div>
              <p className="text-sm text-indigo-100/80 leading-relaxed">
                {selectedChar.passiveTraitDesc}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex-1">
              <div className="flex items-center justify-between text-slate-300 mb-3">
                <div className="flex items-center space-x-2">
                  <Swords className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">Combat Skills</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">5 MOVES (Q, E, T, F, R)</span>
              </div>
              <div className="space-y-2.5">
                {selectedChar.skills.map((s) => (
                  <div key={s.id} className="flex flex-col border-l-2 border-slate-700 pl-3 py-1 bg-slate-950/40 rounded-r-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          [{s.category}]
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-100">[{s.key}] {s.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-cyan-400 font-mono">
                          {s.expCost ? `COST ${s.expCost} EN` : s.expGain ? `+${s.expGain} EN` : 'FREE'}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-rose-300">
                          {s.damage > 0 ? `${s.damage} DMG` : 'UTILITY'}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 sticky bottom-4 lg:relative lg:bottom-0">
            {errorMsg && (
              <div className="absolute -top-10 left-0 right-0 flex justify-center z-50 animate-bounce">
                <div className="bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-rose-400">
                  {errorMsg}
                </div>
              </div>
            )}
            <button
              id={`btn-lock-char-${selectedChar.id}`}
              onClick={() => handleSelect(selectedChar)}
              className={`w-full py-4 sm:py-5 font-bold text-sm sm:text-base rounded-2xl active:shadow-none hover:translate-y-[2px] active:translate-y-[4px] transition-all cursor-pointer border-2 flex items-center justify-center space-x-2 ${
                isOpponentSelect
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_4px_0_rgb(225,29,72)] border-rose-400'
                  : !isUnlocked
                  ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 shadow-[0_4px_0_rgb(15,23,42)] border-rose-900/50 grayscale'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_4px_0_rgb(8,145,178)] border-cyan-400'
              }`}
            >
              {isOpponentSelect ? (
                <>
                  <Swords className="w-5 h-5 text-rose-200" />
                  <span>FIGHT AGAINST {selectedChar.name.toUpperCase()}</span>
                </>
              ) : !isUnlocked ? (
                <>
                  <Lock className="w-5 h-5" />
                  <span>LOCKED IN STORE</span>
                </>
              ) : (
                <span>SELECT {selectedChar.name.toUpperCase()}</span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
