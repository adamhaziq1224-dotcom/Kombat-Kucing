const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace('tracking(5px)', '');
fs.writeFileSync('src/index.css', css);
