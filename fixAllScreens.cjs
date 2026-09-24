const fs = require('fs');
const glob = require('fs').readdirSync('src/components');

// 1. Fix TitleScreen
let title = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');
title = title.replace(
  /className="relative flex-1 flex flex-col items-center justify-center py-2 px-1 sm:p-4 text-center select-none overflow-y-auto min-h-0"/,
  'className="relative flex-1 flex flex-col items-center py-2 px-1 sm:p-4 text-center select-none overflow-y-auto min-h-0"'
);
title = title.replace(
  /className="relative z-10 flex flex-col items-center max-w-3xl w-full"/,
  'className="relative z-10 flex flex-col items-center max-w-3xl w-full my-auto shrink-0 py-4"'
);
fs.writeFileSync('src/components/TitleScreen.tsx', title);

// 2. Fix VsSplashScreen
let vs = fs.readFileSync('src/components/VsSplashScreen.tsx', 'utf8');
vs = vs.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center p-2 sm:p-4 text-center select-none overflow-y-auto min-h-0"'
);
vs = vs.replace(
  /<motion\.div\s+initial=\{\{ y: -50/,
  '<div className="flex flex-col items-center w-full my-auto shrink-0 py-4">\n      <motion.div\n        initial={{ y: -50'
);
if (vs.includes('<div className="flex flex-col items-center w-full my-auto shrink-0 py-4">')) {
  vs = vs.replace(
    /    <\/div>\n  \);\n\};/,
    '      </div>\n    </div>\n  );\n};'
  );
}
fs.writeFileSync('src/components/VsSplashScreen.tsx', vs);

// 3. Fix VictoryScreen
let vic = fs.readFileSync('src/components/VictoryScreen.tsx', 'utf8');
vic = vic.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center p-2 sm:p-4 text-center select-none overflow-y-auto min-h-0"'
);
vic = vic.replace(
  /className="max-w-xl w-full bg-neutral-900\/90 border-4 border-yellow-400 p-4 sm:p-6 rounded-2xl shadow-\[0_0_50px_#eab308\] backdrop-blur-sm"/,
  'className="max-w-xl w-full bg-neutral-900/90 border-4 border-yellow-400 p-4 sm:p-6 rounded-2xl shadow-[0_0_50px_#eab308] backdrop-blur-sm my-auto shrink-0"'
);
fs.writeFileSync('src/components/VictoryScreen.tsx', vic);

// 4. Fix CharacterSelect
let charSel = fs.readFileSync('src/components/CharacterSelect.tsx', 'utf8');
charSel = charSel.replace(
  /className="relative flex-1 flex flex-col p-2 sm:p-4 justify-between select-none"/,
  'className="relative flex-1 flex flex-col p-2 sm:p-4 select-none overflow-y-auto min-h-0"'
);
fs.writeFileSync('src/components/CharacterSelect.tsx', charSel);

// 5. Fix MapSelect
let mapSel = fs.readFileSync('src/components/MapSelect.tsx', 'utf8');
mapSel = mapSel.replace(
  /className="relative flex-1 flex flex-col p-4 sm:p-8 justify-between select-none"/,
  'className="relative flex-1 flex flex-col p-2 sm:p-4 select-none overflow-y-auto min-h-0"'
);
fs.writeFileSync('src/components/MapSelect.tsx', mapSel);

// 6. Fix StageSelect
let stageSel = fs.readFileSync('src/components/StageSelect.tsx', 'utf8');
stageSel = stageSel.replace(
  /className="relative flex-1 flex flex-col p-4 sm:p-6 justify-between select-none"/,
  'className="relative flex-1 flex flex-col p-2 sm:p-4 select-none overflow-y-auto min-h-0"'
);
fs.writeFileSync('src/components/StageSelect.tsx', stageSel);

// 7. Fix BattleArena
let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');
arena = arena.replace(
  /className=\{`relative flex-1 flex flex-col justify-between p-1 sm:p-2 md:p-3 select-none overflow-hidden \$\{/,
  'className={`relative flex-1 flex flex-col p-1 sm:p-2 md:p-3 select-none overflow-y-auto min-h-0 ${'
);
// In arena, we want the center stage to grow and push the top and bottom apart if there's space.
// If it's already using flex-1 flex flex-col, and center stage has flex-1, it will work naturally!
fs.writeFileSync('src/components/BattleArena.tsx', arena);

// 8. Fix CrtOverlay Double Overflow
let crt = fs.readFileSync('src/components/CrtOverlay.tsx', 'utf8');
crt = crt.replace(
  /className=\{`relative w-full bg-black flex-1 min-h-0 flex flex-col overflow-y-auto \$\{/,
  'className={`relative w-full bg-black flex-1 min-h-0 flex flex-col ${'
);
crt = crt.replace(
  /className="relative z-10 flex-1 flex flex-col overflow-y-auto min-h-0"/,
  'className="relative z-10 flex-1 flex flex-col overflow-y-auto overflow-x-hidden min-h-0"'
);
fs.writeFileSync('src/components/CrtOverlay.tsx', crt);

console.log("All fixes applied successfully.");
