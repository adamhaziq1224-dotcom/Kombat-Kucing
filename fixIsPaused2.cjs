const fs = require('fs');
let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');
arena = arena.replace(
  /const \[turnCount, setTurnCount\] = useState<number>\(1\);/,
  `const [turnCount, setTurnCount] = useState<number>(1);\n  const [isPaused, setIsPaused] = useState<boolean>(false);`
);
fs.writeFileSync('src/components/BattleArena.tsx', arena);
