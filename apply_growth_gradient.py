import os
import re

style_path = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\static\css\style.css"

with open(style_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The user wants all sections that currently have the solid dark green background
# to use the "Growth Forecasting" background which is:
gradient = "linear-gradient(125deg, #12311d 0%, #1b4a2d 45%, #12311d 100%)"

# Replace standard background declarations that match the dark green solids
content = re.sub(r'background:\s*#102415\s*;', f'background: {gradient};', content)
content = re.sub(r'background:\s*#0f2a19\s*;', f'background: {gradient};', content)

# But only replace var(--bg-mid) where it's a full background rule, not in the :root definition
content = re.sub(r'background:\s*var\(--bg-mid\)\s*;', f'background: {gradient};', content)

# The gradient is very dark, so ensure text colors remain light
# Fortunately, these sections already have `color: var(--text-light);`

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied gradient to all dark green sections successfully.")
