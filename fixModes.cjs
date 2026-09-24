const fs = require('fs');
let file = fs.readFileSync('src/data/gameData.ts', 'utf8');

// Replace the wrongly inserted survival block
file = file.replace(/  \{\n    id: 'survival' as const,[\s\S]*? rounds: 99\n  \}\n\];/m, ']');

const survivalStr = `  {
    id: 'survival' as const,
    title: 'Survival Mode',
    subtitle: 'Endless Waves',
    emoji: '💀',
    badge: 'NEW BATTLEFIELD',
    description: 'Fight endless waves of enemies. How long can you survive?',
    rounds: 99
  }
];`;

file = file.replace(/export const STAGES_MODES.*?\];/ms, match => {
  return match.replace(/\];$/, survivalStr);
});

fs.writeFileSync('src/data/gameData.ts', file);
