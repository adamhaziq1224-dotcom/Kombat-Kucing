const fs = require('fs');

let tsx = fs.readFileSync('src/components/TitleScreen.tsx', 'utf8');

// Replace ASCII logo
tsx = tsx.replace(
  /<pre className="font-\['VT323'\].*?<\/pre>/s,
  `<div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="font-['Press_Start_2P'] text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 drop-shadow-[0_0_20px_#f472b6] py-2 text-center">
              KOMBAT<br/>CUTE
            </h1>
          </div>`
);

// Remove mobile fallback since we have a responsive h1 now
tsx = tsx.replace(
  /<h1 className="sm:hidden font-\['Press_Start_2P'\].*?<\/h1>/s,
  ''
);

// Replace the emojis with something cuter and fun, perhaps using lucide-react or cute emojis
tsx = tsx.replace(
  /<div className="flex items-center justify-center space-x-6 my-6 text-4xl sm:text-5xl">.*?<\/div>/s,
  `<div className="flex items-center justify-center space-x-6 my-8 text-4xl sm:text-6xl">
          <span className="animate-bounce drop-shadow-[0_0_15px_#f472b6]">🎀🐾</span>
          <span className="font-['Press_Start_2P'] text-xl text-pink-400">VS</span>
          <span className="animate-bounce delay-150 drop-shadow-[0_0_15px_#a855f7]">💖✨</span>
          <span className="font-['Press_Start_2P'] text-xl text-pink-400">VS</span>
          <span className="animate-bounce delay-300 drop-shadow-[0_0_15px_#22d3ee]">🦄🌸</span>
        </div>`
);

fs.writeFileSync('src/components/TitleScreen.tsx', tsx);
