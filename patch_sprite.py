import re

with open('src/components/PixelSprite.tsx', 'r') as f:
    code = f.read()

# Add a boolean for fallback
# Find where it defines isDracuro = character.id === 'dracuro';
insert_idx = code.find("const isDracuro = character.id === 'dracuro';")
if insert_idx != -1:
    insert_str = "const isDracuro = character.id === 'dracuro';\n  const hasSprite = isOyen || isDog || isNinja || isVolt || isCyberPuss || isBully || isSaber || isBatuKong || isPyra || isZephyr || isVoltchi || isMossu || isFlareo || isAquabi || isVoltara || isAerix || isBouldo || isNoxie || isFrosto || isGearo || isDracuro;\n"
    code = code[:insert_idx] + insert_str + code[insert_idx + len("const isDracuro = character.id === 'dracuro';"):]

# Find the end of the return statement
end_idx = code.find("    </div>\n  );\n};")
if end_idx != -1:
    fallback_code = """
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
            {character.avatarEmoji?.split('')[0]}
          </div>
        </div>
      )}
"""
    code = code[:end_idx] + fallback_code + code[end_idx:]

with open('src/components/PixelSprite.tsx', 'w') as f:
    f.write(code)

