import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

# 1. Faster player VFX pipeline
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

# transition to enemy turn
code = code.replace(
    "setTimeout(() => {\n      setAnim((prev) => ({\n        ...prev,\n        playerAction: 'idle',\n        enemyAction: 'idle',\n        activeFx: 'none',\n        screenShake: false,\n        flashColor: null,\n        bannerText: null\n      }));\n      triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 1000);",
    "setTimeout(() => {\n      setAnim((prev) => ({\n        ...prev,\n        playerAction: 'idle',\n        enemyAction: 'idle',\n        activeFx: 'none',\n        screenShake: false,\n        flashColor: null,\n        bannerText: null\n      }));\n      triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 250);"
)


# 2. Faster enemy turn execution
# We need to find `triggerEnemyTurn`. Since it's a huge block, we might have to be careful.
# But we can replace the timeout values.

code = code.replace(
    "}, diffMults.aiDelay);",
    "}, diffMults.aiDelay * 0.4);"
)

code = code.replace(
    "setTimeout(() => {\n        setAnim((prev) => ({\n          ...prev,\n          screenShake: false,\n          flashColor: null\n        }));\n      }, 400);",
    "setTimeout(() => {\n        setAnim((prev) => ({\n          ...prev,\n          screenShake: false,\n          flashColor: null\n        }));\n      }, 200);"
)

code = code.replace(
    "setTimeout(() => {\n        setAnim((prev) => ({\n          ...prev,\n          playerAction: 'idle',\n          enemyAction: 'idle',\n          activeFx: 'none',\n          bannerText: null\n        }));",
    "setTimeout(() => {\n        setAnim((prev) => ({\n          ...prev,\n          playerAction: 'idle',\n          enemyAction: 'idle',\n          activeFx: 'none',\n          bannerText: null\n        }));"
)
code = code.replace(
    "        setIsTurnProcessing(false);\n        setTurnCount((c) => c + 1);",
    "        setIsTurnProcessing(false);\n        setTurnCount((c) => c + 1);"
)
# We can just replace the 1000 timeout for the end of the enemy turn:
code = code.replace(
    "        });\n      }, 1000);",
    "        });\n      }, 350);"
)


with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)
