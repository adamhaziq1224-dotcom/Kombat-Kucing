const fs = require('fs');
let vs = fs.readFileSync('src/components/VsSplashScreen.tsx', 'utf8');

vs = vs.replace(
  /className="relative flex-1 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"/,
  'className="relative flex-1 flex flex-col items-center justify-center p-2 sm:p-4 text-center select-none overflow-hidden"'
);

vs = vs.replace(
  /mb-6 flex flex-col/,
  'mb-2 sm:mb-6 flex flex-col'
);

vs = vs.replace(
  /text-4xl sm:text-7xl/,
  'text-3xl sm:text-5xl md:text-7xl'
);

fs.writeFileSync('src/components/VsSplashScreen.tsx', vs);
