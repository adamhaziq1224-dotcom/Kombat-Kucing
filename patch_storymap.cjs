const fs = require('fs');

let code = fs.readFileSync('src/components/StoryMapScreen.tsx', 'utf8');
code = code.replace("enemy: 'Titan Overlord'", "enemy: 'Giga-Hound'");
fs.writeFileSync('src/components/StoryMapScreen.tsx', code);

