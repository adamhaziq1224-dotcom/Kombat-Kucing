const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCode = `const enemies = [CHARACTERS[1], CHARACTERS[2], CHARACTERS[0], CHARACTERS[3]];
              setPlayerChar(CHARACTERS[0]); // Oyen is the hero
              setEnemyChar(enemies[nodeIdx % enemies.length]);
              
              import('./data/gameData').then(({ MAPS }) => {
                setSelectedMap(MAPS[nodeIdx % MAPS.length]);
                setCurrentPhase('VS_SPLASH');
              });`;
              
const newCode = `import('./data/gameData').then(({ CHARACTERS, MAPS }) => {
                const cyberHound = CHARACTERS.find(c => c.id === 'cyber_hound_giant') || CHARACTERS[3];
                const enemies = [CHARACTERS[1], CHARACTERS[2], CHARACTERS[3], cyberHound];
                setPlayerChar(CHARACTERS[0]); // Oyen is the hero
                setEnemyChar(enemies[nodeIdx % enemies.length]);
                setSelectedMap(MAPS[nodeIdx % MAPS.length]);
                setCurrentPhase('VS_SPLASH');
              });`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/App.tsx', code);
