import re

with open('src/components/PixelSprite.tsx', 'r') as f:
    code = f.read()

new_svgs = """
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
"""

code = code.replace("{/* 22. GENERIC FALLBACK FOR NEW CHARACTERS */}", new_svgs + "\n      {/* 22. GENERIC FALLBACK FOR NEW CHARACTERS */}")

with open('src/components/PixelSprite.tsx', 'w') as f:
    f.write(code)

