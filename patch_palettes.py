import re

with open('src/utils/skins.ts', 'r') as f:
    code = f.read()

# Find the end of CHARACTER_DEFAULT_PALETTES object
start_idx = code.find("export const CHARACTER_DEFAULT_PALETTES")
end_idx = code.find("};", start_idx)

new_palettes = """
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
"""

if start_idx != -1 and end_idx != -1:
    code = code[:end_idx] + ",\n" + new_palettes + code[end_idx:]

with open('src/utils/skins.ts', 'w') as f:
    f.write(code)

