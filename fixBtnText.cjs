const fs = require('fs');

let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

arena = arena.replace(
  /<div className="flex items-center justify-between mb-1\.5">/,
  '<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 sm:mb-1.5 gap-1 sm:gap-0">'
);

arena = arena.replace(
  /<span className={`font-\['Press_Start_2P'\] text-xs px-2 py-0\.5 rounded border \$\{keyBadgeStyle\}`}>\s*\[\{skill\.key\}\]\s*<\/span>/,
  '<span className={`font-[\'Press_Start_2P\'] text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border ${keyBadgeStyle}`}>[{skill.key}]</span>'
);

arena = arena.replace(
  /<span className={`text-\[10px\] sm:text-xs font-\['Press_Start_2P'\] whitespace-nowrap \$\{canAfford \? tagColor : 'text-neutral-600'\}`}>\s*\{skill\.damage > 0 \? `\$\{skill\.damage\} DMG` : 'UTIL'\}\s*<\/span>/,
  '<span className={`text-[8px] sm:text-[10px] font-[\'Press_Start_2P\'] whitespace-nowrap ${canAfford ? tagColor : \'text-neutral-600\'}`}>{skill.damage > 0 ? `${skill.damage} DMG` : \'UTIL\'}</span>'
);

fs.writeFileSync('src/components/BattleArena.tsx', arena);
