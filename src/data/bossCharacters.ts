import { Character } from '../types';

export const BOSS_CHARACTERS: Character[] = [
  {
    id: 'cyber_hound_giant',
    name: 'Giga-Hound',
    title: 'CYBER-ANJING RAKSASA',
    role: 'STORY BOSS',
    archetype: 'BOSS',
    preferredDamageType: 'ENERGY',
    strengths: 'Massive damage and health pool',
    weaknesses: 'Slow energy generation',
    type: 'boss',
    avatarEmoji: '🐺🤖',
    accentColor: '#64748b',
    themeGradient: 'from-slate-600 via-slate-800 to-black',
    maxHp: 200,
    attack: 40,
    defense: 25,
    speed: 20,
    critRate: 0.15,
    passiveTraitName: 'Boss Armor',
    passiveTraitDesc: 'Takes reduced damage from basic attacks.',
    unlockCost: 9999, // Unlocked only via story/survival progression
    skills: [
      {
        id: 'cyber_hound_giant_0', name: 'Titan Roar', key: 'Q', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'heavy',
        description: 'A deafening metallic roar. Generates 2 Energy.'
      },
      {
        id: 'cyber_hound_giant_1', name: 'Steel Bite', key: 'W', category: 'PHYSICAL', type: 'light',
        damage: 20, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'heavy',
        description: 'A heavy metal bite. Generates 1 Energy.'
      },
      {
        id: 'cyber_hound_giant_2', name: 'Servo Slash', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 25, expCost: 1,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'A quick slash with titanium claws.'
      },
      {
        id: 'cyber_hound_giant_3', name: 'Piston Smash', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 45, expCost: 2,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'A crushing downward slam with piston-driven arms.'
      },
      {
        id: 'cyber_hound_giant_4', name: 'Missile Barrage', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 55, expCost: 3,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'Fires a volley of shoulder-mounted micro-missiles.'
      },
      {
        id: 'cyber_hound_giant_5', name: 'Hydraulic Charge', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 40, expCost: 2,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'A high-speed tackle with immense mass.'
      },
      {
        id: 'cyber_hound_giant_6', name: 'OBLITERATION CANNON', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 100, expCost: 5,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'Charges and fires a massive chest-mounted laser beam.'
      }
    ],
    quotes: {
      intro: 'TARGET LOCKED. PREPARE FOR DELETION.',
      win: 'THREAT ELIMINATED.',
      loss: 'SYSTEM... FAILURE...',
      special: 'MAXIMUM OUTPUT AUTHORIZED.'
    }
  },
  {
    id: 'mutant_cat_acid',
    name: 'Toxiklaw',
    title: 'KUCING GERGASI MUTAN',
    role: 'SURVIVAL BOSS',
    archetype: 'BOSS',
    preferredDamageType: 'ENERGY',
    strengths: 'Massive damage and health pool',
    weaknesses: 'Slow energy generation',
    type: 'boss',
    avatarEmoji: '🧫🐱',
    accentColor: '#84cc16',
    themeGradient: 'from-lime-500 via-green-700 to-green-950',
    maxHp: 180,
    attack: 45,
    defense: 20,
    speed: 30,
    critRate: 0.15,
    passiveTraitName: 'Boss Armor',
    passiveTraitDesc: 'Takes reduced damage from basic attacks.',
    unlockCost: 9999, // Unlocked only via story/survival progression
    skills: [
      {
        id: 'mutant_cat_acid_0', name: 'Toxic Hiss', key: 'Q', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'heavy',
        description: 'Spews noxious gas to generate 2 Energy.'
      },
      {
        id: 'mutant_cat_acid_1', name: 'Sludge Swipe', key: 'W', category: 'PHYSICAL', type: 'light',
        damage: 18, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'heavy',
        description: 'A swipe that drips with corrosive sludge. Generates 1 Energy.'
      },
      {
        id: 'mutant_cat_acid_2', name: 'Venom Fang', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 28, expCost: 1,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'A quick bite injecting radioactive venom.'
      },
      {
        id: 'mutant_cat_acid_3', name: 'Acid Spit', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 48, expCost: 2,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'Hurls a massive glob of highly corrosive acid.'
      },
      {
        id: 'mutant_cat_acid_4', name: 'Mutant Frenzy', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 60, expCost: 3,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'A wild, unpredictable flurry of toxic slashes.'
      },
      {
        id: 'mutant_cat_acid_5', name: 'Puddle Dash', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 38, expCost: 2,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'Melts into a sludge puddle and strikes from below.'
      },
      {
        id: 'mutant_cat_acid_6', name: 'BIOHAZARD MELTDOWN', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 95, expCost: 5,  sound: 'SWOOSH!', fx: 'heavy',
        description: 'Releases a devastating wave of pure radioactive acid.'
      }
    ],
    quotes: {
      intro: 'Hissss... Fresh meat...',
      win: 'Melted away to nothing...',
      loss: 'Melting... dissolving...',
      special: 'Let the acid burn!'
    }
  },
];
