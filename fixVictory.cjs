const fs = require('fs');
let v = fs.readFileSync('src/components/VictoryScreen.tsx', 'utf8');

// Title size
v = v.replace(
  /className="font-\['Press_Start_2P'\] text-3xl sm:text-5xl drop-shadow-\[0_0_15px_currentColor\]"/,
  'className="font-[\'Press_Start_2P\'] text-2xl sm:text-5xl drop-shadow-[0_0_15px_currentColor]"'
);

// P3.5 buttons
v = v.replace(
  /px-8 py-3\.5/g,
  'px-4 py-2 sm:px-8 sm:py-3.5'
);
v = v.replace(
  /px-6 py-3\.5/g,
  'px-4 py-2 sm:px-6 sm:py-3.5'
);

// Gap
v = v.replace(
  /className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2"/,
  'className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto mt-1 sm:mt-2"'
);

fs.writeFileSync('src/components/VictoryScreen.tsx', v);
