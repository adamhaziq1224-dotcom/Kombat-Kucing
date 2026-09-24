import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Replace the enemy assignment in StoryMapScreen
story_enemy_code = """
              import('./data/gameData').then(({ CHARACTERS, MAPS }) => {
                const cyberHound = CHARACTERS.find(c => c.id === 'cyber_hound_giant') || CHARACTERS[3];
                const enemies = [CHARACTERS[1], CHARACTERS[2], CHARACTERS[3], cyberHound];
                setPlayerChar(CHARACTERS[0]); // Oyen is the hero
                setEnemyChar(enemies[nodeIdx % enemies.length]);
                setSelectedMap(MAPS[nodeIdx % MAPS.length]);
                setCurrentPhase('VS_SPLASH');
              });
"""

old_story_code = """
              const enemies = [CHARACTERS[1], CHARACTERS[2], CHARACTERS[0], CHARACTERS[3]];
              setPlayerChar(CHARACTERS[0]); // Oyen is the hero
              setEnemyChar(enemies[nodeIdx % enemies.length]);
              
              import('./data/gameData').then(({ MAPS }) => {
                setSelectedMap(MAPS[nodeIdx % MAPS.length]);
                setCurrentPhase('VS_SPLASH');
              });
"""
if old_story_code.strip() in code.replace('\r\n', '\n').strip() or "const enemies = [CHARACTERS[1]" in code:
    print("Found old code!")
    # just do a regex replace
else:
    print("Not found exactly.")

