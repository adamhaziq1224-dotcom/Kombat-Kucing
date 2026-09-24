const fs = require('fs');

let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

// Root div
arena = arena.replace(
  /className=\{`relative flex-1 flex flex-col justify-between p-3 sm:p-5 select-none overflow-hidden \$\{/,
  'className={`relative flex-1 flex flex-col justify-between p-1 sm:p-2 md:p-3 select-none overflow-hidden ${'
);

// Top HUD
arena = arena.replace(
  /bg-black\/80 p-2\.5 sm:p-3\.5 rounded-2xl border-2 border-neutral-800 backdrop-blur-md shadow-2xl/,
  'bg-black/80 p-1.5 sm:p-2.5 rounded-xl border-2 border-neutral-800 backdrop-blur-md shadow-2xl'
);

// Center stage
arena = arena.replace(
  /className="relative z-10 flex-1 flex items-center justify-around px-4 sm:px-12 my-2 min-h-\[190px\]"/,
  'className="relative z-10 flex-1 flex items-center justify-around px-2 sm:px-12 my-1 min-h-[120px] sm:min-h-[160px]"'
);

// Bottom skills container
arena = arena.replace(
  /className="relative z-20 w-full max-w-5xl mx-auto mt-4"/,
  'className="relative z-20 w-full max-w-5xl mx-auto mt-1 sm:mt-2"'
);

// Bottom skills grid
arena = arena.replace(
  /className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2\.5 sm:gap-3\.5"/,
  'className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2"'
);

// Skill button padding
arena = arena.replace(
  /className=\{`group relative p-3 rounded-xl border-2 transition-all text-left cursor-pointer transform active:scale-95 \$\{themeStyles\}`\}/,
  'className={`group relative p-1.5 sm:p-2 rounded-xl border-2 transition-all text-left cursor-pointer transform active:scale-95 flex flex-col justify-center ${themeStyles}`}'
);

fs.writeFileSync('src/components/BattleArena.tsx', arena);
