import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Character } from '../types';
import { CHARACTERS } from '../data/gameData';
import { PixelSprite } from './PixelSprite';
import { isCharacterUnlocked } from '../utils/economy';
import { playSelectSound, playFieryComboSound, playGuardSound } from '../utils/audio';
import { ArrowLeft, ChevronRight, Swords, Sparkles, RefreshCw, Users, Shield, Zap, Lock } from 'lucide-react';

interface DuoSelectProps {
  onConfirmDuo: (player1: Character, player2: Character, enemy1: Character, enemy2: Character) => void;
  onBack: () => void;
}

export const DuoSelect: React.FC<DuoSelectProps> = ({ onConfirmDuo, onBack }) => {
  // Slots
  const [slot1, setSlot1] = useState<Character>(CHARACTERS[0]); // Oyen
  const [slot2, setSlot2] = useState<Character>(CHARACTERS[1]); // Mecha-Dog
  const [activeSlot, setActiveSlot] = useState<1 | 2>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Opponent duo (randomized or customizable)
  const [enemySlot1, setEnemySlot1] = useState<Character>(CHARACTERS[2] || CHARACTERS[1]);
  const [enemySlot2, setEnemySlot2] = useState<Character>(CHARACTERS[3] || CHARACTERS[0]);

  const handlePick = (char: Character) => {
    if (!isCharacterUnlocked(char.id)) {
      playGuardSound();
      setErrorMsg('CHARACTER LOCKED! BUY IN STORE.');
      setTimeout(() => setErrorMsg(null), 2000);
      return;
    }
    playSelectSound();
    if (activeSlot === 1) {
      if (char.id === slot2.id) {
        // swap slots if picking current partner
        setSlot2(slot1);
      }
      setSlot1(char);
      setActiveSlot(2);
    } else {
      if (char.id === slot1.id) {
        setSlot1(slot2);
      }
      setSlot2(char);
    }
  };

  const handleRandomizeEnemies = () => {
    playSelectSound();
    const shuffled = [...CHARACTERS].sort(() => 0.5 - Math.random());
    setEnemySlot1(shuffled[0]);
    setEnemySlot2(shuffled[1]);
  };

  const handleStart = () => {
    playFieryComboSound();
    onConfirmDuo(slot1, slot2, enemySlot1, enemySlot2);
  };

  // Synergy detection
  const getSynergyText = () => {
    if (slot1.preferredDamageType === 'ENERGY' && slot2.preferredDamageType === 'EXPLOSIVE') {
      return '💥 OVERLOAD SYNERGY: Inflicting Shock or Glitch then triggering Burn creates explosive chain reactions!';
    }
    if (slot1.archetype === 'TANK' && slot2.archetype === 'ASSASSIN') {
      return '🛡️ VANGUARD & STRIKER: Heavy defense absorbs blows while the assassin cleans up with critical strikes!';
    }
    if (slot1.archetype === 'BURST' && slot2.archetype === 'CONTROLLER') {
      return '🌪️ CONTROL & APOCALYPSE: Airborne and Stun disables allow uninterrupted ultimate combos!';
    }
    return '⚡ TAG TEAM SYNERGY: Switch fighters mid-battle with [SWAP] or TAB to chain combos and preserve HP!';
  };

  return (
    <div className="relative flex-1 flex flex-col h-full select-none overflow-hidden min-h-0 bg-slate-950 text-slate-100 justify-between">
      
      {/* Top Header */}
      <div className="flex-shrink-0 z-20 flex items-center justify-between px-3 py-2 sm:px-6 sm:py-2.5 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
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
          <Users className="w-4 h-4 text-cyan-400" />
          <span>DUO / TAG TEAM SETUP</span>
        </div>

        <button
          onClick={handleRandomizeEnemies}
          className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-slate-300 hover:text-white flex items-center space-x-1 cursor-pointer"
          title="Randomize Rival Duo"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">RIVAL DUO</span>
        </button>
      </div>

      {/* Center Display: 2 Player Slots vs 2 Enemy Slots */}
      <div className="flex-shrink-0 px-3 py-2 max-w-5xl mx-auto w-full relative">
        {errorMsg && (
          <div className="absolute top-0 left-0 right-0 flex justify-center z-50 animate-bounce">
            <div className="bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-rose-400">
              {errorMsg}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          
          {/* PLAYER TAG TEAM */}
          <div className="bg-slate-900/90 border-2 border-cyan-500/80 rounded-2xl p-2.5 sm:p-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Press_Start_2P'] text-[9px] text-cyan-400">
                PLAYER DUO
              </span>
              <span className="text-[9px] font-bold text-slate-400">
                CLICK A SLOT TO ASSIGN
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Slot 1 */}
              <button
                onClick={() => {
                  playSelectSound();
                  setActiveSlot(1);
                }}
                className={`rounded-2xl border-2 transition-all flex flex-col overflow-hidden cursor-pointer ${
                  activeSlot === 1
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'border-slate-700 bg-slate-950/80 hover:border-slate-500'
                }`}
              >
                {/* Zone 1: Slot Label */}
                <div className="w-full text-center py-1 bg-cyan-950/80 border-b border-cyan-800/60 shrink-0">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-cyan-300">
                    1. LEAD FIGHTER
                  </span>
                </div>

                {/* Zone 2: Image Area (Strictly Bounded) */}
                <div className="w-full h-14 sm:h-20 flex items-center justify-center relative overflow-hidden bg-slate-950/40 shrink-0">
                  <div className="scale-[0.38] sm:scale-[0.52] origin-center">
                    <PixelSprite character={slot1} action="idle" />
                  </div>
                  <div className="absolute bottom-0.5 w-12 sm:w-16 h-1.5 sm:h-2 bg-black/60 rounded-full blur-[2px] pointer-events-none" />
                </div>

                {/* Zone 3: Information Area */}
                <div className="w-full border-t border-cyan-800/50 bg-slate-950/90 py-1 sm:py-1.5 px-1.5 text-center flex flex-col justify-center shrink-0">
                  <div className="font-['Press_Start_2P'] text-[7.5px] sm:text-[9px] text-white truncate leading-snug">
                    {slot1.name}
                  </div>
                  <div className="text-[7px] sm:text-[8px] font-mono text-cyan-400 font-bold uppercase mt-0.5 truncate">
                    {slot1.archetype}
                  </div>
                </div>
              </button>

              {/* Slot 2 */}
              <button
                onClick={() => {
                  playSelectSound();
                  setActiveSlot(2);
                }}
                className={`rounded-xl sm:rounded-2xl border-2 transition-all flex flex-col overflow-hidden cursor-pointer ${
                  activeSlot === 2
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'border-slate-700 bg-slate-950/80 hover:border-slate-500'
                }`}
              >
                {/* Zone 1: Slot Label */}
                <div className="w-full text-center py-0.5 sm:py-1 bg-cyan-950/80 border-b border-cyan-800/60 shrink-0">
                  <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-cyan-300">
                    2. TAG PARTNER
                  </span>
                </div>

                {/* Zone 2: Image Area (Strictly Bounded) */}
                <div className="w-full h-14 sm:h-20 flex items-center justify-center relative overflow-hidden bg-slate-950/40 shrink-0">
                  <div className="scale-[0.38] sm:scale-[0.52] origin-center">
                    <PixelSprite character={slot2} action="idle" />
                  </div>
                  <div className="absolute bottom-0.5 w-12 sm:w-16 h-1.5 sm:h-2 bg-black/60 rounded-full blur-[2px] pointer-events-none" />
                </div>

                {/* Zone 3: Information Area */}
                <div className="w-full border-t border-cyan-800/50 bg-slate-950/90 py-1 sm:py-1.5 px-1.5 text-center flex flex-col justify-center shrink-0">
                  <div className="font-['Press_Start_2P'] text-[7.5px] sm:text-[9px] text-white truncate leading-snug">
                    {slot2.name}
                  </div>
                  <div className="text-[7px] sm:text-[8px] font-mono text-cyan-400 font-bold uppercase mt-0.5 truncate">
                    {slot2.archetype}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* RIVAL TAG TEAM */}
          <div className="bg-slate-900/90 border-2 border-rose-500/80 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-rose-400">
                RIVAL DUO
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-bold text-rose-300/80">
                OPPONENT TEAM
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Enemy Slot 1 */}
              <div className="rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-950/80 flex flex-col overflow-hidden">
                {/* Zone 1: Slot Label */}
                <div className="w-full text-center py-0.5 sm:py-1 bg-rose-950/80 border-b border-rose-800/60 shrink-0">
                  <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-rose-300">
                    RIVAL LEAD
                  </span>
                </div>

                {/* Zone 2: Image Area (Strictly Bounded) */}
                <div className="w-full h-14 sm:h-20 flex items-center justify-center relative overflow-hidden bg-slate-950/40 shrink-0">
                  <div className="scale-[0.38] sm:scale-[0.52] origin-center">
                    <PixelSprite character={enemySlot1} action="idle" isFlipped={true} />
                  </div>
                  <div className="absolute bottom-0.5 w-12 sm:w-16 h-1.5 sm:h-2 bg-black/60 rounded-full blur-[2px] pointer-events-none" />
                </div>

                {/* Zone 3: Information Area */}
                <div className="w-full border-t border-rose-800/50 bg-slate-950/90 py-1 sm:py-1.5 px-1.5 text-center flex flex-col justify-center shrink-0">
                  <div className="font-['Press_Start_2P'] text-[7.5px] sm:text-[9px] text-white truncate leading-snug">
                    {enemySlot1.name}
                  </div>
                  <div className="text-[7px] sm:text-[8px] font-mono text-rose-400 font-bold uppercase mt-0.5 truncate">
                    {enemySlot1.archetype}
                  </div>
                </div>
              </div>

              {/* Enemy Slot 2 */}
              <div className="rounded-xl sm:rounded-2xl border border-slate-700 bg-slate-950/80 flex flex-col overflow-hidden">
                {/* Zone 1: Slot Label */}
                <div className="w-full text-center py-0.5 sm:py-1 bg-rose-950/80 border-b border-rose-800/60 shrink-0">
                  <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-rose-300">
                    RIVAL TAG
                  </span>
                </div>

                {/* Zone 2: Image Area (Strictly Bounded) */}
                <div className="w-full h-14 sm:h-20 flex items-center justify-center relative overflow-hidden bg-slate-950/40 shrink-0">
                  <div className="scale-[0.38] sm:scale-[0.52] origin-center">
                    <PixelSprite character={enemySlot2} action="idle" isFlipped={true} />
                  </div>
                  <div className="absolute bottom-0.5 w-12 sm:w-16 h-1.5 sm:h-2 bg-black/60 rounded-full blur-[2px] pointer-events-none" />
                </div>

                {/* Zone 3: Information Area */}
                <div className="w-full border-t border-rose-800/50 bg-slate-950/90 py-1 sm:py-1.5 px-1.5 text-center flex flex-col justify-center shrink-0">
                  <div className="font-['Press_Start_2P'] text-[7.5px] sm:text-[9px] text-white truncate leading-snug">
                    {enemySlot2.name}
                  </div>
                  <div className="text-[7px] sm:text-[8px] font-mono text-rose-400 font-bold uppercase mt-0.5 truncate">
                    {enemySlot2.archetype}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Synergy Bar */}
        <div className="mt-2 p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2 text-[9px] sm:text-[10px] text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{getSynergyText()}</span>
        </div>
      </div>

      {/* Bottom: Fighter Selection Grid for Active Slot */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2 sm:px-3 py-1 sm:py-1.5 max-w-5xl mx-auto w-full custom-scrollbar">
        <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>ASSIGN TO SLOT {activeSlot} ({activeSlot === 1 ? slot1.name : slot2.name})</span>
          <span className="text-cyan-400 text-[8px] sm:text-[9px]">{CHARACTERS.length} FIGHTERS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:gap-2">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === (activeSlot === 1 ? slot1.id : slot2.id);
            const isOther = char.id === (activeSlot === 1 ? slot2.id : slot1.id);
            const unlocked = isCharacterUnlocked(char.id);

            return (
              <button
                key={char.id}
                onClick={() => handlePick(char)}
                className={`relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl border text-left flex items-center space-x-2 transition-all cursor-pointer min-w-0 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : isOther
                    ? 'bg-purple-950/40 border-purple-500/60'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
                } ${!unlocked ? 'opacity-50 grayscale brightness-75' : ''}`}
              >
                {!unlocked && (
                  <div className="absolute top-1 right-1 text-rose-500">
                    <Lock className="w-2.5 h-2.5 fill-rose-950" />
                  </div>
                )}
                <span className="text-base sm:text-2xl shrink-0">{char.avatarEmoji}</span>
                <div className="truncate flex-1 min-w-0">
                  <div className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-white truncate">
                    {char.name}
                  </div>
                  <div className="text-[6.5px] sm:text-[7.5px] text-slate-400 truncate mt-0.5 font-bold uppercase">
                    {char.archetype}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation Bar */}
      <div className="flex-shrink-0 p-1.5 sm:p-3 bg-slate-950/95 border-t border-slate-800 flex items-center justify-center">
        <button
          onClick={handleStart}
          className="w-full sm:w-auto px-5 py-2 sm:py-2.5 rounded-xl font-['Press_Start_2P'] text-[10px] sm:text-xs bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-slate-950 font-black shadow-[0_3px_0_rgb(8,145,178)] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>ENTER BATTLE WITH DUO</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
