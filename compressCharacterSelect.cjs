const fs = require('fs');

let comp = fs.readFileSync('src/components/CharacterSelect.tsx', 'utf8');

// The main grid layout
comp = comp.replace(
  /className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto w-full"/,
  'className="my-2 grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-6 items-start max-w-6xl mx-auto w-full"'
);

// The list height
comp = comp.replace(
  /className="lg:col-span-5 flex flex-col space-y-2 max-h-\[460px\] overflow-y-auto pr-1 custom-scrollbar"/,
  'className="lg:col-span-5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-y-auto space-x-2 lg:space-x-0 lg:space-y-2 lg:max-h-[460px] pb-2 lg:pb-0 pr-1 custom-scrollbar"'
);

// Modify individual list item to support horizontal flex on mobile
comp = comp.replace(
  /className=\{`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between/,
  'className={`p-2 lg:p-3 rounded-xl border-2 transition-all cursor-pointer shrink-0 min-w-[140px] lg:min-w-0 flex items-center justify-between'
);

// Adjust sizes inside the character details
comp = comp.replace(
  /className="font-\['Press_Start_2P'\] text-2xl text-yellow-300 drop-shadow-\[0_0_8px_#facc15\]"/,
  'className="font-[\'Press_Start_2P\'] text-lg sm:text-2xl text-yellow-300 drop-shadow-[0_0_8px_#facc15]"'
);

comp = comp.replace(
  /className="lg:col-span-7 bg-neutral-900 border-2 border-neutral-700 rounded-2xl p-6 relative overflow-hidden"/,
  'className="lg:col-span-7 bg-neutral-900 border-2 border-neutral-700 rounded-xl p-3 sm:p-6 relative overflow-hidden"'
);

comp = comp.replace(
  /className="grid grid-cols-2 gap-4 mt-4"/,
  'className="grid grid-cols-2 gap-2 mt-2 sm:mt-4"'
);

fs.writeFileSync('src/components/CharacterSelect.tsx', comp);
