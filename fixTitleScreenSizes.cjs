const fs = require('fs');

let title = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');

// Padding on root div
title = title.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-6 md:p-8 text-center select-none overflow-hidden"'
);

// Title text size
title = title.replace(
  /text-5xl sm:text-7xl/,
  'text-3xl sm:text-5xl md:text-6xl'
);

// Emojis size
title = title.replace(
  /space-x-6 my-8 text-4xl sm:text-6xl/,
  'space-x-4 my-2 sm:my-6 text-2xl sm:text-4xl'
);

// Call to action
title = title.replace(
  /className="my-4 font-\['Press_Start_2P'\] text-xs sm:text-sm text-yellow-300 drop-shadow-\[0_0_12px_#eab308\]"/,
  'className="my-2 sm:my-4 font-[\'Press_Start_2P\'] text-[8px] sm:text-xs text-yellow-300 drop-shadow-[0_0_12px_#eab308]"'
);

// Action buttons
title = title.replace(
  /className="w-full sm:w-auto px-8 py-4/,
  'className="w-full sm:w-auto px-6 py-2 sm:py-3'
);

// Keyboard hint margin
title = title.replace(
  /className="mt-8 text-neutral-500 font-\['Silkscreen'\] text-xs flex items-center space-x-2"/,
  'className="mt-4 sm:mt-6 text-neutral-500 font-[\'Silkscreen\'] text-[10px] sm:text-xs flex items-center space-x-2"'
);

// Top badge margin
title = title.replace(
  /mb-4 shadow-\[0_0_15px_#f43f5e\]"/,
  'mb-2 sm:mb-4 shadow-[0_0_15px_#f43f5e]"'
);

// Cyber city margin
title = title.replace(
  /mt-2 drop-shadow-\[0_0_10px_#22d3ee\]"/,
  'mt-1 sm:mt-2 drop-shadow-[0_0_10px_#22d3ee]"'
);

fs.writeFileSync('src/components/TitleScreen.tsx', title);
