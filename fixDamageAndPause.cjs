const fs = require('fs');

let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

// 1. Add isPaused state to BattleArena
if (!arena.includes('const [isPaused, setIsPaused]')) {
  arena = arena.replace(
    /const \[turnCount, setTurnCount\] = useState\(1\);/,
    `const [turnCount, setTurnCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);`
  );
}

// 2. Prevent skills/turns when paused
arena = arena.replace(
  /if \(isTurnProcessing \|\| playerHp <= 0 \|\| enemyHp <= 0\) return;/g,
  `if (isTurnProcessing || playerHp <= 0 || enemyHp <= 0 || isPaused) return;`
);

// 3. Update the damage floaters UI for player
arena = arena.replace(
  /<motion\.div\s+key=\{d\.id\}\s+initial=\{\{ y: 0, opacity: 1, scale: 0\.8 \}\}\s+animate=\{\{ y: -60, opacity: 0, scale: 1\.3 \}\}\s+exit=\{\{ opacity: 0 \}\}\s+className="absolute -top-10 font-\['Press_Start_2P'\] text-sm sm:text-base font-bold drop-shadow-\[0_2px_10px_rgba\(0,0,0,0\.9\)\] z-30"\s+style=\{\{ color: d\.color \|\| '#ef4444' \}\}\s*>\s*\{d\.text\}\s*<\/motion\.div>/,
  `<motion.div
                  key={d.id}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ y: -80, opacity: [0, 1, 1, 0], scale: [0.5, 1.3, 1.1, 1.1] }}
                  transition={{ duration: 1.2, times: [0, 0.15, 0.8, 1], ease: "easeOut" }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 font-['Press_Start_2P'] text-base sm:text-xl font-bold whitespace-nowrap z-50 pointer-events-none"
                  style={{ 
                    color: d.color || '#ef4444',
                    textShadow: '0 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                  }}
                >
                  {d.isCrit && <div className="text-[10px] text-yellow-300 text-center mb-1 tracking-widest">CRITICAL HIT</div>}
                  {d.text.replace('CRITICAL! ', '')}
                </motion.div>`
);

// 4. Update the damage floaters UI for enemy
arena = arena.replace(
  /<motion\.div\s+key=\{d\.id\}\s+initial=\{\{ y: 0, opacity: 1, scale: 0\.8 \}\}\s+animate=\{\{ y: -60, opacity: 0, scale: 1\.4 \}\}\s+exit=\{\{ opacity: 0 \}\}\s+className="absolute -top-10 font-\['Press_Start_2P'\] text-sm sm:text-base font-bold drop-shadow-\[0_2px_10px_rgba\(0,0,0,0\.9\)\] z-30"\s+style=\{\{ color: d\.color \|\| '#ef4444' \}\}\s*>\s*\{d\.text\}\s*<\/motion\.div>/,
  `<motion.div
                  key={d.id}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ y: -80, opacity: [0, 1, 1, 0], scale: [0.5, 1.4, 1.1, 1.1] }}
                  transition={{ duration: 1.2, times: [0, 0.15, 0.8, 1], ease: "easeOut" }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 font-['Press_Start_2P'] text-base sm:text-xl font-bold whitespace-nowrap z-50 pointer-events-none"
                  style={{ 
                    color: d.color || '#ef4444',
                    textShadow: '0 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                  }}
                >
                  {d.isCrit && <div className="text-[10px] text-yellow-300 text-center mb-1 tracking-widest animate-pulse">CRITICAL HIT</div>}
                  {d.text.replace('CRITICAL! ', '')}
                </motion.div>`
);

fs.writeFileSync('src/components/BattleArena.tsx', arena);
