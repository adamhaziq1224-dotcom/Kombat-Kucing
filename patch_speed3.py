import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

code = code.replace("}, 1000);\n    }, diffMults.aiDelay", "}, 350);\n    }, diffMults.aiDelay")

with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)

