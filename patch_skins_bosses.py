import re

with open('src/utils/skins.ts', 'r') as f:
    code = f.read()

# Find the end of CHARACTER_DEFAULT_PALETTES object
start_idx = code.find("export const CHARACTER_DEFAULT_PALETTES")
end_idx = code.find("};", start_idx)

new_palettes = """
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
"""

if start_idx != -1 and end_idx != -1:
    code = code[:end_idx] + ",\n" + new_palettes + code[end_idx:]

with open('src/utils/skins.ts', 'w') as f:
    f.write(code)

