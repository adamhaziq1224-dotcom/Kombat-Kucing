const fs = require('fs');

try {
let comp = fs.readFileSync('src/components/VsSplashScreen.tsx', 'utf8');

comp = comp.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-6 select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 select-none overflow-hidden"'
);

fs.writeFileSync('src/components/VsSplashScreen.tsx', comp);
} catch (e) {}

try {
let comp2 = fs.readFileSync('src/components/VictoryScreen.tsx', 'utf8');

comp2 = comp2.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-hidden"'
);

comp2 = comp2.replace(
  /className="max-w-xl w-full bg-neutral-900\/90 border-4 border-yellow-400 p-8 rounded-2xl shadow-\[0_0_50px_#eab308\] backdrop-blur-sm"/,
  'className="max-w-xl w-full bg-neutral-900/90 border-4 border-yellow-400 p-4 sm:p-6 rounded-2xl shadow-[0_0_50px_#eab308] backdrop-blur-sm"'
);

fs.writeFileSync('src/components/VictoryScreen.tsx', comp2);
} catch (e) {}
