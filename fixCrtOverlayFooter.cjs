const fs = require('fs');

let crt = fs.readFileSync('src/components/CrtOverlay.tsx', 'utf8');

crt = crt.replace(
  /<div className="flex items-center space-x-3 text-neutral-300">/,
  '<div className="hidden sm:flex items-center space-x-3 text-neutral-300">'
);

fs.writeFileSync('src/components/CrtOverlay.tsx', crt);
