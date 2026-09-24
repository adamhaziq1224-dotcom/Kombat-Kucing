// Esports Live Commentator Generator for Kombat Kucing: Cyber City

export function getIntroCommentary(playerName: string, enemyName: string, mapName: string): string {
  const intros = [
    `🔥 "WELCOME TO THE ${mapName.toUpperCase()} ARENA! Tonight's main event: ${playerName.toUpperCase()} faces off against ${enemyName.toUpperCase()}! The crowd is roaring!"`,
    `⚡ "CYBER CITY IS EXPLODING WITH EXCITEMENT! ${playerName.toUpperCase()} enters the ring to challenge ${enemyName.toUpperCase()}! Who will reign supreme tonight?!"`,
    `💥 "HIGH-VOLTAGE ENERGY AT ${mapName.toUpperCase()}! The esports cameras are locked on both fighters! ${playerName.toUpperCase()} vs ${enemyName.toUpperCase()}! FIGHT!"`
  ];
  return intros[Math.floor(Math.random() * intros.length)];
}

export function getPlayerAttackCommentary(
  playerName: string,
  enemyName: string,
  moveName: string,
  damage: number,
  isCrit: boolean
): string {
  if (isCrit) {
    const critLines = [
      `💥 CRITICAL HIT BY ${playerName.toUpperCase()}! ${moveName} completely shattered ${enemyName}'s guard! Massive ${damage} HP damage! The stadium is going wild!`,
      `⚡ INSANE PRECISION!! ${playerName.toUpperCase()} exploited a weak point with ${moveName}! A lethal ${damage} HP blow directly to the target!`,
      `🔥 PERFECT TIMING! ${playerName.toUpperCase()} landed a critical ${moveName}! ${damage} DAMAGE! ${enemyName} flies into the steel barrier!`
    ];
    return critLines[Math.floor(Math.random() * critLines.length)];
  }

  const normalLines = [
    `🥊 ${playerName.toUpperCase()} leaps with lightning speed and unleashes ${moveName}! ${damage} damage dealt to ${enemyName}! Clean execution!`,
    `⚔️ A sharp hit with ${moveName} from ${playerName.toUpperCase()}! ${enemyName} loses ${damage} HP! Pacing controlled perfectly!`,
    `🐾 WORLD-CLASS SPEED! ${playerName.toUpperCase()} rushes in with ${moveName}! BAM! ${damage} HP wiped off ${enemyName}'s health bar!`
  ];
  return normalLines[Math.floor(Math.random() * normalLines.length)];
}

export function getComboSpecialCommentary(
  playerName: string,
  enemyName: string,
  specialName: string,
  damage: number
): string {
  const specialLines = [
    `🔥🔥🔥 OH MY GOODNESS!! ${playerName.toUpperCase()} UNLEASHES ULTIMATE TECH: [${specialName.toUpperCase()}]!! NEON FLAMES LIGHT UP THE ARENA! ${damage} MASSIVE DAMAGE BLASTED ONTO ${enemyName}! K.O. MOMENT OF THE YEAR!`,
    `⚡💥 INCREDIBLE!! ULTIMATE FINISHER ACTIVATED! [${specialName.toUpperCase()}] shakes all of Cyber City! ${enemyName} takes an insane ${damage} HP hit! Absolute legendary play!`,
    `🌪️🔥 NO WAY OUT! ${playerName.toUpperCase()} launches into the air with a glowing aura! [${specialName.toUpperCase()}] explodes without mercy! ${damage} DEVASTATING DAMAGE!!`
  ];
  return specialLines[Math.floor(Math.random() * specialLines.length)];
}

export function getPlayerDefendCommentary(playerName: string): string {
  const defendLines = [
    `🛡️ ${playerName.toUpperCase()} deploys neon shield defense mode! Smart positioning absorbs incoming force while charging EXP!`,
    `🌀 Perfectly timed dodge duck! ${playerName.toUpperCase()} prepares for a fierce counterattack!`,
    `⚡ ${playerName.toUpperCase()} stands firm in the arena! Damage taken will be severely reduced!`
  ];
  return defendLines[Math.floor(Math.random() * defendLines.length)];
}

export function getEnemyAttackCommentary(
  enemyName: string,
  playerName: string,
  moveName: string,
  damage: number,
  isBlocked: boolean
): string {
  if (isBlocked) {
    return `🛡️ TIGHT DEFENSE! ${enemyName} strikes with ${moveName}, but ${playerName} successfully blocks the impact! Took only ${damage} reduced damage!`;
  }

  const enemyLines = [
    `🤖 ${enemyName.toUpperCase()} counters fiercely with ${moveName}! BAM!! ${playerName} gets knocked back for ${damage} HP!`,
    `⚡ WATCH OUT! ${enemyName.toUpperCase()} fires a counter strike with ${moveName}! ${damage} damage pierces through ${playerName}!`,
    `💥 FAST COUNTERATTACK! ${enemyName.toUpperCase()} connects with ${moveName} for ${damage} HP! Stay on high alert!`
  ];
  return enemyLines[Math.floor(Math.random() * enemyLines.length)];
}

export function getVictoryCommentary(winnerName: string, loserName: string): string {
  return `🏆 FIREWORKS ILLUMINATE THE CYBER CITY SKY!! ${winnerName.toUpperCase()} IS CROWNED UNDISPUTED CHAMPION AFTER DEFEATING ${loserName.toUpperCase()}!! THE CROWD GOES WILD!!`;
}

export function getLossCommentary(playerName: string): string {
  return `💀 K.O.! ${playerName.toUpperCase()} collapses on the steel floor... Battery depleted... Is this the end of the street champion's legend?`;
}

