const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  /class="bg-black text-slate-100 overflow-x-hidden selection:bg-rose-500 selection:text-white"/,
  'class="bg-black text-slate-100 overflow-hidden w-screen h-screen selection:bg-rose-500 selection:text-white"'
);
indexHtml = indexHtml.replace(
  /<div id="root"><\/div>/,
  '<div id="root" class="w-full h-full"></div>'
);

fs.writeFileSync('index.html', indexHtml);
