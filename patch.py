import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

# Replace the "handleUseSkill = useCallback((skillIndex: number) => {" with async
code = code.replace(
    "const handleUseSkill = useCallback((skillIndex: number) => {",
    "const handleUseSkill = useCallback(async (skillIndex: number) => {"
)

# Find the // Set Animation State block
start_idx = code.find("// Set Animation State")
end_idx = code.find("    // Transition to enemy turn", start_idx)

if start_idx != -1 and end_idx != -1:
    new_block = """    // --- VFX PIPELINE ---
    // 1. ANTICIPATION
    setAnim((prev) => ({
      ...prev,
      playerAction: 'attack',
      activeFx: 'none',
      bannerText: isUltimate ? `💥 ULTIMATE: ${skill.name.toUpperCase()}! 💥` : `▶ ${skill.name.toUpperCase()}!`
    }));
    await wait(isUltimate || skill.type === 'heavy' ? 500 : 200);

    // 2. CAST & VFX
    setAnim((prev) => ({
      ...prev,
      playerAction: isUltimate ? 'combo' : 'attack',
      activeFx: skill.fx as AnimationState['activeFx'],
      screenShake: isUltimate ? 'heavy' : false,
    }));
    await wait(isUltimate ? 1000 : skill.type === 'combo' ? 400 : 250);

    // 3. IMPACT
    setAnim((prev) => ({
      ...prev,
      enemyAction: didEvade ? 'idle' : actualHpLoss > 0 ? 'hit' : 'idle',
      screenShake: isUltimate ? 'heavy' : isCrit ? 'medium' : skill.damage > 28,
      flashColor: isUltimate ? '#f97316' : isCrit ? '#facc15' : skill.damage > 25 ? '#38bdf8' : null,
    }));

    let newEnemyHp = Math.max(0, enemyHp - actualHpLoss);
    if (newEnemyHp <= 0 && enemy.id === 'oyen' && !enemyRevived) {
      setEnemyRevived(true);
      newEnemyHp = 25;
      setEnemyExp(5);
      spawnDamageFloater('enemy', '9 LIVES REVIVED! +25 HP', false, '#f97316');
    }
    setEnemyHp(newEnemyHp);

    setLogs((prev) => [
      ...prev,
      {
        id: `player-skill-${Date.now()}`,
        round: turnCount,
        sender: 'player',
        text: `[${skill.key}] ${player.name} used [${skill.category}] ${skill.name}! ${actualHpLoss > 0 ? `${actualHpLoss} DMG!` : didEvade ? 'EVADED!' : 'UTILITY'}`,
        damage: actualHpLoss,
        isCrit,
        isSpecial: isUltimate
      }
    ]);

    await wait(400); // 4. RECOVERY

    setAnim((prev) => ({
      ...prev,
      screenShake: false,
      flashColor: null,
      playerAction: 'idle',
      enemyAction: 'idle',
      activeFx: 'none',
      bannerText: null
    }));

    if (newEnemyHp <= 0) {
      if (isDuoMode && tagPartnerEnemy && partnerEnemyHp > 0) {
        playKoSound();
        spawnDamageFloater('enemy', 'K.O.! RIVAL PARTNER ENTERS!', false, '#f43f5e');
        const nextActiveEnemy = tagPartnerEnemy;
        const nextEnemyHp = partnerEnemyHp;
        const nextEnemyExp = partnerEnemyExp;
        setTagPartnerEnemy(null);
        setPartnerEnemyHp(0);
        setActiveEnemy(nextActiveEnemy);
        setEnemyHp(nextEnemyHp);
        setEnemyExp(nextEnemyExp);
        setEnemyArmor(nextActiveEnemy.id === 'mecha_dog' ? 15 : 0);
        
        setAnim((prev) => ({
          ...prev,
          enemyAction: 'idle',
          activeFx: 'thunder',
          bannerText: `⚠️ RIVAL TAG IN: ${nextActiveEnemy.name.toUpperCase()}! ⚠️`
        }));
        
        await wait(1100);
        setAnim((prev) => ({ ...prev, activeFx: 'none', bannerText: null }));
        setIsTurnProcessing(false);
        return;
      }
      playKoSound();
      const finalRemainingHp = playerHpRef.current;
      const isFlawless = finalRemainingHp >= effectivePlayerMaxHp;
      const coinsWon = calculateVictoryReward({
        mode: isDuoMode ? 'duo' : (survivalStreak !== undefined ? 'survival' : 'arcade'),
        difficulty,
        rounds: turnCount,
        comboCount: stats.comboCount + (isUltimate ? 1 : 0),
        remainingHpPct: Math.round((finalRemainingHp / effectivePlayerMaxHp) * 100),
        isFlawless
      });
      addCyberCoins(coinsWon);
      setAnim((prev) => ({
        ...prev,
        enemyAction: 'ko',
        playerAction: 'victory',
        bannerText: `💥 K.O.! ${activePlayer.name.toUpperCase()} VICTORIOUS! 💥`
      }));
      setTimeout(() => {
        onVictory({
          totalRounds: turnCount,
          comboCount: stats.comboCount + (isUltimate ? 1 : 0),
          maxDamage: Math.max(stats.maxDamage, actualHpLoss),
          remainingPlayerHp: finalRemainingHp,
          survivalStreak,
          coinsEarned: coinsWon
        });
      }, 2200);
      return;
    }

"""
    code = code[:start_idx] + new_block + code[end_idx:]

with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)

