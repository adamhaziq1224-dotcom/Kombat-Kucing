import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

old_pipeline = """    // 1. ANTICIPATION
    setAnim((prev) => ({
      ...prev,
      playerAction: 'attack',
      activeFx: 'none',
      bannerText: isUltimate ? `💥 ULTIMATE: ${skill.name.toUpperCase()}! 💥` : `▶ ${skill.name.toUpperCase()}!`
    }));
    await wait(isUltimate || skill.type === 'heavy' ? 250 : 100);

    // 2. CAST & VFX
    setAnim((prev) => ({
      ...prev,
      playerAction: isUltimate ? 'combo' : 'attack',
      activeFx: skill.fx as AnimationState['activeFx'],
      screenShake: isUltimate ? 'heavy' : false,
    }));
    await wait(isUltimate ? 600 : skill.type === 'combo' ? 250 : 150);

    // 3. IMPACT
    setAnim((prev) => ({
      ...prev,
      enemyAction: didEvade ? 'idle' : actualHpLoss > 0 ? 'hit' : 'idle',
      screenShake: isUltimate ? 'heavy' : isCrit ? 'medium' : skill.damage > 28,
      flashColor: isUltimate ? '#f97316' : isCrit ? '#facc15' : skill.damage > 25 ? '#38bdf8' : null,
    }));"""

new_pipeline = """    // 1. IMMEDIATE CAST & IMPACT
    setAnim((prev) => ({
      ...prev,
      playerAction: isUltimate ? 'combo' : 'attack',
      activeFx: skill.fx as AnimationState['activeFx'],
      enemyAction: didEvade ? 'idle' : actualHpLoss > 0 ? 'hit' : 'idle',
      screenShake: isUltimate ? 'heavy' : isCrit ? 'medium' : skill.damage > 28,
      flashColor: isUltimate ? '#f97316' : isCrit ? '#facc15' : skill.damage > 25 ? '#38bdf8' : null,
      bannerText: isUltimate ? `💥 ULTIMATE: ${skill.name.toUpperCase()}! 💥` : `▶ ${skill.name.toUpperCase()}!`
    }));"""

if old_pipeline in code:
    code = code.replace(old_pipeline, new_pipeline)
    code = code.replace("await wait(200); // 4. RECOVERY", "await wait(300); // 4. RECOVERY")
else:
    print("WARNING: Old pipeline not found exactly.")


# We also want to speed up enemy turn
enemy_old_pipeline = """        setAnim((prev) => ({
          ...prev,
          enemyAction: 'attack',
          activeFx: 'none',
          bannerText: isEnemyUlt ? `💥 ULTIMATE: ${chosenSkill.name.toUpperCase()}! 💥` : `⚠️ ${chosenSkill.name.toUpperCase()}!`
        }));

        await wait(isEnemyUlt || chosenSkill.type === 'heavy' ? 250 : 100);

        setAnim((prev) => ({
          ...prev,
          enemyAction: isEnemyUlt ? 'combo' : 'attack',
          activeFx: chosenSkill.fx as AnimationState['activeFx'],
          screenShake: isEnemyUlt ? 'heavy' : false,
        }));
        await wait(isEnemyUlt ? 600 : chosenSkill.type === 'combo' ? 250 : 150);

        setAnim((prev) => ({
          ...prev,
          playerAction: didEvade ? 'idle' : actualDmg > 0 ? 'hit' : 'idle',
          screenShake: isEnemyUlt ? 'heavy' : isCrit ? 'medium' : actualDmg > 28,
          flashColor: isEnemyUlt ? '#f97316' : isCrit ? '#facc15' : actualDmg > 25 ? '#38bdf8' : null,
        }));"""

enemy_new_pipeline = """        setAnim((prev) => ({
          ...prev,
          enemyAction: isEnemyUlt ? 'combo' : 'attack',
          activeFx: chosenSkill.fx as AnimationState['activeFx'],
          playerAction: didEvade ? 'idle' : actualDmg > 0 ? 'hit' : 'idle',
          screenShake: isEnemyUlt ? 'heavy' : isCrit ? 'medium' : actualDmg > 28,
          flashColor: isEnemyUlt ? '#f97316' : isCrit ? '#facc15' : actualDmg > 25 ? '#38bdf8' : null,
          bannerText: isEnemyUlt ? `💥 ULTIMATE: ${chosenSkill.name.toUpperCase()}! 💥` : `⚠️ ${chosenSkill.name.toUpperCase()}!`
        }));"""

if enemy_old_pipeline in code:
    code = code.replace(enemy_old_pipeline, enemy_new_pipeline)
    # The enemy recovery
    code = code.replace("      }, 200);\n", "      }, 300);\n")
    code = code.replace("diffMults.aiDelay * 0.4", "100") # Extremely fast AI decision
    code = code.replace("triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 250);", "triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 100);")
    code = code.replace("setTurnCount((c) => c + 1);\n            });\n          }, 350);", "setTurnCount((c) => c + 1);\n            });\n          }, 150);")
else:
    print("WARNING: Enemy pipeline not found exactly.")


with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)
