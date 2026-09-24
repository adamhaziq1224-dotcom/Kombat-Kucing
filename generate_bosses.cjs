const fs = require('fs');

const generateBossCharacters = () => {
  const chars = [
    { 
      id: 'cyber_hound_giant', name: 'Giga-Hound', title: 'CYBER-ANJING RAKSASA', role: 'STORY BOSS',
      element: 'metal', color: '#64748b', gradient: 'from-slate-600 via-slate-800 to-black', emoji: '🐺🤖', type: 'boss',
      maxHp: 200, attack: 40, defense: 25, speed: 20,
      skills: [
        { name: 'Titan Roar', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'A deafening metallic roar. Generates 2 Energy.' },
        { name: 'Steel Bite', category: 'PHYSICAL', type: 'light', damage: 20, cost: 0, gain: 1, desc: 'A heavy metal bite. Generates 1 Energy.' },
        { name: 'Servo Slash', category: 'PHYSICAL', type: 'light', damage: 25, cost: 1, desc: 'A quick slash with titanium claws.' },
        { name: 'Piston Smash', category: 'PHYSICAL', type: 'heavy', damage: 45, cost: 2, desc: 'A crushing downward slam with piston-driven arms.' },
        { name: 'Missile Barrage', category: 'PHYSICAL', type: 'combo', damage: 55, cost: 3, desc: 'Fires a volley of shoulder-mounted micro-missiles.' },
        { name: 'Hydraulic Charge', category: 'ENERGY', type: 'fast', damage: 40, cost: 2, desc: 'A high-speed tackle with immense mass.' },
        { name: 'OBLITERATION CANNON', category: 'EXPLOSIVE', type: 'ultimate', damage: 100, cost: 5, desc: 'Charges and fires a massive chest-mounted laser beam.' }
      ],
      quotes: { intro: "TARGET LOCKED. PREPARE FOR DELETION.", win: "THREAT ELIMINATED.", loss: "SYSTEM... FAILURE...", special: "MAXIMUM OUTPUT AUTHORIZED." }
    },
    { 
      id: 'mutant_cat_acid', name: 'Toxiklaw', title: 'KUCING GERGASI MUTAN', role: 'SURVIVAL BOSS',
      element: 'acid', color: '#84cc16', gradient: 'from-lime-500 via-green-700 to-green-950', emoji: '🧫🐱', type: 'boss',
      maxHp: 180, attack: 45, defense: 20, speed: 30,
      skills: [
        { name: 'Toxic Hiss', category: 'ENERGY', type: 'tactical', damage: 0, cost: 0, gain: 2, desc: 'Spews noxious gas to generate 2 Energy.' },
        { name: 'Sludge Swipe', category: 'PHYSICAL', type: 'light', damage: 18, cost: 0, gain: 1, desc: 'A swipe that drips with corrosive sludge. Generates 1 Energy.' },
        { name: 'Venom Fang', category: 'PHYSICAL', type: 'light', damage: 28, cost: 1, desc: 'A quick bite injecting radioactive venom.' },
        { name: 'Acid Spit', category: 'PHYSICAL', type: 'heavy', damage: 48, cost: 2, desc: 'Hurls a massive glob of highly corrosive acid.' },
        { name: 'Mutant Frenzy', category: 'PHYSICAL', type: 'combo', damage: 60, cost: 3, desc: 'A wild, unpredictable flurry of toxic slashes.' },
        { name: 'Puddle Dash', category: 'ENERGY', type: 'fast', damage: 38, cost: 2, desc: 'Melts into a sludge puddle and strikes from below.' },
        { name: 'BIOHAZARD MELTDOWN', category: 'EXPLOSIVE', type: 'ultimate', damage: 95, cost: 5, desc: 'Releases a devastating wave of pure radioactive acid.' }
      ],
      quotes: { intro: "Hissss... Fresh meat...", win: "Melted away to nothing...", loss: "Melting... dissolving...", special: "Let the acid burn!" }
    }
  ];

  let output = `import { Character } from '../types';\n\nexport const BOSS_CHARACTERS: Character[] = [\n`;
  
  for(const c of chars) {
    output += `  {
    id: '${c.id}',
    name: '${c.name}',
    title: '${c.title}',
    role: '${c.role}',
    archetype: 'BOSS',
    preferredDamageType: 'ENERGY',
    strengths: 'Massive damage and health pool',
    weaknesses: 'Slow energy generation',
    type: '${c.type}',
    avatarEmoji: '${c.emoji}',
    accentColor: '${c.color}',
    themeGradient: '${c.gradient}',
    maxHp: ${c.maxHp},
    attack: ${c.attack},
    defense: ${c.defense},
    speed: ${c.speed},
    critRate: 0.15,
    passiveTraitName: 'Boss Armor',
    passiveTraitDesc: 'Takes reduced damage from basic attacks.',
    unlockCost: 9999, // Unlocked only via story/survival progression
    skills: [\n`;
    
    // Skills
    const s = c.skills;
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U'];
    for(let i=0; i<7; i++) {
        output += `      {
        id: '${c.id}_${i}', name: '${s[i].name}', key: '${keys[i]}', category: '${s[i].category}', type: '${s[i].type}',
        damage: ${s[i].damage}, expCost: ${s[i].cost}, ${s[i].gain ? `expGain: ${s[i].gain},` : ''} sound: 'SWOOSH!', fx: 'heavy',
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
  fs.writeFileSync('src/data/bossCharacters.ts', output);
}

generateBossCharacters();
