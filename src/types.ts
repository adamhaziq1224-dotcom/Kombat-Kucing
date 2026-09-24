export type GamePhase =
  | 'TITLE'          // Phase 1: Main Title Screen
  | 'STAGE_SELECT'   // Phase 2: Select Stage & Difficulty
  | 'STORY_MAP'      // Story Mode Journey Map
  | 'CHAR_SELECT'    // Phase 3: Character Selection (Player 1)
  | 'OPPONENT_SELECT'// Phase 3.5: Choose Opponent Character (Arcade Mode)
  | 'DUO_SELECT'     // Duo Mode: Select 2 Fighters & Opponent Duo
  | 'MAP_SELECT'     // Phase 4: Map & Arena Selection
  | 'VS_SPLASH'      // Match Introduction Splash
  | 'BATTLE'         // Phase 5: Tactical Fighting Arena
  | 'VICTORY'        // Victory Stage
  | 'GAME_OVER'      // Game Over Stage
  | 'STORE';         // In-Game Cyber Workshop & Store

export type GameMode = 'story' | 'arcade' | 'boss_rush' | 'survival' | 'duo';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type SkillCategory = 'PHYSICAL' | 'ENERGY' | 'EXPLOSIVE' | 'DEFENSE' | 'RECOVERY' | 'STATUS';
export type CombatArchetype = 'ASSASSIN' | 'TANK' | 'CONTROLLER' | 'SUPPORT' | 'BURST' | 'TRICKSTER' | 'BOSS';

export type ThemeId = 'default' | 'cyan' | 'purple' | 'red' | 'gold' | 'neon_green' | 'midnight' | 'glitch';

export interface CharacterTheme {
  id: ThemeId;
  name: string;
  price: number;
  primaryColor: string;
  secondaryColor: string;
  eyeColor: string;
  glowColor: string;
  vfxAccent: string;
  previewGradient: string;
}

export type UpgradeStatKey = 'maxHp' | 'attack' | 'defense' | 'energy';

export interface CharacterUpgrades {
  maxHp: number;   // Level 1-10
  attack: number;  // Level 1-10
  defense: number; // Level 1-10
  energy: number;  // Level 1-10
}

export interface SkillMove {
  id: string;
  name: string;
  key: string;            // Q, W, E, R, T, Y, U (or 1-7)
  category: SkillCategory; // PHYSICAL, ENERGY, EXPLOSIVE, DEFENSE, RECOVERY, STATUS
  type: 'light' | 'heavy' | 'combo' | 'fast' | 'tactical' | 'ultimate';
  damage: number;
  expCost: number;        // Energy consumed
  expGain?: number;       // Energy generated
  cooldownTurns?: number;
  sound: string;
  fx: string;
  description: string;
  effect?: 'burn' | 'shock' | 'stun' | 'heal' | 'shield' | 'lifesteal' | 'rage_boost' | 'evade' | 'armor' | 'empower' | 'glitch' | 'electrified' | 'airborne' | 'counter' | 'freeze' | 'cleanse';
  effectValue?: number;
  armorPierce?: number;   // e.g. 0.5 ignores 50% defense/armor
  bonusCondition?: 'debuff_bonus' | 'execute_bonus' | 'combo_bonus' | 'glitch_bonus' | 'electrified_bonus' | 'airborne_bonus';
}

export interface Character {
  id: string;
  name: string;
  title: string;
  role: string;
  archetype: CombatArchetype;
  preferredDamageType: SkillCategory;
  strengths: string;
  weaknesses: string;
  type: 'cat' | 'dog' | 'ninja' | 'cyber' | 'boss' | 'nature' | 'fire' | 'water' | 'electric' | 'wind' | 'earth' | 'shadow' | 'ice' | 'tech' | 'dragon';
  avatarEmoji: string;
  accentColor: string;
  themeGradient: string;
  maxHp: number;
  maxEnergy?: number;      // 8-pip max energy meter
  energyGeneration?: string;
  attack: number;
  defense: number;
  speed: number;
  critRate: number;
  passiveTraitName: string;
  passiveTraitDesc: string;
  passive?: string;
  ultimate?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  skills: SkillMove[];    // Exactly 7 skills (7th is Ultimate)
  quotes: {
    intro: string;
    win: string;
    loss: string;
    special: string;
  };
  unlockCost?: number;
  themes?: CharacterTheme[];
  activeThemeId?: ThemeId;
}

export interface ArenaMap {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  bgGradient: string;
  ambientLight: string;
  description: string;
  realBgImage?: string;
  isRealEnvironment?: boolean;
}

export interface StatusEffect {
  type: 'burn' | 'shock' | 'stun' | 'defense_buff' | 'attack_buff' | 'regenerate' | 'glitch' | 'electrified' | 'airborne' | 'counter';
  duration: number; // turns remaining
  amount: number;
}

export interface BattleLogEntry {
  id: string;
  round: number;
  sender: 'player' | 'enemy' | 'system' | 'caster';
  text: string;
  soundEffect?: string;
  isCrit?: boolean;
  damage?: number;
  isSpecial?: boolean;
}

export interface BattleStats {
  totalRounds: number;
  comboCount: number;
  maxDamage: number;
  remainingPlayerHp?: number;
  survivalStreak?: number;
  coinsEarned?: number;
  highComboBonus?: number;
  noDefeatBonus?: number;
  difficultyBonus?: number;
}

export interface AnimationState {
  playerAction: 'idle' | 'attack' | 'combo' | 'defend' | 'hit' | 'victory' | 'ko';
  enemyAction: 'idle' | 'attack' | 'combo' | 'defend' | 'hit' | 'victory' | 'ko';
  activeFx: string;
  screenShake: boolean | 'heavy' | 'medium';
  flashColor: string | null;
  bannerText: string | null;
}

export interface DuoSlotState {
  character: Character;
  hp: number;
  maxHp: number;
  energy: number;
  armor: number;
  status: StatusEffect[];
  isRevived?: boolean;
  cooldowns?: Record<string, number>;
}

