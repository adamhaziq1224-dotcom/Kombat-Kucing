import re

with open('src/components/PixelSprite.tsx', 'r') as f:
    code = f.read()

code = code.replace("character.avatarEmoji?.split('')[0]", "Array.from(character.avatarEmoji || '❓')[0]")

with open('src/components/PixelSprite.tsx', 'w') as f:
    f.write(code)

