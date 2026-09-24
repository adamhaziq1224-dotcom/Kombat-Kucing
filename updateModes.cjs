const fs = require('fs');
let file = fs.readFileSync('src/data/gameData.ts', 'utf8');

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

file = file.replace('];', survivalStr);

fs.writeFileSync('src/data/gameData.ts', file);
