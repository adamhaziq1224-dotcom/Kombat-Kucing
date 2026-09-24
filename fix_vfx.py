import re

with open('src/components/SkillVfxEngine.tsx', 'r') as f:
    code = f.read()

# I forgot to append the closing `};` of renderVfx in my replacement script.
# Let's fix the footer.
if "  return (" in code:
    code = code.replace("  return (", "  };\n\n  return (")

with open('src/components/SkillVfxEngine.tsx', 'w') as f:
    f.write(code)

