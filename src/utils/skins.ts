import { ThemeId, CharacterTheme } from '../types';

export interface SkinPalette {
  primary: string;      // Primary body / fur / chassis
  secondary: string;    // Underbelly / secondary metal / paws
  accent: string;       // Visor / neon circuits / bandana / trim
  highlight: string;    // Core glow / spark / inner visor line
  dark: string;         // Outlines / shadows / ear interiors
  eye: string;          // Eye iris / glow
  glow: string;         // Drop shadow aura
  vfxAccent: string;    // Combat VFX sparks
}

export interface CharacterSkin {
  id: ThemeId;
  name: string;
  price: number;
  palette: SkinPalette;
  previewGradient: string;
}

// Normalizer to handle any hyphenated or aliased skin IDs smoothly
export function normalizeSkinId(rawId?: string): ThemeId {
  if (!rawId) return 'default';
  const id = rawId.toLowerCase().trim();
  if (id === 'cyber-cyan' || id === 'cyber_cyan' || id === 'cyan') return 'cyan';
  if (id === 'neon-violet' || id === 'neon_violet' || id === 'purple') return 'purple';
  if (id === 'crimson-fury' || id === 'crimson_fury' || id === 'red') return 'red';
  if (id === 'champion-gold' || id === 'champion_gold' || id === 'gold') return 'gold';
  if (id === 'matrix-acid' || id === 'matrix_acid' || id === 'neon_green') return 'neon_green';
  if (id === 'midnight-stealth' || id === 'midnight_stealth' || id === 'midnight') return 'midnight';
  if (id === 'glitch-corrupt' || id === 'glitch_corrupt' || id === 'glitch') return 'glitch';
  return 'default';
}

// Default Iconic Palettes for each character when equipped skin is 'default'
export const CHARACTER_DEFAULT_PALETTES: Record<string, SkinPalette> = {
  oyen: {
    primary: '#ea580c',
    secondary: '#ffedd5',
    accent: '#ef4444',
    highlight: '#fdba74',
    dark: '#c2410c',
    eye: '#06b6d4',
    glow: '#f97316',
    vfxAccent: '#06b6d4'
  },
  mecha_dog: {
    primary: '#581c87',
    secondary: '#3b0764',
    accent: '#a855f7',
    highlight: '#f59e0b',
    dark: '#18181b',
    eye: '#f43f5e',
    glow: '#9333ea',
    vfxAccent: '#38bdf8'
  },
  cyber_puss_9000: {
    primary: '#f8fafc',
    secondary: '#e2e8f0',
    accent: '#06b6d4',
    highlight: '#10b981',
    dark: '#0d9488',
    eye: '#06b6d4',
    glow: '#14b8a6',
    vfxAccent: '#06b6d4'
  },
  shadow_ninja: {
    primary: '#090d16',
    secondary: '#0f172a',
    accent: '#06b6d4',
    highlight: '#22d3ee',
    dark: '#1e293b',
    eye: '#06b6d4',
    glow: '#0891b2',
    vfxAccent: '#22d3ee'
  },
  heavy_bully: {
    primary: '#44403c',
    secondary: '#292524',
    accent: '#dc2626',
    highlight: '#f59e0b',
    dark: '#1c1917',
    eye: '#f59e0b',
    glow: '#dc2626',
    vfxAccent: '#ef4444'
  },
  saber_tooth_boss: {
    primary: '#18181b',
    secondary: '#27272a',
    accent: '#f43f5e',
    highlight: '#fbbf24',
    dark: '#09090b',
    eye: '#f43f5e',
    glow: '#f43f5e',
    vfxAccent: '#38bdf8'
  },
  batu_kong: {
    primary: '#78716c',
    secondary: '#a8a29e',
    accent: '#d97706',
    highlight: '#f59e0b',
    dark: '#44403c',
    eye: '#f59e0b',
    glow: '#78716c',
    vfxAccent: '#d97706'
  },
  pyra: {
    primary: '#ea580c',
    secondary: '#fff7ed',
    accent: '#f97316',
    highlight: '#fdba74',
    dark: '#c2410c',
    eye: '#06b6d4',
    glow: '#ea580c',
    vfxAccent: '#f97316'
  },
  zephyr: {
    primary: '#0284c7',
    secondary: '#e0f2fe',
    accent: '#38bdf8',
    highlight: '#7dd3fc',
    dark: '#0369a1',
    eye: '#38bdf8',
    glow: '#0284c7',
    vfxAccent: '#38bdf8'
  },
  voltchi: {
    primary: '#eab308',
    secondary: '#fef9c3',
    accent: '#facc15',
    highlight: '#fef08a',
    dark: '#ca8a04',
    eye: '#facc15',
    glow: '#eab308',
    vfxAccent: '#facc15'
  },
  volt_alleycat: {
    primary: '#eab308',
    secondary: '#fef08a',
    accent: '#38bdf8',
    highlight: '#ffffff',
    dark: '#ca8a04',
    eye: '#38bdf8',
    glow: '#facc15',
    vfxAccent: '#38bdf8'
  },
  mossu: {
    primary: '#059669',
    secondary: '#d1fae5',
    accent: '#10b981',
    highlight: '#6ee7b7',
    dark: '#047857',
    eye: '#10b981',
    glow: '#059669',
    vfxAccent: '#10b981'
  },
  flareo: {
    primary: '#ea580c',
    secondary: '#ffedd5',
    accent: '#f97316',
    highlight: '#fed7aa',
    dark: '#c2410c',
    eye: '#f59e0b',
    glow: '#ea580c',
    vfxAccent: '#f97316'
  },
  aquabi: {
    primary: '#06b6d4',
    secondary: '#cffafe',
    accent: '#22d3ee',
    highlight: '#a5f3fc',
    dark: '#0891b2',
    eye: '#06b6d4',
    glow: '#06b6d4',
    vfxAccent: '#22d3ee'
  },
  volt_ara: {
    primary: '#eab308',
    secondary: '#fef9c3',
    accent: '#facc15',
    highlight: '#fef08a',
    dark: '#ca8a04',
    eye: '#eab308',
    glow: '#eab308',
    vfxAccent: '#facc15'
  },
  aerix: {
    primary: '#0284c7',
    secondary: '#e0f2fe',
    accent: '#38bdf8',
    highlight: '#7dd3fc',
    dark: '#0369a1',
    eye: '#0284c7',
    glow: '#0284c7',
    vfxAccent: '#38bdf8'
  },
  bouldo: {
    primary: '#78716c',
    secondary: '#d6d3d1',
    accent: '#a8a29e',
    highlight: '#f5f5f4',
    dark: '#44403c',
    eye: '#78716c',
    glow: '#78716c',
    vfxAccent: '#a8a29e'
  },
  noxie: {
    primary: '#1e1b4b',
    secondary: '#312e81',
    accent: '#a855f7',
    highlight: '#c084fc',
    dark: '#0f172a',
    eye: '#a855f7',
    glow: '#a855f7',
    vfxAccent: '#c084fc'
  },
  frosto: {
    primary: '#0369a1',
    secondary: '#e0f2fe',
    accent: '#38bdf8',
    highlight: '#bae6fd',
    dark: '#075985',
    eye: '#38bdf8',
    glow: '#0369a1',
    vfxAccent: '#38bdf8'
  },
  gearo: {
    primary: '#d97706',
    secondary: '#fef3c7',
    accent: '#f59e0b',
    highlight: '#fde68a',
    dark: '#b45309',
    eye: '#d97706',
    glow: '#d97706',
    vfxAccent: '#f59e0b'
  },
  dracuro: {
    primary: '#dc2626',
    secondary: '#fee2e2',
    accent: '#ef4444',
    highlight: '#fca5a5',
    dark: '#991b1b',
    eye: '#dc2626',
    glow: '#dc2626',
    vfxAccent: '#ef4444'
  }
,

  embercub: {
    primary: '#b45309',
    secondary: '#78350f',
    accent: '#ef4444',
    highlight: '#fb923c',
    dark: '#451a03',
    eye: '#fde047',
    glow: '#ef4444',
    vfxAccent: '#fb923c'
  },
  tidefin: {
    primary: '#64748b',
    secondary: '#334155',
    accent: '#06b6d4',
    highlight: '#94a3b8',
    dark: '#0f172a',
    eye: '#38bdf8',
    glow: '#0284c7',
    vfxAccent: '#0ea5e9'
  },
  thornox: {
    primary: '#166534',
    secondary: '#14532d',
    accent: '#65a30d',
    highlight: '#a3e635',
    dark: '#052e16',
    eye: '#d9f99d',
    glow: '#22c55e',
    vfxAccent: '#84cc16'
  },
  zappit: {
    primary: '#fcd34d',
    secondary: '#d97706',
    accent: '#eab308',
    highlight: '#fde047',
    dark: '#92400e',
    eye: '#14b8a6',
    glow: '#f59e0b',
    vfxAccent: '#eab308'
  },
  frostbit: {
    primary: '#e0f2fe',
    secondary: '#bae6fd',
    accent: '#0284c7',
    highlight: '#f0f9ff',
    dark: '#0369a1',
    eye: '#0c4a6e',
    glow: '#38bdf8',
    vfxAccent: '#7dd3fc'
  },
  gravox: {
    primary: '#4c1d95',
    secondary: '#3b0764',
    accent: '#9333ea',
    highlight: '#a855f7',
    dark: '#2e1065',
    eye: '#c084fc',
    glow: '#a855f7',
    vfxAccent: '#d8b4fe'
  },
  lumina: {
    primary: '#fef3c7',
    secondary: '#fde68a',
    accent: '#f59e0b',
    highlight: '#fffbeb',
    dark: '#b45309',
    eye: '#d97706',
    glow: '#fcd34d',
    vfxAccent: '#fef08a'
  },
  terrabun: {
    primary: '#78350f',
    secondary: '#451a03',
    accent: '#d97706',
    highlight: '#b45309',
    dark: '#1c1917',
    eye: '#fbbf24',
    glow: '#b45309',
    vfxAccent: '#d97706'
  },
  mystwing: {
    primary: '#86198f',
    secondary: '#4a044e',
    accent: '#d946ef',
    highlight: '#e879f9',
    dark: '#2e1065',
    eye: '#fdf4ff',
    glow: '#d946ef',
    vfxAccent: '#f0abfc'
  },
  aquadrake: {
    primary: '#0369a1',
    secondary: '#075985',
    accent: '#0ea5e9',
    highlight: '#38bdf8',
    dark: '#082f49',
    eye: '#e0f2fe',
    glow: '#0284c7',
    vfxAccent: '#7dd3fc'
  }
,

  cyber_hound_giant: {
    primary: '#64748b',
    secondary: '#334155',
    accent: '#cbd5e1',
    highlight: '#e2e8f0',
    dark: '#0f172a',
    eye: '#ef4444',
    glow: '#f87171',
    vfxAccent: '#fca5a5'
  },
  mutant_cat_acid: {
    primary: '#84cc16',
    secondary: '#4d7c0f',
    accent: '#a3e635',
    highlight: '#bef264',
    dark: '#3f6212',
    eye: '#fde047',
    glow: '#84cc16',
    vfxAccent: '#bef264'
  }
};

// Data-driven distinct skin configurations with non-destructive palettes
export const SKIN_CONFIGS: Record<ThemeId, CharacterSkin> = {
  default: {
    id: 'default',
    name: 'Original Classic',
    price: 0,
    palette: CHARACTER_DEFAULT_PALETTES.oyen, // Fallback, resolved dynamically per character
    previewGradient: 'from-orange-500 to-amber-600'
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    price: 350,
    palette: {
      primary: '#06b6d4',      // Vibrant Cyber Cyan body/fur/metal
      secondary: '#cffafe',    // Ice Cyan underbelly/secondary plates
      accent: '#0891b2',       // Dark teal trim/markings
      highlight: '#67e8f9',    // High-tech laser cyan core
      dark: '#164e63',         // Deep slate cyan outline/shadows
      eye: '#a5f3fc',          // Bright neon cyan eyes/visor
      glow: '#22d3ee',         // Cyber Cyan aura
      vfxAccent: '#22d3ee'
    },
    previewGradient: 'from-cyan-500 to-blue-600'
  },
  purple: {
    id: 'purple',
    name: 'Neon Violet',
    price: 450,
    palette: {
      primary: '#9333ea',      // Vibrant Neon Violet body/fur/metal
      secondary: '#f3e8ff',    // Soft lavender underbelly/plates
      accent: '#c084fc',       // Electric violet trim/bands
      highlight: '#f5d0fe',    // Neon purple spark/inner glow
      dark: '#3b0764',         // Obsidian purple shadows/outlines
      eye: '#e879f9',          // Neon magenta-purple eyes/visor
      glow: '#c084fc',         // Violet aura
      vfxAccent: '#d946ef'
    },
    previewGradient: 'from-purple-600 to-fuchsia-600'
  },
  red: {
    id: 'red',
    name: 'Crimson Fury',
    price: 500,
    palette: {
      primary: '#dc2626',      // Crimson scarlet body/fur/metal
      secondary: '#fee2e2',    // Pale rose white underbelly
      accent: '#ef4444',       // Fiery scarlet trim
      highlight: '#fecdd3',    // Blazing red spark
      dark: '#7f1d1d',         // Deep blood red shadow
      eye: '#fca5a5',          // Glowing crimson eyes
      glow: '#ef4444',         // Red aura
      vfxAccent: '#f87171'
    },
    previewGradient: 'from-rose-600 to-red-700'
  },
  gold: {
    id: 'gold',
    name: 'Champion Gold',
    price: 750,
    palette: {
      primary: '#eab308',      // Radiant champion gold body/fur/metal
      secondary: '#fef9c3',    // Pale gold shimmer
      accent: '#f59e0b',       // Deep amber gold trim
      highlight: '#ffffff',    // Brilliant white reflection
      dark: '#78350f',         // Bronze shadow/outline
      eye: '#fef08a',          // Sparkling gold eyes
      glow: '#facc15',         // Gold aura
      vfxAccent: '#f59e0b'
    },
    previewGradient: 'from-amber-400 to-yellow-600'
  },
  neon_green: {
    id: 'neon_green',
    name: 'Matrix Acid',
    price: 550,
    palette: {
      primary: '#10b981',      // Matrix emerald body/fur/metal
      secondary: '#d1fae5',    // Pale neon mint underbelly
      accent: '#059669',       // Deep terminal jade trim
      highlight: '#6ee7b7',    // Laser green spark
      dark: '#064e3b',         // Dark mainframe green shadow
      eye: '#a7f3d0',          // Glowing matrix code eyes
      glow: '#34d399',         // Emerald aura
      vfxAccent: '#10b981'
    },
    previewGradient: 'from-emerald-500 to-teal-600'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Stealth',
    price: 600,
    palette: {
      primary: '#1e293b',      // Stealth charcoal slate body
      secondary: '#64748b',    // Titanium steel secondary
      accent: '#38bdf8',       // Stealth neon cyan rim
      highlight: '#94a3b8',    // Polished silver sheen
      dark: '#090d16',         // Pitch dark obsidian shadow
      eye: '#38bdf8',          // Stealth HUD eye
      glow: '#0284c7',         // Cool midnight glow
      vfxAccent: '#60a5fa'
    },
    previewGradient: 'from-slate-800 to-slate-950'
  },
  glitch: {
    id: 'glitch',
    name: 'Glitch Corrupt',
    price: 900,
    palette: {
      primary: '#ec4899',      // Corrupt hot magenta pink
      secondary: '#06b6d4',    // Glitch cyber cyan
      accent: '#a855f7',       // Glitch ultraviolet
      highlight: '#f43f5e',    // Laser red spark
      dark: '#1e1b4b',         // Void black shadow
      eye: '#f472b6',          // Corrupted neon eyes
      glow: '#ec4899',         // Glitch strobe glow
      vfxAccent: '#ec4899'
    },
    previewGradient: 'from-pink-500 via-purple-600 to-cyan-500'
  }
};

// Convert to CharacterTheme format for backward compatibility
export const THEME_PRESETS: Record<ThemeId, CharacterTheme> = Object.fromEntries(
  Object.entries(SKIN_CONFIGS).map(([k, s]) => [
    k as ThemeId,
    {
      id: s.id,
      name: s.name,
      price: s.price,
      primaryColor: s.palette.primary,
      secondaryColor: s.palette.secondary,
      eyeColor: s.palette.eye,
      glowColor: s.palette.glow,
      vfxAccent: s.palette.vfxAccent,
      previewGradient: s.previewGradient
    }
  ])
) as Record<ThemeId, CharacterTheme>;

const ACTIVE_THEMES_KEY = 'kombat_kucing_active_themes';

// Source of truth function: returns current equipped theme for a character
export function getSelectedTheme(charId: string): ThemeId {
  try {
    const raw = localStorage.getItem(ACTIVE_THEMES_KEY);
    const allActive = raw ? JSON.parse(raw) : {};
    return normalizeSkinId(allActive[charId] || 'default');
  } catch {
    return 'default';
  }
}

/**
 * MANDATORY SOURCE OF TRUTH: getCharacterAppearance(characterId, overrideSkinId?)
 * Audited across every character rendering location:
 * Store, Roster, Duo, Battle, Victory, and VS Splash.
 */
export function getCharacterAppearance(
  characterId: string,
  overrideSkinId?: string
): {
  skinId: ThemeId;
  skin: CharacterSkin;
  palette: SkinPalette;
  isDefault: boolean;
  glowColor: string;
  vfxAccent: string;
} {
  const normalizedId = normalizeSkinId(overrideSkinId || getSelectedTheme(characterId));
  const skin = SKIN_CONFIGS[normalizedId] || SKIN_CONFIGS.default;
  const isDefault = normalizedId === 'default';

  // If default, use the character's unique authentic iconic palette
  const defaultPalette = CHARACTER_DEFAULT_PALETTES[characterId] || CHARACTER_DEFAULT_PALETTES.oyen;
  const palette = isDefault ? defaultPalette : skin.palette;

  return {
    skinId: normalizedId,
    skin,
    palette,
    isDefault,
    glowColor: palette.glow,
    vfxAccent: palette.vfxAccent
  };
}
