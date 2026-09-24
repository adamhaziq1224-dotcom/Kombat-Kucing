const fs = require('fs');

let crt = fs.readFileSync('src/components/CrtOverlay.tsx', 'utf8');

crt = crt.replace(
  /className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-neutral-950 border-b-2 border-neutral-800 px-4 py-2 flex items-center justify-between z-20"/,
  'className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-neutral-950 border-b-2 border-neutral-800 px-2 py-1 sm:px-4 sm:py-2 flex items-center justify-between z-20"'
);

// Title text size
crt = crt.replace(
  /className="font-\['Press_Start_2P'\] text-\[10px\] sm:text-xs text-yellow-400 tracking-wider"/,
  'className="font-[\'Press_Start_2P\'] text-[8px] sm:text-xs text-yellow-400 tracking-wider hidden sm:block"'
);

// Make the active phase text slightly smaller
crt = crt.replace(
  /className="hidden sm:inline-block font-\['Silkscreen'\] text-xs text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700"/,
  'className="hidden sm:inline-block font-[\'Silkscreen\'] text-[10px] sm:text-xs text-neutral-400 bg-neutral-800 px-1 sm:px-2 py-0.5 rounded border border-neutral-700"'
);

fs.writeFileSync('src/components/CrtOverlay.tsx', crt);
