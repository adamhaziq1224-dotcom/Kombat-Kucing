import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

# Player VFX
code = code.replace(
    "await wait(isUltimate || skill.type === 'heavy' ? 500 : 200);",
    "await wait(isUltimate || skill.type === 'heavy' ? 250 : 100);"
)
code = code.replace(
    "await wait(isUltimate ? 1000 : skill.type === 'combo' ? 400 : 250);",
    "await wait(isUltimate ? 600 : skill.type === 'combo' ? 250 : 150);"
)
code = code.replace(
    "await wait(400); // 4. RECOVERY",
    "await wait(200); // 4. RECOVERY"
)
code = code.replace(
    "await wait(1100);",
    "await wait(600);"
)

# Transition to Enemy Turn Delay
code = code.replace(
    "triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 1000);",
    "triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 250);"
)

# Enemy AI Delay
code = code.replace(
    "}, diffMults.aiDelay);",
    "}, diffMults.aiDelay * 0.4);"
)

# Enemy Screen Shake Reset Delay
code = code.replace(
    "flashColor: null\n        }));\n      }, 400);",
    "flashColor: null\n        }));\n      }, 200);"
)

# Enemy Turn Reset Delay
code = code.replace(
    "return next;\n            });\n          }, 1000);",
    "return next;\n            });\n          }, 350);"
)

# Duo Swap Delay
code = code.replace(
    "setIsTurnProcessing(false);\n    }, 850);",
    "setIsTurnProcessing(false);\n    }, 450);"
)

with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)

