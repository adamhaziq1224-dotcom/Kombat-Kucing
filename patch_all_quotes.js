const fs = require('fs');

let code = fs.readFileSync('src/data/newCharacters.ts', 'utf8');

// The problematic ones are:
code = code.replace("I'm melting...", "I\\'m melting...");

fs.writeFileSync('src/data/newCharacters.ts', code);
