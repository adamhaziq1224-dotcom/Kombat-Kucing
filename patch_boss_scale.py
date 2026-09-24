import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

code = code.replace(
    "<PixelSprite character={activePlayer} action={anim.playerAction} />",
    "<PixelSprite character={activePlayer} action={anim.playerAction} scale={activePlayer.type === 'boss' ? 1.5 : 1} />"
)

code = code.replace(
    "<PixelSprite character={activeEnemy} action={anim.enemyAction} isFlipped={true} />",
    "<PixelSprite character={activeEnemy} action={anim.enemyAction} isFlipped={true} scale={activeEnemy.type === 'boss' ? 1.5 : 1} />"
)

# For avatar boxes (scale-[0.35] inside)
code = code.replace(
    '<PixelSprite character={activePlayer} action="idle" />',
    '<PixelSprite character={activePlayer} action="idle" scale={activePlayer.type === \'boss\' ? 1.2 : 1} />'
)

code = code.replace(
    '<PixelSprite character={activeEnemy} action="idle" isFlipped={true} />',
    '<PixelSprite character={activeEnemy} action="idle" isFlipped={true} scale={activeEnemy.type === \'boss\' ? 1.2 : 1} />'
)

with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)

