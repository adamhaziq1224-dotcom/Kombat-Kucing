import React, { useState, useEffect } from 'react';
import { Character } from '../types';
import { getCharacterAppearance } from '../utils/skins';

interface PixelSpriteProps {
  character: Character;
  action: 'idle' | 'attack' | 'combo' | 'defend' | 'hit' | 'victory' | 'ko';
  isFlipped?: boolean;
  scale?: number;
  overrideSkinId?: string;
}

export const PixelSprite: React.FC<PixelSpriteProps> = ({
  character,
  action,
  isFlipped = false,
  scale = 1,
  overrideSkinId
}) => {
  // Real-time synchronization: listen to global skin change events so all mounted sprites update immediately
  const [, setRerender] = useState(0);
  useEffect(() => {
    const handleSkinChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ charId?: string; themeId?: string }>;
      if (!customEvent.detail || customEvent.detail.charId === character.id) {
        setRerender((prev) => prev + 1);
      }
    };
    window.addEventListener('kombat_kucing_skin_changed', handleSkinChange);
    return () => {
      window.removeEventListener('kombat_kucing_skin_changed', handleSkinChange);
    };
  }, [character.id]);

  // Central source of truth appearance computation
  const appearance = getCharacterAppearance(character.id, overrideSkinId || character.activeThemeId);
  const { skinId, palette: p, isDefault, glowColor, vfxAccent } = appearance;

  const isOyen = character.id === 'oyen';
  const isDog = character.id === 'mecha_dog';
  const isNinja = character.id === 'shadow_ninja';
  const isVolt = character.id === 'volt_alleycat';
  const isCyberPuss = character.id === 'cyber_puss_9000';
  const isBully = character.id === 'heavy_bully';
  const isSaber = character.id === 'saber_tooth_boss';
  const isBatuKong = character.id === 'batu_kong';
  const isPyra = character.id === 'pyra';
  const isZephyr = character.id === 'zephyr';
  const isVoltchi = character.id === 'voltchi';
  const isMossu = character.id === 'mossu';
  const isFlareo = character.id === 'flareo';
  const isAquabi = character.id === 'aquabi';
  const isVoltara = character.id === 'volt_ara';
  const isAerix = character.id === 'aerix';
  const isBouldo = character.id === 'bouldo';
  const isNoxie = character.id === 'noxie';
  const isFrosto = character.id === 'frosto';
  const isGearo = character.id === 'gearo';
  const isDracuro = character.id === 'dracuro';

  const isEmbercub = character.id === 'embercub';
  const isTidefin = character.id === 'tidefin';
  const isThornox = character.id === 'thornox';
  const isZappit = character.id === 'zappit';
  const isFrostbit = character.id === 'frostbit';
  const isGravox = character.id === 'gravox';
  const isLumina = character.id === 'lumina';
  const isTerrabun = character.id === 'terrabun';
  const isMystwing = character.id === 'mystwing';
  const isAquadrake = character.id === 'aquadrake';
  const isHoundBoss = character.id === 'cyber_hound_giant';
  const isMutantBoss = character.id === 'mutant_cat_acid';
  const hasSprite = isEmbercub || isTidefin || isThornox || isZappit || isFrostbit || isGravox || isLumina || isTerrabun || isMystwing || isAquadrake || isHoundBoss || isMutantBoss ||  isOyen || isDog || isNinja || isVolt || isCyberPuss || isBully || isSaber || isBatuKong || isPyra || isZephyr || isVoltchi || isMossu || isFlareo || isAquabi || isVoltara || isAerix || isBouldo || isNoxie || isFrosto || isGearo || isDracuro;


  // Determine dynamic animation classes
  let animationClass = 'animate-pulse';
  if (action === 'idle') animationClass = 'animate-bounce-subtle';
  if (action === 'attack') animationClass = isFlipped ? '-translate-x-12 scale-110' : 'translate-x-12 scale-110';
  if (action === 'combo') animationClass = isFlipped ? '-translate-x-16 scale-125' : 'translate-x-16 scale-125';
  if (action === 'defend') animationClass = 'scale-90 brightness-125';
  if (action === 'hit') animationClass = 'animate-hit-flash brightness-200 rotate-6';
  if (action === 'victory') animationClass = 'animate-bounce scale-110';
  if (action === 'ko') animationClass = 'rotate-90 translate-y-12 opacity-70 grayscale';

  const filterStyle =
    action === 'defend'
      ? `drop-shadow(0 0 8px ${glowColor})`
      : action === 'combo'
      ? `drop-shadow(0 0 14px ${vfxAccent})`
      : isDefault
      ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))'
      : `drop-shadow(0 0 8px ${glowColor})`;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ease-out will-change-transform select-none ${animationClass}`}
      style={{
        transform: `${isFlipped ? 'scaleX(-1)' : ''} scale(${scale})`,
        filter: filterStyle
      }}
    >
      {/* 1. OYEN (ORANGE CYBER CAT) */}
      {isOyen && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="110" rx="36" ry="7" fill="#000000" opacity="0.4" />
          <path d="M25 78 C15 70, 10 50, 20 40 C25 35, 30 42, 26 55 C22 66, 32 78, 38 82" stroke={p.primary} strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M19 41 C21 38, 26 40, 23 46" stroke={p.highlight} strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="36" y="55" width="48" height="42" rx="14" fill={p.primary} />
          <path d="M42 62 L52 62" stroke={p.dark} strokeWidth="4" strokeLinecap="round" />
          <path d="M40 72 L50 72" stroke={p.dark} strokeWidth="4" strokeLinecap="round" />
          <path d="M44 82 L54 82" stroke={p.dark} strokeWidth="4" strokeLinecap="round" />
          <path d="M58 64 C68 64, 76 72, 74 88 C70 94, 60 94, 56 88 Z" fill={p.secondary} />
          <rect x="38" y="88" width="14" height="22" rx="6" fill={p.primary} />
          <rect x="36" y="104" width="18" height="8" rx="4" fill={p.secondary} />
          <rect x="68" y="88" width="14" height="22" rx="6" fill={p.primary} />
          <rect x="66" y="104" width="18" height="8" rx="4" fill={p.secondary} />
          <path d="M48 52 C58 54, 78 52, 84 56 C78 64, 60 66, 48 60 Z" fill={p.accent} />
          <polygon points="46,58 36,70 48,64" fill={p.dark} />
          <circle cx="68" cy="40" r="24" fill={p.primary} />
          <polygon points="52,24 60,6 68,22" fill={p.dark} />
          <polygon points="56,22 60,12 64,22" fill={p.secondary} />
          <polygon points="76,22 84,6 92,24" fill={p.dark} />
          <polygon points="80,22 84,12 88,22" fill={p.secondary} />
          <ellipse cx="68" cy="46" rx="14" ry="9" fill={p.secondary} />
          <polygon points="66,42 70,42 68,45" fill="#f43f5e" />
          {action === 'hit' || action === 'ko' ? (
            <>
              <text x="56" y="40" fill="#000" fontSize="12" fontWeight="bold">✕</text>
              <text x="72" y="40" fill="#000" fontSize="12" fontWeight="bold">✕</text>
            </>
          ) : (
            <>
              <ellipse cx="58" cy="36" rx="5" ry="7" fill={p.eye} />
              <circle cx="58" cy="36" r="2" fill="#ecfeff" />
              <ellipse cx="78" cy="36" rx="5" ry="7" fill={p.eye} />
              <circle cx="78" cy="36" r="2" fill="#ecfeff" />
              <path d="M52 30 L64 34" stroke={p.dark} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M84 30 L72 34" stroke={p.dark} strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
          <path d="M48 44 L36 42" stroke={p.highlight} strokeWidth="2" />
          <path d="M48 48 L36 50" stroke={p.highlight} strokeWidth="2" />
          <path d="M88 44 L100 42" stroke={p.highlight} strokeWidth="2" />
          <path d="M88 48 L100 50" stroke={p.highlight} strokeWidth="2" />
          {action === 'attack' || action === 'combo' ? (
            <g className="animate-pulse">
              <path d="M78 62 L105 50" stroke={p.primary} strokeWidth="10" strokeLinecap="round" />
              <path d="M102 44 L118 42" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
              <path d="M104 50 L122 50" stroke={p.highlight} strokeWidth="4.5" strokeLinecap="round" />
              <path d="M102 56 L118 58" stroke={p.accent} strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <circle cx="50" cy="62" r="7" fill={p.secondary} stroke={p.primary} strokeWidth="3" />
              <circle cx="82" cy="64" r="7" fill={p.secondary} stroke={p.primary} strokeWidth="3" />
            </g>
          )}
        </svg>
      )}

      {/* 2. MECHA-DOG TITAN */}
      {isDog && (
        <svg viewBox="0 0 140 120" className="w-40 h-36 md:w-56 md:h-48 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="70" cy="110" rx="44" ry="8" fill="#000000" opacity="0.45" />
          <rect x="52" y="32" width="22" height="18" rx="4" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <circle cx="63" cy="28" r="6" fill={p.highlight} className="animate-ping opacity-75" />
          <circle cx="63" cy="28" r="4" fill={p.highlight} />
          <path d="M58 24 L63 20 L68 25" stroke={p.accent} strokeWidth="2" fill="none" />
          <path d="M32 70 L22 62 L18 48 L22 42" stroke={p.accent} strokeWidth="7" strokeLinecap="square" fill="none" />
          <circle cx="22" cy="42" r="5" fill={p.highlight} />
          <rect x="36" y="50" width="60" height="42" rx="10" fill={p.primary} stroke={p.accent} strokeWidth="3" />
          <rect x="42" y="56" width="22" height="14" fill={p.secondary} rx="2" />
          <rect x="68" y="56" width="22" height="14" fill={p.secondary} rx="2" />
          <circle cx="45" cy="60" r="1.5" fill={p.highlight} />
          <circle cx="61" cy="60" r="1.5" fill={p.highlight} />
          <circle cx="71" cy="60" r="1.5" fill={p.highlight} />
          <circle cx="87" cy="60" r="1.5" fill={p.highlight} />
          <rect x="44" y="74" width="44" height="8" rx="2" fill={p.dark} />
          <line x1="50" y1="74" x2="50" y2="82" stroke={p.accent} strokeWidth="2" />
          <line x1="58" y1="74" x2="58" y2="82" stroke={p.accent} strokeWidth="2" />
          <line x1="66" y1="74" x2="66" y2="82" stroke={p.accent} strokeWidth="2" />
          <line x1="74" y1="74" x2="74" y2="82" stroke={p.accent} strokeWidth="2" />
          <line x1="82" y1="74" x2="82" y2="82" stroke={p.accent} strokeWidth="2" />
          <rect x="38" y="86" width="12" height="24" rx="4" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
          <rect x="34" y="104" width="18" height="8" rx="3" fill={p.highlight} />
          <rect x="54" y="86" width="12" height="24" rx="4" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
          <rect x="50" y="104" width="18" height="8" rx="3" fill={p.highlight} />
          <rect x="74" y="86" width="14" height="24" rx="4" fill={p.primary} stroke={p.accent} strokeWidth="2" />
          <rect x="70" y="104" width="20" height="8" rx="3" fill={p.highlight} />
          <rect x="92" y="86" width="14" height="24" rx="4" fill={p.primary} stroke={p.accent} strokeWidth="2" />
          <rect x="88" y="104" width="20" height="8" rx="3" fill={p.highlight} />
          <path d="M84 46 L108 44 L124 54 L126 66 L104 74 L84 66 Z" fill={p.primary} stroke={p.accent} strokeWidth="3" />
          <polygon points="104,74 122,68 120,78 106,80" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
          <polygon points="108,72 112,68 116,72 120,68 122,72" fill="#e2e8f0" />
          <polygon points="86,44 88,24 96,38" fill={p.accent} stroke={p.dark} strokeWidth="2" />
          <polygon points="98,42 102,26 108,38" fill={p.accent} stroke={p.dark} strokeWidth="2" />
          {action === 'hit' || action === 'ko' ? (
            <text x="100" y="58" fill="#f87171" fontSize="14" fontWeight="bold">✕</text>
          ) : (
            <>
              <polygon points="98,50 116,48 114,56 98,56" fill={p.eye} className="animate-pulse" />
              <line x1="100" y1="53" x2="114" y2="51" stroke={p.highlight} strokeWidth="2" />
            </>
          )}
          {(action === 'attack' || action === 'combo') && (
            <g>
              <circle cx="128" cy="62" r="10" fill={p.accent} className="animate-ping opacity-80" />
              <line x1="126" y1="62" x2="145" y2="62" stroke={p.eye} strokeWidth="6" strokeLinecap="round" />
              <line x1="128" y1="62" x2="148" y2="62" stroke={p.highlight} strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </svg>
      )}

      {/* 3. SHADOW NINJA */}
      {isNinja && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="110" rx="34" ry="7" fill="#000000" opacity="0.6" />
          <path d="M32 50 C18 42, 10 28, 4 36 C-2 44, 12 58, 26 62 Z" fill={p.accent} className="animate-pulse" />
          <path d="M26 80 C16 70, 14 50, 22 42 C26 38, 30 44, 26 55 C22 66, 32 78, 38 82" stroke={p.dark} strokeWidth="7" strokeLinecap="round" fill="none" />
          <rect x="36" y="55" width="48" height="42" rx="12" fill={p.primary} stroke={p.dark} strokeWidth="2" />
          <path d="M42 62 L78 92" stroke={p.accent} strokeWidth="3" strokeLinecap="round" />
          <path d="M78 62 L42 92" stroke={p.accent} strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="77" r="4" fill={p.highlight} className="animate-pulse" />
          <rect x="38" y="88" width="14" height="22" rx="5" fill={p.primary} />
          <rect x="36" y="104" width="18" height="8" rx="3" fill={p.secondary} />
          <rect x="68" y="88" width="14" height="22" rx="5" fill={p.primary} />
          <rect x="66" y="104" width="18" height="8" rx="3" fill={p.secondary} />
          <circle cx="68" cy="40" r="24" fill={p.primary} stroke={p.dark} strokeWidth="2" />
          <polygon points="50,24 58,4 66,22" fill={p.dark} />
          <polygon points="54,20 58,10 62,20" fill={p.accent} />
          <polygon points="78,22 86,4 94,24" fill={p.dark} />
          <polygon points="82,20 86,10 90,20" fill={p.accent} />
          <path d="M50 44 C58 54, 78 54, 86 44 L84 62 C78 66, 58 66, 52 62 Z" fill={p.dark} stroke={p.accent} strokeWidth="1.5" />
          {action === 'hit' || action === 'ko' ? (
            <>
              <text x="56" y="38" fill={p.eye} fontSize="12" fontWeight="bold">✕</text>
              <text x="74" y="38" fill={p.eye} fontSize="12" fontWeight="bold">✕</text>
            </>
          ) : (
            <>
              <polygon points="54,34 66,36 64,40 52,38" fill={p.eye} className="animate-pulse" />
              <polygon points="72,36 84,34 86,38 74,40" fill={p.eye} className="animate-pulse" />
              <line x1="58" y1="34" x2="60" y2="40" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="78" y1="34" x2="80" y2="40" stroke="#ffffff" strokeWidth="1.5" />
            </>
          )}
          {(action === 'attack' || action === 'combo') ? (
            <g>
              <path d="M78 58 L108 42" stroke={p.dark} strokeWidth="9" strokeLinecap="round" />
              <polygon points="106,34 116,42 106,50 96,42" fill={p.accent} className="animate-spin-slow" />
              <circle cx="106" cy="42" r="3" fill="#ffffff" />
            </g>
          ) : (
            <g>
              <circle cx="50" cy="62" r="6" fill={p.dark} stroke={p.accent} strokeWidth="2" />
              <circle cx="84" cy="62" r="6" fill={p.dark} stroke={p.accent} strokeWidth="2" />
            </g>
          )}
        </svg>
      )}

      {/* 4. VOLT ALLEYCAT */}
      {isVolt && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="110" rx="36" ry="7" fill="#000000" opacity="0.4" />
          <path d="M25 80 L12 65 L24 55 L8 40 L22 35" stroke={p.accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-pulse" />
          <rect x="30" y="58" width="12" height="20" rx="3" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <rect x="33" y="54" width="6" height="4" fill={p.highlight} />
          <rect x="38" y="55" width="46" height="42" rx="14" fill={p.primary} />
          <path d="M44 64 L54 64" stroke={p.dark} strokeWidth="4" strokeLinecap="round" />
          <path d="M42 74 L52 74" stroke={p.dark} strokeWidth="4" strokeLinecap="round" />
          <polygon points="61,64 67,64 59,76 69,76 57,90 61,78 55,78" fill={p.accent} className="animate-pulse" />
          <rect x="40" y="88" width="13" height="22" rx="5" fill={p.dark} />
          <rect x="38" y="104" width="17" height="8" rx="4" fill={p.secondary} />
          <rect x="68" y="88" width="13" height="22" rx="5" fill={p.dark} />
          <rect x="66" y="104" width="17" height="8" rx="4" fill={p.secondary} />
          <circle cx="68" cy="40" r="23" fill={p.primary} />
          <polygon points="50,22 58,2 66,20" fill={p.dark} />
          <polygon points="54,20 58,8 62,20" fill={p.secondary} />
          <polygon points="76,20 84,2 92,22" fill={p.dark} />
          <polygon points="80,20 84,8 88,20" fill={p.secondary} />
          {action === 'hit' || action === 'ko' ? (
            <text x="58" y="42" fill="#ef4444" fontSize="14" fontWeight="bold">✕ ✕</text>
          ) : (
            <>
              <ellipse cx="58" cy="38" rx="6" ry="7" fill={p.eye} className="animate-pulse" />
              <circle cx="58" cy="38" r="2" fill="#ffffff" />
              <ellipse cx="78" cy="38" rx="6" ry="7" fill={p.eye} className="animate-pulse" />
              <circle cx="78" cy="38" r="2" fill="#ffffff" />
            </>
          )}
          {(action === 'attack' || action === 'combo') ? (
            <g>
              <path d="M78 62 L108 48" stroke={p.primary} strokeWidth="10" strokeLinecap="round" />
              <polygon points="106,38 118,48 106,58 112,48" fill={p.accent} className="animate-ping" />
            </g>
          ) : (
            <g>
              <circle cx="52" cy="64" r="7" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
              <circle cx="82" cy="64" r="7" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
            </g>
          )}
        </svg>
      )}

      {/* 5. CYBER-PUSS 9000 (ANDROID FELINE) */}
      {isCyberPuss && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="110" rx="36" ry="7" fill="#000000" opacity="0.4" />
          <path d="M26 80 C16 70, 14 50, 22 40 C26 36, 30 42, 26 55" stroke={p.accent} strokeWidth="6" strokeDasharray="4 2" fill="none" />
          <circle cx="22" cy="38" r="6" fill={p.highlight} className="animate-ping" />
          <rect x="36" y="55" width="48" height="42" rx="12" fill={p.primary} stroke={p.dark} strokeWidth="2.5" />
          <rect x="44" y="62" width="32" height="18" rx="4" fill={p.dark} />
          <circle cx="60" cy="71" r="5" fill={p.accent} className="animate-pulse" />
          <rect x="38" y="88" width="14" height="22" rx="5" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
          <rect x="36" y="104" width="18" height="8" rx="3" fill={p.accent} />
          <rect x="68" y="88" width="14" height="22" rx="5" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
          <rect x="66" y="104" width="18" height="8" rx="3" fill={p.accent} />
          <circle cx="68" cy="40" r="24" fill={p.primary} stroke={p.dark} strokeWidth="2.5" />
          <polygon points="52,22 60,4 68,20" fill={p.dark} />
          <polygon points="76,20 84,4 92,22" fill={p.accent} />
          {action === 'hit' || action === 'ko' ? (
            <rect x="50" y="32" width="36" height="14" rx="4" fill="#ef4444" />
          ) : (
            <>
              <rect x="50" y="32" width="36" height="14" rx="4" fill={p.eye} className="animate-pulse" />
              <line x1="52" y1="39" x2="84" y2="39" stroke={p.highlight} strokeWidth="2" />
            </>
          )}
          {(action === 'attack' || action === 'combo') ? (
            <g>
              <rect x="78" y="54" width="32" height="12" rx="4" fill={p.accent} />
              <circle cx="112" cy="60" r="8" fill={p.highlight} className="animate-ping" />
            </g>
          ) : (
            <g>
              <circle cx="50" cy="64" r="6" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
              <circle cx="84" cy="64" r="6" fill={p.secondary} stroke={p.dark} strokeWidth="2" />
            </g>
          )}
        </svg>
      )}

      {/* 6. HEAVY BULLY DOG */}
      {isBully && (
        <svg viewBox="0 0 130 120" className="w-40 h-36 md:w-52 md:h-48 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="110" rx="44" ry="8" fill="#000000" opacity="0.5" />
          <rect x="30" y="40" width="18" height="18" rx="3" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <circle cx="35" cy="46" r="2.5" fill={p.highlight} />
          <circle cx="43" cy="46" r="2.5" fill={p.highlight} />
          <circle cx="35" cy="52" r="2.5" fill={p.highlight} />
          <circle cx="43" cy="52" r="2.5" fill={p.highlight} />
          <rect x="38" y="50" width="56" height="44" rx="10" fill={p.primary} stroke={p.accent} strokeWidth="3" />
          <path d="M42 66 L90 66" stroke={p.dark} strokeWidth="4" />
          <rect x="42" y="46" width="48" height="8" rx="2" fill={p.dark} />
          <polygon points="46,46 48,40 50,46" fill={p.highlight} />
          <polygon points="56,46 58,40 60,46" fill={p.highlight} />
          <polygon points="66,46 68,40 70,46" fill={p.highlight} />
          <polygon points="76,46 78,40 80,46" fill={p.highlight} />
          <rect x="42" y="88" width="16" height="22" rx="4" fill={p.secondary} />
          <rect x="38" y="104" width="22" height="8" rx="3" fill={p.accent} />
          <rect x="74" y="88" width="16" height="22" rx="4" fill={p.secondary} />
          <rect x="70" y="104" width="22" height="8" rx="3" fill={p.accent} />
          <path d="M70 32 L98 32 L108 48 L104 68 L72 68 Z" fill={p.primary} stroke={p.accent} strokeWidth="2.5" />
          <polygon points="72,28 76,14 84,28" fill={p.dark} />
          <polygon points="88,28 92,14 100,28" fill={p.dark} />
          {action === 'hit' || action === 'ko' ? (
            <text x="80" y="48" fill="#ef4444" fontSize="14" fontWeight="bold">✕</text>
          ) : (
            <>
              <ellipse cx="80" cy="44" rx="5" ry="6" fill={p.eye} />
              <circle cx="80" cy="44" r="2" fill="#000" />
              <line x1="74" y1="36" x2="84" y2="52" stroke={p.accent} strokeWidth="2" />
            </>
          )}
          {(action === 'attack' || action === 'combo') ? (
            <g>
              <circle cx="112" cy="56" r="14" fill={p.accent} stroke={p.highlight} strokeWidth="3" />
              <path d="M102 56 L122 56" stroke="#ffffff" strokeWidth="3" />
            </g>
          ) : (
            <g>
              <circle cx="56" cy="68" r="9" fill={p.accent} stroke={p.dark} strokeWidth="2" />
              <circle cx="92" cy="68" r="9" fill={p.accent} stroke={p.dark} strokeWidth="2" />
            </g>
          )}
        </svg>
      )}

      {/* 7. SABER TOOTH APEX */}
      {isSaber && (
        <svg viewBox="0 0 140 130" className="w-44 h-40 md:w-56 md:h-52 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="70" cy="118" rx="46" ry="9" fill="#000000" opacity="0.6" />
          <path d="M20 30 L45 55 L15 65 L45 75" stroke={p.accent} strokeWidth="5" fill="none" className="animate-pulse" />
          <rect x="36" y="55" width="60" height="48" rx="14" fill={p.primary} stroke={p.accent} strokeWidth="3" />
          <path d="M42 66 L90 66" stroke={p.dark} strokeWidth="4" />
          <polygon points="66,68 74,68 70,86" fill={p.highlight} className="animate-ping" />
          <rect x="40" y="96" width="16" height="24" rx="5" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <rect x="36" y="112" width="22" height="9" rx="4" fill={p.highlight} />
          <rect x="74" y="96" width="16" height="24" rx="5" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <rect x="70" y="112" width="22" height="9" rx="4" fill={p.highlight} />
          <path d="M72 36 L110 36 L124 52 L116 78 L76 78 Z" fill={p.secondary} stroke={p.highlight} strokeWidth="3" />
          <polygon points="76,34 84,14 92,28 100,10 108,34" fill={p.highlight} />
          <polygon points="102,68 108,94 114,68" fill={p.accent} className="animate-pulse" />
          <polygon points="92,68 96,90 100,68" fill={p.accent} className="animate-pulse" />
          {action === 'hit' || action === 'ko' ? (
            <text x="88" y="52" fill="#ef4444" fontSize="16" fontWeight="bold">✕</text>
          ) : (
            <>
              <polygon points="86,46 104,44 100,54 86,52" fill={p.eye} className="animate-pulse" />
              <line x1="88" y1="49" x2="102" y2="48" stroke={p.highlight} strokeWidth="2" />
            </>
          )}
          {(action === 'attack' || action === 'combo') ? (
            <g>
              <path d="M88 70 L128 58" stroke={p.accent} strokeWidth="12" strokeLinecap="round" />
              <polygon points="124,46 138,58 124,70" fill={p.highlight} className="animate-ping" />
            </g>
          ) : (
            <g>
              <circle cx="56" cy="74" r="8" fill={p.highlight} stroke={p.accent} strokeWidth="2" />
              <circle cx="92" cy="74" r="8" fill={p.highlight} stroke={p.accent} strokeWidth="2" />
            </g>
          )}
        </svg>
      )}

      {/* 8. BATU-KONG */}
      {isBatuKong && (
        <svg viewBox="0 0 140 140" className="w-40 h-40 md:w-52 md:h-52 drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="70" cy="126" rx="46" ry="10" fill="#000000" opacity="0.45" />
          <rect x="34" y="48" width="72" height="58" rx="16" fill={p.primary} stroke={p.dark} strokeWidth="3" />
          <path d="M42 54 L68 54 L66 84 L46 84 Z" fill={p.secondary} opacity="0.9" />
          <path d="M72 54 L98 54 L94 84 L74 84 Z" fill={p.secondary} opacity="0.9" />
          <circle cx="70" cy="68" r="7" fill={p.accent} className="animate-pulse" />
          <circle cx="70" cy="68" r="3" fill={p.highlight} />
          <rect x="38" y="98" width="24" height="26" rx="8" fill={p.dark} />
          <rect x="78" y="98" width="24" height="26" rx="8" fill={p.dark} />
          <rect x="32" y="116" width="32" height="10" rx="5" fill={p.secondary} />
          <rect x="76" y="116" width="32" height="10" rx="5" fill={p.secondary} />
          <circle cx="28" cy="56" r="18" fill={p.primary} stroke={p.dark} strokeWidth="2" />
          <circle cx="112" cy="56" r="18" fill={p.primary} stroke={p.dark} strokeWidth="2" />
          {action === 'attack' || action === 'combo' ? (
            <g className="animate-bounce">
              <rect x="88" y="42" width="36" height="34" rx="10" fill={p.accent} stroke={p.dark} strokeWidth="3" />
              <rect x="100" y="52" width="28" height="14" rx="4" fill={p.highlight} />
              <circle cx="120" cy="59" r="6" fill="#ffffff" className="animate-ping" />
            </g>
          ) : (
            <g>
              <rect x="14" y="66" width="26" height="36" rx="8" fill={p.dark} stroke="#1c1917" strokeWidth="2" />
              <rect x="100" y="66" width="26" height="36" rx="8" fill={p.dark} stroke="#1c1917" strokeWidth="2" />
              <circle cx="20" cy="100" r="3" fill={p.accent} />
              <circle cx="26" cy="100" r="3" fill={p.accent} />
              <circle cx="106" cy="100" r="3" fill={p.accent} />
              <circle cx="112" cy="100" r="3" fill={p.accent} />
            </g>
          )}
          <rect x="46" y="18" width="48" height="36" rx="12" fill={p.primary} stroke={p.dark} strokeWidth="3" />
          <path d="M44 26 L96 26 L88 34 L52 34 Z" fill={p.dark} />
          {action === 'hit' || action === 'ko' ? (
            <text x="56" y="42" fill="#ef4444" fontSize="16" fontWeight="bold">✕  ✕</text>
          ) : (
            <g>
              <rect x="52" y="34" width="36" height="8" rx="3" fill={p.dark} />
              <rect x="54" y="36" width="14" height="4" rx="2" fill={p.eye} className="animate-pulse" />
              <rect x="72" y="36" width="14" height="4" rx="2" fill={p.eye} className="animate-pulse" />
            </g>
          )}
          <polygon points="58,50 62,44 66,50" fill="#fafaf9" />
          <polygon points="74,50 78,44 82,50" fill="#fafaf9" />
        </svg>
      )}

      {/* 9. PYRA (VOLCANIC CYBER KITSUNE) */}
      {isPyra && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="118" rx="38" ry="8" fill="#000000" opacity="0.4" />
          <g className="animate-pulse">
            <path d="M36 82 C14 74, 8 48, 22 34 C30 26, 36 38, 32 54 Z" fill={p.primary} />
            <path d="M26 84 C4 66, 6 36, 26 22 C34 16, 36 28, 30 46 Z" fill={p.accent} opacity="0.8" />
            <path d="M42 88 C26 78, 20 54, 30 42 C36 36, 40 46, 36 60 Z" fill={p.highlight} opacity="0.7" />
          </g>
          <rect x="44" y="58" width="42" height="46" rx="14" fill={p.primary} />
          <path d="M54 66 C65 66, 75 74, 73 92 C68 98, 58 98, 53 92 Z" fill={p.secondary} />
          <line x1="50" y1="76" x2="60" y2="76" stroke={p.highlight} strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="84" x2="58" y2="84" stroke={p.highlight} strokeWidth="3" strokeLinecap="round" />
          <rect x="46" y="98" width="12" height="20" rx="5" fill={p.dark} />
          <rect x="44" y="112" width="16" height="7" rx="3" fill={p.secondary} />
          <rect x="72" y="98" width="12" height="20" rx="5" fill={p.dark} />
          <rect x="70" y="112" width="16" height="7" rx="3" fill={p.secondary} />
          <circle cx="68" cy="42" r="22" fill={p.primary} />
          <polygon points="50,26 58,4 68,22" fill={p.dark} />
          <polygon points="54,20 58,8 64,20" fill={p.highlight} className="animate-pulse" />
          <polygon points="76,22 86,4 94,26" fill={p.dark} />
          <polygon points="80,20 86,8 90,20" fill={p.highlight} className="animate-pulse" />
          <ellipse cx="68" cy="48" rx="13" ry="8" fill={p.secondary} />
          <polygon points="66,45 70,45 68,48" fill="#dc2626" />
          {action === 'hit' || action === 'ko' ? (
            <text x="56" y="42" fill="#000" fontSize="12" fontWeight="bold">✕  ✕</text>
          ) : (
            <>
              <ellipse cx="58" cy="38" rx="5" ry="7" fill={p.eye} />
              <circle cx="58" cy="38" r="2" fill="#ffffff" />
              <ellipse cx="78" cy="38" rx="5" ry="7" fill={p.eye} />
              <circle cx="78" cy="38" r="2" fill="#ffffff" />
            </>
          )}
          <circle cx="98" cy="42" r="5" fill={p.accent} className="animate-ping" opacity="0.6" />
          <circle cx="94" cy="62" r="4" fill={p.highlight} className="animate-bounce" />
        </svg>
      )}

      {/* 10. ZEPHYR (STRATOSPHERIC WIND SPIRIT) */}
      {isZephyr && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="36" ry="7" fill="#000000" opacity="0.35" />
          <ellipse cx="65" cy="65" rx="52" ry="24" fill="none" stroke={p.accent} strokeWidth="2" strokeDasharray="8 6" opacity="0.5" className="animate-spin" />
          <path d="M48 54 C48 38, 82 38, 82 54 L78 96 C78 106, 52 106, 52 96 Z" fill={p.primary} />
          <path d="M56 60 C56 50, 74 50, 74 60 L70 90 C70 96, 60 96, 60 90 Z" fill={p.secondary} />
          <path d="M48 62 C26 50, 10 60, 4 78 C20 76, 38 72, 48 74 Z" fill={p.dark} />
          <path d="M12 70 C24 66, 36 64, 46 66" stroke={p.accent} strokeWidth="2" />
          <path d="M82 62 C104 50, 120 60, 126 78 C110 76, 92 72, 82 74 Z" fill={p.dark} />
          <path d="M118 70 C106 66, 94 64, 84 66" stroke={p.accent} strokeWidth="2" />
          <polygon points="56,98 65,116 74,98" fill={p.primary} />
          <polygon points="60,98 65,112 70,98" fill={p.accent} />
          <circle cx="65" cy="38" r="18" fill={p.primary} />
          <polygon points="58,22 65,8 72,22" fill={p.accent} />
          <polygon points="62,20 65,12 68,20" fill={p.highlight} />
          {action === 'hit' || action === 'ko' ? (
            <text x="54" y="42" fill="#ef4444" fontSize="14" fontWeight="bold">✕  ✕</text>
          ) : (
            <g>
              <rect x="50" y="32" width="30" height="12" rx="4" fill="#0f172a" />
              <rect x="52" y="34" width="11" height="8" rx="2" fill={p.eye} className="animate-pulse" />
              <rect x="67" y="34" width="11" height="8" rx="2" fill={p.eye} className="animate-pulse" />
              <line x1="63" y1="38" x2="67" y2="38" stroke="#0f172a" strokeWidth="2" />
            </g>
          )}
          <polygon points="61,46 69,46 65,52" fill="#facc15" />
        </svg>
      )}

      {/* 11. VOLTCHI (HIGH-VOLTAGE CYBER RODENT) */}
      {isVoltchi && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="110" rx="34" ry="7" fill="#000000" opacity="0.4" />
          <path d="M30 85 L20 70 L28 68 L16 50 L26 48 L14 26" stroke={p.accent} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" className="animate-pulse" />
          <path d="M30 85 L20 70 L28 68 L16 50 L26 48 L14 26" stroke={p.highlight} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="40" y="58" width="44" height="38" rx="14" fill={p.primary} />
          <ellipse cx="62" cy="76" rx="12" ry="14" fill={p.secondary} />
          <rect x="42" y="94" width="14" height="12" rx="4" fill={p.dark} />
          <rect x="68" y="94" width="14" height="12" rx="4" fill={p.dark} />
          <circle cx="62" cy="44" r="22" fill={p.primary} />
          <polygon points="46,26 36,4 48,16 42,2" fill={p.dark} />
          <polygon points="45,22 38,8 46,16" fill="#1e1b4b" />
          <polygon points="78,26 88,4 76,16 82,2" fill={p.dark} />
          <polygon points="79,22 86,8 78,16" fill="#1e1b4b" />
          <circle cx="48" cy="50" r="5" fill={p.accent} className="animate-pulse" />
          <circle cx="76" cy="50" r="5" fill={p.accent} className="animate-pulse" />
          {action === 'hit' || action === 'ko' ? (
            <text x="52" y="44" fill="#000" fontSize="12" fontWeight="bold">✕  ✕</text>
          ) : (
            <>
              <circle cx="53" cy="40" r="4.5" fill={p.eye} />
              <circle cx="54" cy="39" r="1.5" fill="#ffffff" />
              <circle cx="71" cy="40" r="4.5" fill={p.eye} />
              <circle cx="72" cy="39" r="1.5" fill="#ffffff" />
            </>
          )}
          <polygon points="61,46 63,46 62,48" fill="#451a03" />
          <circle cx="86" cy="32" r="3" fill={p.highlight} className="animate-ping" />
        </svg>
      )}

      {/* 12. MOSSU (NATURE TANK / REGENERATION) */}
      {isMossu && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="38" ry="7" fill="#000000" opacity="0.4" />
          <ellipse cx="58" cy="74" rx="34" ry="24" fill={p.dark} />
          <ellipse cx="58" cy="72" rx="30" ry="20" fill={p.primary} />
          <circle cx="48" cy="68" r="8" fill={p.accent} opacity="0.7" />
          <circle cx="68" cy="68" r="8" fill={p.accent} opacity="0.7" />
          <circle cx="58" cy="78" r="7" fill={p.highlight} opacity="0.7" />
          <rect x="30" y="88" width="14" height="14" rx="4" fill={p.dark} />
          <rect x="74" y="88" width="14" height="14" rx="4" fill={p.dark} />
          <circle cx="60" cy="46" r="18" fill={p.primary} />
          <path d="M60 28 C54 18, 48 20, 52 26 C56 30, 60 28, 60 28 Z" fill={p.highlight} />
          <path d="M60 28 C66 18, 72 20, 68 26 C64 30, 60 28, 60 28 Z" fill={p.accent} />
          <circle cx="60" cy="28" r="3" fill="#fbbf24" />
          <circle cx="52" cy="45" r="4" fill="#022c22" />
          <circle cx="53" cy="44" r="1.5" fill={p.eye} />
          <circle cx="68" cy="45" r="4" fill="#022c22" />
          <circle cx="69" cy="44" r="1.5" fill={p.eye} />
          <path d="M44 58 Q60 66 76 58" stroke={p.highlight} strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {/* 13. FLAREO (FIRE BURST FOX) */}
      {isFlareo && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000000" opacity="0.4" />
          <path d="M30 76 C10 60, 4 34, 18 24 C28 16, 38 28, 32 46 C28 58, 40 70, 48 76 Z" fill={p.accent} />
          <path d="M26 68 C14 54, 10 36, 20 28 C26 22, 34 32, 28 44 Z" fill={p.primary} />
          <circle cx="20" cy="26" r="3" fill={p.highlight} className="animate-ping" />
          <rect x="42" y="62" width="36" height="34" rx="14" fill={p.primary} />
          <ellipse cx="60" cy="74" rx="12" ry="16" fill={p.secondary} />
          <rect x="44" y="92" width="12" height="14" rx="4" fill={p.dark} />
          <rect x="64" y="92" width="12" height="14" rx="4" fill={p.dark} />
          <polygon points="46,38 36,12 56,26" fill={p.primary} />
          <polygon points="48,34 40,18 54,26" fill={p.secondary} />
          <polygon points="74,38 84,12 64,26" fill={p.primary} />
          <polygon points="72,34 80,18 66,26" fill={p.secondary} />
          <circle cx="60" cy="46" r="18" fill={p.primary} />
          <polygon points="54,48 66,48 60,56" fill={p.secondary} />
          <circle cx="60" cy="50" r="2.5" fill="#451a03" />
          <ellipse cx="52" cy="42" rx="3.5" ry="4.5" fill="#451a03" />
          <circle cx="53" cy="41" r="1.5" fill={p.eye} />
          <ellipse cx="68" cy="42" rx="3.5" ry="4.5" fill="#451a03" />
          <circle cx="69" cy="41" r="1.5" fill={p.eye} />
        </svg>
      )}

      {/* 14. AQUABI (WATER AXOLOTL / OTTER) */}
      {isAquabi && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000000" opacity="0.4" />
          <path d="M36 78 C20 74, 12 60, 16 48 C22 46, 32 58, 42 70 Z" fill={p.dark} />
          <path d="M32 74 C22 68, 16 58, 20 50 Z" fill={p.accent} />
          <ellipse cx="60" cy="74" rx="22" ry="24" fill={p.primary} />
          <ellipse cx="60" cy="76" rx="14" ry="16" fill={p.secondary} />
          <rect x="42" y="94" width="12" height="12" rx="4" fill={p.dark} />
          <rect x="66" y="94" width="12" height="12" rx="4" fill={p.dark} />
          <circle cx="60" cy="46" r="20" fill={p.primary} />
          <path d="M40 40 Q26 34 32 46 Q26 50 38 52" fill={p.accent} />
          <path d="M80 40 Q94 34 88 46 Q94 50 82 52" fill={p.accent} />
          <circle cx="52" cy="44" r="5" fill={p.dark} />
          <circle cx="53" cy="42" r="2" fill={p.eye} />
          <circle cx="68" cy="44" r="5" fill={p.dark} />
          <circle cx="69" cy="42" r="2" fill={p.eye} />
          <path d="M56 52 Q60 56 64 52" stroke={p.dark} strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {/* 15. VOLT ARA (ELECTRIC SPEED HARE) */}
      {isVoltara && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="32" ry="7" fill="#000000" opacity="0.4" />
          <rect x="36" y="58" width="10" height="20" rx="3" fill={p.dark} />
          <rect x="38" y="62" width="6" height="12" rx="1" fill={p.accent} className="animate-pulse" />
          <ellipse cx="60" cy="74" rx="20" ry="22" fill={p.primary} />
          <ellipse cx="60" cy="76" rx="12" ry="14" fill={p.secondary} />
          <rect x="42" y="92" width="12" height="14" rx="4" fill={p.dark} />
          <rect x="66" y="92" width="12" height="14" rx="4" fill={p.dark} />
          <polygon points="46,38 34,4 48,18 42,2" fill={p.primary} />
          <polygon points="45,34 38,12 46,18" fill={p.dark} />
          <polygon points="74,38 86,4 72,18 78,2" fill={p.primary} />
          <polygon points="75,34 82,12 74,18" fill={p.dark} />
          <circle cx="60" cy="46" r="18" fill={p.primary} />
          <circle cx="48" cy="50" r="4" fill={p.accent} className="animate-pulse" />
          <circle cx="72" cy="50" r="4" fill={p.accent} className="animate-pulse" />
          <circle cx="53" cy="42" r="4" fill={p.dark} />
          <circle cx="54" cy="41" r="1.5" fill={p.eye} />
          <circle cx="67" cy="42" r="4" fill={p.dark} />
          <circle cx="68" cy="41" r="1.5" fill={p.eye} />
        </svg>
      )}

      {/* 16. AERIX (WIND SKY GRIFFIN) */}
      {isAerix && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000000" opacity="0.4" />
          <path d="M38 64 C18 52, 10 38, 22 28 C28 34, 34 50, 42 66 Z" fill={p.accent} />
          <path d="M82 64 C102 52, 110 38, 98 28 C92 34, 86 50, 78 66 Z" fill={p.accent} />
          <ellipse cx="60" cy="74" rx="20" ry="22" fill={p.primary} />
          <ellipse cx="60" cy="76" rx="12" ry="15" fill={p.secondary} />
          <rect x="44" y="92" width="10" height="14" rx="3" fill={p.dark} />
          <rect x="66" y="92" width="10" height="14" rx="3" fill={p.dark} />
          <circle cx="60" cy="44" r="18" fill={p.primary} />
          <polygon points="56,26 60,10 64,26" fill={p.accent} />
          <polygon points="50,28 48,14 56,26" fill={p.dark} />
          <polygon points="70,28 72,14 64,26" fill={p.dark} />
          <polygon points="55,46 65,46 60,54" fill="#fbbf24" />
          <polygon points="48,40 56,42 52,45" fill={p.eye} />
          <polygon points="72,40 64,42 68,45" fill={p.eye} />
        </svg>
      )}

      {/* 17. BOULDO (EARTH GOLEM BADGER) */}
      {isBouldo && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="38" ry="8" fill="#000000" opacity="0.5" />
          <rect x="30" y="58" width="60" height="38" rx="12" fill={p.dark} />
          <rect x="34" y="62" width="52" height="30" rx="8" fill={p.primary} />
          <rect x="22" y="74" width="16" height="22" rx="6" fill={p.accent} />
          <rect x="82" y="74" width="16" height="22" rx="6" fill={p.accent} />
          <rect x="42" y="92" width="14" height="14" rx="4" fill={p.dark} />
          <rect x="64" y="92" width="14" height="14" rx="4" fill={p.dark} />
          <rect x="42" y="32" width="36" height="30" rx="8" fill={p.primary} />
          <rect x="44" y="38" width="32" height="8" fill={p.dark} />
          <rect x="48" y="40" width="8" height="4" fill={p.eye} className="animate-pulse" />
          <rect x="64" y="40" width="8" height="4" fill={p.eye} className="animate-pulse" />
          <polygon points="50,54 54,58 58,54" fill={p.secondary} />
          <polygon points="62,54 66,58 70,54" fill={p.secondary} />
        </svg>
      )}

      {/* 18. NOXIE (SHADOW ASSASSIN PANTHER) */}
      {isNoxie && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000000" opacity="0.6" />
          <circle cx="28" cy="62" r="14" fill={p.accent} opacity="0.4" className="animate-ping" />
          <circle cx="92" cy="62" r="14" fill={p.accent} opacity="0.4" className="animate-ping" />
          <rect x="44" y="58" width="32" height="38" rx="12" fill={p.primary} />
          <ellipse cx="60" cy="74" rx="10" ry="16" fill={p.dark} />
          <rect x="44" y="92" width="10" height="14" rx="3" fill={p.dark} />
          <rect x="66" y="92" width="10" height="14" rx="3" fill={p.dark} />
          <polygon points="46,36 38,14 54,26" fill={p.primary} />
          <polygon points="74,36 82,14 66,26" fill={p.primary} />
          <circle cx="60" cy="44" r="18" fill={p.primary} />
          <polygon points="48,40 56,42 50,46" fill={p.eye} className="animate-pulse" />
          <polygon points="72,40 64,42 70,46" fill={p.eye} className="animate-pulse" />
          <path d="M46 54 Q60 62 74 54 L68 64 L52 64 Z" fill={p.accent} />
        </svg>
      )}

      {/* 19. FROSTO (GLACIAL PENGUIN KNIGHT) */}
      {isFrosto && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000000" opacity="0.4" />
          <ellipse cx="60" cy="72" rx="24" ry="26" fill={p.primary} />
          <ellipse cx="60" cy="74" rx="16" ry="20" fill={p.secondary} />
          <path d="M36 64 C28 72, 28 84, 38 88 Z" fill={p.accent} />
          <path d="M84 64 C92 72, 92 84, 82 88 Z" fill={p.accent} />
          <polygon points="46,96 54,96 50,104" fill="#fbbf24" />
          <polygon points="66,96 74,96 70,104" fill="#fbbf24" />
          <circle cx="60" cy="42" r="18" fill={p.primary} />
          <polygon points="56,24 60,12 64,24" fill={p.accent} />
          <ellipse cx="54" cy="40" rx="3" ry="4" fill={p.eye} />
          <circle cx="55" cy="39" r="1" fill="#ffffff" />
          <ellipse cx="66" cy="40" rx="3" ry="4" fill={p.eye} />
          <circle cx="67" cy="39" r="1" fill="#ffffff" />
          <polygon points="57,44 63,44 60,49" fill="#fbbf24" />
          <circle cx="60" cy="54" r="3" fill={p.highlight} />
        </svg>
      )}

      {/* 20. GEARO (CLOCKWORK STEAMPUNK OTTER) */}
      {isGearo && (
        <svg viewBox="0 0 120 120" className="w-36 h-36 md:w-48 md:h-48 drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="60" cy="112" rx="34" ry="7" fill="#000000" opacity="0.4" />
          <circle cx="36" cy="56" r="12" fill="none" stroke={p.accent} strokeWidth="3" strokeDasharray="6 3" className="animate-spin-slow" />
          <rect x="40" y="58" width="40" height="38" rx="12" fill={p.primary} />
          <circle cx="60" cy="74" r="10" fill={p.secondary} />
          <circle cx="60" cy="74" r="4" fill={p.accent} />
          <rect x="42" y="92" width="12" height="14" rx="4" fill={p.dark} />
          <rect x="66" y="92" width="12" height="14" rx="4" fill={p.dark} />
          <circle cx="60" cy="44" r="18" fill={p.primary} />
          <rect x="48" y="36" width="10" height="10" rx="5" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <rect x="62" y="36" width="10" height="10" rx="5" fill={p.dark} stroke={p.accent} strokeWidth="2" />
          <circle cx="53" cy="41" r="2.5" fill={p.eye} />
          <circle cx="67" cy="41" r="2.5" fill={p.eye} />
          <ellipse cx="60" cy="48" rx="6" ry="4" fill={p.secondary} />
          <circle cx="60" cy="47" r="1.5" fill="#451a03" />
        </svg>
      )}

      {/* 21. DRACURO (VAMPIRIC BLOOD DRAGON) */}
      {isDracuro && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="38" ry="8" fill="#000000" opacity="0.5" />
          <path d="M42 60 C18 42, 6 56, 12 78 C28 72, 38 68, 44 68 Z" fill={p.dark} />
          <path d="M20 54 L34 68 L24 72" stroke={p.accent} strokeWidth="2" fill="none" />
          <path d="M88 60 C112 42, 124 56, 118 78 C102 72, 92 68, 86 68 Z" fill={p.dark} />
          <path d="M110 54 L96 68 L106 72" stroke={p.accent} strokeWidth="2" fill="none" />
          <rect x="46" y="58" width="38" height="42" rx="12" fill={p.primary} />
          <path d="M52 64 L78 64 L74 94 L56 94 Z" fill={p.secondary} />
          <rect x="46" y="96" width="12" height="16" rx="4" fill={p.dark} />
          <rect x="72" y="96" width="12" height="16" rx="4" fill={p.dark} />
          <circle cx="65" cy="44" r="20" fill={p.primary} />
          <polygon points="50,30 42,10 58,22" fill={p.highlight} />
          <polygon points="80,30 88,10 72,22" fill={p.highlight} />
          <polygon points="52,40 60,42 56,46" fill={p.eye} className="animate-pulse" />
          <polygon points="78,40 70,42 74,46" fill={p.eye} className="animate-pulse" />
          <polygon points="58,54 62,60 60,54" fill="#ffffff" />
          <polygon points="72,54 68,60 70,54" fill="#ffffff" />
        </svg>
      )}

      
      {/* NEW ELEMENTALS */}
      {isEmbercub && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="40" ry="8" fill="#000000" opacity="0.5" />
          <circle cx="35" cy="35" r="15" fill={p.dark} />
          <circle cx="35" cy="35" r="8" fill={p.secondary} />
          <circle cx="95" cy="35" r="15" fill={p.dark} />
          <circle cx="95" cy="35" r="8" fill={p.secondary} />
          <rect x="35" y="40" width="60" height="70" rx="20" fill={p.primary} />
          <rect x="45" y="70" width="40" height="35" rx="15" fill={p.secondary} />
          <ellipse cx="65" cy="65" rx="25" ry="20" fill={p.highlight} />
          <circle cx="65" cy="60" r="6" fill={p.dark} />
          <path d="M55 70 Q65 80 75 70" stroke={p.dark} strokeWidth="3" fill="none" />
          <circle cx="50" cy="45" r="5" fill={p.eye} className="animate-pulse" />
          <circle cx="80" cy="45" r="5" fill={p.eye} className="animate-pulse" />
          <rect x="30" y="80" width="15" height="30" rx="7" fill={p.dark} />
          <rect x="85" y="80" width="15" height="30" rx="7" fill={p.dark} />
        </svg>
      )}

      {isTidefin && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="40" ry="8" fill="#000000" opacity="0.5" />
          <polygon points="65,20 50,60 80,60" fill={p.dark} />
          <path d="M20 70 Q65 30 110 70 Q120 100 65 110 Q10 100 20 70 Z" fill={p.primary} />
          <path d="M30 75 Q65 105 100 75 Q65 110 30 75 Z" fill={p.secondary} />
          <polygon points="10,75 30,65 25,85" fill={p.dark} />
          <polygon points="120,75 100,65 105,85" fill={p.dark} />
          <circle cx="45" cy="65" r="4" fill={p.eye} className="animate-pulse" />
          <circle cx="85" cy="65" r="4" fill={p.eye} className="animate-pulse" />
          <path d="M50 85 L80 85" stroke={p.dark} strokeWidth="2" strokeDasharray="5,2" fill="none" />
          <path d="M15 65 Q5 80 15 95 L5 80 Z" fill={p.highlight} />
        </svg>
      )}

      {isThornox && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="45" ry="9" fill="#000000" opacity="0.5" />
          <path d="M35 50 Q20 20 10 30 Q30 40 35 60 Z" fill={p.highlight} />
          <path d="M95 50 Q110 20 120 30 Q100 40 95 60 Z" fill={p.highlight} />
          <rect x="25" y="45" width="80" height="65" rx="15" fill={p.primary} />
          <rect x="40" y="65" width="50" height="45" rx="10" fill={p.dark} />
          <ellipse cx="65" cy="85" rx="20" ry="15" fill={p.secondary} />
          <ellipse cx="55" cy="80" rx="4" ry="6" fill={p.dark} />
          <ellipse cx="75" cy="80" rx="4" ry="6" fill={p.dark} />
          <path d="M55 95 Q65 105 75 95" stroke={p.highlight} strokeWidth="3" fill="none" />
          <circle cx="45" cy="55" r="5" fill={p.eye} className="animate-pulse" />
          <circle cx="85" cy="55" r="5" fill={p.eye} className="animate-pulse" />
          <rect x="20" y="90" width="15" height="25" rx="5" fill={p.dark} />
          <rect x="95" y="90" width="15" height="25" rx="5" fill={p.dark} />
        </svg>
      )}

      {isZappit && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="35" ry="7" fill="#000000" opacity="0.5" />
          <ellipse cx="45" cy="30" rx="10" ry="30" fill={p.primary} transform="rotate(-15 45 30)" />
          <ellipse cx="45" cy="30" rx="5" ry="20" fill={p.secondary} transform="rotate(-15 45 30)" />
          <ellipse cx="85" cy="30" rx="10" ry="30" fill={p.primary} transform="rotate(15 85 30)" />
          <ellipse cx="85" cy="30" rx="5" ry="20" fill={p.secondary} transform="rotate(15 85 30)" />
          <circle cx="65" cy="75" r="35" fill={p.primary} />
          <ellipse cx="65" cy="85" rx="20" ry="15" fill={p.secondary} />
          <circle cx="65" cy="75" r="4" fill={p.dark} />
          <path d="M55 82 Q65 90 75 82" stroke={p.dark} strokeWidth="2" fill="none" />
          <circle cx="50" cy="65" r="6" fill={p.eye} className="animate-pulse" />
          <circle cx="80" cy="65" r="6" fill={p.eye} className="animate-pulse" />
          <path d="M25 60 L10 50 L20 40 M105 60 L120 50 L110 40" stroke={p.highlight} strokeWidth="3" fill="none" className="animate-ping" />
        </svg>
      )}

      {isFrostbit && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="30" ry="6" fill="#000000" opacity="0.5" />
          <ellipse cx="65" cy="70" rx="35" ry="45" fill={p.primary} />
          <ellipse cx="65" cy="75" rx="25" ry="35" fill={p.secondary} />
          <path d="M30 60 Q10 80 20 100 Q35 80 35 60 Z" fill={p.dark} />
          <path d="M100 60 Q120 80 110 100 Q95 80 95 60 Z" fill={p.dark} />
          <ellipse cx="65" cy="55" rx="12" ry="6" fill={p.highlight} />
          <circle cx="55" cy="45" r="4" fill={p.eye} className="animate-pulse" />
          <circle cx="75" cy="45" r="4" fill={p.eye} className="animate-pulse" />
          <ellipse cx="45" cy="110" rx="10" ry="5" fill={p.highlight} />
          <ellipse cx="85" cy="110" rx="10" ry="5" fill={p.highlight} />
          <circle cx="65" cy="75" r="2" fill={p.dark} />
          <circle cx="65" cy="85" r="2" fill={p.dark} />
        </svg>
      )}

      {isGravox && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="40" ry="8" fill="#000000" opacity="0.5" />
          <polygon points="35,40 25,10 50,30" fill={p.dark} />
          <polygon points="95,40 105,10 80,30" fill={p.dark} />
          <ellipse cx="65" cy="65" rx="35" ry="30" fill={p.primary} />
          <ellipse cx="65" cy="75" rx="20" ry="15" fill={p.secondary} />
          <circle cx="65" cy="70" r="5" fill={p.dark} />
          <path d="M50 55 L40 50 M80 55 L90 50" stroke={p.highlight} strokeWidth="3" fill="none" />
          <polygon points="45,55 55,50 50,60" fill={p.eye} className="animate-pulse" />
          <polygon points="85,55 75,50 80,60" fill={p.eye} className="animate-pulse" />
          <path d="M55 80 Q65 90 75 80" stroke={p.dark} strokeWidth="3" fill="none" />
          <rect x="35" y="90" width="10" height="25" rx="4" fill={p.primary} />
          <rect x="85" y="90" width="10" height="25" rx="4" fill={p.primary} />
          <path d="M95 70 Q130 90 100 110" stroke={p.dark} strokeWidth="15" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {isLumina && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="38" ry="7" fill="#000000" opacity="0.5" />
          <polygon points="35,45 20,15 50,35" fill={p.primary} />
          <polygon points="32,40 25,25 45,35" fill={p.secondary} />
          <polygon points="95,45 110,15 80,35" fill={p.primary} />
          <polygon points="98,40 105,25 85,35" fill={p.secondary} />
          <polygon points="30,45 100,45 65,95" fill={p.primary} />
          <polygon points="45,55 85,55 65,85" fill={p.secondary} />
          <circle cx="65" cy="85" r="4" fill={p.dark} />
          <polygon points="45,60 55,55 50,65" fill={p.eye} className="animate-pulse" />
          <polygon points="85,60 75,55 80,65" fill={p.eye} className="animate-pulse" />
          <path d="M75 90 Q120 100 110 60 Q90 80 75 90 Z" fill={p.highlight} />
          <circle cx="45" cy="105" r="8" fill={p.dark} />
          <circle cx="85" cy="105" r="8" fill={p.dark} />
        </svg>
      )}

      {isTerrabun && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="45" ry="9" fill="#000000" opacity="0.5" />
          <rect x="25" y="60" width="80" height="50" rx="20" fill={p.primary} />
          <rect x="35" y="70" width="60" height="40" rx="10" fill={p.dark} />
          <ellipse cx="65" cy="80" rx="15" ry="10" fill={p.secondary} />
          <circle cx="65" cy="75" r="4" fill={p.highlight} />
          <path d="M35 60 Q25 45 40 45 Z M95 60 Q105 45 90 45 Z" fill={p.primary} />
          <rect x="45" y="50" width="10" height="25" fill={p.secondary} transform="rotate(20 50 60)" />
          <rect x="75" y="50" width="10" height="25" fill={p.secondary} transform="rotate(-20 75 60)" />
          <circle cx="45" cy="65" r="4" fill={p.eye} className="animate-pulse" />
          <circle cx="85" cy="65" r="4" fill={p.eye} className="animate-pulse" />
          <rect x="20" y="100" width="15" height="15" rx="5" fill={p.highlight} />
          <rect x="95" y="100" width="15" height="15" rx="5" fill={p.highlight} />
        </svg>
      )}

      {isMystwing && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="35" ry="7" fill="#000000" opacity="0.5" />
          <ellipse cx="65" cy="65" rx="35" ry="40" fill={p.primary} />
          <path d="M30 65 Q10 75 25 95 Q40 75 35 65 Z" fill={p.dark} />
          <path d="M100 65 Q120 75 105 95 Q90 75 95 65 Z" fill={p.dark} />
          <circle cx="45" cy="55" r="12" fill={p.secondary} />
          <circle cx="85" cy="55" r="12" fill={p.secondary} />
          <circle cx="45" cy="55" r="5" fill={p.eye} className="animate-pulse" />
          <circle cx="85" cy="55" r="5" fill={p.eye} className="animate-pulse" />
          <polygon points="65,70 60,60 70,60" fill={p.highlight} />
          <path d="M45 40 Q65 30 85 40" stroke={p.dark} strokeWidth="3" fill="none" />
          <rect x="45" y="105" width="8" height="12" rx="4" fill={p.highlight} />
          <rect x="77" y="105" width="8" height="12" rx="4" fill={p.highlight} />
        </svg>
      )}

      {isAquadrake && (
        <svg viewBox="0 0 130 130" className="w-38 h-38 md:w-50 md:h-50 drop-shadow-2xl" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="65" cy="116" rx="40" ry="8" fill="#000000" opacity="0.5" />
          <path d="M30 90 Q10 70 30 50 Q65 30 80 50 Q100 80 65 100 Q45 110 30 90 Z" fill={p.primary} />
          <path d="M40 85 Q25 70 40 55 Q65 40 75 55 Q90 75 65 90 Q50 95 40 85 Z" fill={p.secondary} />
          <polygon points="65,30 55,10 75,10" fill={p.highlight} />
          <path d="M85 50 Q110 30 120 50 M30 50 Q10 30 20 10" stroke={p.dark} strokeWidth="3" fill="none" />
          <circle cx="60" cy="55" r="5" fill={p.eye} className="animate-pulse" />
          <circle cx="80" cy="55" r="5" fill={p.eye} className="animate-pulse" />
          <polygon points="50,110 60,95 70,110" fill={p.highlight} />
          <polygon points="80,105 90,90 100,105" fill={p.highlight} />
        </svg>
      )}

      {isHoundBoss && (
        <svg viewBox="0 0 160 160" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="80" cy="140" rx="55" ry="12" fill="#000000" opacity="0.6" />
          <rect x="30" y="60" width="100" height="60" rx="10" fill={p.primary} stroke={p.dark} strokeWidth="4" />
          <rect x="40" y="70" width="80" height="20" fill={p.secondary} />
          <path d="M50 40 L60 20 L70 40 Z" fill={p.highlight} stroke={p.dark} strokeWidth="2" />
          <path d="M110 40 L100 20 L90 40 Z" fill={p.highlight} stroke={p.dark} strokeWidth="2" />
          <circle cx="60" cy="80" r="8" fill={p.eye} className="animate-ping" />
          <circle cx="60" cy="80" r="4" fill="#fff" />
          <circle cx="100" cy="80" r="8" fill={p.eye} className="animate-ping" />
          <circle cx="100" cy="80" r="4" fill="#fff" />
          <rect x="50" y="100" width="60" height="10" fill={p.dark} />
          <line x1="60" y1="100" x2="60" y2="110" stroke={p.highlight} strokeWidth="2" />
          <line x1="70" y1="100" x2="70" y2="110" stroke={p.highlight} strokeWidth="2" />
          <line x1="80" y1="100" x2="80" y2="110" stroke={p.highlight} strokeWidth="2" />
          <line x1="90" y1="100" x2="90" y2="110" stroke={p.highlight} strokeWidth="2" />
          <line x1="100" y1="100" x2="100" y2="110" stroke={p.highlight} strokeWidth="2" />
          <rect x="35" y="120" width="20" height="25" rx="5" fill={p.primary} stroke={p.dark} strokeWidth="3" />
          <rect x="105" y="120" width="20" height="25" rx="5" fill={p.primary} stroke={p.dark} strokeWidth="3" />
        </svg>
      )}

      {isMutantBoss && (
        <svg viewBox="0 0 160 160" className="w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_20px_rgba(132,204,22,0.5)]" style={{ imageRendering: 'pixelated' }}>
          <ellipse cx="80" cy="140" rx="60" ry="12" fill="#000000" opacity="0.6" />
          <path d="M20 120 Q20 50 80 50 Q140 50 140 120 Z" fill={p.primary} />
          <path d="M30 120 Q30 65 80 65 Q130 65 130 120 Z" fill={p.secondary} />
          <polygon points="30,55 40,20 60,45" fill={p.dark} />
          <polygon points="130,55 120,20 100,45" fill={p.dark} />
          <circle cx="50" cy="80" r="10" fill={p.eye} className="animate-pulse" />
          <circle cx="110" cy="90" r="15" fill={p.eye} className="animate-pulse" />
          <circle cx="80" cy="70" r="8" fill={p.eye} className="animate-pulse" />
          <path d="M40 120 Q80 140 120 120 Q80 110 40 120 Z" fill={p.highlight} />
          <circle cx="30" cy="130" r="10" fill={p.primary} className="animate-bounce" />
          <circle cx="80" cy="135" r="12" fill={p.primary} className="animate-bounce" />
          <circle cx="130" cy="125" r="8" fill={p.primary} className="animate-bounce" />
        </svg>
      )}

      {/* 22. GENERIC FALLBACK FOR NEW CHARACTERS */}
      {!hasSprite && (
        <div className="relative flex items-center justify-center w-36 h-36 md:w-48 md:h-48 drop-shadow-2xl">
          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full drop-shadow-lg" style={{ imageRendering: 'pixelated' }}>
            <ellipse cx="60" cy="110" rx="36" ry="7" fill="#000000" opacity="0.4" />
            <circle cx="60" cy="60" r="30" fill={p.primary} />
            <circle cx="60" cy="60" r="26" fill={p.secondary} />
            <circle cx="60" cy="60" r="22" fill={p.dark} />
            
            {/* Pulsing inner core */}
            <circle cx="60" cy="60" r="14" fill={p.accent} className="animate-pulse" />
            
            {/* Tech/Magic ring */}
            <circle cx="60" cy="60" r="36" fill="none" stroke={p.highlight} strokeWidth="2" strokeDasharray="10 6" className="animate-spin-slow" />
            <circle cx="60" cy="60" r="42" fill="none" stroke={p.primary} strokeWidth="1" strokeDasharray="4 8" className="animate-reverse-spin" />
            
            {/* Floaty bits */}
            <circle cx="20" cy="40" r="4" fill={p.highlight} className="animate-bounce" />
            <circle cx="100" cy="80" r="3" fill={p.accent} className="animate-bounce-subtle" />
            <circle cx="30" cy="90" r="5" fill={p.secondary} className="animate-pulse" />
            <circle cx="90" cy="30" r="4" fill={p.primary} className="animate-ping" />
          </svg>
          <div className="absolute text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 select-none pointer-events-none animate-bounce-subtle">
            {Array.from(character.avatarEmoji || '❓')[0]}
          </div>
        </div>
      )}
    </div>
  );
};
