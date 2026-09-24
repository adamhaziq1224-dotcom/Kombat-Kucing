const fs = require('fs');

const path = 'src/data/gameData.ts';
let content = fs.readFileSync(path, 'utf8');

// The new skills
// U: Fast attack, +2 energy
// R: Regen, -2 energy (expCost: 2)
// Since each character has different names, we can just use generic names for U and R or specific ones based on type.
// We will replace the closing bracket of skills with the new skills.
const newSkillsTpl = (charId) => `      },
      {
        id: '${charId}_u',
        name: 'Quick Strike',
        key: 'U',
        type: 'light',
        damage: 10,
        expGain: 2,
        sound: 'SWOOSH!',
        fx: 'shadow_strike',
        description: 'A blazing fast strike that generates +2 Energy.'
      },
      {
        id: '${charId}_r',
        name: 'Regenerate',
        key: 'R',
        type: 'tactical',
        damage: 0,
        expCost: 2,
        sound: 'HEAL!',
        fx: 'healing',
        description: 'Consume 2 Energy to recover 25 HP.',
        effect: 'heal',
        effectValue: 25
      }
    ],`;

// We will find all instances of `    ],` that come right after the ultimate skill.
// Actually, it's easier to find `type: 'ultimate'` and insert after its object.

let lines = content.split('\n');
let newLines = [];
let i = 0;
while (i < lines.length) {
    let line = lines[i];
    newLines.push(line);
    if (line.includes("type: 'ultimate'")) {
        // scan until `      }`
        while (!lines[i].includes("      }")) {
            i++;
            newLines.push(lines[i]);
        }
        // we are at `      }`
        // check if next line is `    ],`
        if (lines[i+1] && lines[i+1].includes("    ],")) {
            // this is the end of the skills array
            let charId = "char"; // let's just use generic id or try to extract from previous lines
            // Actually, we can just output the two new skills
            newLines.push("      ,");
            newLines.push("      {");
            newLines.push("        id: 'new_u_" + Math.random().toString(36).substr(2, 5) + "',");
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
            newLines.push("        id: 'new_r_" + Math.random().toString(36).substr(2, 5) + "',");
            newLines.push("        name: 'Regenerate',");
            newLines.push("        key: 'R',");
            newLines.push("        type: 'tactical',");
            newLines.push("        damage: 0,");
            newLines.push("        expCost: 2,");
            newLines.push("        sound: 'SWOOSH!',"); // Changed HEAL! since we don't have it in audio? We have some sounds in utils/audio.ts
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

