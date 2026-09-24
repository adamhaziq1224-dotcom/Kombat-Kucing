const fs = require('fs');

let map = fs.readFileSync('src/components/MapSelect.tsx', 'utf8');
map = map.replace(
  /className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4 overflow-y-auto min-h-0"/,
  'className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2 sm:mt-4 overflow-y-auto min-h-0"'
);
fs.writeFileSync('src/components/MapSelect.tsx', map);

let stage = fs.readFileSync('src/components/StageSelect.tsx', 'utf8');
stage = stage.replace(
  /className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-4 max-w-4xl mx-auto w-full overflow-y-auto min-h-0"/,
  'className="flex flex-row sm:grid sm:grid-cols-2 gap-2 mt-2 sm:mt-4 max-w-4xl mx-auto w-full overflow-x-auto sm:overflow-y-auto min-h-0 snap-x"'
);
// Make the items in StageSelect shrink-0 on mobile
stage = stage.replace(
  /className="relative overflow-hidden rounded-xl border-4 transition-all duration-300 cursor-pointer group/,
  'className="relative overflow-hidden rounded-xl border-2 sm:border-4 transition-all duration-300 cursor-pointer group shrink-0 w-64 sm:w-auto snap-center'
);
fs.writeFileSync('src/components/StageSelect.tsx', stage);
