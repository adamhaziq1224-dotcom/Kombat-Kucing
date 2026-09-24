const fs = require('fs');

const generateNewCharacters = () => {
  const chars = [
    { 
      id: 'embercub', name: 'Embercub', element: 'fire', color: '#ef4444', gradient: 'from-red-500 via-orange-500 to-red-900', emoji: '🐻🔥', type: 'cat',
      skills: [
        { name: 'Spark Sniff', category: 'ENERGY', type: 'light', damage: 10, cost: 0, gain: 1, desc: 'Sniffs out hidden embers to generate 1 Energy.' },
        { name: 'Campfire Roar', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'A fierce bear-cub roar that stokes the inner fire. Generates 2 Energy.' },
        { name: 'Scorching Paw', category: 'PHYSICAL', type: 'light', damage: 16, cost: 1, desc: 'A swift, flaming paw strike.' },
        { name: 'Bear Hug Inferno', category: 'PHYSICAL', type: 'heavy', damage: 32, cost: 2, desc: 'A crushing hug that burns the enemy.' },
        { name: 'Wildfire Pounce', category: 'PHYSICAL', type: 'combo', damage: 45, cost: 3, desc: 'A multi-hit leaping strike that spreads flames.' },
        { name: 'Blazing Charge', category: 'ENERGY', type: 'fast', damage: 28, cost: 2, desc: 'A blindingly fast fiery tackle.' },
        { name: 'VOLCANIC CUB STRIKE', category: 'EXPLOSIVE', type: 'ultimate', damage: 78, cost: 5, desc: 'Erupts into a massive volcanic explosion, devastating the opponent.' }
      ],
      quotes: { intro: "I may be small, but my fire burns bright!", win: "Too hot to handle!", loss: "My embers... are fading.", special: "Time for a volcanic eruption!" }
    },
    { 
      id: 'tidefin', name: 'Tidefin', element: 'water', color: '#3b82f6', gradient: 'from-blue-400 via-blue-600 to-cyan-900', emoji: '🦈💧', type: 'dog',
      skills: [
        { name: 'Droplet Snap', category: 'ENERGY', type: 'light', damage: 9, cost: 0, gain: 1, desc: 'A quick water-infused bite. Generates 1 Energy.' },
        { name: 'Deep Sea Breath', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Breathes in oceanic mist to restore 2 Energy.' },
        { name: 'Aqua Slash', category: 'PHYSICAL', type: 'light', damage: 15, cost: 1, desc: 'A sharp, hydro-dynamic fin slash.' },
        { name: 'Tidal Crashing Jaw', category: 'PHYSICAL', type: 'heavy', damage: 34, cost: 2, desc: 'A heavy bite infused with the weight of a tsunami.' },
        { name: 'Shark Frenzy', category: 'PHYSICAL', type: 'combo', damage: 42, cost: 3, desc: 'A ferocious multi-bite combination attack.' },
        { name: 'Whirlpool Dash', category: 'ENERGY', type: 'fast', damage: 26, cost: 2, desc: 'A rapid spinning attack that mimics a whirlpool.' },
        { name: 'MEGALODON TSUNAMI', category: 'EXPLOSIVE', type: 'ultimate', damage: 75, cost: 5, desc: 'Summons a colossal tsunami shaped like a prehistoric shark.' }
      ],
      quotes: { intro: "The tide is coming in!", win: "Washed away!", loss: "Sinking... into the depths.", special: "You're in my waters now!" }
    },
    { 
      id: 'thornox', name: 'Thornox', element: 'nature', color: '#22c55e', gradient: 'from-green-500 via-emerald-600 to-green-950', emoji: '🐂🌿', type: 'boss',
      skills: [
        { name: 'Root Stomp', category: 'ENERGY', type: 'light', damage: 11, cost: 0, gain: 1, desc: 'Stomps the ground to draw nutrients. Generates 1 Energy.' },
        { name: 'Photosynthesis', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Absorbs sunlight to generate 2 Energy.' },
        { name: 'Bramble Horn', category: 'PHYSICAL', type: 'light', damage: 14, cost: 1, desc: 'A sharp jab with thorn-covered horns.' },
        { name: 'Timber Slam', category: 'PHYSICAL', type: 'heavy', damage: 35, cost: 2, desc: 'A massive headbutt with the force of a falling tree.' },
        { name: 'Forest Stampede', category: 'PHYSICAL', type: 'combo', damage: 46, cost: 3, desc: 'A relentless series of charging attacks.' },
        { name: 'Vine Whip Rush', category: 'ENERGY', type: 'fast', damage: 24, cost: 2, desc: 'A fast flurry of razor-sharp vines.' },
        { name: 'WRATH OF THE JUNGLE', category: 'EXPLOSIVE', type: 'ultimate', damage: 80, cost: 5, desc: 'Unleashes the raw, untamed power of nature in a massive tremor.' }
      ],
      quotes: { intro: "Stand strong like the ancient trees.", win: "Nature always reclaims what is hers.", loss: "Returning to the soil...", special: "Feel the wrath of the jungle!" }
    },
    { 
      id: 'zappit', name: 'Zappit', element: 'electric', color: '#eab308', gradient: 'from-yellow-400 via-amber-500 to-yellow-900', emoji: '🐰⚡', type: 'ninja',
      skills: [
        { name: 'Static Nibble', category: 'ENERGY', type: 'light', damage: 8, cost: 0, gain: 1, desc: 'A quick shocking bite. Generates 1 Energy.' },
        { name: 'Battery Charge', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Charges internal static to generate 2 Energy.' },
        { name: 'Volt Kick', category: 'PHYSICAL', type: 'light', damage: 17, cost: 1, desc: 'A lightning-fast jumping kick.' },
        { name: 'Thunder Thump', category: 'PHYSICAL', type: 'heavy', damage: 28, cost: 2, desc: 'A heavy hind-leg stomp that cracks with thunder.' },
        { name: 'Lightning Barrage', category: 'PHYSICAL', type: 'combo', damage: 40, cost: 3, desc: 'A blindingly fast series of electrified strikes.' },
        { name: 'Plasma Blink', category: 'ENERGY', type: 'fast', damage: 30, cost: 2, desc: 'Teleports with a flash of plasma to strike instantly.' },
        { name: 'GIGAVOLT OVERLOAD', category: 'EXPLOSIVE', type: 'ultimate', damage: 72, cost: 5, desc: 'Releases all stored electricity in a devastating radial blast.' }
      ],
      quotes: { intro: "Try to keep up! *zip*", win: "Shockingly easy!", loss: "Out of juice...", special: "Maximum voltage reached!" }
    },
    { 
      id: 'frostbit', name: 'Frostbit', element: 'ice', color: '#06b6d4', gradient: 'from-cyan-300 via-sky-500 to-blue-900', emoji: '🐧❄️', type: 'cyber',
      skills: [
        { name: 'Snowball Peck', category: 'ENERGY', type: 'light', damage: 9, cost: 0, gain: 1, desc: 'A chilling peck attack. Generates 1 Energy.' },
        { name: 'Deep Freeze', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Lowers body temperature to sub-zero, generating 2 Energy.' },
        { name: 'Icicle Slash', category: 'PHYSICAL', type: 'light', damage: 16, cost: 1, desc: 'A razor-sharp slash with frozen wings.' },
        { name: 'Glacier Drop', category: 'PHYSICAL', type: 'heavy', damage: 33, cost: 2, desc: 'A heavy diving attack that shatters ice upon impact.' },
        { name: 'Blizzard Flurry', category: 'PHYSICAL', type: 'combo', damage: 44, cost: 3, desc: 'A relentless flurry of freezing strikes.' },
        { name: 'Frostbite Glide', category: 'ENERGY', type: 'fast', damage: 27, cost: 2, desc: 'A high-speed slide attack on a path of ice.' },
        { name: 'ABSOLUTE ZERO AVALANCHE', category: 'EXPLOSIVE', type: 'ultimate', damage: 76, cost: 5, desc: 'Summons a cataclysmic avalanche of magical ice.' }
      ],
      quotes: { intro: "Stay cool.", win: "Ice cold victory.", loss: "I\'m melting...", special: "Let the blizzard rage!" }
    },
    { 
      id: 'gravox', name: 'Gravox', element: 'dark', color: '#8b5cf6', gradient: 'from-purple-600 via-indigo-800 to-black', emoji: '🐺🌑', type: 'boss',
      skills: [
        { name: 'Shadow Snap', category: 'ENERGY', type: 'light', damage: 12, cost: 0, gain: 1, desc: 'A bite from the shadows. Generates 1 Energy.' },
        { name: 'Void Howl', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'A chilling howl that draws void energy. Generates 2 Energy.' },
        { name: 'Umbral Claw', category: 'PHYSICAL', type: 'light', damage: 18, cost: 1, desc: 'A dark slash that tears through light.' },
        { name: 'Gravity Crush', category: 'PHYSICAL', type: 'heavy', damage: 36, cost: 2, desc: 'Uses gravitational force to amplify a heavy slam.' },
        { name: 'Eclipse Mutilation', category: 'PHYSICAL', type: 'combo', damage: 48, cost: 3, desc: 'A terrifying combo executed in complete darkness.' },
        { name: 'Phantom Dash', category: 'ENERGY', type: 'fast', damage: 29, cost: 2, desc: 'A phase-shifting dash through the opponent.' },
        { name: 'SINGULARITY COLLAPSE', category: 'EXPLOSIVE', type: 'ultimate', damage: 85, cost: 5, desc: 'Summons a miniature black hole to crush the enemy.' }
      ],
      quotes: { intro: "Embrace the void.", win: "Swallowed by darkness.", loss: "The shadows... consume me.", special: "There is no escape from gravity." }
    },
    { 
      id: 'lumina', name: 'Lumina', element: 'light', color: '#fcd34d', gradient: 'from-yellow-200 via-amber-300 to-yellow-600', emoji: '🦊✨', type: 'cat',
      skills: [
        { name: 'Sunbeam Nip', category: 'ENERGY', type: 'light', damage: 8, cost: 0, gain: 1, desc: 'A playful, glowing bite. Generates 1 Energy.' },
        { name: 'Aura Shine', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Gathers ambient light to generate 2 Energy.' },
        { name: 'Radiant Tail', category: 'PHYSICAL', type: 'light', damage: 14, cost: 1, desc: 'A sweeping attack with a glowing tail.' },
        { name: 'Solar Flare Strike', category: 'PHYSICAL', type: 'heavy', damage: 30, cost: 2, desc: 'A blinding, high-impact radiant strike.' },
        { name: 'Prismatic Dance', category: 'PHYSICAL', type: 'combo', damage: 38, cost: 3, desc: 'An elegant, multi-hit combo of pure light.' },
        { name: 'Photon Rush', category: 'ENERGY', type: 'fast', damage: 25, cost: 2, desc: 'Moves at the speed of light for a quick strike.' },
        { name: 'SUPERNOVA ASCENSION', category: 'EXPLOSIVE', type: 'ultimate', damage: 70, cost: 5, desc: 'Unleashes a blinding supernova of purifying light.' }
      ],
      quotes: { intro: "Let my light guide the way!", win: "A brilliant victory!", loss: "Fading into twilight...", special: "Behold the radiance!" }
    },
    { 
      id: 'terrabun', name: 'Terrabun', element: 'earth', color: '#b45309', gradient: 'from-amber-700 via-stone-600 to-amber-950', emoji: '🦡🪨', type: 'dog',
      skills: [
        { name: 'Pebble Toss', category: 'ENERGY', type: 'light', damage: 10, cost: 0, gain: 1, desc: 'Throws sharp rocks. Generates 1 Energy.' },
        { name: 'Burrow Rest', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Digs slightly into the ground to draw 2 Energy.' },
        { name: 'Mud Slap', category: 'PHYSICAL', type: 'light', damage: 15, cost: 1, desc: 'A heavy, dirty slap.' },
        { name: 'Boulder Smash', category: 'PHYSICAL', type: 'heavy', damage: 35, cost: 2, desc: 'A crushing blow with rock-hard claws.' },
        { name: 'Tremor Combo', category: 'PHYSICAL', type: 'combo', damage: 45, cost: 3, desc: 'A brutal series of earth-shattering strikes.' },
        { name: 'Quake Roll', category: 'ENERGY', type: 'fast', damage: 28, cost: 2, desc: 'A rapid rolling attack that shakes the ground.' },
        { name: 'CONTINENTAL DRIFT', category: 'EXPLOSIVE', type: 'ultimate', damage: 78, cost: 5, desc: 'Causes a massive localized earthquake.' }
      ],
      quotes: { intro: "Tough as bedrock!", win: "Rock solid.", loss: "Crumbling to dust...", special: "Prepare for an earthquake!" }
    },
    { 
      id: 'mystwing', name: 'Mystwing', element: 'psychic', color: '#d946ef', gradient: 'from-fuchsia-500 via-purple-500 to-pink-900', emoji: '🦉🔮', type: 'ninja',
      skills: [
        { name: 'Mind Peck', category: 'ENERGY', type: 'light', damage: 7, cost: 0, gain: 1, desc: 'A strike that targets the mind. Generates 1 Energy.' },
        { name: 'Third Eye Open', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Meditates to foresee the future, generating 2 Energy.' },
        { name: 'Telekinetic Wing', category: 'PHYSICAL', type: 'light', damage: 15, cost: 1, desc: 'A strike propelled by psychic force.' },
        { name: 'Psy-Crush', category: 'PHYSICAL', type: 'heavy', damage: 31, cost: 2, desc: 'A heavy attack that overwhelms the opponent\'s senses.' },
        { name: 'Illusion Flurry', category: 'PHYSICAL', type: 'combo', damage: 41, cost: 3, desc: 'A multi-hit combo from seemingly nowhere.' },
        { name: 'Mind Warp', category: 'ENERGY', type: 'fast', damage: 27, cost: 2, desc: 'A warping, unpredictable fast attack.' },
        { name: 'NEURAL ANNIHILATION', category: 'EXPLOSIVE', type: 'ultimate', damage: 74, cost: 5, desc: 'A devastating psychic blast that shatters reality.' }
      ],
      quotes: { intro: "I foresee your defeat.", win: "Mind over matter.", loss: "My vision... clouded.", special: "Your mind is mine!" }
    },
    { 
      id: 'aquadrake', name: 'Aquadrake', element: 'dragon', color: '#0284c7', gradient: 'from-sky-600 via-blue-700 to-slate-900', emoji: '🐉🌊', type: 'dragon',
      skills: [
        { name: 'Dragon Ripple', category: 'ENERGY', type: 'light', damage: 11, cost: 0, gain: 1, desc: 'A fluid, draconic strike. Generates 1 Energy.' },
        { name: 'Tide Gathering', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Gathers mystical water energy. Generates 2 Energy.' },
        { name: 'Coral Claw', category: 'PHYSICAL', type: 'light', damage: 17, cost: 1, desc: 'A sharp swipe with dragon claws.' },
        { name: 'Typhoon Tail', category: 'PHYSICAL', type: 'heavy', damage: 34, cost: 2, desc: 'A massive tail swipe with the force of a typhoon.' },
        { name: 'Leviathan Barrage', category: 'PHYSICAL', type: 'combo', damage: 47, cost: 3, desc: 'A relentless dragon-style martial arts combo.' },
        { name: 'Geyser Jet', category: 'ENERGY', type: 'fast', damage: 29, cost: 2, desc: 'A high-speed jet of water propulsion.' },
        { name: 'OCEANIC WRATH', category: 'EXPLOSIVE', type: 'ultimate', damage: 82, cost: 5, desc: 'Summons an ancient sea dragon spirit to obliterate the foe.' }
      ],
      quotes: { intro: "The sea dragon awakens.", win: "Drowned in my power.", loss: "Returning to the depths...", special: "Feel the ocean's wrath!" }
    }
  ];

  let output = `import { Character } from '../types';\n\nexport const NEW_ORIGINAL_CHARACTERS: Character[] = [\n`;
  
  for(const c of chars) {
    output += `  {
    id: '${c.id}',
    name: '${c.name}',
    title: '${c.element.toUpperCase()} ELEMENTAL',
    role: '${c.element.toUpperCase()} COMBATANT',
    archetype: 'BURST',
    preferredDamageType: 'ENERGY',
    strengths: 'Elemental mastery and dynamic combos',
    weaknesses: 'Relies on combo execution',
    type: '${c.type}',
    avatarEmoji: '${c.emoji}',
    accentColor: '${c.color}',
    themeGradient: '${c.gradient}',
    maxHp: 120,
    attack: 25,
    defense: 15,
    speed: 25,
    critRate: 0.2,
    passiveTraitName: '${c.element} Affinity',
    passiveTraitDesc: 'Mastery over the ${c.element} element.',
    unlockCost: 0,
    skills: [\n`;
    
    // Skills
    const s = c.skills;
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U'];
    for(let i=0; i<7; i++) {
        output += `      {
        id: '${c.id}_${i}', name: '${s[i].name}', key: '${keys[i]}', category: '${s[i].category}', type: '${s[i].type}',
        damage: ${s[i].damage}, expCost: ${s[i].cost}, ${s[i].gain ? `expGain: ${s[i].gain},` : ''} sound: 'SWOOSH!', fx: '${c.id}_${s[i].type}',
        description: '${s[i].desc}'
      }${i === 6 ? '' : ','}\n`;
    }
    
    output += `    ],
    quotes: {
      intro: '${c.quotes.intro}',
      win: '${c.quotes.win}',
      loss: '${c.quotes.loss}',
      special: '${c.quotes.special}'
    }
  },\n`;
  }
  output += `];\n`;
  fs.writeFileSync('src/data/newCharacters.ts', output);
}

generateNewCharacters();
