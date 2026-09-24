const fs = require('fs');

let code = fs.readFileSync('src/data/newCharacters.ts', 'utf8');

code = code.replace(/ocean\'s/g, "ocean\\'s");

fs.writeFileSync('src/data/newCharacters.ts', code);
