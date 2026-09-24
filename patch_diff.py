import re

with open('src/components/BattleArena.tsx', 'r') as f:
    code = f.read()

old_diff = """  const diffMults = React.useMemo(() => {
    switch (difficulty) {
      case 'easy':
        return { hpMult: 0.8, dmgMult: 0.8, critBonus: -0.1, startExp: 0, aiDelay: 1200 };
      case 'hard':
        return { hpMult: 1.3, dmgMult: 1.25, critBonus: 0.15, startExp: 1, aiDelay: 500 };
      case 'medium':
      default:
        return { hpMult: 1.0, dmgMult: 1.0, critBonus: 0, startExp: 0, aiDelay: 900 };
    }
  }, [difficulty]);"""

new_diff = """  const diffMults = React.useMemo(() => {
    switch (difficulty) {
      case 'easy':
        return { hpMult: 0.8, dmgMult: 1.0, critBonus: -0.1, startExp: 0, aiDelay: 1200, playerDmgMult: 1.5 };
      case 'hard':
        return { hpMult: 1.3, dmgMult: 1.5, critBonus: 0.15, startExp: 1, aiDelay: 500, playerDmgMult: 1.0 };
      case 'medium':
      default:
        return { hpMult: 1.0, dmgMult: 1.0, critBonus: 0, startExp: 0, aiDelay: 900, playerDmgMult: 1.1 };
    }
  }, [difficulty]);"""

code = code.replace(old_diff, new_diff)

# Now apply playerDmgMult to totalDmg calculation
# Currently baseDmg is calculated then totalDmg = isCrit ? Math.round(baseDmg * 1.75) : baseDmg;
# We will change it to multiply by diffMults.playerDmgMult
old_base_dmg = """        totalDmg = isCrit ? Math.round(baseDmg * 1.75) : baseDmg;"""
new_base_dmg = """        totalDmg = isCrit ? Math.round(baseDmg * 1.75) : baseDmg;
        totalDmg = Math.round(totalDmg * diffMults.playerDmgMult);"""

code = code.replace(old_base_dmg, new_base_dmg)

with open('src/components/BattleArena.tsx', 'w') as f:
    f.write(code)

