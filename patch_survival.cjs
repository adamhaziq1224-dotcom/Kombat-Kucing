const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldCode = `                  import('./data/gameData').then(({ CHARACTERS, MAPS }) => {
                    const enemies = CHARACTERS.filter((c) => c.id !== playerChar.id);
                    setEnemyChar(enemies[Math.floor(Math.random() * enemies.length)]);
                    setSelectedMap(MAPS[Math.floor(Math.random() * MAPS.length)]);
                    setCurrentPhase('VS_SPLASH');
                  });`;

const newCode = `                  import('./data/gameData').then(({ CHARACTERS, MAPS }) => {
                    let nextEnemy;
                    if ((survivalStreak + 1) % 5 === 0) {
                      // Boss round every 5 stages
                      const mutant = CHARACTERS.find(c => c.id === 'mutant_cat_acid');
                      nextEnemy = mutant || CHARACTERS[0];
                    } else {
                      const enemies = CHARACTERS.filter((c) => c.id !== playerChar.id && c.type !== 'boss');
                      nextEnemy = enemies[Math.floor(Math.random() * enemies.length)];
                    }
                    setEnemyChar(nextEnemy);
                    setSelectedMap(MAPS[Math.floor(Math.random() * MAPS.length)]);
                    setCurrentPhase('VS_SPLASH');
                  });`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/App.tsx', code);
