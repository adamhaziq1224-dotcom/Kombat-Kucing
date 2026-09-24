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
  const [detailTab, setDetailTab] = useState<'skills' | 'traits'>('skills');
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
    <div className="relative flex-1 flex flex-col select-none overflow-y-auto min-h-0 bg-slate-950 text-slate-100 custom-scrollbar">
      
      {/* Top Navigation */}
      <div className="sticky top-0 z-30 flex items-center justify-between p-2 sm:p-3.5 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-md shrink-0">
        <button
          onClick={() => {
            playSelectSound();
            onBack();
          }}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-colors flex items-center space-x-1.5 shadow-sm cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-slate-300" />
          <span className="font-bold text-xs text-slate-300 hidden sm:block">
            {isOpponentSelect ? 'CHANGE P1' : 'BACK'}
          </span>
        </button>

        <div className="flex-1 flex flex-col items-center px-1">
          {isOpponentSelect ? (
            <>
              <div className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mb-0.5">
                <span>ARCADE 1V1 • COM OPPONENT</span>
              </div>
              <div className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-rose-400 drop-shadow">
                CHOOSE OPPONENT
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mb-0.5">
                <span>PLAYER 1 FIGHTER</span>
              </div>
              <div className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-cyan-400 drop-shadow">
                CHOOSE FIGHTER
              </div>
            </>
          )}
        </div>

        {/* P1 status banner if choosing opponent */}
        <div className="shrink-0 flex items-center">
          {isOpponentSelect && playerChar ? (
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-cyan-500/40 rounded-lg px-2 py-1 shadow-sm">
              <span className="text-[9px] font-bold text-cyan-400 uppercase">P1:</span>
              <span className="text-[11px] font-bold text-slate-200 hidden sm:inline">{playerChar.name}</span>
              <span className="text-sm">{playerChar.avatarEmoji}</span>
            </div>
          ) : (
            <div className="w-8 sm:w-16" />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto w-full">
        
        {/* ROSTER CAROUSEL AT TOP - Fast and effortless on mobile */}
        <div className="shrink-0 bg-slate-900/80 border border-slate-800 rounded-xl sm:rounded-2xl p-2 sm:p-3">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isOpponentSelect ? 'SELECT RIVAL FIGHTER' : 'SELECT YOUR FIGHTER'}
            </span>
            <span className="text-[8px] sm:text-[9px] text-cyan-400 font-mono">
              {CHARACTERS.length} FIGHTERS
            </span>
          </div>
          
          <div className="flex overflow-x-auto pb-1 space-x-2 custom-scrollbar snap-x snap-mandatory">
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
                  className={`relative snap-center shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? isOpponentSelect
                        ? 'bg-slate-800 border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)] scale-105 z-10'
                        : 'bg-slate-800 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)] scale-105 z-10'
                      : 'bg-slate-900/90 border-slate-700 hover:border-slate-500 opacity-80 hover:opacity-100'
                  } ${!isOpponentSelect && !isCharacterUnlocked(char.id) ? 'grayscale brightness-50' : ''}`}
                >
                  {!isOpponentSelect && !isCharacterUnlocked(char.id) && (
                    <div className="absolute top-0.5 right-0.5 z-20 text-rose-500 drop-shadow-md">
                      <Lock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-rose-950" />
                    </div>
                  )}
                  {isPlayerFighter && (
                    <div className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-cyan-400 text-slate-950 font-black text-[6.5px] uppercase tracking-tighter shadow-md">
                      P1
                    </div>
                  )}
                  <span className="text-lg sm:text-2xl">{char.avatarEmoji}</span>
                  <span className="text-[7.5px] sm:text-[9px] font-bold text-slate-300 truncate w-full px-0.5 text-center mt-0.5">
                    {char.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE CHARACTER SHOWCASE & STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 items-start">
          
          {/* Left: Character Visual & Core Stats Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col relative overflow-hidden shadow-lg">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${selectedChar.accentColor} 0%, transparent 70%)` }}
            />

            <div className="relative z-10 flex items-center gap-3">
              {/* Character Pixel Sprite */}
              <div className="w-20 h-20 sm:w-32 sm:h-32 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                <div className="scale-[0.55] sm:scale-[0.8] origin-center">
                  <PixelSprite character={selectedChar} action="idle" />
                </div>
              </div>

              {/* Character Details & Title */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span 
                    className="text-[7.5px] sm:text-[8.5px] font-bold px-1.5 py-0.2 rounded uppercase"
                    style={{ backgroundColor: `${selectedChar.accentColor}30`, color: selectedChar.accentColor }}
                  >
                    {selectedChar.type}
                  </span>
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700 uppercase">
                    {selectedChar.archetype}
                  </span>
                  <span className="text-[7.5px] sm:text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-600">
                    {selectedChar.preferredDamageType}
                  </span>
                </div>

                <h2 className="font-['Press_Start_2P'] text-xs sm:text-base text-white truncate">
                  {selectedChar.name}
                </h2>
                <p className="text-[9px] sm:text-xs text-slate-300 font-semibold truncate mt-0.5">
                  {selectedChar.role}
                </p>
                <p className="text-[8px] sm:text-[9.5px] text-slate-400 truncate mt-0.5">
                  {selectedChar.title}
                </p>
              </div>
            </div>

            {/* 3 Core Stats */}
            <div className="grid grid-cols-3 gap-1.5 mt-2.5 pt-2 border-t border-slate-800/80 relative z-10">
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-1 sm:p-2 flex items-center justify-center space-x-1.5">
                <Heart className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <div className="text-center">
                  <span className="text-[7px] text-slate-400 font-bold block">HP</span>
                  <span className="font-['Press_Start_2P'] text-[9px] sm:text-[11px] text-emerald-300">{selectedChar.maxHp}</span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-1 sm:p-2 flex items-center justify-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <div className="text-center">
                  <span className="text-[7px] text-slate-400 font-bold block">ATK</span>
                  <span className="font-['Press_Start_2P'] text-[9px] sm:text-[11px] text-rose-300">{selectedChar.attack}</span>
                </div>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-1 sm:p-2 flex items-center justify-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <div className="text-center">
                  <span className="text-[7px] text-slate-400 font-bold block">SPD</span>
                  <span className="font-['Press_Start_2P'] text-[9px] sm:text-[11px] text-cyan-300">{selectedChar.speed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Skills & Passive Tabs (Compact & Legible) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between">
            {/* Tab Toggles */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setDetailTab('skills')}
                  className={`px-2.5 py-1 rounded-lg text-[9px] sm:text-xs font-bold transition-all cursor-pointer ${
                    detailTab === 'skills'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  SKILLS ({selectedChar.skills.length})
                </button>
                <button
                  onClick={() => setDetailTab('traits')}
                  className={`px-2.5 py-1 rounded-lg text-[9px] sm:text-xs font-bold transition-all cursor-pointer ${
                    detailTab === 'traits'
                      ? 'bg-purple-950 text-purple-300 border border-purple-500'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  PASSIVE & TRAITS
                </button>
              </div>

              <span className="text-[8px] text-slate-500 font-mono hidden sm:inline">
                {selectedChar.preferredDamageType} SPECIALIST
              </span>
            </div>

            {/* Tab 1: Skills List (Compact 1-row item) */}
            {detailTab === 'skills' && (
              <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                {selectedChar.skills.map((s) => (
                  <div key={s.id} className="p-1.5 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 truncate">
                        <span className="text-[7.5px] font-bold px-1 py-0.2 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {s.key}
                        </span>
                        <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-100 truncate">
                          {s.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 font-mono text-[8px] sm:text-[9px]">
                        <span className="text-cyan-400 font-bold">
                          {s.expCost ? `${s.expCost}⚡` : s.expGain ? `+${s.expGain}⚡` : 'FREE'}
                        </span>
                        <span className="font-bold text-rose-300 bg-rose-950/70 px-1 py-0.2 rounded border border-rose-800/60">
                          {s.damage > 0 ? `${s.damage} DMG` : 'TACTICAL'}
                        </span>
                      </div>
                    </div>
                    <p className="text-[8px] sm:text-[9.5px] text-slate-400 mt-0.5 line-clamp-1">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Passive & Traits */}
            {detailTab === 'traits' && (
              <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-900/60">
                  <div className="flex items-center space-x-1.5 text-indigo-300 text-[9px] sm:text-xs font-bold uppercase mb-0.5">
                    <Shield className="w-3.5 h-3.5 fill-current" />
                    <span>PASSIVE: {selectedChar.passiveTraitName}</span>
                  </div>
                  <p className="text-[8.5px] sm:text-xs text-indigo-100/90 leading-relaxed">
                    {selectedChar.passiveTraitDesc}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1 text-[8.5px] sm:text-xs">
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-emerald-400 shrink-0">STRENGTHS:</span>
                    <span className="text-slate-300">{selectedChar.strengths}</span>
                  </div>
                  <div className="flex items-start gap-1">
                    <span className="font-bold text-rose-400 shrink-0">WEAKNESS:</span>
                    <span className="text-slate-400">{selectedChar.weaknesses}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div className="pt-1 shrink-0">
          {errorMsg && (
            <div className="mb-2 flex justify-center animate-bounce">
              <div className="bg-rose-500 text-white text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-rose-400">
                {errorMsg}
              </div>
            </div>
          )}
          
          <button
            id={`btn-lock-char-${selectedChar.id}`}
            onClick={() => handleSelect(selectedChar)}
            className={`w-full py-2.5 sm:py-3.5 font-bold text-xs sm:text-sm rounded-xl active:shadow-none hover:translate-y-[1px] active:translate-y-[2px] transition-all cursor-pointer border-2 flex items-center justify-center space-x-2 ${
              isOpponentSelect
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_3px_0_rgb(225,29,72)] border-rose-400'
                : !isUnlocked
                ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 shadow-[0_3px_0_rgb(15,23,42)] border-rose-900/50 grayscale'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_3px_0_rgb(8,145,178)] border-cyan-400'
            }`}
          >
            {isOpponentSelect ? (
              <>
                <Swords className="w-4 h-4 text-rose-200" />
                <span>FIGHT AGAINST {selectedChar.name.toUpperCase()}</span>
              </>
            ) : !isUnlocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>LOCKED IN STORE</span>
              </>
            ) : (
              <span>SELECT {selectedChar.name.toUpperCase()}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
