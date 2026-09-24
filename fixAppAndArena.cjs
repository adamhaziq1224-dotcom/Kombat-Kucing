const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  /onDefeat=\{\(\) => \{\n\s*setCurrentPhase\('GAME_OVER'\);\n\s*\}\}\n\s*onBackToMenu=\{\(\) => setCurrentPhase\('TITLE'\)\}/,
  `onDefeat={() => {
            setCurrentPhase('GAME_OVER');
          }}
          onBackToMenu={() => setCurrentPhase('TITLE')}
          onRestart={() => setCurrentPhase('VS_SPLASH')}`
);
fs.writeFileSync('src/App.tsx', app);

let arena = fs.readFileSync('src/components/BattleArena.tsx', 'utf8');

if (!arena.includes('onRestart: () => void;')) {
  arena = arena.replace(
    /onBackToMenu: \(\) => void;/,
    `onBackToMenu: () => void;\n  onRestart: () => void;`
  );
}

if (!arena.includes('onRestart\n}) => {')) {
  arena = arena.replace(
    /onBackToMenu\n\}\) => \{/,
    `onBackToMenu,\n  onRestart\n}) => {`
  );
}

// Add the Pause button to BattleArena's render output.
// There is a top bar with HP and round number.
// We can add the pause button absolutely positioned or in the top bar.
// Let's find "TOP HUD BAR"
arena = arena.replace(
  /\{\/\* TOP HUD BAR \*\/\}/,
  `{/* PAUSE MODAL */}
      <AnimatePresence>
        {isPaused && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-neutral-900 border-4 border-yellow-400 p-6 rounded-xl flex flex-col items-center space-y-4 shadow-[0_0_30px_#eab308]"
            >
              <h2 className="font-['Press_Start_2P'] text-yellow-400 mb-4 text-xl">GAME PAUSED</h2>
              <button
                onClick={() => {
                  playSelectSound();
                  setIsPaused(false);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-['Press_Start_2P'] text-xs rounded-lg shadow-[0_0_15px_#3b82f6] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>RESUME</span>
              </button>
              <button
                onClick={() => {
                  playSelectSound();
                  onRestart();
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-['Press_Start_2P'] text-xs rounded-lg shadow-[0_0_15px_#eab308] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESTART</span>
              </button>
              <button
                onClick={() => {
                  playSelectSound();
                  onBackToMenu();
                }}
                className="w-full px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-rose-400 font-['Press_Start_2P'] text-xs rounded-lg border border-rose-500/50 shadow-[0_0_15px_#f43f5e] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>QUIT TO MENU</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOP HUD BAR */}`
);

// We should also add a pause button in the HUD. Let's find "1P: {player.name}"
// And perhaps put it in the center or top right. The existing HUD has flex layout.
// Let's add it near the Round indicator.
arena = arena.replace(
  /<div className="flex flex-col items-center mx-1 sm:mx-4 z-20">/,
  `<div className="flex flex-col items-center mx-1 sm:mx-4 z-20">
            <button
              onClick={() => {
                playSelectSound();
                setIsPaused(true);
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40 p-2 bg-neutral-900 border-2 border-yellow-400 rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors shadow-[0_0_10px_#eab308]"
            >
              <div className="w-4 h-4 flex items-center justify-center font-['Press_Start_2P'] text-[10px]">||</div>
            </button>`
);

fs.writeFileSync('src/components/BattleArena.tsx', arena);
