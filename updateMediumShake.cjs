const fs = require('fs');
let content = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

// Update className in BattleArena
content = content.replace(
  /anim.screenShake === 'heavy' \? 'animate-heavy-shake' : anim.screenShake \? 'animate-shake' : ''/,
  "anim.screenShake === 'heavy' ? 'animate-heavy-shake' : anim.screenShake === 'medium' ? 'animate-shake' : anim.screenShake ? 'animate-shake' : ''"
);

fs.writeFileSync('src/components/BattleArena.tsx', content);
