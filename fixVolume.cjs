const fs = require('fs');
let audio = fs.readFileSync('src/utils/audio.ts', 'utf8');
audio = audio.replace(/gain.gain.setValueAtTime\(0.05, ctx.currentTime\);/g, 'gain.gain.setValueAtTime(0.2, ctx.currentTime);');
fs.writeFileSync('src/utils/audio.ts', audio);
