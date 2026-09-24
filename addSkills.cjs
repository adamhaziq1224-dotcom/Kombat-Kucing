const fs = require('fs');

const path = 'src/data/gameData.ts';
let content = fs.readFileSync(path, 'utf8');

let lines = content.split('\n');
let newLines = [];
let i = 0;
while (i < lines.length) {
    let line = lines[i];
    newLines.push(line);
    if (line.includes("type: 'ultimate'")) {
        while (!lines[i].includes("      }")) {
            i++;
            newLines.push(lines[i]);
        }
        if (lines[i+1] && lines[i+1].includes("    ],")) {
            newLines.push("      ,");
            newLines.push("      {");
            newLines.push("        id: 'new_u_' + Math.random().toString(36).substr(2, 5),");
            newLines.push("        name: 'Quick Strike',");
            newLines.push("        key: 'U',");
            newLines.push("        type: 'light',");
            newLines.push("        damage: 12,");
            newLines.push("        expGain: 2,");
            newLines.push("        sound: 'SLASH!',");
            newLines.push("        fx: 'shadow_strike',");
            newLines.push("        description: 'A blazing fast strike that generates +2 Energy.'");
            newLines.push("      },");
            newLines.push("      {");
            newLines.push("        id: 'new_r_' + Math.random().toString(36).substr(2, 5),");
            newLines.push("        name: 'Regenerate',");
            newLines.push("        key: 'R',");
            newLines.push("        type: 'tactical',");
            newLines.push("        damage: 0,");
            newLines.push("        expCost: 2,");
            newLines.push("        sound: 'SWOOSH!',");
            newLines.push("        fx: 'healing',");
            newLines.push("        description: 'Consume 2 Energy to recover 25 HP.',");
            newLines.push("        effect: 'heal',");
            newLines.push("        effectValue: 25");
            newLines.push("      }");
        }
    }
    i++;
}

fs.writeFileSync(path, newLines.join('\n'));
