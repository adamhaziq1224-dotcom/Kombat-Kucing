const fs = require('fs');
let crt = fs.readFileSync('src/components/CrtOverlay.tsx', 'utf8');

crt = crt.replace(
  /className=\{`relative w-full bg-black flex-1 min-h-0 flex flex-col overflow-hidden \$\{/,
  'className={`relative w-full bg-black flex-1 min-h-0 flex flex-col overflow-hidden sm:overflow-y-auto ${'
);

// We need the internal `children` wrapper to scroll if needed on mobile
crt = crt.replace(
  /<div className="relative z-10 flex-1 flex flex-col">\{children\}<\/div>/,
  '<div className="relative z-10 flex-1 flex flex-col overflow-y-auto min-h-0">{children}</div>'
);

fs.writeFileSync('src/components/CrtOverlay.tsx', crt);
