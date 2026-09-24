import re

with open('src/data/gameData.ts', 'r') as f:
    code = f.read()

# Add import
import_str = "import { NEW_ORIGINAL_CHARACTERS } from './newCharacters';\nimport { BOSS_CHARACTERS } from './bossCharacters';\n"
code = code.replace("import { NEW_ORIGINAL_CHARACTERS } from './newCharacters';\n", import_str)

# Add to CHARACTERS array
char_replace = "...NEW_ORIGINAL_CHARACTERS,\n  ...BOSS_CHARACTERS"
code = code.replace("...NEW_ORIGINAL_CHARACTERS", char_replace)

with open('src/data/gameData.ts', 'w') as f:
    f.write(code)

