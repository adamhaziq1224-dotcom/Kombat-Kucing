import React, { useState, useEffect, useRef, useCallback } from 'react';
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
import { motion, AnimatePresence } from 'motion/react';
import { Character, ArenaMap, BattleLogEntry, AnimationState, SkillMove, StatusEffect, DifficultyLevel, BattleStats } from '../types';
import { PixelSprite } from './PixelSprite';
import { SkillVfxEngine } from './SkillVfxEngine';
import { ArenaBackground } from './ArenaBackground';
import {
  playPunchSound,
  playFieryComboSound,
  playGuardSound,
  playLaserSound,
  playKoSound,
  playSelectSound,
  playSkillSound,
  playBGM,
  stopBGM
} from '../utils/audio';
import {
  Pause,
  Heart,
  Zap,
  Flame,
  Shield,
  Swords,
  Sparkles,
  MessageSquare,
  Play,
  RefreshCw,
  Home,
  Repeat,
  Coins
} from 'lucide-react';
import {
  getCharacterUpgrades,
  getStatBonusValue,
  calculateVictoryReward,
  calculateDefeatReward,
  addCyberCoins
} from '../utils/economy';

interface BattleArenaProps {
  player: Character;
  enemy: Character;
  map: ArenaMap;
  roundNumber: number;
  difficulty?: DifficultyLevel;
  onChangeDifficulty?: (diff: DifficultyLevel) => void;
  onVictory: (stats: BattleStats) => void;
  onDefeat: (stats?: BattleStats) => void;
  onBackToMenu: () => void;
  onRestart: () => void;
  initialPlayerHp?: number;
  playerBonusDmg?: number;
  enemyBonusHp?: number;
  enemyBonusDmg?: number;
  survivalStreak?: number;
  isDuoMode?: boolean;
  playerDuo?: Character;
  enemyDuo?: Character;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
  player,
  enemy,
  map,
  roundNumber,
  difficulty = 'medium',
  onChangeDifficulty,
  onVictory,
  onDefeat,
  onBackToMenu,
  onRestart,
  initialPlayerHp,
  playerBonusDmg = 0,
  enemyBonusHp = 0,
  enemyBonusDmg = 0,
  survivalStreak,
  isDuoMode = false,
  playerDuo,
  enemyDuo
}) => {
  // Difficulty Multipliers
  const diffMults = React.useMemo(() => {
    switch (difficulty) {
      case 'easy':
        return { hpMult: 0.8, dmgMult: 1.0, critBonus: -0.1, startExp: 0, aiDelay: 1500, playerDmgMult: 1.5 };
      case 'hard':
        return { hpMult: 1.3, dmgMult: 1.5, critBonus: 0.15, startExp: 1, aiDelay: 950, playerDmgMult: 1.0 };
      case 'medium':
      default:
        return { hpMult: 1.0, dmgMult: 1.0, critBonus: 0, startExp: 0, aiDelay: 1200, playerDmgMult: 1.1 };
    }
  }, [difficulty]);

  // Active Fighters in Battle (Support for Tag Team & Swapping)
  const [activePlayer, setActivePlayer] = useState<Character>(player);
  const [activeEnemy, setActiveEnemy] = useState<Character>(enemy);
  const [tagPartnerPlayer, setTagPartnerPlayer] = useState<Character | null>(playerDuo || null);
  const [tagPartnerEnemy, setTagPartnerEnemy] = useState<Character | null>(enemyDuo || null);

  // Upgrades for Active Player
  const activePlayerUpgrades = getCharacterUpgrades(activePlayer.id);
  const playerBonusHpUpgrade = getStatBonusValue('maxHp', activePlayerUpgrades.maxHp);
  const playerBonusAtkUpgrade = getStatBonusValue('attack', activePlayerUpgrades.attack);
  const playerBonusDefUpgrade = getStatBonusValue('defense', activePlayerUpgrades.defense);
  const effectivePlayerMaxHp = activePlayer.maxHp + playerBonusHpUpgrade;

  const enemyMaxHp = Math.round(activeEnemy.maxHp * diffMults.hpMult) + (enemyBonusHp || 0);

  // Combat stats state
  const [playerHp, setPlayerHp] = useState<number>(() => {
    if (initialPlayerHp !== undefined && initialPlayerHp > 0) {
      return Math.min(effectivePlayerMaxHp, initialPlayerHp);
    }
    return effectivePlayerMaxHp;
  });
  const [enemyHp, setEnemyHp] = useState<number>(enemyMaxHp);

  // Partner HP and Energy (for Tag Team Mode)
  const [partnerPlayerHp, setPartnerPlayerHp] = useState<number>(() => {
    if (!playerDuo) return 0;
    const up = getCharacterUpgrades(playerDuo.id);
    return playerDuo.maxHp + getStatBonusValue('maxHp', up.maxHp);
  });
  const [partnerPlayerExp, setPartnerPlayerExp] = useState<number>(2);

  const [partnerEnemyHp, setPartnerEnemyHp] = useState<number>(() => {
    if (!enemyDuo) return 0;
    return Math.round(enemyDuo.maxHp * diffMults.hpMult) + (enemyBonusHp || 0);
  });
  const [partnerEnemyExp, setPartnerEnemyExp] = useState<number>(diffMults.startExp);
  const playerHpRef = useRef(playerHp);
  useEffect(() => {
    playerHpRef.current = playerHp;
  }, [playerHp]);

  const MAX_ENERGY = 8;
  const [playerExp, setPlayerExp] = useState<number>(2); // Starts with 2 energy; max 8 energy meter
  const [enemyExp, setEnemyExp] = useState<number>(Math.min(MAX_ENERGY, diffMults.startExp));
  const [energyWarning, setEnergyWarning] = useState<boolean>(false);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlayerDefending, setIsPlayerDefending] = useState<boolean>(false);
  const [isEnemyDefending, setIsEnemyDefending] = useState<boolean>(false);
  const [isTurnProcessing, setIsTurnProcessing] = useState<boolean>(false);
  const [turnCount, setTurnCount] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Archetype & Identity Combat States
  const [playerArmor, setPlayerArmor] = useState<number>(player.id === 'mecha_dog' ? 15 : 0);
  const [enemyArmor, setEnemyArmor] = useState<number>(enemy.id === 'mecha_dog' ? 15 : 0);
  const [isPlayerEvading, setIsPlayerEvading] = useState<boolean>(false);
  const [isEnemyEvading, setIsEnemyEvading] = useState<boolean>(false);
  const [isPlayerOverdrive, setIsPlayerOverdrive] = useState<boolean>(false);
  const [isEnemyOverdrive, setIsEnemyOverdrive] = useState<boolean>(false);
  const [nanoFrenzyStacks, setNanoFrenzyStacks] = useState<number>(0);
  const [nanoEnergyCounter, setNanoEnergyCounter] = useState<number>(0);
  const [enemyNanoStacks, setEnemyNanoStacks] = useState<number>(0);
  const [enemyNanoCounter, setEnemyNanoCounter] = useState<number>(0);
  const [playerRevived, setPlayerRevived] = useState<boolean>(false);
  const [enemyRevived, setEnemyRevived] = useState<boolean>(false);

  // Status effects
  const [playerStatus, setPlayerStatus] = useState<StatusEffect | null>(null);
  const [enemyStatus, setEnemyStatus] = useState<StatusEffect | null>(null);

  // Stats tracking for victory summary
  const [stats, setStats] = useState({
    comboCount: 0,
    maxDamage: 0
  });

  // Floating damage numbers
  const [damageFloaters, setDamageFloaters] = useState<{
    id: string;
    target: 'player' | 'enemy';
    text: string;
    isCrit?: boolean;
    color?: string;
  }[]>([]);

  // Commentary & Combat Logs
  const [logs, setLogs] = useState<BattleLogEntry[]>([]);

  // Visual Animation & Screen FX state
  const [anim, setAnim] = useState<AnimationState>({
    playerAction: 'idle',
    enemyAction: 'idle',
    activeFx: 'none',
    screenShake: false,
    flashColor: null,
    bannerText: null
  });

  const logEndRef = useRef<HTMLDivElement>(null);

  // Initialize intro commentary and BGM
  useEffect(() => {
    playBGM();
    setLogs([
      {
        id: 'intro-1',
        round: 1,
        sender: 'caster',
        text: `Round 1! ${player.name} [${player.archetype}] VS ${enemy.name} [${enemy.archetype}]! FIGHT!`
      }
    ]);
    
    return () => stopBGM();
  }, [player.name, player.archetype, enemy.name, enemy.archetype, map.name]);

  // Auto-scroll battle log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Helper to add damage floater
  const spawnDamageFloater = (target: 'player' | 'enemy', text: string, isCrit = false, color = '#ef4444') => {
    const id = `${Date.now()}-${Math.random()}`;
    setDamageFloaters((prev) => [...prev, { id, target, text, isCrit, color }]);
    setTimeout(() => {
      setDamageFloaters((prev) => prev.filter((d) => d.id !== id));
    }, 1600);
  };

  // Survival Mode Round Start Notifications
  useEffect(() => {
    if (survivalStreak !== undefined && survivalStreak > 0) {
      const t = setTimeout(() => {
        spawnDamageFloater('player', '+30 HP CARRIED RECOVERY!', false, '#22c55e');
        if (playerBonusDmg > 0) {
          spawnDamageFloater('player', `+${playerBonusDmg} ATK UPGRADE!`, false, '#38bdf8');
        }
        if (enemyBonusHp > 0 || enemyBonusDmg > 0) {
          spawnDamageFloater('enemy', `+${enemyBonusHp} HP / +${enemyBonusDmg} DMG!`, false, '#f43f5e');
        }
        setLogs((prev) => [
          ...prev,
          {
            id: `survival-intro-${Date.now()}`,
            round: 1,
            sender: 'system',
            text: `⚔️ SURVIVAL ROUND ${survivalStreak + 1}: +30 HP Restored! Player +${playerBonusDmg} ATK! Opponent +${enemyBonusHp} HP / +${enemyBonusDmg} ATK!`
          }
        ]);
      }, 700);
      return () => clearTimeout(t);
    }
  }, [survivalStreak, roundNumber, playerBonusDmg, enemyBonusHp, enemyBonusDmg]);

  // Trigger Enemy AI Turn - archetype & identity aware
  const triggerEnemyTurn = useCallback((currentEnemyHp: number, currentEnemyExp: number, playerDefending: boolean) => {
    if (currentEnemyHp <= 0) return;

    setTimeout(() => {
      // Process status damage on enemy before turn starts
      if (enemyStatus) {
        if (enemyStatus.type === 'burn' || enemyStatus.type === 'shock') {
          const tickDmg = enemyStatus.amount;
          currentEnemyHp = Math.max(0, currentEnemyHp - tickDmg);
          setEnemyHp(currentEnemyHp);
          spawnDamageFloater('enemy', `-${tickDmg} [${enemyStatus.type.toUpperCase()}]`, false, enemyStatus.type === 'burn' ? '#f97316' : '#eab308');
          if (currentEnemyHp <= 0) {
            playKoSound();
            setAnim((prev) => ({
              ...prev,
              enemyAction: 'ko',
              playerAction: 'victory',
              bannerText: `💥 K.O.! ${player.name.toUpperCase()} VICTORIOUS! 💥`
            }));
            setTimeout(() => {
              onVictory({
                totalRounds: turnCount,
                comboCount: stats.comboCount,
                maxDamage: stats.maxDamage,
                remainingPlayerHp: playerHpRef.current,
                survivalStreak
              });
            }, 2000);
            return;
          }
        } else if (enemyStatus.type === 'stun') {
          setEnemyStatus(null);
          spawnDamageFloater('enemy', 'STUNNED! TURN SKIPPED', false, '#facc15');
          setLogs((prev) => [
            ...prev,
            {
              id: `enemy-stun-${Date.now()}`,
              round: turnCount,
              sender: 'caster',
              text: `⚡ ${enemy.name} is STUNNED and skips their turn!`
            }
          ]);
          setTimeout(() => {
            setIsTurnProcessing(false);
            setTurnCount((c) => c + 1);
            setPlayerExp((exp) => {
              const next = Math.min(MAX_ENERGY, exp + 1);
              spawnDamageFloater('player', '+1⚡ ROUND EN', false, '#38bdf8');
              return next;
            });
          }, 1100);
          return;
        }
      }

      const available = enemy.skills.filter((s) => (s.expCost || 0) <= currentEnemyExp);
      let chosenSkill: SkillMove = available[0] || enemy.skills[0];

      // Archetype-driven decision engine
      if (enemy.id === 'mecha_dog') {
        const armorPlating = available.find(s => s.id === 'mecha_armor_plating');
        const overdrive = available.find(s => s.id === 'mecha_titan_overdrive');
        const heavyCharge = available.find(s => s.id === 'mecha_heavy_charge');
        const missileBarrage = available.find(s => s.id === 'mecha_missile_barrage');
        const bite = available.find(s => s.id === 'mecha_titan_bite');

        if (overdrive) {
          chosenSkill = overdrive;
        } else if (enemyArmor <= 5 && armorPlating && Math.random() < 0.7) {
          chosenSkill = armorPlating;
        } else if (heavyCharge && Math.random() < 0.8) {
          chosenSkill = heavyCharge;
        } else if (missileBarrage && (playerArmor > 10 || Math.random() < 0.7)) {
          chosenSkill = missileBarrage;
        } else {
          chosenSkill = bite || available[0];
        }
      } else if (enemy.id === 'cyber_puss_9000') {
        const nineLives = available.find(s => s.id === 'cp_nine_lives');
        const decoy = available.find(s => s.id === 'cp_holo_decoy');
        const nanite = available.find(s => s.id === 'cp_nanite_system');
        const pounce = available.find(s => s.id === 'cp_cyber_pounce');
        const whisker = available.find(s => s.id === 'cp_laser_whisker');

        if (nineLives) {
          chosenSkill = nineLives;
        } else if (playerExp >= 4 && decoy && !isEnemyEvading && Math.random() < 0.75) {
          chosenSkill = decoy;
        } else if (currentEnemyHp < enemyMaxHp * 0.65 && nanite && Math.random() < 0.8) {
          chosenSkill = nanite;
        } else if ((playerStatus || playerHp < player.maxHp * 0.5) && pounce) {
          chosenSkill = pounce;
        } else {
          chosenSkill = whisker || available[0];
        }
      } else {
        // General intelligent archetype selection
        const ult = available.find(s => s.type === 'ultimate');
        const damaging = available.filter(s => s.damage > 0).sort((a, b) => b.damage - a.damage);
        if (ult) {
          chosenSkill = ult;
        } else if (damaging.length > 0) {
          chosenSkill = damaging[0];
        } else {
          chosenSkill = available[0] || enemy.skills[0];
        }
      }

      const isUltimate = chosenSkill.type === 'ultimate';
      const skillCost = chosenSkill.expCost || 0;
      const skillGain = chosenSkill.expGain || (skillCost > 0 ? 0 : 1);

      // Energy handling
      if (skillCost > 0) {
        setEnemyExp((exp) => Math.max(0, exp - skillCost));
      } else {
        setEnemyExp((exp) => Math.min(MAX_ENERGY, exp + skillGain));
        if (enemy.id === 'cyber_puss_9000' && skillGain > 0) {
          const newCnt = enemyNanoCounter + skillGain;
          const newStacks = Math.floor(newCnt / 3);
          if (newStacks > 0) {
            setEnemyNanoStacks(s => s + newStacks);
            setEnemyNanoCounter(newCnt % 3);
            spawnDamageFloater('enemy', 'NANO FRENZY +10%!', false, '#10b981');
          } else {
            setEnemyNanoCounter(newCnt);
          }
        }
      }

      playSkillSound(chosenSkill);

      // Handle Enemy Utility / Non-Damage Skills
      if (chosenSkill.category === 'DEFENSE' || chosenSkill.effect === 'evade') {
        setIsEnemyEvading(true);
        spawnDamageFloater('enemy', 'HOLO-DECOY UP!', false, '#38bdf8');
      }

      if (chosenSkill.effect === 'armor') {
        const armorAmt = chosenSkill.effectValue || 30;
        setEnemyArmor((prev) => prev + armorAmt);
        spawnDamageFloater('enemy', `+${armorAmt} ARMOR`, false, '#a855f7');
      }

      if (chosenSkill.effect === 'heal') {
        const healAmt = chosenSkill.effectValue || 20;
        setEnemyHp((prev) => Math.min(enemyMaxHp, prev + healAmt));
        spawnDamageFloater('enemy', `+${healAmt} HP`, false, '#22c55e');
      }

      if (chosenSkill.effect === 'empower') {
        setIsEnemyOverdrive(true);
        const healAmt = chosenSkill.effectValue || 25;
        setEnemyHp((prev) => Math.min(enemyMaxHp, prev + healAmt));
        spawnDamageFloater('enemy', `OVERDRIVE +${healAmt} HP`, false, '#f59e0b');
      }

      // Damage Calculation against Player
      let rawDmg = chosenSkill.damage || 0;
      if (rawDmg > 0 && enemyBonusDmg > 0) {
        rawDmg += enemyBonusDmg;
      }
      let actualHpLoss = 0;
      let didEvade = false;

      if (rawDmg > 0) {
        // Check player evasion
        if (isPlayerEvading) {
          didEvade = true;
          setIsPlayerEvading(false);
          spawnDamageFloater('player', 'EVADED! 0 DMG', false, '#38bdf8');
          if (player.id === 'shadow_ninja') {
            setPlayerExp(e => Math.min(5, e + 1));
            spawnDamageFloater('player', '+1 EN (SHADOW)', false, '#06b6d4');
          }
        } else if (player.id === 'shadow_ninja' && Math.random() < 0.25) {
          didEvade = true;
          spawnDamageFloater('player', 'SHADOW VEIL DODGE!', false, '#06b6d4');
          setPlayerExp(e => Math.min(5, e + 1));
        } else {
          // Calculate enemy multipliers
          let dmgMult = diffMults.dmgMult;
          if (isEnemyOverdrive) {
            dmgMult += 0.35;
            setIsEnemyOverdrive(false);
          }
          if (enemyNanoStacks > 0) {
            dmgMult += enemyNanoStacks * 0.10;
            setEnemyNanoStacks(0);
          }
          if (chosenSkill.bonusCondition === 'debuff_bonus' && (playerStatus || playerHp < player.maxHp * 0.5)) {
            dmgMult += 0.50;
            spawnDamageFloater('enemy', 'POUNCE WEAKNESS!', false, '#10b981');
          }

          let calculatedDmg = Math.round(rawDmg * dmgMult);

          if (playerDefending) {
            calculatedDmg = Math.max(2, Math.round(calculatedDmg * 0.35));
            spawnDamageFloater('player', `BLOCKED!`, false, '#38bdf8');
          }

          // Armor Absorption
          if (chosenSkill.armorPierce) {
            const piercedDmg = Math.round(calculatedDmg * chosenSkill.armorPierce);
            const nonPierced = calculatedDmg - piercedDmg;
            const absorbed = Math.min(playerArmor, nonPierced);
            setPlayerArmor(a => Math.max(0, a - absorbed));
            actualHpLoss = piercedDmg + (nonPierced - absorbed);
            if (absorbed > 0) spawnDamageFloater('player', `🛡️ -${absorbed} ARMOR`, false, '#94a3b8');
          } else {
            const absorbed = Math.min(playerArmor, calculatedDmg);
            setPlayerArmor(a => Math.max(0, a - absorbed));
            actualHpLoss = calculatedDmg - absorbed;
            if (absorbed > 0) spawnDamageFloater('player', `🛡️ -${absorbed} ARMOR`, false, '#94a3b8');
          }

          if (actualHpLoss > 0) {
            spawnDamageFloater('player', `-${actualHpLoss}`, isUltimate, isUltimate ? '#ec4899' : '#ef4444');
          }

          // Mecha-Dog Titan passive: Taking hit generates +5 Armor
          if (player.id === 'mecha_dog') {
            setPlayerArmor(a => a + 5);
            spawnDamageFloater('player', 'TITAN ARMOR +5', false, '#a855f7');
          }

          // Apply debuff to player if attack landed
          if (chosenSkill.effect && ['burn', 'shock', 'stun'].includes(chosenSkill.effect)) {
            setPlayerStatus({
              type: chosenSkill.effect as 'burn' | 'shock' | 'stun',
              duration: 2,
              amount: chosenSkill.effectValue || 8
            });
          }
        }
      }

      // Enemy Attack Animation
      setAnim((prev) => ({
        ...prev,
        enemyAction: isUltimate ? 'combo' : chosenSkill.damage > 0 ? 'attack' : 'defend',
        playerAction: didEvade ? 'idle' : playerDefending ? 'defend' : actualHpLoss > 0 ? 'hit' : 'idle',
        activeFx: chosenSkill.fx as AnimationState['activeFx'],
        screenShake: isUltimate ? 'heavy' : actualHpLoss > 20 ? 'medium' : false,
        flashColor: isUltimate ? '#ef4444' : actualHpLoss > 20 ? '#f43f5e' : null,
        bannerText: isUltimate ? `ENEMY ULTIMATE: ${chosenSkill.name.toUpperCase()}!` : `ENEMY: ${chosenSkill.name.toUpperCase()}!`
      }));

      if (isUltimate || actualHpLoss > 20) {
        setTimeout(() => {
          setAnim((prev) => ({
            ...prev,
            screenShake: false,
            flashColor: null
          }));
        }, 350);
      }

      // Update Player HP & Revive logic
      setPlayerHp((prevHp) => {
        let nextHp = Math.max(0, prevHp - actualHpLoss);

        // 9 Lives Resilience for Oyen
        if (nextHp <= 0 && player.id === 'oyen' && !playerRevived) {
          setPlayerRevived(true);
          nextHp = 25;
          setPlayerExp(5);
          spawnDamageFloater('player', '9 LIVES REVIVED! +25 HP', false, '#f97316');
        }

        setLogs((prevLogs) => [
          ...prevLogs,
          {
            id: `enemy-atk-${Date.now()}`,
            round: turnCount,
            sender: 'enemy',
            text: `[AI] ${enemy.name} used [${chosenSkill.category}] ${chosenSkill.name}! ${actualHpLoss > 0 ? `${actualHpLoss} DMG!` : didEvade ? 'EVADED!' : 'UTILITY'}`,
            damage: actualHpLoss,
            isSpecial: isUltimate
          }
        ]);

        if (nextHp <= 0) {
          if (isDuoMode && tagPartnerPlayer && partnerPlayerHp > 0) {
            playKoSound();
            spawnDamageFloater('player', 'LEADER DOWN! PARTNER ENTERS!', false, '#38bdf8');
            const nextActivePlayer = tagPartnerPlayer;
            const nextHpVal = partnerPlayerHp;
            const nextExpVal = partnerPlayerExp;
            setTagPartnerPlayer(null);
            setPartnerPlayerHp(0);
            setActivePlayer(nextActivePlayer);
            setPlayerHp(nextHpVal);
            setPlayerExp(nextExpVal);
            setPlayerArmor(nextActivePlayer.id === 'mecha_dog' ? 15 : 0);
            setAnim((prev) => ({
              ...prev,
              playerAction: 'idle',
              activeFx: 'shadow_strike',
              bannerText: `🤝 LAST STAND: ${nextActivePlayer.name.toUpperCase()} TAGS IN! 🤝`
            }));
            setLogs((prev) => [
              ...prev,
              {
                id: `player-tag-laststand-${Date.now()}`,
                round: turnCount,
                sender: 'system',
                text: `🤝 LAST STAND: ${nextActivePlayer.name} tags in to fight!`
              }
            ]);
            return nextHpVal;
          }

          playKoSound();
          const defeatCoins = calculateDefeatReward({
            mode: isDuoMode ? 'duo' : (survivalStreak !== undefined ? 'survival' : 'arcade'),
            rounds: turnCount,
            comboCount: stats.comboCount
          });
          addCyberCoins(defeatCoins);
          const defeatStats: BattleStats = {
            totalRounds: turnCount,
            maxDamage: stats.maxDamage,
            comboCount: stats.comboCount,
            remainingPlayerHp: 0,
            coinsEarned: defeatCoins,
            difficultyBonus: 0
          };
          setTimeout(() => {
            onDefeat(defeatStats);
          }, 2000);
        }

        return nextHp;
      });

      // Reset turn after hit
      const enemyAtkDuration = isUltimate ? 1400 : 900;
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
        setTurnCount((c) => c + 1);

        // Add +1 Energy to Player each round
        setPlayerExp((exp) => {
          const next = Math.min(MAX_ENERGY, exp + 1);
          if (next > exp) {
            spawnDamageFloater('player', '+1⚡ ROUND EN', false, '#38bdf8');
          }
          return next;
        });

        // Decrement status effects durations if active
        setPlayerStatus((s) => (s && s.duration > 1 ? { ...s, duration: s.duration - 1 } : null));
        setEnemyStatus((s) => (s && s.duration > 1 ? { ...s, duration: s.duration - 1 } : null));

        if (player.id === 'cyber_puss_9000') {
          setNanoEnergyCounter((c) => {
            const next = c + 1;
            if (next >= 3) {
              setNanoFrenzyStacks((s) => s + 1);
              spawnDamageFloater('player', 'NANO FRENZY +10%!', false, '#10b981');
              return next % 3;
            }
            return next;
          });
        }
      }, enemyAtkDuration);
    }, diffMults.aiDelay);
  }, [difficulty, diffMults, enemy, enemyArmor, enemyBonusDmg, enemyMaxHp, enemyNanoCounter, enemyNanoStacks, enemyStatus, isEnemyEvading, isEnemyOverdrive, isPlayerEvading, onDefeat, onVictory, player.archetype, player.id, player.maxHp, player.name, playerArmor, playerExp, playerHp, playerRevived, playerStatus, stats.comboCount, stats.maxDamage, survivalStreak, turnCount]);

  // Skill Execution Logic for Player (Skills 0-6)
  const handleUseSkill = useCallback(async (skillIndex: number) => {
    if (isTurnProcessing || playerHp <= 0 || enemyHp <= 0 || isPaused) return;
    const skill: SkillMove = activePlayer.skills[skillIndex];
    if (!skill) return;

    const skillCost = skill.expCost || 0;

    // Check Energy Cost
    if (playerExp < skillCost) {
      setEnergyWarning(true);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = setTimeout(() => setEnergyWarning(false), 1200);
      spawnDamageFloater('player', 'NOT ENOUGH ENERGY!', false, '#ef4444');
      return;
    }

    setIsTurnProcessing(true);

    // Energy management & Nano Frenzy tracking
    const skillGain = skill.expGain || 0;
    if (skillCost > 0) {
      setPlayerExp((exp) => Math.max(0, exp - skillCost));
    } else if (skillGain > 0) {
      setPlayerExp((exp) => Math.min(MAX_ENERGY, exp + skillGain));
      if (activePlayer.id === 'cyber_puss_9000') {
        const nextCnt = nanoEnergyCounter + skillGain;
        const gainedStacks = Math.floor(nextCnt / 3);
        if (gainedStacks > 0) {
          setNanoFrenzyStacks((s) => s + gainedStacks);
          setNanoEnergyCounter(nextCnt % 3);
          spawnDamageFloater('player', `NANO FRENZY +10%!`, false, '#10b981');
        } else {
          setNanoEnergyCounter(nextCnt);
        }
      }
    }

    const isUltimate = skill.type === 'ultimate';
    const isCrit = Math.random() < activePlayer.critRate;

    playSkillSound(skill);

    // Player Utility & Defense Buffs
    if (skill.category === 'DEFENSE' || skill.effect === 'evade') {
      setIsPlayerEvading(true);
      spawnDamageFloater('player', 'HOLO-DECOY UP!', false, '#38bdf8');
    }

    if (skill.effect === 'armor') {
      const armorAmt = skill.effectValue || 30;
      setPlayerArmor((prev) => prev + armorAmt);
      spawnDamageFloater('player', `+${armorAmt} ARMOR`, false, '#a855f7');
    }

    if (skill.effect === 'heal') {
      const healAmt = skill.effectValue || 20;
      setPlayerHp((prev) => Math.min(effectivePlayerMaxHp, prev + healAmt));
      spawnDamageFloater('player', `+${healAmt} HP`, false, '#22c55e');
    }

    if (skill.effect === 'empower') {
      setIsPlayerOverdrive(true);
      const healAmt = skill.effectValue || 30;
      setPlayerHp((prev) => Math.min(effectivePlayerMaxHp, prev + healAmt));
      spawnDamageFloater('player', `OVERDRIVE +${healAmt} HP`, false, '#f59e0b');
    }

    // Damage calculations
    let totalDmg = 0;
    let actualHpLoss = 0;
    let didEvade = false;

    if (skill.damage > 0) {
      if (isEnemyEvading) {
        didEvade = true;
        setIsEnemyEvading(false);
        spawnDamageFloater('enemy', 'EVADED! 0 DMG', false, '#38bdf8');
      } else {
        let baseDmg = skill.damage + Math.floor(Math.random() * 4) - 2 + (playerBonusDmg || 0) + playerBonusAtkUpgrade;

        // Apply Nano Frenzy (+10% per stack)
        if (nanoFrenzyStacks > 0) {
          const bonus = Math.round(baseDmg * (nanoFrenzyStacks * 0.10));
          baseDmg += bonus;
          spawnDamageFloater('player', `NANO FRENZY! +${bonus}`, false, '#10b981');
          setNanoFrenzyStacks(0);
        }

        // Apply Overdrive (+35%)
        if (isPlayerOverdrive) {
          const bonus = Math.round(baseDmg * 0.35);
          baseDmg += bonus;
          setIsPlayerOverdrive(false);
          spawnDamageFloater('player', `OVERDRIVE! +${bonus}`, false, '#f59e0b');
        }

        // Cyber Pounce debuff bonus (+50%)
        if (skill.bonusCondition === 'debuff_bonus' && (enemyStatus || enemyHp < enemyMaxHp * 0.5)) {
          const bonus = Math.round(baseDmg * 0.50);
          baseDmg += bonus;
          spawnDamageFloater('player', `POUNCE WEAKNESS! +${bonus}`, false, '#10b981');
        }

        // Berserk bonus for Heavy Bully
        if (activePlayer.id === 'heavy_bully') {
          const missingHpRatio = (effectivePlayerMaxHp - playerHp) / effectivePlayerMaxHp;
          baseDmg = Math.round(baseDmg * (1 + missingHpRatio * 0.40));
        }

        totalDmg = isCrit ? Math.round(baseDmg * 1.75) : baseDmg;
        totalDmg = Math.round(totalDmg * diffMults.playerDmgMult);

        if (isEnemyDefending) {
          totalDmg = Math.max(2, Math.round(totalDmg * 0.35));
        }

        // Armor Absorption
        if (skill.armorPierce) {
          const piercedDmg = Math.round(totalDmg * skill.armorPierce);
          const nonPierced = totalDmg - piercedDmg;
          const absorbed = Math.min(enemyArmor, nonPierced);
          setEnemyArmor((a) => Math.max(0, a - absorbed));
          actualHpLoss = piercedDmg + (nonPierced - absorbed);
          if (absorbed > 0) spawnDamageFloater('enemy', `🛡️ -${absorbed} ARMOR`, false, '#94a3b8');
        } else {
          const absorbed = Math.min(enemyArmor, totalDmg);
          setEnemyArmor((a) => Math.max(0, a - absorbed));
          actualHpLoss = totalDmg - absorbed;
          if (absorbed > 0) spawnDamageFloater('enemy', `🛡️ -${absorbed} ARMOR`, false, '#94a3b8');
        }

        // Mecha-Dog Titan passive for enemy
        if (enemy.id === 'mecha_dog') {
          setEnemyArmor((a) => a + 5);
          spawnDamageFloater('enemy', 'TITAN ARMOR +5', false, '#a855f7');
        }

        if (actualHpLoss > 0) {
          spawnDamageFloater('enemy', isCrit ? `CRITICAL! -${actualHpLoss}` : `-${actualHpLoss}`, isCrit, isUltimate ? '#f97316' : '#facc15');
        }

        setStats((s) => ({
          ...s,
          maxDamage: Math.max(s.maxDamage, actualHpLoss),
          comboCount: isUltimate ? s.comboCount + 1 : s.comboCount
        }));
      }
    }

    // Apply status debuff to enemy
    if (skill.effect && ['burn', 'shock', 'stun'].includes(skill.effect) && !didEvade) {
      if (enemy.id === 'saber_tooth_boss' && skill.effect === 'stun') {
        spawnDamageFloater('enemy', 'STUN IMMUNE!', false, '#f43f5e');
      } else {
        setEnemyStatus({
          type: skill.effect as 'burn' | 'shock' | 'stun',
          duration: 2,
          amount: skill.effectValue || 10
        });
      }
    }

        // --- VFX PIPELINE ---
    // 1. IMMEDIATE CAST & IMPACT
    setAnim((prev) => ({
      ...prev,
      playerAction: isUltimate ? 'combo' : 'attack',
      activeFx: skill.fx as AnimationState['activeFx'],
      enemyAction: didEvade ? 'idle' : actualHpLoss > 0 ? 'hit' : 'idle',
      screenShake: isUltimate ? 'heavy' : isCrit ? 'medium' : skill.damage > 28,
      flashColor: isUltimate ? '#f97316' : isCrit ? '#facc15' : skill.damage > 25 ? '#38bdf8' : null,
      bannerText: isUltimate ? `💥 ULTIMATE: ${skill.name.toUpperCase()}! 💥` : `▶ ${skill.name.toUpperCase()}!`
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

    // Stop flash & shake after initial impact
    setTimeout(() => {
      setAnim((prev) => ({
        ...prev,
        screenShake: false,
        flashColor: null
      }));
    }, 350);

    // Let the skill attack animation, particles, and banner display cleanly
    const playerSkillDuration = isUltimate ? 1400 : 900;
    await wait(playerSkillDuration);

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
        
        await wait(900);
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

    // Comfortable tactical breathing pause between turns before enemy acts
    await wait(400);
    triggerEnemyTurn(newEnemyHp, enemyExp, false);
  }, [diffMults.playerDmgMult, effectivePlayerMaxHp, difficulty, isDuoMode, tagPartnerEnemy, partnerEnemyHp, partnerEnemyExp, activePlayer, enemy.id, enemyArmor, enemyExp, enemyHp, enemyMaxHp, enemyRevived, enemyStatus, isEnemyDefending, isEnemyEvading, isPaused, isPlayerOverdrive, isTurnProcessing, nanoEnergyCounter, nanoFrenzyStacks, onVictory, player.critRate, player.id, player.maxHp, player.name, player.skills, playerBonusAtkUpgrade, playerBonusDmg, playerExp, playerHp, stats.comboCount, stats.maxDamage, survivalStreak, triggerEnemyTurn, turnCount]);

  // Duo Character Swap Action
  const handleSwapCharacter = useCallback(() => {
    if (!isDuoMode || !tagPartnerPlayer || partnerPlayerHp <= 0 || isTurnProcessing || isPaused) return;

    playSelectSound();
    playFieryComboSound();
    setIsTurnProcessing(true);

    const oldActive = activePlayer;
    const oldHp = playerHp;
    const oldExp = playerExp;

    setActivePlayer(tagPartnerPlayer);
    setTagPartnerPlayer(oldActive);
    setPlayerHp(partnerPlayerHp);
    setPlayerExp(partnerPlayerExp);
    setPartnerPlayerHp(oldHp);
    setPartnerPlayerExp(oldExp);

    spawnDamageFloater('player', `TAG TEAM! ${tagPartnerPlayer.name.toUpperCase()} IN!`, false, '#38bdf8');
    setAnim((prev) => ({
      ...prev,
      playerAction: 'combo',
      activeFx: 'shadow_strike',
      bannerText: `🤝 TAG IN: ${tagPartnerPlayer.name.toUpperCase()}! 🤝`
    }));

    setLogs((prev) => [
      ...prev,
      {
        id: `tag-swap-${Date.now()}`,
        round: turnCount,
        sender: 'system',
        text: `🤝 TAG TEAM: ${oldActive.name} swapped out! ${tagPartnerPlayer.name} enters the battle arena!`
      }
    ]);

    setTimeout(() => {
      setAnim((prev) => ({ ...prev, playerAction: 'idle', activeFx: 'none', bannerText: null }));
      setIsTurnProcessing(false);
    }, 450);
  }, [activePlayer, isDuoMode, isPaused, isTurnProcessing, partnerPlayerExp, partnerPlayerHp, playerExp, playerHp, tagPartnerPlayer, turnCount]);

  // PC Keyboard Listeners: 1-7, Q, W, E, R, T, Y, U, TAB/S (Swap), ESC/P (Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'escape' || key === 'p') {
        e.preventDefault();
        setIsPaused((p) => !p);
        return;
      }

      if (isPaused) return;

      if (key === 'tab' || key === 's') {
        if (isDuoMode) {
          e.preventDefault();
          handleSwapCharacter();
          return;
        }
      }

      if (key === 'q' || key === '1') {
        e.preventDefault();
        handleUseSkill(0);
      } else if (key === 'w' || key === '2') {
        e.preventDefault();
        handleUseSkill(1);
      } else if (key === 'e' || key === '3') {
        e.preventDefault();
        handleUseSkill(2);
      } else if (key === 'r' || key === '4') {
        e.preventDefault();
        handleUseSkill(3);
      } else if (key === 't' || key === '5') {
        e.preventDefault();
        handleUseSkill(4);
      } else if (key === 'y' || key === '6') {
        e.preventDefault();
        handleUseSkill(5);
      } else if (key === 'u' || key === '7' || key === ' ') {
        e.preventDefault();
        handleUseSkill(6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwapCharacter, handleUseSkill, isDuoMode, isPaused]);

  // Calculate HP percentages
  const playerHpPct = Math.max(0, Math.round((playerHp / effectivePlayerMaxHp) * 100));
  const enemyHpPct = Math.max(0, Math.round((enemyHp / enemyMaxHp) * 100));

  return (
    <div
      className={`relative flex-1 flex flex-col justify-between p-1 sm:p-2 landscape:p-0.5 select-none overflow-hidden h-full max-h-[100dvh] w-full min-h-0 bg-slate-950 ${
        anim.screenShake === 'heavy' ? 'animate-heavy-shake' : anim.screenShake === 'medium' ? 'animate-shake' : anim.screenShake ? 'animate-shake' : ''
      }`}
    >
      {/* Dynamic Arena Map Background */}
      <ArenaBackground map={map} />

      {/* Visual Fiery Combo Overlays */}
      <SkillVfxEngine
        activeFx={anim.activeFx}
        bannerText={anim.bannerText}
        flashColor={anim.flashColor}
      />

      {/* ARCADE FIGHTING GAME TOP HUD (SIDE-BY-SIDE ALIGNED - CLASSIC FIGHTER STYLE) */}
      <div className="relative z-20 w-full max-w-[460px] xs:max-w-[500px] sm:max-w-2xl landscape:max-w-5xl mx-auto px-1.5 sm:px-3 landscape:px-1 shrink-0 pt-2.5 xs:pt-3.5 sm:pt-4.5 landscape:pt-0">
        <div className="flex items-center justify-between gap-1 sm:gap-2.5 landscape:gap-1 bg-slate-950/90 backdrop-blur-xs border border-slate-700/80 p-1.5 sm:p-2 landscape:py-0.5 landscape:px-1.5 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
          
          {/* PLAYER 1 (LEFT SIDE) */}
          <div className="flex-1 flex items-center gap-1 sm:gap-2 landscape:gap-1 min-w-0">
            {/* Player Avatar Box */}
            <div className="w-8.5 h-8.5 xs:w-10 xs:h-10 sm:w-11 sm:h-11 landscape:w-7 landscape:h-7 bg-slate-900 border sm:border-2 border-cyan-400 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden shadow-[0_0_12px_rgba(34,211,238,0.3)]">
              <div className="absolute top-0 left-0 bg-cyan-500 text-black font-['Press_Start_2P'] text-[5px] sm:text-[6.5px] landscape:text-[4px] px-0.5 py-0.2 rounded-br font-bold z-10">
                P1
              </div>
              <div className="scale-[0.34] xs:scale-[0.38] sm:scale-[0.42] landscape:scale-[0.25] origin-center translate-y-1 sm:translate-y-2 landscape:translate-y-0.5">
                <PixelSprite character={activePlayer} action="idle" scale={activePlayer.type === 'boss' ? 1.2 : 1} />
              </div>
            </div>

            {/* Duo Partner Tag Portrait (if Duo Mode) */}
            {isDuoMode && tagPartnerPlayer && (
              <button
                onClick={handleSwapCharacter}
                disabled={isTurnProcessing || isPaused || partnerPlayerHp <= 0}
                className={`w-6 h-6 sm:w-8 sm:h-8 landscape:w-5 landscape:h-5 rounded-md sm:rounded-lg border sm:border-2 flex items-center justify-center shrink-0 relative overflow-hidden transition-all cursor-pointer ${
                  partnerPlayerHp > 0
                    ? 'border-purple-400 bg-purple-950/80 hover:border-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                    : 'border-slate-800 bg-slate-950 opacity-40 cursor-not-allowed'
                }`}
                title={`Tag Partner: ${tagPartnerPlayer.name} (Click or TAB to Swap)`}
              >
                <div className="absolute top-0 left-0 bg-purple-600 text-white font-['Press_Start_2P'] text-[4px] sm:text-[5px] landscape:text-[3.5px] px-0.5 rounded-br z-10">
                  TAG
                </div>
                <div className="scale-[0.2] sm:scale-[0.26] landscape:scale-[0.18] origin-center translate-y-0.5">
                  <PixelSprite character={tagPartnerPlayer} action="idle" />
                </div>
              </button>
            )}

            {/* Player Name, Health Bar & Energy */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Name & Stats Row */}
              <div className="flex items-center justify-between mb-0.5 landscape:mb-0 gap-1">
                <div className="flex items-center gap-1 truncate">
                  <span className="font-['Press_Start_2P'] text-[7.5px] sm:text-[9.5px] landscape:text-[6.5px] text-cyan-300 drop-shadow-sm truncate">
                    {activePlayer.name}
                  </span>
                  <span className="hidden sm:inline-block text-[6.5px] font-bold px-1 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 uppercase">
                    {activePlayer.archetype}
                  </span>
                  {(playerBonusDmg > 0 || playerBonusAtkUpgrade > 0) && (
                    <span className="text-[6px] sm:text-[7px] landscape:text-[5.5px] font-bold px-1 py-0.2 rounded bg-amber-950/90 text-amber-300 border border-amber-500/60 uppercase tracking-tight">
                      +{playerBonusDmg + playerBonusAtkUpgrade} ATK
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 font-mono text-[7px] sm:text-[9px] landscape:text-[6.5px] text-slate-300 font-bold">
                  {playerArmor > 0 && (
                    <span className="text-[6px] landscape:text-[5px] text-sky-300 bg-sky-950/90 px-0.5 rounded border border-sky-600">
                      🛡️{playerArmor}
                    </span>
                  )}
                  <span>{playerHp}/{effectivePlayerMaxHp}</span>
                </div>
              </div>

              {/* Health Bar */}
              <div className="w-full h-2.5 xs:h-3 sm:h-3.5 landscape:h-1.5 bg-slate-900 rounded border border-slate-700 overflow-hidden relative shadow-inner">
                <div
                  className={`h-full transition-all duration-300 ease-out bg-gradient-to-r ${
                    playerHpPct > 50
                      ? 'from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                      : playerHpPct > 25
                      ? 'from-amber-500 via-yellow-400 to-amber-300'
                      : 'from-rose-600 via-red-500 to-orange-400 animate-pulse'
                  }`}
                  style={{ width: `${playerHpPct}%` }}
                />
              </div>

              {/* Energy Pips & Status Row */}
              <div className="flex items-center justify-between mt-0.5 landscape:mt-0">
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <span className="text-[5px] sm:text-[7px] landscape:text-[4.5px] font-bold text-cyan-400 font-['Press_Start_2P'] tracking-tight mr-0.5">
                    ENERGY
                  </span>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-1.5 sm:h-2 sm:w-2 landscape:h-1 landscape:w-1 rounded-full transition-all duration-300 ${
                        i < playerExp ? 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] scale-110' : 'bg-slate-800 border border-slate-700/60'
                      }`}
                    />
                  ))}
                  <span className="text-[6px] sm:text-[7.5px] landscape:text-[5.5px] text-cyan-300 font-mono font-bold ml-0.5 sm:ml-1">
                    {playerExp}/8
                  </span>
                </div>

                <div className="flex items-center gap-0.5">
                  {isPlayerEvading && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-sky-300 font-bold animate-pulse">
                      [EVADING]
                    </span>
                  )}
                  {isPlayerOverdrive && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-amber-300 font-bold">
                      [OVERDRIVE]
                    </span>
                  )}
                  {nanoFrenzyStacks > 0 && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-emerald-300 font-bold">
                      [+{nanoFrenzyStacks * 10}%]
                    </span>
                  )}
                  {playerStatus && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-yellow-300 font-bold uppercase">
                      [{playerStatus.type}]
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CENTER ORNATE ARCADE ROUND / TIMER EMBLEM */}
          <div className="flex flex-col items-center justify-center shrink-0 px-0.5">
            <div className="w-7.5 h-7.5 xs:w-8.5 xs:h-8.5 sm:w-10 sm:h-10 landscape:w-6 landscape:h-6 rounded-full bg-gradient-to-b from-yellow-300 via-amber-600 to-amber-950 border border-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.5)] flex flex-col items-center justify-center relative">
              <span className="text-[4.5px] sm:text-[6.5px] landscape:text-[3.5px] font-bold text-yellow-200 tracking-wider">
                {survivalStreak !== undefined ? 'STAGE' : 'RND'}
              </span>
              <span className="font-['Press_Start_2P'] text-[7.5px] sm:text-[10px] landscape:text-[6.5px] text-yellow-100 drop-shadow-md">
                {survivalStreak !== undefined ? survivalStreak + 1 : turnCount}
              </span>
            </div>
          </div>

          {/* ENEMY / COM (RIGHT SIDE) */}
          <div className="flex-1 flex items-center gap-1 sm:gap-2 landscape:gap-1 min-w-0 justify-end">
            {/* Enemy Name, Health Bar & Energy (Mirrored Layout) */}
            <div className="flex-1 min-w-0 flex flex-col">
              {/* Name & Stats Row */}
              <div className="flex items-center justify-between mb-0.5 landscape:mb-0 gap-1">
                <div className="flex items-center gap-1 shrink-0 font-mono text-[7px] sm:text-[9px] landscape:text-[6.5px] text-slate-300 font-bold">
                  <span>{enemyHp}/{enemyMaxHp}</span>
                  {enemyArmor > 0 && (
                    <span className="text-[6px] landscape:text-[5px] text-sky-300 bg-sky-950/90 px-0.5 rounded border border-sky-600">
                      🛡️{enemyArmor}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 truncate justify-end">
                  {(enemyBonusHp > 0 || enemyBonusDmg > 0) && (
                    <span className="text-[6px] sm:text-[7px] landscape:text-[5.5px] font-bold px-1 py-0.2 rounded bg-rose-950/90 text-rose-300 border border-rose-500/60 uppercase tracking-tight">
                      +{enemyBonusHp} HP
                    </span>
                  )}
                  <span className="hidden sm:inline-block text-[6.5px] font-bold px-1 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-800 uppercase">
                    {activeEnemy.archetype}
                  </span>
                  <span className="font-['Press_Start_2P'] text-[7.5px] sm:text-[9.5px] landscape:text-[6.5px] text-rose-300 drop-shadow-sm truncate text-right">
                    {activeEnemy.name}
                  </span>
                </div>
              </div>

              {/* Health Bar (Inward facing mirror) */}
              <div className="w-full h-2.5 xs:h-3 sm:h-3.5 landscape:h-1.5 bg-slate-900 rounded border border-slate-700 overflow-hidden relative shadow-inner flex justify-end">
                <div
                  className={`h-full transition-all duration-300 ease-out bg-gradient-to-r ${
                    enemyHpPct > 50
                      ? 'from-rose-500 via-red-500 to-orange-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                      : enemyHpPct > 25
                      ? 'from-amber-500 via-yellow-400 to-amber-300'
                      : 'from-red-600 via-rose-500 to-pink-500 animate-pulse'
                  }`}
                  style={{ width: `${enemyHpPct}%` }}
                />
              </div>

              {/* Energy Pips & Status Row */}
              <div className="flex items-center justify-between mt-0.5 landscape:mt-0">
                <div className="flex items-center gap-0.5">
                  {enemyStatus && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-yellow-300 font-bold uppercase">
                      [{enemyStatus.type}]
                    </span>
                  )}
                  {enemyNanoStacks > 0 && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-emerald-300 font-bold">
                      [+{enemyNanoStacks * 10}%]
                    </span>
                  )}
                  {isEnemyEvading && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-sky-300 font-bold animate-pulse">
                      [EVADING]
                    </span>
                  )}
                  {isEnemyOverdrive && (
                    <span className="text-[6px] sm:text-[7.5px] landscape:text-[5px] text-amber-300 font-bold">
                      [OVERDRIVE]
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <span className="text-[6px] sm:text-[7.5px] landscape:text-[5.5px] text-rose-300 font-mono font-bold mr-0.5 sm:mr-1">
                    {enemyExp}/8
                  </span>
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-1.5 sm:h-2 sm:w-2 landscape:h-1 landscape:w-1 rounded-full transition-all duration-300 ${
                        i < enemyExp ? 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.9)] scale-110' : 'bg-slate-800 border border-slate-700/60'
                      }`}
                    />
                  ))}
                  <span className="text-[5px] sm:text-[7px] landscape:text-[4.5px] font-bold text-rose-400 font-['Press_Start_2P'] tracking-tight ml-0.5">
                    ENERGY
                  </span>
                </div>
              </div>
            </div>

            {/* Rival Duo Partner Portrait */}
            {isDuoMode && tagPartnerEnemy && (
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 landscape:w-5 landscape:h-5 rounded-md sm:rounded-lg border sm:border-2 flex items-center justify-center shrink-0 relative overflow-hidden ${
                  partnerEnemyHp > 0
                    ? 'border-rose-400 bg-rose-950/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]'
                    : 'border-slate-800 bg-slate-950 opacity-40'
                }`}
                title={`Rival Partner: ${tagPartnerEnemy.name}`}
              >
                <div className="absolute top-0 right-0 bg-rose-600 text-white font-['Press_Start_2P'] text-[4px] sm:text-[5px] landscape:text-[3.5px] px-0.5 rounded-bl z-10">
                  TAG
                </div>
                <div className="scale-[0.2] sm:scale-[0.26] landscape:scale-[0.18] origin-center translate-y-0.5">
                  <PixelSprite character={tagPartnerEnemy} action="idle" isFlipped={true} />
                </div>
              </div>
            )}

            {/* Enemy Avatar Box */}
            <div className="w-8.5 h-8.5 xs:w-10 xs:h-10 sm:w-11 sm:h-11 landscape:w-7 landscape:h-7 bg-slate-900 border sm:border-2 border-rose-500 rounded-md sm:rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden shadow-[0_0_12px_rgba(244,63,94,0.3)]">
              <div className="absolute top-0 right-0 bg-rose-500 text-white font-['Press_Start_2P'] text-[5px] sm:text-[6.5px] landscape:text-[4px] px-0.5 py-0.2 rounded-bl font-bold z-10">
                COM
              </div>
              <div className="scale-[0.34] xs:scale-[0.38] sm:scale-[0.42] landscape:scale-[0.25] origin-center translate-y-1 sm:translate-y-2 landscape:translate-y-0.5">
                <PixelSprite character={activeEnemy} action="idle" isFlipped={true} scale={activeEnemy.type === 'boss' ? 1.2 : 1} />
              </div>
            </div>
          </div>

          {/* PAUSE BUTTON (CLEAN ICON IN HEADER) */}
          <button 
            onClick={() => setIsPaused(true)}
            className="p-1 sm:p-1.5 landscape:p-0.5 rounded-lg bg-slate-800/80 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 transition-all shrink-0 ml-0.5"
            title="Pause Game (ESC / P)"
          >
            <Pause className="w-3 h-3 sm:w-4 sm:h-4 landscape:w-2.5 landscape:h-2.5" />
          </button>
        </div>
      </div>

      {/* CENTER FIGHTING STAGE & PIXEL SPRITES */}
      <div className="relative z-10 flex-1 min-h-0 flex items-center justify-around portrait:justify-center portrait:gap-6 xs:portrait:gap-10 sm:portrait:gap-16 px-2 sm:px-16 landscape:items-end landscape:pb-0.5 portrait:items-end portrait:pb-2 sm:portrait:pb-4">

        {/* PLAYER SPRITE (LEFT) */}
        <div
          className={`relative flex flex-col items-center transition-transform duration-300 ease-out will-change-transform ${
            anim.playerAction === 'attack' || anim.playerAction === 'combo'
              ? 'translate-x-8 sm:translate-x-24 scale-105'
              : anim.playerAction === 'hit'
              ? '-translate-x-4 sm:-translate-x-8 rotate-2 brightness-125'
              : ''
          }`}
        >
          {/* Damage floater for player */}
          <AnimatePresence>
            {damageFloaters
              .filter((d) => d.target === 'player')
              .map((d) => (
                <motion.div
                  key={d.id}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ y: -90, opacity: [0, 1, 1, 0], scale: [0.5, 1.3, 1.1, 1.1] }}
                  transition={{ duration: 1.2, times: [0, 0.15, 0.8, 1], ease: "easeOut" }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 sm:-top-16 landscape:-top-6 font-['Press_Start_2P'] text-xs sm:text-xl landscape:text-[8px] font-bold whitespace-nowrap z-50 pointer-events-none"
                  style={{ 
                    color: d.color || '#ef4444',
                    textShadow: '0 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                  }}
                >
                  {d.isCrit && <div className="text-[8px] sm:text-[10px] landscape:text-[6px] text-yellow-300 text-center mb-0.5 tracking-widest">CRITICAL HIT</div>}
                  {d.text.replace('CRITICAL! ', '')}
                </motion.div>
              ))}
          </AnimatePresence>

          <div className="scale-[0.8] portrait:scale-[1.12] xs:portrait:scale-[1.22] sm:portrait:scale-[1.32] landscape:scale-[0.55] sm:landscape:scale-[0.65] origin-bottom transition-transform">
            <PixelSprite character={activePlayer} action={anim.playerAction} scale={activePlayer.type === 'boss' ? 1.4 : 1} />
          </div>
          
          {/* Shadow on floor */}
          <div className="w-16 xs:w-20 sm:w-24 landscape:w-12 h-2 sm:h-2.5 landscape:h-1.5 bg-black/50 rounded-full blur-[2px] mt-0.5" />

          {/* Stance / Passive Indicator */}
          <div className="mt-1 sm:mt-1.5 landscape:mt-0 font-bold text-[6.5px] xs:text-[7px] sm:text-[8.5px] landscape:text-[5.5px] text-cyan-300 bg-slate-900/90 px-1.5 xs:px-2 sm:px-2.5 landscape:px-1 py-0.5 landscape:py-0 rounded-full border border-slate-700 flex items-center space-x-1 shadow-md">
            <span>
              {isPlayerEvading
                ? '✨ EVADING'
                : playerArmor > 0
                ? `🛡️ ARMOR: ${playerArmor}`
                : isPlayerOverdrive
                ? '⚡ OVERDRIVE'
                : nanoFrenzyStacks > 0
                ? `🌀 FRENZY +${nanoFrenzyStacks * 10}%`
                : isPlayerDefending
                ? '🛡️ GUARDING'
                : activePlayer.passiveTraitName}
            </span>
          </div>
        </div>

        {/* ENEMY SPRITE (RIGHT) */}
        <div
          className={`relative flex flex-col items-center transition-transform duration-300 ease-out will-change-transform ${
            anim.enemyAction === 'attack' || anim.enemyAction === 'combo'
              ? '-translate-x-8 sm:-translate-x-24 scale-105'
              : anim.enemyAction === 'hit'
              ? 'translate-x-4 sm:translate-x-8 -rotate-2 brightness-125'
              : ''
          }`}
        >
          {/* Damage floater for enemy */}
          <AnimatePresence>
            {damageFloaters
              .filter((d) => d.target === 'enemy')
              .map((d) => (
                <motion.div
                  key={d.id}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ y: -90, opacity: [0, 1, 1, 0], scale: [0.5, 1.4, 1.1, 1.1] }}
                  transition={{ duration: 1.2, times: [0, 0.15, 0.8, 1], ease: "easeOut" }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-12 sm:-top-16 landscape:-top-6 font-['Press_Start_2P'] text-xs sm:text-xl landscape:text-[8px] font-bold whitespace-nowrap z-50 pointer-events-none"
                  style={{ 
                    color: d.color || '#ef4444',
                    textShadow: '0 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                  }}
                >
                  {d.isCrit && <div className="text-[8px] sm:text-[10px] landscape:text-[6px] text-yellow-300 text-center mb-0.5 tracking-widest animate-pulse">CRITICAL HIT</div>}
                  {d.text.replace('CRITICAL! ', '')}
                </motion.div>
              ))}
          </AnimatePresence>

          <div className="scale-[0.8] portrait:scale-[1.12] xs:portrait:scale-[1.22] sm:portrait:scale-[1.32] landscape:scale-[0.55] sm:landscape:scale-[0.65] origin-bottom transition-transform">
            <PixelSprite character={activeEnemy} action={anim.enemyAction} isFlipped={true} scale={activeEnemy.type === 'boss' ? 1.4 : 1} />
          </div>

          {/* Shadow on floor */}
          <div className="w-16 xs:w-20 sm:w-24 landscape:w-12 h-2 sm:h-2.5 landscape:h-1.5 bg-black/50 rounded-full blur-[2px] mt-0.5" />

          {/* Enemy Stance Indicator */}
          <div className="mt-1 sm:mt-1.5 landscape:mt-0 font-bold text-[6.5px] xs:text-[7px] sm:text-[8.5px] landscape:text-[5.5px] text-rose-300 bg-slate-900/90 px-1.5 xs:px-2 sm:px-2.5 landscape:px-1 py-0.5 landscape:py-0 rounded-full border border-slate-700 flex items-center space-x-1 shadow-md">
            <span>
              {isEnemyEvading
                ? '✨ EVADING'
                : enemyArmor > 0
                ? `🛡️ ARMOR: ${enemyArmor}`
                : isEnemyOverdrive
                ? '⚡ OVERDRIVE'
                : activeEnemy.passiveTraitName}
            </span>
          </div>
        </div>
      </div>

      {/* BATTLE LOG / DIALOG BOX */}
      <div className="relative z-20 w-full max-w-[460px] xs:max-w-[500px] sm:max-w-2xl landscape:max-w-4xl mx-auto px-1.5 sm:px-3 landscape:px-1 my-0.5 sm:my-1 landscape:my-0.2 shrink-0">
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg sm:rounded-xl px-2.5 py-1 sm:py-1.5 landscape:py-0 shadow-md min-h-[24px] sm:min-h-[30px] landscape:min-h-[16px] flex items-center justify-center">
           {logs.length > 0 && (
             <div className="text-center font-medium text-[8.5px] sm:text-xs landscape:text-[6.5px] text-slate-100 line-clamp-1">
               {logs[logs.length - 1].text}
             </div>
           )}
        </div>
      </div>

      {/* BOTTOM SKILL ACTION BUTTONS - 7-SKILL LOADOUT & DUO SWAP */}
      <div className="relative z-20 w-full max-w-[460px] xs:max-w-[500px] sm:max-w-2xl landscape:max-w-5xl mx-auto px-1.5 sm:px-2 pb-1.5 sm:pb-3 landscape:pb-0.5 landscape:px-1 shrink-0 flex flex-col items-center">
        <div className="hidden portrait:flex items-center justify-between w-full mb-1 px-1">
          <div className="flex items-center space-x-1.5 text-[7px] sm:text-[9px] font-bold text-slate-400">
            <span className="text-cyan-400 font-['Press_Start_2P'] text-[6.5px] sm:text-[8px]">
              {activePlayer.name.toUpperCase()}
            </span>
            <span>• {activePlayer.skills.length} SKILLS</span>
            <span className="hidden md:inline text-slate-500 font-mono">[1-7]</span>
          </div>

          {isDuoMode && tagPartnerPlayer && (
            <button
              onClick={handleSwapCharacter}
              disabled={isTurnProcessing || isPaused || partnerPlayerHp <= 0}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-0.8 rounded border font-['Press_Start_2P'] text-[6.5px] sm:text-[8px] flex items-center space-x-1 transition-all cursor-pointer ${
                partnerPlayerHp > 0 && !isTurnProcessing
                  ? 'bg-purple-900/90 hover:bg-purple-800 border-purple-400 text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.4)] active:scale-95'
                  : 'bg-slate-900 border-slate-800 text-slate-600 opacity-50 cursor-not-allowed'
              }`}
              title="Swap Tag Partner (TAB or S)"
            >
              <Repeat className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>SWAP ({tagPartnerPlayer.name.slice(0, 6)})</span>
            </button>
          )}
        </div>

        {/* NOT ENOUGH ENERGY ALERT POPUP */}
        <AnimatePresence>
          {energyWarning && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 12 }}
              animate={{ scale: [1, 1.06, 1], opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 bg-red-950/95 border-2 border-red-500 text-red-100 px-3 py-1 rounded-xl shadow-[0_0_24px_rgba(239,68,68,0.9)] flex items-center gap-1.5 font-['Press_Start_2P'] text-[8px] sm:text-[10px] whitespace-nowrap pointer-events-none"
            >
              <span className="text-yellow-400 animate-bounce">⚡</span>
              <span className="animate-pulse tracking-wider text-red-100 drop-shadow">NOT ENOUGH ENERGY</span>
              <span className="text-yellow-400 animate-bounce">⚡</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full grid grid-cols-3 landscape:grid-cols-7 gap-1.5 xs:gap-2 sm:gap-2.5 landscape:gap-0.5">
          {activePlayer.skills.map((skill, idx) => {
            const cost = skill.expCost || 0;
            const canAfford = playerExp >= cost && !isTurnProcessing && !isPaused;
            const isUltimate = skill.type === 'ultimate';

            // Category configuration
            let categoryIcon = <Swords className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5" />;
            let categoryBadgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';
            let cardStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500';

            if (isUltimate) {
              categoryIcon = <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-amber-400" />;
              categoryBadgeStyle = 'bg-amber-950 text-amber-300 border-amber-500';
              cardStyle = canAfford
                ? 'bg-gradient-to-b from-amber-950/70 to-slate-900 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.3)] hover:border-amber-300'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            } else if (skill.category === 'DEFENSE') {
              categoryIcon = <Shield className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-sky-400" />;
              categoryBadgeStyle = 'bg-sky-950 text-sky-300 border-sky-600';
              cardStyle = canAfford
                ? 'bg-slate-900/90 border-sky-500 text-sky-100 hover:bg-sky-950/40 hover:border-sky-400'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            } else if (skill.category === 'RECOVERY') {
              categoryIcon = <Heart className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-emerald-400" />;
              categoryBadgeStyle = 'bg-emerald-950 text-emerald-300 border-emerald-600';
              cardStyle = canAfford
                ? 'bg-slate-900/90 border-emerald-500 text-emerald-100 hover:bg-emerald-950/40 hover:border-emerald-400'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            } else if (skill.category === 'ENERGY') {
              categoryIcon = <Zap className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-cyan-400" />;
              categoryBadgeStyle = 'bg-cyan-950 text-cyan-300 border-cyan-600';
              cardStyle = canAfford
                ? 'bg-slate-900/90 border-cyan-500 text-cyan-100 hover:bg-cyan-950/40 hover:border-cyan-400'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            } else if (skill.category === 'EXPLOSIVE') {
              categoryIcon = <Flame className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-orange-400" />;
              categoryBadgeStyle = 'bg-orange-950 text-orange-300 border-orange-600';
              cardStyle = canAfford
                ? 'bg-slate-900/90 border-orange-500 text-orange-100 hover:bg-orange-950/40 hover:border-orange-400'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            } else if (skill.category === 'STATUS') {
              categoryIcon = <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-purple-400" />;
              categoryBadgeStyle = 'bg-purple-950 text-purple-300 border-purple-600';
              cardStyle = canAfford
                ? 'bg-slate-900/90 border-purple-500 text-purple-100 hover:bg-purple-950/40 hover:border-purple-400'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            } else {
              // PHYSICAL
              categoryIcon = <Swords className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 landscape:w-1.5 landscape:h-1.5 text-slate-300" />;
              categoryBadgeStyle = 'bg-slate-800 text-slate-300 border-slate-600';
              cardStyle = canAfford
                ? 'bg-slate-900/90 border-slate-500 text-slate-200 hover:bg-slate-800 hover:border-slate-400'
                : 'bg-slate-950 border-slate-800 text-slate-600 opacity-60';
            }

            // Primary Effect Display
            let primaryEffect = '';
            if (skill.damage > 0) {
              primaryEffect = `${skill.damage} DMG`;
              if (skill.armorPierce) primaryEffect += ' (PIERCE)';
              if (skill.bonusCondition === 'debuff_bonus') primaryEffect += ' (+50%)';
            } else if (skill.effect === 'evade') {
              primaryEffect = 'EVADE 1T';
            } else if (skill.effect === 'armor') {
              primaryEffect = `+${skill.effectValue || 30} ARM`;
            } else if (skill.effect === 'heal') {
              primaryEffect = `+${skill.effectValue || 20} HP`;
            } else if (skill.effect === 'empower') {
              primaryEffect = 'OVERDRIVE';
            } else if (skill.effect === 'stun') {
              primaryEffect = 'STUN 1T';
            } else {
              primaryEffect = 'TACTICAL';
            }

            // Resource Display
            let resourceLabel = '';
            if (cost > 0) {
              resourceLabel = `${cost}⚡`;
            } else if (skill.expGain) {
              resourceLabel = `+${skill.expGain}⚡`;
            } else {
              resourceLabel = 'FREE';
            }

            return (
              <button
                key={skill.id}
                id={`btn-skill-${skill.key.toLowerCase()}`}
                disabled={isTurnProcessing || isPaused}
                onClick={() => handleUseSkill(idx)}
                className={`relative min-h-[56px] xs:min-h-[62px] sm:min-h-[72px] landscape:min-h-[32px] landscape:h-8.5 p-1.5 xs:p-2 sm:p-2.5 landscape:p-0.5 rounded-lg sm:rounded-xl border transition-all text-left transform active:scale-95 flex flex-col justify-between cursor-pointer ${cardStyle} ${
                  idx === 6 ? 'col-span-3 landscape:col-span-1 min-h-[46px] xs:min-h-[50px] sm:min-h-[56px]' : 'col-span-1'
                }`}
              >
                {isUltimate ? (
                  <>
                    {/* Portrait Layout: Full-width Ultimate Banner */}
                    <div className="hidden portrait:flex items-center justify-between w-full h-full px-1.5 py-0.5">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <span className="font-['Press_Start_2P'] text-[7px] xs:text-[8px] sm:text-[9px] text-amber-300 bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-500/80 font-bold shrink-0">
                          ⭐ [U] ULTIMATE
                        </span>
                        <span className="font-['Press_Start_2P'] text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-yellow-200 font-bold truncate">
                          {skill.name.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 font-mono text-[7.5px] xs:text-[8.5px] sm:text-[9.5px]">
                        <span className="text-amber-300 font-bold">{primaryEffect}</span>
                        <span className={cost > 0 ? (canAfford ? 'text-amber-200 font-bold bg-amber-900/60 px-2 py-0.5 rounded border border-amber-500' : 'text-rose-400 font-bold bg-slate-900 px-2 py-0.5 rounded') : 'text-emerald-400 font-bold'}>
                          {resourceLabel}
                        </span>
                      </div>
                    </div>

                    {/* Landscape Layout: Ultra-Compact Column Card */}
                    <div className="flex portrait:hidden flex-col justify-between h-full w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className={`flex items-center gap-0.5 text-[5px] font-bold px-0.5 py-0 rounded border ${categoryBadgeStyle} shrink-0`}>
                          {categoryIcon}
                          <span className="text-[5px]">ULT</span>
                        </div>
                        <span className="font-['Press_Start_2P'] text-[5px] text-amber-300 bg-slate-950/80 px-0.5 py-0 rounded border border-amber-600/60 font-bold shrink-0">
                          U
                        </span>
                      </div>
                      <div className="my-0 leading-none">
                        <div className="font-['Press_Start_2P'] text-[5.5px] leading-tight text-amber-200 truncate">
                          {skill.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[5px] pt-0.2 border-t border-amber-700/50 font-mono">
                        <span className="font-bold text-amber-300 truncate max-w-[60%]">
                          {primaryEffect}
                        </span>
                        <span className={cost > 0 ? (canAfford ? 'text-amber-300 font-bold' : 'text-rose-400 font-bold') : 'text-emerald-400 font-bold'}>
                          {resourceLabel}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Region 1: TYPE & [KEY] */}
                    <div className="flex items-center justify-between w-full">
                      <div className={`flex items-center gap-1 sm:gap-1.5 text-[6px] xs:text-[7px] sm:text-[8px] landscape:text-[5px] font-bold px-1 py-0.2 landscape:py-0 rounded border ${categoryBadgeStyle} shrink-0`}>
                        {categoryIcon}
                        <span className="hidden xs:inline sm:inline landscape:hidden font-mono tracking-tight">{skill.category.slice(0, 4)}</span>
                      </div>
                      <span className="font-['Press_Start_2P'] text-[6.5px] xs:text-[7.5px] sm:text-[8px] landscape:text-[5px] text-slate-300 bg-slate-950/80 px-1 py-0.2 landscape:py-0 rounded border border-slate-700/60 font-bold shrink-0">
                        {skill.key}
                      </span>
                    </div>

                    {/* Region 2: SKILL NAME */}
                    <div className="my-0.5 landscape:my-0">
                      <div className="font-['Press_Start_2P'] text-[7.5px] xs:text-[8.5px] sm:text-[9px] landscape:text-[5.5px] leading-snug text-white truncate sm:line-clamp-2">
                        {skill.name}
                      </div>
                    </div>

                    {/* Region 3: DAMAGE / EFFECT & RESOURCE */}
                    <div className="flex items-center justify-between text-[7px] xs:text-[8px] sm:text-[8.5px] landscape:text-[5px] pt-0.5 landscape:pt-0 border-t border-slate-700/50 font-mono">
                      <span className="font-bold text-amber-300 truncate max-w-[60%]">
                        {primaryEffect}
                      </span>
                      <span className={cost > 0 ? (canAfford ? 'text-cyan-300 font-bold' : 'text-rose-400 font-bold') : 'text-emerald-400 font-bold'}>
                        {resourceLabel}
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* PAUSE MENU OVERLAY */}
      <AnimatePresence>
        {isPaused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 border-4 border-slate-700 rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl flex flex-col items-center">
              <h2 className="font-['Press_Start_2P'] text-xl sm:text-2xl text-cyan-400 mb-6 sm:mb-8 text-center drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">PAUSED</h2>
              
              <div className="flex flex-col w-full space-y-3 sm:space-y-4">
                <button
                  onClick={() => setIsPaused(false)}
                  className="w-full py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm sm:text-base rounded-2xl border-2 border-cyan-400 shadow-[0_4px_0_rgb(8,145,178)] active:shadow-none hover:translate-y-[2px] active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" fill="currentColor" /> RESUME
                </button>
                
                <button
                  onClick={() => {
                    setIsPaused(false);
                    onRestart();
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-2xl border-2 border-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> RESTART BATTLE
                </button>
                
                <button
                  onClick={() => {
                    setIsPaused(false);
                    onBackToMenu();
                  }}
                  className="w-full py-3 bg-slate-800 hover:bg-rose-900/50 text-slate-200 hover:text-rose-400 hover:border-rose-700 font-bold text-sm rounded-2xl border-2 border-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" /> QUIT TO MENU
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

