const fs = require('fs');

// CrtOverlay.tsx
let crt = fs.readFileSync('src/components/CrtOverlay.tsx', 'utf8');

crt = crt.replace(
  /<div className="relative min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">/,
  '<div className="relative h-[100dvh] w-full bg-neutral-950 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">'
);

crt = crt.replace(
  /className="relative w-full max-w-5xl rounded-3xl bg-neutral-900 border-4 border-neutral-800 shadow-\[0_0_50px_rgba\(0,0,0,0\.9\)\] overflow-hidden flex flex-col"/,
  'className="relative w-full h-full sm:max-h-[90vh] max-w-5xl sm:rounded-3xl bg-neutral-900 border-0 sm:border-4 border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"'
);

crt = crt.replace(
  /className=\{`relative w-full bg-black min-h-\[500px\] flex flex-col overflow-hidden \$\{/,
  'className={`relative w-full bg-black flex-1 min-h-0 flex flex-col overflow-hidden ${'
);

crt = crt.replace(
  /KOMBAT KUCING: CYBER CITY/,
  'KOMBAT CUTE: CYBER CITY'
);

// PC HOTKEYS in footer
crt = crt.replace(
  /<div className="bg-neutral-950 border-t-2 border-neutral-800 px-4 py-2 text-neutral-400 flex flex-wrap items-center justify-between text-\[11px\] font-\['Silkscreen'\] z-20 gap-2">/,
  '<div className="bg-neutral-950 border-t-2 border-neutral-800 px-2 py-1 sm:px-4 sm:py-2 text-neutral-400 flex flex-wrap items-center justify-between text-[9px] sm:text-[11px] font-[\'Silkscreen\'] z-20 gap-1 sm:gap-2">'
);

fs.writeFileSync('src/components/CrtOverlay.tsx', crt);

