const fs = require('fs');

try {
let comp = fs.readFileSync('src/components/MapSelect.tsx', 'utf8');

comp = comp.replace(
  /className="relative flex-1 flex flex-col p-4 sm:p-6 justify-between select-none"/,
  'className="relative flex-1 flex flex-col p-2 sm:p-4 justify-between select-none"'
);

comp = comp.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">/,
  '<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4 overflow-y-auto min-h-0">'
);
fs.writeFileSync('src/components/MapSelect.tsx', comp);
} catch (e) {}

try {
let comp2 = fs.readFileSync('src/components/StageSelect.tsx', 'utf8');

comp2 = comp2.replace(
  /className="relative flex-1 flex flex-col p-4 sm:p-6 justify-between select-none"/,
  'className="relative flex-1 flex flex-col p-2 sm:p-4 justify-between select-none"'
);
comp2 = comp2.replace(
  /className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 max-w-4xl mx-auto w-full"/,
  'className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4 max-w-4xl mx-auto w-full overflow-y-auto min-h-0"'
);
fs.writeFileSync('src/components/StageSelect.tsx', comp2);
} catch (e) {}
