import re

with open('src/components/PixelSprite.tsx', 'r') as f:
    code = f.read()

# Let's see if there are more than 10 characters handled.
print(code.count("is"))
