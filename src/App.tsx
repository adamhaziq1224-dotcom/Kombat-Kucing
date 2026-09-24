import React, { useState, useEffect, useCallback } from 'react';
import { GamePhase, Character, ArenaMap, GameMode, DifficultyLevel } from './types';
import { CHARACTERS, MAPS, STAGES_MODES } from './data/gameData';
import { CrtOverlay } from './components/CrtOverlay';
import { TitleScreen } from './components/TitleScreen';
import { StageSelect } from './components/StageSelect';
import { StoryMapScreen } from './components/StoryMapScreen';
import { CharacterSelect } from './components/CharacterSelect';
import { DuoSelect } from './components/DuoSelect';
import { StoreView } from './components/StoreView';
import { MapSelect } from './components/MapSelect';
import { VsSplashScreen } from './components/VsSplashScreen';
import { BattleArena } from './components/BattleArena';
import { VictoryScreen } from './components/VictoryScreen';
import { playSelectSound } from './utils/audio';

export default function App() {
  // Game progression phases
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('TITLE');
  const [returnPhaseFromStore, setReturnPhaseFromStore] = useState<GamePhase>('STAGE_SELECT');

  // Selected configurations
  const [selectedMode, setSelectedMode] = useState<GameMode>('story');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [playerChar, setPlayerChar] = useState<Character>(CHARACTERS[0]); // Default Oyen
  const [enemyChar, setEnemyChar] = useState<Character>(CHARACTERS[1]);  // Default Mecha-Dog
  const [playerDuo, setPlayerDuo] = useState<Character | undefined>(undefined);
  const [enemyDuo, setEnemyDuo] = useState<Character | undefined>(undefined);
  const [selectedMap, setSelectedMap] = useState<ArenaMap>(MAPS[0]);      // Default Cyberpunk City Night
  const [roundNumber, setRoundNumber] = useState<number>(1);

  // Survival Mode Scaling State
  // Rule: carry forward HP + 30 HP extra, opponent +10 DMG & +10 HP, player +5 DMG
  const [survivalStreak, setSurvivalStreak] = useState<number>(0);
  const [carriedPlayerHp, setCarriedPlayerHp] = useState<number | undefined>(undefined);
  const [enemyBonusHp, setEnemyBonusHp] = useState<number>(0);
  const [enemyBonusDmg, setEnemyBonusDmg] = useState<number>(0);
  const [playerBonusDmg, setPlayerBonusDmg] = useState<number>(0);

  // Victory statistics
  const [battleStats, setBattleStats] = useState({
    totalRounds: 1,
    comboCount: 0,
    maxDamage: 0
  });

  // Global Keyboard Navigation for Screen Transitions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user is currently typing in an input field, do not trigger global shortcuts
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;

      const key = e.key.toLowerCase();

      // Title Screen Start
      if (currentPhase === 'TITLE') {
        if (key === 'enter' || key === ' ' || key === '1') {
          e.preventDefault();
          playSelectSound();
          setCurrentPhase('STAGE_SELECT');
        }
      }
      // Store Escape
      else if (currentPhase === 'STORE') {
        if (key === 'escape') {
          setCurrentPhase(returnPhaseFromStore);
        }
      }
      // Duo Select Escape
      else if (currentPhase === 'DUO_SELECT') {
        if (key === 'escape') {
          setCurrentPhase('STAGE_SELECT');
        }
      }
      // Stage Select Hotkeys
      else if (currentPhase === 'STAGE_SELECT') {
        if (key === '1') {
          playSelectSound();
          setSelectedMode('story');
          setCurrentPhase('CHAR_SELECT');
        } else if (key === '2') {
          playSelectSound();
          setSelectedMode('duo');
          setCurrentPhase('DUO_SELECT');
        } else if (key === '3') {
          playSelectSound();
          setSelectedMode('arcade');
          setCurrentPhase('CHAR_SELECT');
        } else if (key === 'escape') {
          setCurrentPhase('TITLE');
        }
      }
      // Character Select Hotkeys
      else if (currentPhase === 'CHAR_SELECT') {
        const num = parseInt(key, 10);
        if (num >= 1 && num <= CHARACTERS.length) {
          playSelectSound();
          const chosen = CHARACTERS[num - 1];
          setPlayerChar(chosen);
          if (selectedMode === 'arcade') {
            setCurrentPhase('OPPONENT_SELECT');
          } else {
            const rival =
              chosen.id === 'oyen'
                ? CHARACTERS[1]
                : chosen.id === 'mecha_dog'
                ? CHARACTERS[0]
                : CHARACTERS[1];
            setEnemyChar(rival);
            setCurrentPhase('MAP_SELECT');
          }
        } else if (key === 'escape') {
          setCurrentPhase('STAGE_SELECT');
        }
      }
      // Opponent Select Hotkeys (Arcade Mode)
      else if (currentPhase === 'OPPONENT_SELECT') {
        const num = parseInt(key, 10);
        if (num >= 1 && num <= CHARACTERS.length) {
          playSelectSound();
          setEnemyChar(CHARACTERS[num - 1]);
          setCurrentPhase('MAP_SELECT');
        } else if (key === 'escape') {
          setCurrentPhase('CHAR_SELECT');
        }
      }
      // Map Select Hotkeys
      else if (currentPhase === 'MAP_SELECT') {
        if (key === '1') {
          playSelectSound();
          setSelectedMap(MAPS[0]);
          setCurrentPhase('VS_SPLASH');
        } else if (key === '2') {
          playSelectSound();
          setSelectedMap(MAPS[1]);
          setCurrentPhase('VS_SPLASH');
        } else if (key === '3') {
          playSelectSound();
          setSelectedMap(MAPS[2]);
          setCurrentPhase('VS_SPLASH');
        } else if (key === 'escape') {
          if (selectedMode === 'duo') {
            setCurrentPhase('DUO_SELECT');
          } else if (selectedMode === 'arcade') {
            setCurrentPhase('OPPONENT_SELECT');
          } else {
            setCurrentPhase('CHAR_SELECT');
          }
        }
      }
      // VS Splash Screen skip
      else if (currentPhase === 'VS_SPLASH') {
        if (key === 'enter' || key === ' ') {
          setCurrentPhase('BATTLE');
        }
      }
      // Victory / Game Over screen hotkeys
      else if (currentPhase === 'VICTORY' || currentPhase === 'GAME_OVER') {
        if (key === 'enter' || key === ' ' || key === '1') {
          const btn = document.getElementById('btn-play-again');
          btn?.click();
        } else if (key === 'escape' || key === 'm' || key === '2') {
          const btn = document.getElementById('btn-victory-main-menu');
          btn?.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPhase, selectedMode, returnPhaseFromStore]);

  // Phase Title text for top marquee HUD
  const getPhaseName = () => {
    switch (currentPhase) {
      case 'TITLE':
        return 'MAIN TITLE';
      case 'STAGE_SELECT':
        return 'SELECT STAGE';
      case 'STORE':
        return 'CYBER WORKSHOP & STORE';
      case 'DUO_SELECT':
        return 'TAG TEAM SELECTION';
      case 'STORY_MAP':
        return 'STORY CAMPAIGN MAP';
      case 'CHAR_SELECT':
        return 'CHOOSE FIGHTER';
      case 'OPPONENT_SELECT':
        return 'CHOOSE OPPONENT';
      case 'MAP_SELECT':
        return 'CHOOSE BATTLEGROUND';
      case 'VS_SPLASH':
        return 'MATCH ANNOUNCEMENT';
      case 'BATTLE':
        return 'BATTLE ARENA';
      case 'VICTORY':
        return 'VICTORY';
      case 'GAME_OVER':
        return 'GAME OVER';
      default:
        return 'KOMBAT KUCING';
    }
  };

  return (
    <>
      <CrtOverlay activePhaseText={getPhaseName()}>
        {/* 1. FASA 1: TITLE SCREEN */}
        {currentPhase === 'TITLE' && (
          <TitleScreen
            onStart={() => setCurrentPhase('STAGE_SELECT')}
            onOpenStore={() => {
              setReturnPhaseFromStore('TITLE');
              setCurrentPhase('STORE');
            }}
          />
        )}

        {/* 2. FASA 2: STAGE SELECT */}
        {currentPhase === 'STAGE_SELECT' && (
          <StageSelect
            selectedDifficulty={difficulty}
            onChangeDifficulty={setDifficulty}
            onOpenStore={() => {
              setReturnPhaseFromStore('STAGE_SELECT');
              setCurrentPhase('STORE');
            }}
            onSelectStage={(mode) => {
              setSelectedMode(mode);
              if (mode === 'story') {
                setCurrentPhase('STORY_MAP');
              } else if (mode === 'duo') {
                setCurrentPhase('DUO_SELECT');
              } else if (mode === 'survival') {
                // Initialize fresh survival run
                setSurvivalStreak(0);
                setCarriedPlayerHp(undefined);
                setEnemyBonusHp(0);
                setEnemyBonusDmg(0);
                setPlayerBonusDmg(0);
                setCurrentPhase('CHAR_SELECT');
              } else {
                setCurrentPhase('CHAR_SELECT');
              }
            }}
            onBack={() => setCurrentPhase('TITLE')}
          />
        )}

        {/* 2.2 CYBER STORE & WORKSHOP */}
        {currentPhase === 'STORE' && (
          <StoreView
            onBack={() => setCurrentPhase(returnPhaseFromStore)}
            onSelectCharacter={(char) => {
              setPlayerChar(char);
            }}
          />
        )}

        {/* 2.3 DUO / TAG TEAM FIGHTER SELECT */}
        {currentPhase === 'DUO_SELECT' && (
          <DuoSelect
            onConfirmDuo={(p1, p2, e1, e2) => {
              setPlayerChar(p1);
              setPlayerDuo(p2);
              setEnemyChar(e1);
              setEnemyDuo(e2);
              setCurrentPhase('MAP_SELECT');
            }}
            onBack={() => setCurrentPhase('STAGE_SELECT')}
          />
        )}

        {/* 2.5 STORY MAP */}
        {currentPhase === 'STORY_MAP' && (
          <StoryMapScreen
            onSelectNode={(nodeIdx) => {
              import('./data/gameData').then(({ CHARACTERS, MAPS }) => {
                const cyberHound = CHARACTERS.find(c => c.id === 'cyber_hound_giant') || CHARACTERS[3];
                const enemies = [CHARACTERS[1], CHARACTERS[2], CHARACTERS[3], cyberHound];
                setPlayerChar(CHARACTERS[0]); // Oyen is the hero
                setEnemyChar(enemies[nodeIdx % enemies.length]);
                setSelectedMap(MAPS[nodeIdx % MAPS.length]);
                setCurrentPhase('VS_SPLASH');
              });
            }}
            onBack={() => setCurrentPhase('STAGE_SELECT')}
          />
        )}

        {/* 3. FASA 3: CHARACTER SELECT (P1) */}
        {currentPhase === 'CHAR_SELECT' && (
          <CharacterSelect
            isOpponentSelect={false}
            onSelectCharacter={(char) => {
              setPlayerChar(char);
              if (selectedMode === 'arcade') {
                setCurrentPhase('OPPONENT_SELECT');
              } else {
                const rival =
                  char.id === 'oyen'
                    ? CHARACTERS[1] // Mecha-Dog
                    : char.id === 'mecha_dog'
                    ? CHARACTERS[0] // Oyen
                    : CHARACTERS[1]; // Mecha-Dog
                setEnemyChar(rival);
                setCurrentPhase('MAP_SELECT');
              }
            }}
            onBack={() => setCurrentPhase('STAGE_SELECT')}
          />
        )}

        {/* 3.5 OPPONENT SELECT (ARCADE MODE) */}
        {currentPhase === 'OPPONENT_SELECT' && (
          <CharacterSelect
            isOpponentSelect={true}
            playerChar={playerChar}
            onSelectCharacter={(opponent) => {
              setEnemyChar(opponent);
              setCurrentPhase('MAP_SELECT');
            }}
            onBack={() => setCurrentPhase('CHAR_SELECT')}
          />
        )}

        {/* 4. FASA 4: MAP SELECT */}
        {currentPhase === 'MAP_SELECT' && (
          <MapSelect
            onSelectMap={(map) => {
              setSelectedMap(map);
              setCurrentPhase('VS_SPLASH');
            }}
            onBack={() => {
              if (selectedMode === 'duo') {
                setCurrentPhase('DUO_SELECT');
              } else if (selectedMode === 'arcade') {
                setCurrentPhase('OPPONENT_SELECT');
              } else {
                setCurrentPhase('CHAR_SELECT');
              }
            }}
          />
        )}

        {/* VS SPLASH SCREEN BEFORE BATTLE */}
        {currentPhase === 'VS_SPLASH' && (
          <VsSplashScreen
            player={playerChar}
            enemy={enemyChar}
            map={selectedMap}
            roundNumber={roundNumber}
            difficulty={difficulty}
            onProceedToBattle={() => setCurrentPhase('BATTLE')}
          />
        )}

        {/* 5. FASA 5: BATTLE ARENA */}
        {currentPhase === 'BATTLE' && (
          <BattleArena
            player={playerChar}
            enemy={enemyChar}
            map={selectedMap}
            roundNumber={roundNumber}
            difficulty={difficulty}
            onChangeDifficulty={setDifficulty}
            isDuoMode={selectedMode === 'duo'}
            playerDuo={playerDuo}
            enemyDuo={enemyDuo}
            initialPlayerHp={selectedMode === 'survival' ? carriedPlayerHp : undefined}
            playerBonusDmg={selectedMode === 'survival' ? playerBonusDmg : 0}
            enemyBonusHp={selectedMode === 'survival' ? enemyBonusHp : 0}
            enemyBonusDmg={selectedMode === 'survival' ? enemyBonusDmg : 0}
            survivalStreak={selectedMode === 'survival' ? survivalStreak : undefined}
            onVictory={(stats) => {
              setBattleStats(stats);
              if (selectedMode === 'story') {
                const currentProgress = parseInt(localStorage.getItem('storyProgress') || '0', 10);
                localStorage.setItem('storyProgress', (currentProgress + 1).toString());
              } else if (selectedMode === 'survival') {
                // USER SPECIFICATION:
                // "for survival mode , after user defeating the opponent then it goes next round with healtbar that user have in the previous round with extra 30 hp plus, the opponent will get 10 more damage and 10 more hp and the user will get 5 more damage upgrade"
                const prevHp = stats.remainingPlayerHp ?? playerChar.maxHp;
                const nextHp = prevHp + 30;
                setCarriedPlayerHp(nextHp);
                setPlayerBonusDmg((prev) => prev + 5);
                setEnemyBonusHp((prev) => prev + 10);
                setEnemyBonusDmg((prev) => prev + 10);
                setSurvivalStreak((prev) => prev + 1);
              }
              setCurrentPhase('VICTORY');
            }}
            onDefeat={(stats) => {
              if (stats) {
                setBattleStats(stats);
              }
              if (selectedMode === 'survival') {
                setSurvivalStreak(0);
                setCarriedPlayerHp(undefined);
                setEnemyBonusHp(0);
                setEnemyBonusDmg(0);
                setPlayerBonusDmg(0);
              }
              setCurrentPhase('GAME_OVER');
            }}
            onBackToMenu={() => {
              setRoundNumber(1);
              setSurvivalStreak(0);
              setCarriedPlayerHp(undefined);
              setEnemyBonusHp(0);
              setEnemyBonusDmg(0);
              setPlayerBonusDmg(0);
              setCurrentPhase('TITLE');
            }}
            onRestart={() => {
              if (selectedMode === 'survival') {
                setSurvivalStreak(0);
                setCarriedPlayerHp(undefined);
                setEnemyBonusHp(0);
                setEnemyBonusDmg(0);
                setPlayerBonusDmg(0);
              }
              setCurrentPhase('VS_SPLASH');
            }}
          />
        )}

        {/* 6. VICTORY / GAME OVER SCREEN */}
        {(currentPhase === 'VICTORY' || currentPhase === 'GAME_OVER') && (
          <VictoryScreen
            isVictory={currentPhase === 'VICTORY'}
            player={playerChar}
            enemy={enemyChar}
            map={selectedMap}
            stats={battleStats}
            mode={selectedMode}
            onPlayAgain={() => {
              setRoundNumber((r) => r + 1);
              if (selectedMode === 'story') {
                setCurrentPhase('STORY_MAP');
              } else if (selectedMode === 'survival') {
                if (currentPhase === 'VICTORY') {
                  // Next wave with carried health (+30 hp) & scaling opponents
                  import('./data/gameData').then(({ CHARACTERS, MAPS }) => {
                    let nextEnemy;
                    if ((survivalStreak + 1) % 5 === 0) {
                      // Boss round every 5 stages
                      const mutant = CHARACTERS.find(c => c.id === 'mutant_cat_acid');
                      nextEnemy = mutant || CHARACTERS[0];
                    } else {
                      const enemies = CHARACTERS.filter((c) => c.id !== playerChar.id && c.type !== 'boss');
                      nextEnemy = enemies[Math.floor(Math.random() * enemies.length)];
                    }
                    setEnemyChar(nextEnemy);
                    setSelectedMap(MAPS[Math.floor(Math.random() * MAPS.length)]);
                    setCurrentPhase('VS_SPLASH');
                  });
                } else {
                  // Defeated: restart fresh
                  setRoundNumber(1);
                  setSurvivalStreak(0);
                  setCarriedPlayerHp(undefined);
                  setEnemyBonusHp(0);
                  setEnemyBonusDmg(0);
                  setPlayerBonusDmg(0);
                  setCurrentPhase('VS_SPLASH');
                }
              } else if (selectedMode === 'duo') {
                setCurrentPhase('DUO_SELECT');
              } else {
                setCurrentPhase('VS_SPLASH');
              }
            }}
            onMainMenu={() => {
              setRoundNumber(1);
              setSurvivalStreak(0);
              setCarriedPlayerHp(undefined);
              setEnemyBonusHp(0);
              setEnemyBonusDmg(0);
              setPlayerBonusDmg(0);
              setCurrentPhase('TITLE');
            }}
          />
        )}
      </CrtOverlay>
    </>
  );
}

