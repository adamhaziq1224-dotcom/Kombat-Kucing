const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/Kombat Kucing: Cyber City/g, 'Kombat Cute');
indexHtml = indexHtml.replace(/Kombat Kucing/g, 'Kombat Cute');
fs.writeFileSync('index.html', indexHtml);

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');
appTsx = appTsx.replace(/KOMBAT KUCING: CYBER CITY/g, 'KOMBAT CUTE: CYBER CITY');
fs.writeFileSync('src/App.tsx', appTsx);

let metadata = fs.readFileSync('metadata.json', 'utf8');
metadata = metadata.replace(/Kombat Kucing/g, 'Kombat Cute');
fs.writeFileSync('metadata.json', metadata);
