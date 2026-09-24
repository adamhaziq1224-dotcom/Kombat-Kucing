const fs = require('fs');
let file = fs.readFileSync('src/data/gameData.ts', 'utf8');

file = file.replace('}]export const MAPS', '}];\n\nexport const MAPS');
file = file.replace('  }  {\n    id: \'survival\'', '  },\n  {\n    id: \'survival\'');

fs.writeFileSync('src/data/gameData.ts', file);
