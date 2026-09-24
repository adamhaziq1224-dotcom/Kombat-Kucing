const fs = require('fs');

let comp = fs.readFileSync('src/components/CharacterSelect.tsx', 'utf8');

comp = comp.replace(
  /className="relative flex-1 flex flex-col p-4 sm:p-6 justify-between select-none"/,
  'className="relative flex-1 flex flex-col p-2 sm:p-4 justify-between select-none"'
);

// Reduce gap in the layout
comp = comp.replace(
  /<div className="flex-1 flex flex-col sm:flex-row mt-4 sm:mt-6 gap-6">/,
  '<div className="flex-1 flex flex-col sm:flex-row mt-2 sm:mt-4 gap-2 sm:gap-4">'
);

// Roster selection grid
comp = comp.replace(
  /<div className="grid grid-cols-3 sm:grid-cols-2 gap-3">/,
  '<div className="grid grid-cols-3 sm:grid-cols-2 gap-2">'
);

fs.writeFileSync('src/components/CharacterSelect.tsx', comp);
