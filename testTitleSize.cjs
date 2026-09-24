const fs = require('fs');
let title = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');

// Hide the giant ASCII logo or ensure it's not rendered on mobile.
// Wait, the ASCII logo is hidden on mobile: `hidden sm:block`.
// But there is a huge padding, huge text.
title = title.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-6 md:p-8 text-center select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-hidden overflow-y-auto min-h-0"'
);

// We can allow scrolling ONLY if it exceeds the height, by replacing `overflow-hidden` with `overflow-y-auto`.
// That way, it fits when possible, but if the device is simply too small, it scrolls.
title = title.replace(
  /overflow-hidden"/,
  'overflow-y-auto min-h-0"'
);

fs.writeFileSync('src/components/TitleScreen.tsx', title);
