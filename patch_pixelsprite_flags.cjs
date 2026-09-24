const fs = require('fs');

let code = fs.readFileSync('src/components/PixelSprite.tsx', 'utf8');

const flagsToInsert = `
  const isEmbercub = character.id === 'embercub';
  const isTidefin = character.id === 'tidefin';
  const isThornox = character.id === 'thornox';
  const isZappit = character.id === 'zappit';
  const isFrostbit = character.id === 'frostbit';
  const isGravox = character.id === 'gravox';
  const isLumina = character.id === 'lumina';
  const isTerrabun = character.id === 'terrabun';
  const isMystwing = character.id === 'mystwing';
  const isAquadrake = character.id === 'aquadrake';
  const isHoundBoss = character.id === 'cyber_hound_giant';
  const isMutantBoss = character.id === 'mutant_cat_acid';
`;

// Insert the flags before `const hasSprite =`
code = code.replace("  const hasSprite =", flagsToInsert + "  const hasSprite = isEmbercub || isTidefin || isThornox || isZappit || isFrostbit || isGravox || isLumina || isTerrabun || isMystwing || isAquadrake || isHoundBoss || isMutantBoss || ");

fs.writeFileSync('src/components/PixelSprite.tsx', code);
