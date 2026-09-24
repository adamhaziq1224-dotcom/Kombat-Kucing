import { Character } from '../types';

export const NEW_ORIGINAL_CHARACTERS: Character[] = [
  {
    id: 'embercub',
    name: 'Embercub',
    title: 'FIRE ELEMENTAL',
    role: 'FIRE COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'cat',
    avatarEmoji: '🐻🔥',
    accentColor: '#ef4444',
    themeGradient: 'from-red-500 via-orange-500 to-red-900',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'fire Affinity',
    passiveTraitDesc: 'Mastery over the fire element.',
    unlockCost: 0,
    skills: [
      {
        id: 'embercub_0', name: 'Spark Sniff', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 10, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'embercub_light',
        description: 'Sniffs out hidden embers to generate 1 Energy.'
      },
      {
        id: 'embercub_1', name: 'Campfire Roar', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'embercub_tactical',
        description: 'A fierce bear-cub roar that stokes the inner fire. Generates 2 Energy.'
      },
      {
        id: 'embercub_2', name: 'Scorching Paw', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 16, expCost: 1,  sound: 'SWOOSH!', fx: 'embercub_light',
        description: 'A swift, flaming paw strike.'
      },
      {
        id: 'embercub_3', name: 'Bear Hug Inferno', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 32, expCost: 2,  sound: 'SWOOSH!', fx: 'embercub_heavy',
        description: 'A crushing hug that burns the enemy.'
      },
      {
        id: 'embercub_4', name: 'Wildfire Pounce', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 45, expCost: 3,  sound: 'SWOOSH!', fx: 'embercub_combo',
        description: 'A multi-hit leaping strike that spreads flames.'
      },
      {
        id: 'embercub_5', name: 'Blazing Charge', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 28, expCost: 2,  sound: 'SWOOSH!', fx: 'embercub_fast',
        description: 'A blindingly fast fiery tackle.'
      },
      {
        id: 'embercub_6', name: 'VOLCANIC CUB STRIKE', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 78, expCost: 5,  sound: 'SWOOSH!', fx: 'embercub_ultimate',
        description: 'Erupts into a massive volcanic explosion, devastating the opponent.'
      }
    ],
    quotes: {
      intro: 'I may be small, but my fire burns bright!',
      win: 'Too hot to handle!',
      loss: 'My embers... are fading.',
      special: 'Time for a volcanic eruption!'
    }
  },
  {
    id: 'tidefin',
    name: 'Tidefin',
    title: 'WATER ELEMENTAL',
    role: 'WATER COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'dog',
    avatarEmoji: '🦈💧',
    accentColor: '#3b82f6',
    themeGradient: 'from-blue-400 via-blue-600 to-cyan-900',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'water Affinity',
    passiveTraitDesc: 'Mastery over the water element.',
    unlockCost: 0,
    skills: [
      {
        id: 'tidefin_0', name: 'Droplet Snap', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 9, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'tidefin_light',
        description: 'A quick water-infused bite. Generates 1 Energy.'
      },
      {
        id: 'tidefin_1', name: 'Deep Sea Breath', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'tidefin_tactical',
        description: 'Breathes in oceanic mist to restore 2 Energy.'
      },
      {
        id: 'tidefin_2', name: 'Aqua Slash', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 15, expCost: 1,  sound: 'SWOOSH!', fx: 'tidefin_light',
        description: 'A sharp, hydro-dynamic fin slash.'
      },
      {
        id: 'tidefin_3', name: 'Tidal Crashing Jaw', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 34, expCost: 2,  sound: 'SWOOSH!', fx: 'tidefin_heavy',
        description: 'A heavy bite infused with the weight of a tsunami.'
      },
      {
        id: 'tidefin_4', name: 'Shark Frenzy', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 42, expCost: 3,  sound: 'SWOOSH!', fx: 'tidefin_combo',
        description: 'A ferocious multi-bite combination attack.'
      },
      {
        id: 'tidefin_5', name: 'Whirlpool Dash', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 26, expCost: 2,  sound: 'SWOOSH!', fx: 'tidefin_fast',
        description: 'A rapid spinning attack that mimics a whirlpool.'
      },
      {
        id: 'tidefin_6', name: 'MEGALODON TSUNAMI', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 75, expCost: 5,  sound: 'SWOOSH!', fx: 'tidefin_ultimate',
        description: 'Summons a colossal tsunami shaped like a prehistoric shark.'
      }
    ],
    quotes: {
      intro: 'The tide is coming in!',
      win: 'Washed away!',
      loss: 'Sinking... into the depths.',
      special: 'You\'re in my waters now!'
    }
  },
  {
    id: 'thornox',
    name: 'Thornox',
    title: 'NATURE ELEMENTAL',
    role: 'NATURE COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'boss',
    avatarEmoji: '🐂🌿',
    accentColor: '#22c55e',
    themeGradient: 'from-green-500 via-emerald-600 to-green-950',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'nature Affinity',
    passiveTraitDesc: 'Mastery over the nature element.',
    unlockCost: 0,
    skills: [
      {
        id: 'thornox_0', name: 'Root Stomp', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 11, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'thornox_light',
        description: 'Stomps the ground to draw nutrients. Generates 1 Energy.'
      },
      {
        id: 'thornox_1', name: 'Photosynthesis', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'thornox_tactical',
        description: 'Absorbs sunlight to generate 2 Energy.'
      },
      {
        id: 'thornox_2', name: 'Bramble Horn', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 14, expCost: 1,  sound: 'SWOOSH!', fx: 'thornox_light',
        description: 'A sharp jab with thorn-covered horns.'
      },
      {
        id: 'thornox_3', name: 'Timber Slam', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 35, expCost: 2,  sound: 'SWOOSH!', fx: 'thornox_heavy',
        description: 'A massive headbutt with the force of a falling tree.'
      },
      {
        id: 'thornox_4', name: 'Forest Stampede', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 46, expCost: 3,  sound: 'SWOOSH!', fx: 'thornox_combo',
        description: 'A relentless series of charging attacks.'
      },
      {
        id: 'thornox_5', name: 'Vine Whip Rush', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 24, expCost: 2,  sound: 'SWOOSH!', fx: 'thornox_fast',
        description: 'A fast flurry of razor-sharp vines.'
      },
      {
        id: 'thornox_6', name: 'WRATH OF THE JUNGLE', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 80, expCost: 5,  sound: 'SWOOSH!', fx: 'thornox_ultimate',
        description: 'Unleashes the raw, untamed power of nature in a massive tremor.'
      }
    ],
    quotes: {
      intro: 'Stand strong like the ancient trees.',
      win: 'Nature always reclaims what is hers.',
      loss: 'Returning to the soil...',
      special: 'Feel the wrath of the jungle!'
    }
  },
  {
    id: 'zappit',
    name: 'Zappit',
    title: 'ELECTRIC ELEMENTAL',
    role: 'ELECTRIC COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'ninja',
    avatarEmoji: '🐰⚡',
    accentColor: '#eab308',
    themeGradient: 'from-yellow-400 via-amber-500 to-yellow-900',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'electric Affinity',
    passiveTraitDesc: 'Mastery over the electric element.',
    unlockCost: 0,
    skills: [
      {
        id: 'zappit_0', name: 'Static Nibble', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 8, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'zappit_light',
        description: 'A quick shocking bite. Generates 1 Energy.'
      },
      {
        id: 'zappit_1', name: 'Battery Charge', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'zappit_tactical',
        description: 'Charges internal static to generate 2 Energy.'
      },
      {
        id: 'zappit_2', name: 'Volt Kick', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 17, expCost: 1,  sound: 'SWOOSH!', fx: 'zappit_light',
        description: 'A lightning-fast jumping kick.'
      },
      {
        id: 'zappit_3', name: 'Thunder Thump', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 28, expCost: 2,  sound: 'SWOOSH!', fx: 'zappit_heavy',
        description: 'A heavy hind-leg stomp that cracks with thunder.'
      },
      {
        id: 'zappit_4', name: 'Lightning Barrage', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 40, expCost: 3,  sound: 'SWOOSH!', fx: 'zappit_combo',
        description: 'A blindingly fast series of electrified strikes.'
      },
      {
        id: 'zappit_5', name: 'Plasma Blink', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 30, expCost: 2,  sound: 'SWOOSH!', fx: 'zappit_fast',
        description: 'Teleports with a flash of plasma to strike instantly.'
      },
      {
        id: 'zappit_6', name: 'GIGAVOLT OVERLOAD', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 72, expCost: 5,  sound: 'SWOOSH!', fx: 'zappit_ultimate',
        description: 'Releases all stored electricity in a devastating radial blast.'
      }
    ],
    quotes: {
      intro: 'Try to keep up! *zip*',
      win: 'Shockingly easy!',
      loss: 'Out of juice...',
      special: 'Maximum voltage reached!'
    }
  },
  {
    id: 'frostbit',
    name: 'Frostbit',
    title: 'ICE ELEMENTAL',
    role: 'ICE COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'cyber',
    avatarEmoji: '🐧❄️',
    accentColor: '#06b6d4',
    themeGradient: 'from-cyan-300 via-sky-500 to-blue-900',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'ice Affinity',
    passiveTraitDesc: 'Mastery over the ice element.',
    unlockCost: 0,
    skills: [
      {
        id: 'frostbit_0', name: 'Snowball Peck', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 9, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'frostbit_light',
        description: 'A chilling peck attack. Generates 1 Energy.'
      },
      {
        id: 'frostbit_1', name: 'Deep Freeze', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'frostbit_tactical',
        description: 'Lowers body temperature to sub-zero, generating 2 Energy.'
      },
      {
        id: 'frostbit_2', name: 'Icicle Slash', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 16, expCost: 1,  sound: 'SWOOSH!', fx: 'frostbit_light',
        description: 'A razor-sharp slash with frozen wings.'
      },
      {
        id: 'frostbit_3', name: 'Glacier Drop', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 33, expCost: 2,  sound: 'SWOOSH!', fx: 'frostbit_heavy',
        description: 'A heavy diving attack that shatters ice upon impact.'
      },
      {
        id: 'frostbit_4', name: 'Blizzard Flurry', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 44, expCost: 3,  sound: 'SWOOSH!', fx: 'frostbit_combo',
        description: 'A relentless flurry of freezing strikes.'
      },
      {
        id: 'frostbit_5', name: 'Frostbite Glide', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 27, expCost: 2,  sound: 'SWOOSH!', fx: 'frostbit_fast',
        description: 'A high-speed slide attack on a path of ice.'
      },
      {
        id: 'frostbit_6', name: 'ABSOLUTE ZERO AVALANCHE', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 76, expCost: 5,  sound: 'SWOOSH!', fx: 'frostbit_ultimate',
        description: 'Summons a cataclysmic avalanche of magical ice.'
      }
    ],
    quotes: {
      intro: 'Stay cool.',
      win: 'Ice cold victory.',
      loss: 'I\'m melting...',
      special: 'Let the blizzard rage!'
    }
  },
  {
    id: 'gravox',
    name: 'Gravox',
    title: 'DARK ELEMENTAL',
    role: 'DARK COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'boss',
    avatarEmoji: '🐺🌑',
    accentColor: '#8b5cf6',
    themeGradient: 'from-purple-600 via-indigo-800 to-black',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'dark Affinity',
    passiveTraitDesc: 'Mastery over the dark element.',
    unlockCost: 0,
    skills: [
      {
        id: 'gravox_0', name: 'Shadow Snap', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 12, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'gravox_light',
        description: 'A bite from the shadows. Generates 1 Energy.'
      },
      {
        id: 'gravox_1', name: 'Void Howl', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'gravox_tactical',
        description: 'A chilling howl that draws void energy. Generates 2 Energy.'
      },
      {
        id: 'gravox_2', name: 'Umbral Claw', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 18, expCost: 1,  sound: 'SWOOSH!', fx: 'gravox_light',
        description: 'A dark slash that tears through light.'
      },
      {
        id: 'gravox_3', name: 'Gravity Crush', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 36, expCost: 2,  sound: 'SWOOSH!', fx: 'gravox_heavy',
        description: 'Uses gravitational force to amplify a heavy slam.'
      },
      {
        id: 'gravox_4', name: 'Eclipse Mutilation', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 48, expCost: 3,  sound: 'SWOOSH!', fx: 'gravox_combo',
        description: 'A terrifying combo executed in complete darkness.'
      },
      {
        id: 'gravox_5', name: 'Phantom Dash', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 29, expCost: 2,  sound: 'SWOOSH!', fx: 'gravox_fast',
        description: 'A phase-shifting dash through the opponent.'
      },
      {
        id: 'gravox_6', name: 'SINGULARITY COLLAPSE', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 85, expCost: 5,  sound: 'SWOOSH!', fx: 'gravox_ultimate',
        description: 'Summons a miniature black hole to crush the enemy.'
      }
    ],
    quotes: {
      intro: 'Embrace the void.',
      win: 'Swallowed by darkness.',
      loss: 'The shadows... consume me.',
      special: 'There is no escape from gravity.'
    }
  },
  {
    id: 'lumina',
    name: 'Lumina',
    title: 'LIGHT ELEMENTAL',
    role: 'LIGHT COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'cat',
    avatarEmoji: '🦊✨',
    accentColor: '#fcd34d',
    themeGradient: 'from-yellow-200 via-amber-300 to-yellow-600',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'light Affinity',
    passiveTraitDesc: 'Mastery over the light element.',
    unlockCost: 0,
    skills: [
      {
        id: 'lumina_0', name: 'Sunbeam Nip', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 8, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'lumina_light',
        description: 'A playful, glowing bite. Generates 1 Energy.'
      },
      {
        id: 'lumina_1', name: 'Aura Shine', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'lumina_tactical',
        description: 'Gathers ambient light to generate 2 Energy.'
      },
      {
        id: 'lumina_2', name: 'Radiant Tail', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 14, expCost: 1,  sound: 'SWOOSH!', fx: 'lumina_light',
        description: 'A sweeping attack with a glowing tail.'
      },
      {
        id: 'lumina_3', name: 'Solar Flare Strike', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 30, expCost: 2,  sound: 'SWOOSH!', fx: 'lumina_heavy',
        description: 'A blinding, high-impact radiant strike.'
      },
      {
        id: 'lumina_4', name: 'Prismatic Dance', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 38, expCost: 3,  sound: 'SWOOSH!', fx: 'lumina_combo',
        description: 'An elegant, multi-hit combo of pure light.'
      },
      {
        id: 'lumina_5', name: 'Photon Rush', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 25, expCost: 2,  sound: 'SWOOSH!', fx: 'lumina_fast',
        description: 'Moves at the speed of light for a quick strike.'
      },
      {
        id: 'lumina_6', name: 'SUPERNOVA ASCENSION', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 70, expCost: 5,  sound: 'SWOOSH!', fx: 'lumina_ultimate',
        description: 'Unleashes a blinding supernova of purifying light.'
      }
    ],
    quotes: {
      intro: 'Let my light guide the way!',
      win: 'A brilliant victory!',
      loss: 'Fading into twilight...',
      special: 'Behold the radiance!'
    }
  },
  {
    id: 'terrabun',
    name: 'Terrabun',
    title: 'EARTH ELEMENTAL',
    role: 'EARTH COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'dog',
    avatarEmoji: '🦡🪨',
    accentColor: '#b45309',
    themeGradient: 'from-amber-700 via-stone-600 to-amber-950',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'earth Affinity',
    passiveTraitDesc: 'Mastery over the earth element.',
    unlockCost: 0,
    skills: [
      {
        id: 'terrabun_0', name: 'Pebble Toss', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 10, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'terrabun_light',
        description: 'Throws sharp rocks. Generates 1 Energy.'
      },
      {
        id: 'terrabun_1', name: 'Burrow Rest', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'terrabun_tactical',
        description: 'Digs slightly into the ground to draw 2 Energy.'
      },
      {
        id: 'terrabun_2', name: 'Mud Slap', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 15, expCost: 1,  sound: 'SWOOSH!', fx: 'terrabun_light',
        description: 'A heavy, dirty slap.'
      },
      {
        id: 'terrabun_3', name: 'Boulder Smash', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 35, expCost: 2,  sound: 'SWOOSH!', fx: 'terrabun_heavy',
        description: 'A crushing blow with rock-hard claws.'
      },
      {
        id: 'terrabun_4', name: 'Tremor Combo', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 45, expCost: 3,  sound: 'SWOOSH!', fx: 'terrabun_combo',
        description: 'A brutal series of earth-shattering strikes.'
      },
      {
        id: 'terrabun_5', name: 'Quake Roll', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 28, expCost: 2,  sound: 'SWOOSH!', fx: 'terrabun_fast',
        description: 'A rapid rolling attack that shakes the ground.'
      },
      {
        id: 'terrabun_6', name: 'CONTINENTAL DRIFT', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 78, expCost: 5,  sound: 'SWOOSH!', fx: 'terrabun_ultimate',
        description: 'Causes a massive localized earthquake.'
      }
    ],
    quotes: {
      intro: 'Tough as bedrock!',
      win: 'Rock solid.',
      loss: 'Crumbling to dust...',
      special: 'Prepare for an earthquake!'
    }
  },
  {
    id: 'mystwing',
    name: 'Mystwing',
    title: 'PSYCHIC ELEMENTAL',
    role: 'PSYCHIC COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'ninja',
    avatarEmoji: '🦉🔮',
    accentColor: '#d946ef',
    themeGradient: 'from-fuchsia-500 via-purple-500 to-pink-900',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'psychic Affinity',
    passiveTraitDesc: 'Mastery over the psychic element.',
    unlockCost: 0,
    skills: [
      {
        id: 'mystwing_0', name: 'Mind Peck', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 7, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'mystwing_light',
        description: 'A strike that targets the mind. Generates 1 Energy.'
      },
      {
        id: 'mystwing_1', name: 'Third Eye Open', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'mystwing_tactical',
        description: 'Meditates to foresee the future, generating 2 Energy.'
      },
      {
        id: 'mystwing_2', name: 'Telekinetic Wing', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 15, expCost: 1,  sound: 'SWOOSH!', fx: 'mystwing_light',
        description: 'A strike propelled by psychic force.'
      },
      {
        id: 'mystwing_3', name: 'Psy-Crush', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 31, expCost: 2,  sound: 'SWOOSH!', fx: 'mystwing_heavy',
        description: 'A heavy attack that overwhelms the opponent\'s senses.'
      },
      {
        id: 'mystwing_4', name: 'Illusion Flurry', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 41, expCost: 3,  sound: 'SWOOSH!', fx: 'mystwing_combo',
        description: 'A multi-hit combo from seemingly nowhere.'
      },
      {
        id: 'mystwing_5', name: 'Mind Warp', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 27, expCost: 2,  sound: 'SWOOSH!', fx: 'mystwing_fast',
        description: 'A warping, unpredictable fast attack.'
      },
      {
        id: 'mystwing_6', name: 'NEURAL ANNIHILATION', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 74, expCost: 5,  sound: 'SWOOSH!', fx: 'mystwing_ultimate',
        description: 'A devastating psychic blast that shatters reality.'
      }
    ],
    quotes: {
      intro: 'I foresee your defeat.',
      win: 'Mind over matter.',
      loss: 'My vision... clouded.',
      special: 'Your mind is mine!'
    }
  },
  {
    id: 'aquadrake',
    name: 'Aquadrake',
    title: 'DRAGON ELEMENTAL',
    role: 'DRAGON COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: 'dragon',
    avatarEmoji: '🐉🌊',
    accentColor: '#0284c7',
    themeGradient: 'from-sky-600 via-blue-700 to-slate-900',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: 'dragon Affinity',
    passiveTraitDesc: 'Mastery over the dragon element.',
    unlockCost: 0,
    skills: [
      {
        id: 'aquadrake_0', name: 'Dragon Ripple', key: 'Q', category: 'ENERGY', type: 'light',
        damage: 11, expCost: 0, expGain: 1, sound: 'SWOOSH!', fx: 'aquadrake_light',
        description: 'A fluid, draconic strike. Generates 1 Energy.'
      },
      {
        id: 'aquadrake_1', name: 'Tide Gathering', key: 'W', category: 'ENERGY', type: 'tactical',
        damage: 0, expCost: 0, expGain: 2, sound: 'SWOOSH!', fx: 'aquadrake_tactical',
        description: 'Gathers mystical water energy. Generates 2 Energy.'
      },
      {
        id: 'aquadrake_2', name: 'Coral Claw', key: 'E', category: 'PHYSICAL', type: 'light',
        damage: 17, expCost: 1,  sound: 'SWOOSH!', fx: 'aquadrake_light',
        description: 'A sharp swipe with dragon claws.'
      },
      {
        id: 'aquadrake_3', name: 'Typhoon Tail', key: 'R', category: 'PHYSICAL', type: 'heavy',
        damage: 34, expCost: 2,  sound: 'SWOOSH!', fx: 'aquadrake_heavy',
        description: 'A massive tail swipe with the force of a typhoon.'
      },
      {
        id: 'aquadrake_4', name: 'Leviathan Barrage', key: 'T', category: 'PHYSICAL', type: 'combo',
        damage: 47, expCost: 3,  sound: 'SWOOSH!', fx: 'aquadrake_combo',
        description: 'A relentless dragon-style martial arts combo.'
      },
      {
        id: 'aquadrake_5', name: 'Geyser Jet', key: 'Y', category: 'ENERGY', type: 'fast',
        damage: 29, expCost: 2,  sound: 'SWOOSH!', fx: 'aquadrake_fast',
        description: 'A high-speed jet of water propulsion.'
      },
      {
        id: 'aquadrake_6', name: 'OCEANIC WRATH', key: 'U', category: 'EXPLOSIVE', type: 'ultimate',
        damage: 82, expCost: 5,  sound: 'SWOOSH!', fx: 'aquadrake_ultimate',
        description: 'Summons an ancient sea dragon spirit to obliterate the foe.'
      }
    ],
    quotes: {
      intro: 'The sea dragon awakens.',
      win: 'Drowned in my power.',
      loss: 'Returning to the depths...',
      special: 'Feel the ocean\'s wrath!'
    }
  },
];
