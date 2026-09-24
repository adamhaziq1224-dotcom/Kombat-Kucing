const fs = require('fs');

let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');
if (!arena.includes('const [isPaused, setIsPaused] = useState(false);')) {
  arena = arena.replace(
    /const \[turnCount, setTurnCount\] = useState\(1\);/,
    `const [turnCount, setTurnCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);`
  );
  fs.writeFileSync('src/components/BattleArena.tsx', arena);
}
