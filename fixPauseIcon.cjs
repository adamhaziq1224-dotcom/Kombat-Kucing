const fs = require('fs');
let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

if (!arena.includes('Pause,')) {
  arena = arena.replace(
    /import \{\n  Heart,/,
    `import {\n  Pause,\n  Heart,`
  );
}

arena = arena.replace(
  /<div className="w-4 h-4 flex items-center justify-center font-\['Press_Start_2P'\] text-\[10px\]">\|\|<\/div>/,
  `<Pause className="w-4 h-4 fill-current" />`
);

fs.writeFileSync('src/components/BattleArena.tsx', arena);
