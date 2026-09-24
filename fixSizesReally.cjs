const fs = require('fs');

let title = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');

// Title size
title = title.replace(
  /text-3xl sm:text-5xl md:text-6xl/,
  'text-2xl sm:text-4xl md:text-5xl'
);
title = title.replace(
  /<div className="flex flex-col items-center justify-center space-y-4">/,
  '<div className="flex flex-col items-center justify-center">'
);
title = title.replace(
  /className="mb-4"/,
  'className="mb-2 sm:mb-4"'
);

// Emojis
title = title.replace(
  /space-x-6 my-6 text-4xl sm:text-5xl/,
  'space-x-3 sm:space-x-6 my-2 sm:my-6 text-2xl sm:text-5xl'
);

// Keyboard hint hide on small screens
title = title.replace(
  /className="mt-2 sm:mt-4 text-neutral-500 font-\['Silkscreen'\] text-\[10px\] sm:text-xs flex items-center space-x-2"/,
  'className="mt-2 sm:mt-4 text-neutral-500 font-[\'Silkscreen\'] text-[10px] sm:text-xs hidden sm:flex items-center space-x-2"'
);

// Root padding
title = title.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-y-auto min-h-0"/,
  'className="relative flex-1 flex flex-col items-center justify-center py-2 px-1 sm:p-4 text-center select-none overflow-y-auto min-h-0"'
);

// Top badge
title = title.replace(
  /mb-2 sm:mb-4 shadow-\[0_0_15px_#f43f5e\]"/,
  'mb-1 sm:mb-4 shadow-[0_0_15px_#f43f5e]"'
);

fs.writeFileSync('src/components/TitleScreen.tsx', title);
