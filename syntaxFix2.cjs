const fs = require('fs');
let file = fs.readFileSync('src/data/gameData.ts', 'utf8');

file = file.replace(/rounds: 3\n  \}\n  \{/g, 'rounds: 3\n  },\n  {');

fs.writeFileSync('src/data/gameData.ts', file);
