import re

with open('src/data/newCharacters.ts', 'r') as f:
    code = f.read()

code = code.replace("You're in my waters now!", "You\\'re in my waters now!")

with open('src/data/newCharacters.ts', 'w') as f:
    f.write(code)
