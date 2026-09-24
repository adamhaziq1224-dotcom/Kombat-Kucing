const fs = require('fs');

let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

arena = arena.replace(
  /import \{\n  Heart,\n  Zap,\n  Flame,\n  Shield,\n  Swords,\n  Sparkles,\n  MessageSquare/,
  `import {\n  Heart,\n  Zap,\n  Flame,\n  Shield,\n  Swords,\n  Sparkles,\n  MessageSquare,\n  Play,\n  RefreshCw,\n  Home`
);

fs.writeFileSync('src/components/BattleArena.tsx', arena);
