import { CharacterTheme, ThemeId, UpgradeStatKey, CharacterUpgrades } from '../types';
import { CHARACTERS } from '../data/gameData';
import {
  THEME_PRESETS,
  SKIN_CONFIGS,
  CHARACTER_DEFAULT_PALETTES,
  normalizeSkinId,
  getCharacterAppearance,
  CharacterSkin,
  SkinPalette
} from './skins';

export {
  THEME_PRESETS,
  SKIN_CONFIGS,
  CHARACTER_DEFAULT_PALETTES,
  normalizeSkinId,
  getCharacterAppearance
};
export type { CharacterSkin, SkinPalette };

const COINS_KEY = 'kombat_kucing_cyber_coins';
const UNLOCKED_CHARS_KEY = 'kombat_kucing_unlocked_chars';
const UPGRADES_KEY = 'kombat_kucing_upgrades';
const UNLOCKED_THEMES_KEY = 'kombat_kucing_unlocked_themes';
const ACTIVE_THEMES_KEY = 'kombat_kucing_active_themes';

// Default unlocked roster: Free starters only.
// Paid characters (Cyber-Puss 9000, Shadow Ninja, Heavy Bully, Saber Tooth) must be bought in the store!
export const DEFAULT_UNLOCKED = [
  'oyen',
  'mecha_dog',
  'batu_kong',
  'pyra',
  'zephyr',
  'voltchi'
];

// 1. Cyber Coins Management
export function getCyberCoins(): number {
  try {
    const raw = localStorage.getItem(COINS_KEY);
    if (raw === null) {
      // Starter grant for new players
      localStorage.setItem(COINS_KEY, '800');
      return 800;
    }
    return Math.max(0, parseInt(raw, 10) || 0);
  } catch {
    return 800;
  }
}

export function addCyberCoins(amount: number): number {
  const current = getCyberCoins();
  const updated = current + Math.max(0, amount);
  try {
    localStorage.setItem(COINS_KEY, updated.toString());
  } catch (e) {
    console.error('Failed to save coins', e);
  }
  return updated;
}

export function spendCyberCoins(amount: number): boolean {
  const current = getCyberCoins();
  if (current < amount) return false;
  const updated = current - amount;
  try {
    localStorage.setItem(COINS_KEY, updated.toString());
    return true;
  } catch (e) {
    console.error('Failed to save coins', e);
    return false;
  }
}

// 2. Character Unlock Management
export function getUnlockedCharacters(): string[] {
  try {
    const raw = localStorage.getItem(UNLOCKED_CHARS_KEY);
    if (!raw) {
      localStorage.setItem(UNLOCKED_CHARS_KEY, JSON.stringify(DEFAULT_UNLOCKED));
      return DEFAULT_UNLOCKED;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_UNLOCKED;
    return Array.from(new Set([...DEFAULT_UNLOCKED, ...parsed]));
  } catch {
    return DEFAULT_UNLOCKED;
  }
}

export function isCharacterUnlocked(charId: string): boolean {
  // Free starters are always unlocked
  const char = CHARACTERS.find((c) => c.id === charId);
  if (char && (!char.unlockCost || char.unlockCost === 0)) {
    return true;
  }
  const unlocked = getUnlockedCharacters();
  return unlocked.includes(charId);
}

export function unlockCharacter(charId: string, cost: number): boolean {
  if (isCharacterUnlocked(charId)) return true;
  if (!spendCyberCoins(cost)) return false;
  const unlocked = getUnlockedCharacters();
  unlocked.push(charId);
  try {
    localStorage.setItem(UNLOCKED_CHARS_KEY, JSON.stringify(unlocked));
    return true;
  } catch (e) {
    console.error('Failed to unlock character', e);
    return false;
  }
}

// 3. Stat Upgrades Management (Level 1 to 10)
export function getCharacterUpgrades(charId: string): CharacterUpgrades {
  try {
    const raw = localStorage.getItem(UPGRADES_KEY);
    const allUpgrades = raw ? JSON.parse(raw) : {};
    return (
      allUpgrades[charId] || {
        maxHp: 1,
        attack: 1,
        defense: 1,
        energy: 1
      }
    );
  } catch {
    return { maxHp: 1, attack: 1, defense: 1, energy: 1 };
  }
}

export function getStatUpgradeCost(currentLevel: number): number {
  if (currentLevel >= 10) return 0;
  return currentLevel * 150; // Lv1->Lv2: 150, Lv2->Lv3: 300, etc.
}

export function upgradeCharacterStat(charId: string, stat: UpgradeStatKey): boolean {
  const current = getCharacterUpgrades(charId);
  const currentLevel = current[stat];
  if (currentLevel >= 10) return false;

  const cost = getStatUpgradeCost(currentLevel);
  if (!spendCyberCoins(cost)) return false;

  const updated: CharacterUpgrades = {
    ...current,
    [stat]: currentLevel + 1
  };

  try {
    const raw = localStorage.getItem(UPGRADES_KEY);
    const allUpgrades = raw ? JSON.parse(raw) : {};
    allUpgrades[charId] = updated;
    localStorage.setItem(UPGRADES_KEY, JSON.stringify(allUpgrades));
    return true;
  } catch (e) {
    console.error('Failed to save character upgrade', e);
    return false;
  }
}

// 4. Character Color / Theme Customization
export function getUnlockedThemes(charId: string): ThemeId[] {
  try {
    const raw = localStorage.getItem(UNLOCKED_THEMES_KEY);
    const allThemes = raw ? JSON.parse(raw) : {};
    const charThemes = (allThemes[charId] || ['default']).map((t: string) => normalizeSkinId(t));
    return Array.from(new Set(['default', ...charThemes])) as ThemeId[];
  } catch {
    return ['default'];
  }
}

export function isThemeUnlocked(charId: string, rawThemeId: ThemeId): boolean {
  const themeId = normalizeSkinId(rawThemeId);
  if (themeId === 'default') return true;
  const unlocked = getUnlockedThemes(charId);
  return unlocked.includes(themeId);
}

export function getSelectedTheme(charId: string): ThemeId {
  try {
    const raw = localStorage.getItem(ACTIVE_THEMES_KEY);
    const allActive = raw ? JSON.parse(raw) : {};
    return normalizeSkinId(allActive[charId] || 'default');
  } catch {
    return 'default';
  }
}

export function unlockTheme(charId: string, rawThemeId: ThemeId, price: number): boolean {
  const themeId = normalizeSkinId(rawThemeId);
  const unlocked = getUnlockedThemes(charId);
  // If already owned: do NOT charge again
  if (unlocked.includes(themeId)) {
    setSelectedTheme(charId, themeId);
    return true;
  }
  // Check if player has enough coins
  if (!spendCyberCoins(price)) {
    return false;
  }

  unlocked.push(themeId);
  try {
    const raw = localStorage.getItem(UNLOCKED_THEMES_KEY);
    const allThemes = raw ? JSON.parse(raw) : {};
    allThemes[charId] = Array.from(new Set(unlocked));
    localStorage.setItem(UNLOCKED_THEMES_KEY, JSON.stringify(allThemes));
    // Auto-equip unlocked skin
    setSelectedTheme(charId, themeId);
    return true;
  } catch (e) {
    console.error('Failed to save theme unlock', e);
    return false;
  }
}

export function setSelectedTheme(charId: string, rawThemeId: ThemeId): void {
  const themeId = normalizeSkinId(rawThemeId);
  try {
    const raw = localStorage.getItem(ACTIVE_THEMES_KEY);
    const allActive = raw ? JSON.parse(raw) : {};
    allActive[charId] = themeId;
    localStorage.setItem(ACTIVE_THEMES_KEY, JSON.stringify(allActive));

    // Global real-time dispatch for all active screens without needing page reload
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('kombat_kucing_skin_changed', {
          detail: { charId, themeId }
        })
      );
    }
  } catch (e) {
    console.error('Failed to set active theme', e);
  }
}

// 5. Stat Bonus Value Computation
export function getStatBonusValue(stat: UpgradeStatKey, level: number): number {
  const steps = Math.max(0, level - 1);
  switch (stat) {
    case 'maxHp':
      return steps * 15; // +15 HP per level
    case 'attack':
      return steps * 5;  // +5 ATK per level
    case 'defense':
      return steps * 3;  // +3 DEF per level
    case 'energy':
      return steps * 1;  // +1 Starting Energy per level
    default:
      return 0;
  }
}

// 6. Victory Economy Calculation
export interface VictoryRewardParams {
  mode?: string;
  difficulty?: string;
  rounds?: number;
  comboCount?: number;
  remainingHpPct?: number;
  isFlawless?: boolean;
}

export function calculateVictoryReward(params: VictoryRewardParams): number {
  let baseCoins = 800; // User mandate: Win gives +800 base coins!
  if (params.mode === 'survival') baseCoins = 850;
  if (params.mode === 'duo') baseCoins = 900;
  if (params.mode === 'boss_rush') baseCoins = 1000;

  let diffBonus = 0;
  if (params.difficulty === 'hard') diffBonus = 100;
  else if (params.difficulty === 'medium') diffBonus = 50;

  const comboBonus = Math.min(100, (params.comboCount || 0) * 10);
  const hpBonus = Math.round(((params.remainingHpPct || 50) / 100) * 50);
  const flawlessBonus = params.isFlawless ? 100 : 0;

  return baseCoins + diffBonus + comboBonus + hpBonus + flawlessBonus;
}

export function calculateDefeatReward(params: VictoryRewardParams): number {
  let baseCoins = 400; // User mandate: Defeat gives 400+ coins!
  const comboBonus = Math.min(100, (params.comboCount || 0) * 5);
  return baseCoins + comboBonus;
}

