import re

with open('src/components/CrtOverlay.tsx', 'r') as f:
    code = f.read()

start_idx = code.find("{/* Top Navbar */}")
end_idx = code.find("{/* Dynamic App Content */}")

if start_idx != -1 and end_idx != -1:
    code = code[:start_idx] + code[end_idx:]

with open('src/components/CrtOverlay.tsx', 'w') as f:
    f.write(code)

