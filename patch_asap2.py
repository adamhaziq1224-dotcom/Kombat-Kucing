import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

# 1. Reduce wait(300) to wait(100) for player recovery
code = code.replace("await wait(300); // 4. RECOVERY", "await wait(150); // 4. RECOVERY")

# 2. Reduce the transition to enemy turn from 250 to 50
code = code.replace("triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 250);", "triggerEnemyTurn(newEnemyHp, enemyExp, false);\n    }, 20);")

# 3. Speed up AI decision time from diffMults.aiDelay * 0.4 to 20
code = code.replace("}, diffMults.aiDelay * 0.4);", "}, 20);")

# 4. Speed up Enemy hit screen shake recovery from 400 to 150
enemy_shake_reset_old = """      if (isUltimate || actualHpLoss > 20) {
        setTimeout(() => {
          setAnim((prev) => ({
            ...prev,
            screenShake: false,
            flashColor: null
          }));
        }, 400);
      }"""
enemy_shake_reset_new = """      if (isUltimate || actualHpLoss > 20) {
        setTimeout(() => {
          setAnim((prev) => ({
            ...prev,
            screenShake: false,
            flashColor: null
          }));
        }, 150);
      }"""
code = code.replace(enemy_shake_reset_old, enemy_shake_reset_new)

# 5. Speed up Enemy turn reset from 350 to 150
enemy_turn_reset_old = """      // Reset turn after hit
      setTimeout(() => {
        setAnim((prev) => ({
          ...prev,
          playerAction: 'idle',
          enemyAction: 'idle',
          activeFx: 'none',
          screenShake: false,
          flashColor: null,
          bannerText: null
        }));
        setIsPlayerDefending(false);
        setIsEnemyDefending(false);
        setIsTurnProcessing(false);
        setTurnCount((c) => c + 1);"""
enemy_turn_reset_new = """      // Reset turn after hit
      setTimeout(() => {
        setAnim((prev) => ({
          ...prev,
          playerAction: 'idle',
          enemyAction: 'idle',
          activeFx: 'none',
          screenShake: false,
          flashColor: null,
          bannerText: null
        }));
        setIsPlayerDefending(false);
        setIsEnemyDefending(false);
        setIsTurnProcessing(false);
        setTurnCount((c) => c + 1);"""
# Actually, the timeout value is at the bottom of the block
# We can just replace "}, 350);" that comes right before the diffMults.aiDelay line.
code = code.replace("}, 350);\n    }, diffMults.aiDelay * 0.4);", "}, 150);\n    }, 20);")


with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)
