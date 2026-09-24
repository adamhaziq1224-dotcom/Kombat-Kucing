// Web Audio API Retro 8-bit/16-bit Sound Effects Engine

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function toggleAudioMute(): boolean {
  isMuted = !isMuted;
  return isMuted;
}

export function getAudioMuted(): boolean {
  return isMuted;
}

// 1. Menu Beep / Select
export function playSelectSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.setValueAtTime(880, now + 0.05);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}

// 2. Fight / Round start chime
export function playFightAnnounce(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [330, 440, 554, 659, 880];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now + i * 0.08);

    gain.gain.setValueAtTime(0.15, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.2);
  });
}

// 3. Normal Attack Punch / Kick (BAM!)
export function playPunchSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Noise buffer for punch impact
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(60, now + 0.1);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);

  // Low punch thump
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

  oscGain.gain.setValueAtTime(0.35, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

// 4. Fiery Blazing Combo Slash (Kombo Berapi Multi-hit!)
export function playFieryComboSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);

  // Rapid slashes (optimized to 3 energetic hits)
  for (let s = 0; s < 3; s++) {
    const t = now + s * 0.08;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450 + s * 200, t);
    osc.frequency.exponentialRampToValueAtTime(1300 + s * 150, t + 0.07);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Final punchy explosion roar
  const finalTime = now + 0.25;
  const oscFinal = ctx.createOscillator();
  const gainFinal = ctx.createGain();

  oscFinal.type = 'square';
  oscFinal.frequency.setValueAtTime(200, finalTime);
  oscFinal.frequency.exponentialRampToValueAtTime(45, finalTime + 0.3);

  gainFinal.gain.setValueAtTime(0.3, finalTime);
  gainFinal.gain.exponentialRampToValueAtTime(0.001, finalTime + 0.3);

  oscFinal.connect(gainFinal);
  gainFinal.connect(masterGain);

  oscFinal.start(finalTime);
  oscFinal.stop(finalTime + 0.3);

  setTimeout(() => {
    try {
      masterGain.disconnect();
    } catch {}
  }, 650);
}

// 5. Guard / Shield (Block)
export function playGuardSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.18);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.18);
}

// 6. Laser / Energy Zap (ZAP!)
export function playLaserSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(990, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

// 7. Fire Slash Sound
export function playFireSlashSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.linearRampToValueAtTime(850, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

// 8. Shadow Strike / Ninja Blade
export function playShadowStrikeSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  for (let i = 0; i < 2; i++) {
    const t = now + i * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200 - i * 300, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.08);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }
}

// 9. Thunder / Electric Shock
export function playThunderSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.setValueAtTime(720, now + 0.03);
  osc.frequency.setValueAtTime(240, now + 0.07);
  osc.frequency.setValueAtTime(960, now + 0.12);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.22);
}

// 10. Rocket Punch / Heavy Impact
export function playRocketPunchSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

// 11. Heal / Buff Chime
export function playHealSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [440, 554.37, 659.25, 880];
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now + i * 0.05);

    gain.gain.setValueAtTime(0.18, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.15);
  });
}

// 12. Explosion Sound
export function playExplosionSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
}

// Universal Skill Sound Dispatcher for ALL Skills
export function playSkillSound(skill: {
  type?: string;
  fx?: string;
  effect?: string;
  expCost?: number;
}): void {
  if (isMuted) return;

  if (skill.type === 'ultimate' || (skill.expCost && skill.expCost >= 3)) {
    playFieryComboSound();
  } else if (skill.effect === 'shield' || skill.type === 'tactical' || skill.effect === 'rage_boost') {
    if (skill.fx === 'healing' || skill.effect === 'heal') {
      playHealSound();
    } else {
      playGuardSound();
    }
  } else if (skill.fx === 'laser') {
    playLaserSound();
  } else if (skill.fx === 'thunder' || skill.effect === 'shock') {
    playThunderSound();
  } else if (skill.fx === 'shadow_strike') {
    playShadowStrikeSound();
  } else if (skill.fx === 'rocket_punch' || skill.effect === 'stun') {
    playRocketPunchSound();
  } else if (skill.fx === 'fire_slash') {
    playFireSlashSound();
  } else if (skill.fx === 'healing') {
    playHealSound();
  } else if (skill.fx === 'explosion') {
    playExplosionSound();
  } else {
    playPunchSound();
  }
}

// 7. K.O. Explosion (K.O.!)
export function playKoSound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Heavy blast
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(20, now + 0.6);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.6);
}

// 8. Victory Fanfare (KUCING MENANG!)
export function playVictorySound(): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { f: 523.25, d: 0.12 }, // C5
    { f: 523.25, d: 0.12 }, // C5
    { f: 523.25, d: 0.12 }, // C5
    { f: 659.25, d: 0.24 }, // E5
    { f: 783.99, d: 0.18 }, // G5
    { f: 1046.50, d: 0.5 } // C6
  ];

  let offset = 0;
  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(n.f, now + offset);

    gain.gain.setValueAtTime(0.2, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.001, now + offset + n.d);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + offset);
    osc.stop(now + offset + n.d);

    offset += n.d + 0.04;
  });
}

let bgmInterval: number | null = null;
let currentStep = 0;

export function playBGM(): void {
  if (isMuted) return;
  if (bgmInterval !== null) return; // Already playing

  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    220, 0, 220, 261.63, 0, 329.63, 261.63, 0,
    220, 0, 220, 329.63, 0, 392.00, 329.63, 0
  ];
  
  const tempo = 120;
  const stepDuration = 60 / tempo / 2; // 16th notes

  bgmInterval = window.setInterval(() => {
    if (isMuted) return;
    const freq = notes[currentStep % notes.length];
    if (freq > 0) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Bass line effect
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + stepDuration * 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + stepDuration);
    }
    currentStep++;
  }, stepDuration * 1000);
}

export function stopBGM(): void {
  if (bgmInterval !== null) {
    window.clearInterval(bgmInterval);
    bgmInterval = null;
  }
}
