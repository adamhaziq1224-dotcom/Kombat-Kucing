const fs = require('fs');

let title = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');
title = title.replace(
  /overflow-hidden overflow-y-auto/,
  'overflow-y-auto'
);
fs.writeFileSync('src/components/TitleScreen.tsx', title);

let crt = fs.readFileSync('src/components/CrtOverlay.tsx', 'utf8');
crt = crt.replace(
  /overflow-hidden sm:overflow-y-auto/,
  'overflow-y-auto'
);
fs.writeFileSync('src/components/CrtOverlay.tsx', crt);

