import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, CharacterTheme, UpgradeStatKey } from '../types';
import { CHARACTERS } from '../data/gameData';
import { PixelSprite } from './PixelSprite';
import {
  getCyberCoins,
  addCyberCoins,
  isCharacterUnlocked,
  unlockCharacter,
  getCharacterUpgrades,
  upgradeCharacterStat,
  getStatUpgradeCost,
  getStatBonusValue,
  THEME_PRESETS,
  isThemeUnlocked,
  unlockTheme,
  getSelectedTheme,
  setSelectedTheme
} from '../utils/economy';
import { playSelectSound, playFieryComboSound, playGuardSound } from '../utils/audio';
import {
  Coins,
  ArrowLeft,
  Shield,
  Zap,
  Heart,
  Flame,
  Sparkles,
  Lock,
  Unlock,
  Palette,
  ChevronRight,
  Plus
} from 'lucide-react';

interface StoreViewProps {
  onBack: () => void;
  onSelectCharacter?: (char: Character) => void;
}

type StoreTab = 'fighters' | 'upgrades' | 'themes';

export const StoreView: React.FC<StoreViewProps> = ({ onBack }) => {
  const [coins, setCoins] = useState<number>(getCyberCoins());
  const [activeTab, setActiveTab] = useState<StoreTab>('fighters');
  const [selectedCharId, setSelectedCharId] = useState<string>(CHARACTERS[0].id);
  const [previewSkinId, setPreviewSkinId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; color: string } | null>(null);

  const selectedChar = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];
  const charUpgrades = getCharacterUpgrades(selectedCharId);
  const activeThemeId = getSelectedTheme(selectedCharId);
  const displayedSkinId = previewSkinId || activeThemeId;

  const showFeedback = (text: string, color: string = '#22c55e') => {
    setFeedbackMsg({ text, color });
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const handleUnlockChar = (char: Character) => {
    playSelectSound();
    const success = unlockCharacter(char.id, char.unlockCost || 1000);
    if (success) {
      setCoins(getCyberCoins());
      playFieryComboSound();
      showFeedback(`🎉 UNLOCKED ${char.name.toUpperCase()}!`, '#22c55e');
    } else {
      showFeedback('❌ NOT ENOUGH CYBER COINS!', '#ef4444');
    }
  };

  const handleUpgradeStat = (stat: UpgradeStatKey) => {
    playSelectSound();
    const success = upgradeCharacterStat(selectedCharId, stat);
    if (success) {
      setCoins(getCyberCoins());
      playFieryComboSound();
      showFeedback(`⚡ UPGRADED ${stat.toUpperCase()}!`, '#06b6d4');
    } else {
      showFeedback('❌ UPGRADE FAILED / INSUFFICIENT COINS!', '#ef4444');
    }
  };

  const handleBuyOrEquipTheme = (theme: CharacterTheme) => {
    playSelectSound();
    setPreviewSkinId(theme.id);

    // If already equipped
    if (activeThemeId === theme.id) {
      showFeedback(`✓ ${theme.name.toUpperCase()} IS ALREADY EQUIPPED!`, '#22c55e');
      return;
    }

    // If already owned / default
    if (isThemeUnlocked(selectedCharId, theme.id) || theme.price === 0) {
      setSelectedTheme(selectedCharId, theme.id);
      playFieryComboSound();
      showFeedback(`✨ EQUIPPED ${theme.name.toUpperCase()}!`, '#38bdf8');
      return;
    }

    // Attempt purchase
    if (coins < theme.price) {
      playGuardSound();
      showFeedback('❌ NOT ENOUGH COINS', '#ef4444');
      return;
    }

    const success = unlockTheme(selectedCharId, theme.id, theme.price);
    if (success) {
      setCoins(getCyberCoins());
      setSelectedTheme(selectedCharId, theme.id);
      playFieryComboSound();
      showFeedback(`🎉 PURCHASED & EQUIPPED ${theme.name.toUpperCase()}!`, '#a855f7');
    } else {
      showFeedback('❌ NOT ENOUGH COINS', '#ef4444');
    }
  };

  return (
    <div className="relative flex-1 flex flex-col h-full select-none overflow-hidden min-h-0 bg-slate-950 text-slate-100 justify-between">
      
      {/* Top Header & Cyber Coins HUD */}
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

        {/* Store Title */}
        <div className="text-center font-['Press_Start_2P'] text-xs sm:text-sm text-cyan-400 drop-shadow flex items-center space-x-2">
          <span>CYBER WORKSHOP</span>
        </div>

        {/* Currency Counter Display */}
        <div className="flex items-center space-x-1.5 bg-amber-950/70 border-2 border-amber-500/80 px-2.5 py-1 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.3)]">
          <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-['Press_Start_2P'] text-xs text-amber-300 font-bold tracking-wider">
            {coins.toLocaleString()}
          </span>
          <span className="text-[9px] text-amber-400/80 font-bold hidden sm:inline">COINS</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex-shrink-0 flex items-center justify-center space-x-2 px-3 py-1.5 bg-slate-900/60 border-b border-slate-800">
        <button
          onClick={() => {
            playSelectSound();
            setActiveTab('fighters');
          }}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'fighters'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-[0_2px_0_rgb(6,182,212)]'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>ROSTER ({CHARACTERS.length})</span>
        </button>

        <button
          onClick={() => {
            playSelectSound();
            setActiveTab('upgrades');
          }}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'upgrades'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_2px_0_rgb(16,185,129)]'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>STAT UPGRADES</span>
        </button>

        <button
          onClick={() => {
            playSelectSound();
            setActiveTab('themes');
          }}
          className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
            activeTab === 'themes'
              ? 'bg-purple-500 text-slate-950 font-black shadow-[0_2px_0_rgb(168,85,247)]'
              : 'bg-slate-800/80 text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>COLOR SKINS</span>
        </button>
      </div>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            className="absolute top-14 left-1/2 -translate-x-1/2 z-50 font-['Press_Start_2P'] text-[10px] sm:text-xs px-3 py-1.5 rounded-lg bg-slate-900 border-2 shadow-2xl pointer-events-none"
            style={{ borderColor: feedbackMsg.color, color: feedbackMsg.color }}
          >
            {feedbackMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4">

        {/* TAB 1: FIGHTERS / UNLOCKS */}
        {activeTab === 'fighters' && (
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {CHARACTERS.map((char) => {
                const unlocked = isCharacterUnlocked(char.id);
                const cost = char.unlockCost || 0;
                const canAfford = coins >= cost;

                return (
                  <div
                    key={char.id}
                    className={`relative rounded-xl p-2.5 sm:p-3 border-2 flex flex-col justify-between overflow-hidden group transition-all ${
                      unlocked
                        ? 'bg-slate-900/90 border-slate-700 hover:border-cyan-400'
                        : 'bg-slate-950/80 border-slate-800/80'
                    }`}
                  >
                    {/* Top Status Badge */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xl sm:text-2xl">{char.avatarEmoji}</span>
                      {unlocked ? (
                        <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/60">
                          UNLOCKED
                        </span>
                      ) : (
                        <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-600/80 flex items-center space-x-1">
                          <Coins className="w-2.5 h-2.5 text-amber-400" />
                          <span>{cost.toLocaleString()}</span>
                        </span>
                      )}
                    </div>

                    {/* Character Sprite Display */}
                    <div className="h-20 sm:h-24 flex items-center justify-center my-0.5 relative">
                      <div className="scale-[0.55] sm:scale-[0.65]">
                        <PixelSprite character={char} action="idle" />
                      </div>
                      {!unlocked && (
                        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] rounded flex items-center justify-center">
                          <Lock className="w-6 h-6 text-amber-400 drop-shadow" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="my-1">
                      <h4 className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-white truncate">
                        {char.name}
                      </h4>
                      <p className="text-[8px] sm:text-[9px] text-cyan-400 truncate mt-0.5 font-bold">
                        {char.role}
                      </p>
                      <p className="text-[8px] text-slate-400 line-clamp-1 mt-0.5">
                        {char.passiveTraitDesc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-1">
                      {unlocked ? (
                        <div className="w-full py-1 text-center font-bold text-[9px] rounded bg-slate-800 text-slate-400">
                          READY TO BATTLE
                        </div>
                      ) : (
                        <button
                          onClick={() => handleUnlockChar(char)}
                          disabled={!canAfford}
                          className={`w-full py-1 sm:py-1.5 rounded font-bold text-[9px] sm:text-[10px] flex items-center justify-center space-x-1 transition-all ${
                            canAfford
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer shadow-[0_2px_0_rgb(217,119,6)]'
                              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                          }`}
                        >
                          <Coins className="w-3 h-3" />
                          <span>UNLOCK ({cost})</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STAT UPGRADES */}
        {activeTab === 'upgrades' && (
          <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-3 sm:gap-4 items-start">
            
            {/* Left: Character Selector Carousel */}
            <div className="w-full md:w-56 flex-shrink-0 bg-slate-900/90 border border-slate-800 rounded-xl p-2 sm:p-2.5">
              <div className="text-[10px] font-bold text-slate-400 mb-2 px-1 uppercase tracking-wider">
                Select Character
              </div>
              <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto max-h-[300px] p-0.5">
                {CHARACTERS.map((char) => {
                  const isSelected = char.id === selectedCharId;
                  const isUnlocked = isCharacterUnlocked(char.id);

                  return (
                    <button
                      key={char.id}
                      onClick={() => {
                        playSelectSound();
                        setSelectedCharId(char.id);
                      }}
                      className={`flex items-center space-x-2 p-1.5 sm:p-2 rounded-lg border text-left transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-sm'
                          : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                      } ${!isUnlocked ? 'opacity-60' : ''}`}
                    >
                      <span className="text-base">{char.avatarEmoji}</span>
                      <div className="truncate flex-1">
                        <div className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-white truncate">
                          {char.name}
                        </div>
                        <div className="text-[8px] text-slate-400 truncate">
                          {char.archetype}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Upgrade Sliders & Stats */}
            <div className="flex-1 w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col justify-between">
              
              {/* Header Preview */}
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <div className="w-16 h-16 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden">
                  <div className="scale-[0.55] translate-y-1">
                    <PixelSprite character={selectedChar} action="idle" />
                  </div>
                </div>
                <div>
                  <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm text-white">
                    {selectedChar.name}
                  </h3>
                  <div className="text-[9px] text-emerald-400 font-bold mt-0.5">
                    PASSIVE: {selectedChar.passiveTraitName}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-0.5">
                    Base: {selectedChar.maxHp} HP | {selectedChar.attack} ATK | {selectedChar.defense} DEF | {selectedChar.speed} SPD
                  </div>
                </div>
              </div>

              {/* 4 Core Upgradable Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 my-3">
                
                {/* Max HP Upgrade */}
                <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5 text-rose-400 font-bold text-xs">
                      <Heart className="w-3.5 h-3.5" />
                      <span>HEALTH UPGRADE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 font-bold">
                      LV {charUpgrades.maxHp}/10
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-1">
                    <div
                      className="h-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${(charUpgrades.maxHp / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-2">
                    <span>Current: +{getStatBonusValue('maxHp', charUpgrades.maxHp)} HP</span>
                    <span>Next: +{getStatBonusValue('maxHp', charUpgrades.maxHp + 1)} HP</span>
                  </div>
                  {charUpgrades.maxHp < 10 ? (
                    <button
                      onClick={() => handleUpgradeStat('maxHp')}
                      disabled={coins < getStatUpgradeCost(charUpgrades.maxHp)}
                      className="w-full py-1.5 rounded font-bold text-[9px] bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
                    >
                      <Coins className="w-3 h-3 text-amber-300" />
                      <span>UPGRADE ({getStatUpgradeCost(charUpgrades.maxHp)} COINS)</span>
                    </button>
                  ) : (
                    <div className="text-center py-1 text-[9px] font-bold text-amber-400">MAX LEVEL</div>
                  )}
                </div>

                {/* Attack Power Upgrade */}
                <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-xs">
                      <Flame className="w-3.5 h-3.5" />
                      <span>ATTACK DAMAGE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 font-bold">
                      LV {charUpgrades.attack}/10
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-1">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${(charUpgrades.attack / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-2">
                    <span>Current: +{getStatBonusValue('attack', charUpgrades.attack)} ATK</span>
                    <span>Next: +{getStatBonusValue('attack', charUpgrades.attack + 1)} ATK</span>
                  </div>
                  {charUpgrades.attack < 10 ? (
                    <button
                      onClick={() => handleUpgradeStat('attack')}
                      disabled={coins < getStatUpgradeCost(charUpgrades.attack)}
                      className="w-full py-1.5 rounded font-bold text-[9px] bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
                    >
                      <Coins className="w-3 h-3 text-amber-300" />
                      <span>UPGRADE ({getStatUpgradeCost(charUpgrades.attack)} COINS)</span>
                    </button>
                  ) : (
                    <div className="text-center py-1 text-[9px] font-bold text-amber-400">MAX LEVEL</div>
                  )}
                </div>

                {/* Defense & Armor Upgrade */}
                <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5 text-sky-400 font-bold text-xs">
                      <Shield className="w-3.5 h-3.5" />
                      <span>DEFENSE & ARMOR</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 font-bold">
                      LV {charUpgrades.defense}/10
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-1">
                    <div
                      className="h-full bg-sky-500 transition-all duration-300"
                      style={{ width: `${(charUpgrades.defense / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-2">
                    <span>Current: +{getStatBonusValue('defense', charUpgrades.defense)} DEF</span>
                    <span>Next: +{getStatBonusValue('defense', charUpgrades.defense + 1)} DEF</span>
                  </div>
                  {charUpgrades.defense < 10 ? (
                    <button
                      onClick={() => handleUpgradeStat('defense')}
                      disabled={coins < getStatUpgradeCost(charUpgrades.defense)}
                      className="w-full py-1.5 rounded font-bold text-[9px] bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
                    >
                      <Coins className="w-3 h-3 text-amber-300" />
                      <span>UPGRADE ({getStatUpgradeCost(charUpgrades.defense)} COINS)</span>
                    </button>
                  ) : (
                    <div className="text-center py-1 text-[9px] font-bold text-amber-400">MAX LEVEL</div>
                  )}
                </div>

                {/* Energy Efficiency Upgrade */}
                <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-xs">
                      <Zap className="w-3.5 h-3.5" />
                      <span>ENERGY EFFICIENCY</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 font-bold">
                      LV {charUpgrades.energy}/10
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden my-1">
                    <div
                      className="h-full bg-cyan-500 transition-all duration-300"
                      style={{ width: `${(charUpgrades.energy / 10) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-2">
                    <span>Cap: Level {charUpgrades.energy} Energy Surge</span>
                    <span>Next: +10% Faster Energy</span>
                  </div>
                  {charUpgrades.energy < 10 ? (
                    <button
                      onClick={() => handleUpgradeStat('energy')}
                      disabled={coins < getStatUpgradeCost(charUpgrades.energy)}
                      className="w-full py-1.5 rounded font-bold text-[9px] bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center space-x-1 cursor-pointer disabled:opacity-50"
                    >
                      <Coins className="w-3 h-3 text-amber-300" />
                      <span>UPGRADE ({getStatUpgradeCost(charUpgrades.energy)} COINS)</span>
                    </button>
                  ) : (
                    <div className="text-center py-1 text-[9px] font-bold text-amber-400">MAX LEVEL</div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THEMES & SKINS */}
        {activeTab === 'themes' && (
          <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row gap-3 sm:gap-4">
            
            {/* Live Sprite Character Showcase */}
            <div className="w-full md:w-64 bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-between flex-shrink-0">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="font-['Press_Start_2P'] text-[9px] text-slate-300">{selectedChar.name}</span>
                <span className="text-xs">{selectedChar.avatarEmoji}</span>
              </div>

              {/* Large Live Preview */}
              <div className="h-40 flex flex-col items-center justify-center my-2 relative w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent rounded-lg pointer-events-none" />
                <div className="scale-[0.95] z-10">
                  <PixelSprite character={selectedChar} overrideSkinId={displayedSkinId} action="idle" />
                </div>
                <div className="mt-1 text-[8px] font-['Press_Start_2P'] text-cyan-400 z-10 text-center">
                  {THEME_PRESETS[displayedSkinId]?.name || 'DEFAULT'}
                </div>
              </div>

              {/* Character quick switcher pills */}
              <div className="flex gap-1 overflow-x-auto w-full py-1">
                {CHARACTERS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      playSelectSound();
                      setSelectedCharId(c.id);
                      setPreviewSkinId(null);
                    }}
                    className={`px-1.5 py-1 rounded text-xs shrink-0 cursor-pointer border ${
                      c.id === selectedCharId ? 'bg-cyan-500 border-cyan-300 text-slate-950 font-bold' : 'bg-slate-800 border-slate-700'
                    }`}
                  >
                    {c.avatarEmoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Themes Grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 content-start">
              {Object.values(THEME_PRESETS).map((theme) => {
                const isEquipped = activeThemeId === theme.id;
                const isUnlocked = isThemeUnlocked(selectedCharId, theme.id) || theme.price === 0;
                const canAfford = coins >= theme.price;
                const isCardSelected = displayedSkinId === theme.id;

                return (
                  <div
                    key={theme.id}
                    onClick={() => setPreviewSkinId(theme.id)}
                    className={`relative rounded-xl p-2.5 border-2 flex flex-col justify-between transition-all cursor-pointer ${
                      isEquipped
                        ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                        : isCardSelected
                        ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    {/* Theme Swatch Preview Box */}
                    <div
                      className={`h-16 rounded-lg mb-2 flex items-center justify-center p-2 relative overflow-hidden bg-gradient-to-br ${theme.previewGradient} border border-white/20`}
                    >
                      <div className="flex items-center space-x-1.5 z-10">
                        <div
                          className="w-4 h-4 rounded-full border border-white/80 shadow"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-white/80 shadow"
                          style={{ backgroundColor: theme.secondaryColor }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-white/80 shadow"
                          style={{ backgroundColor: theme.glowColor }}
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <h5 className="font-['Press_Start_2P'] text-[9px] text-white truncate">
                        {theme.name}
                      </h5>
                      <div className="text-[8px] text-slate-400 mt-0.5">
                        {theme.price === 0 ? 'DEFAULT SKIN' : `${theme.price} COINS`}
                      </div>
                    </div>

                    <div>
                      {isEquipped ? (
                        <div className="w-full py-1.5 text-center font-bold text-[9px] rounded bg-purple-900/80 text-purple-200 border border-purple-500/60 flex items-center justify-center space-x-1">
                          <span>✓ EQUIPPED</span>
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyOrEquipTheme(theme);
                          }}
                          className="w-full py-1.5 rounded font-bold text-[9px] bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-[0_2px_0_rgb(8,145,178)] active:translate-y-0.5 transition-all"
                        >
                          EQUIP
                        </button>
                      ) : canAfford ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyOrEquipTheme(theme);
                          }}
                          className="w-full py-1.5 rounded font-bold text-[9px] flex items-center justify-center space-x-1 cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-[0_2px_0_rgb(217,119,6)] active:translate-y-0.5 transition-all"
                        >
                          <Coins className="w-2.5 h-2.5" />
                          <span>BUY — {theme.price}</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyOrEquipTheme(theme);
                          }}
                          className="w-full py-1.5 rounded font-bold text-[9px] flex items-center justify-center space-x-1 cursor-pointer bg-slate-800/90 hover:bg-slate-700/80 text-rose-400 border border-rose-900/50"
                          title="Not enough coins"
                        >
                          <span>🔒 {theme.price} COINS</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
