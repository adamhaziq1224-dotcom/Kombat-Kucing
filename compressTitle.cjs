const fs = require('fs');
let title = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');

// The main h1 container
title = title.replace(
  /<div className="flex flex-col items-center justify-center space-y-2">/,
  '<div className="flex flex-col items-center justify-center space-y-1">'
);
title = title.replace(
  /space-x-4 my-2 sm:my-6 text-2xl sm:text-4xl/,
  'space-x-2 sm:space-x-4 my-2 text-2xl sm:text-4xl'
);
title = title.replace(
  /gap-4 mt-4/,
  'gap-2 sm:gap-4 mt-2 sm:mt-4'
);
// The keyboard hint
title = title.replace(
  /mt-4 sm:mt-6 text-neutral-500 font-\['Silkscreen'\]/,
  'mt-2 sm:mt-4 text-neutral-500 font-[\'Silkscreen\']'
);
// Make the button slightly smaller on mobile
title = title.replace(
  /px-6 py-2 sm:py-3/,
  'px-4 py-2 sm:px-6 sm:py-3'
);

fs.writeFileSync('src/components/TitleScreen.tsx', title);
