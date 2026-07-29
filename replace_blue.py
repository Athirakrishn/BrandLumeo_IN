import os
import re

style_path = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\static\css\style.css"

with open(style_path, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_rgba(match):
    alpha = match.group(1) # We only capture the alpha channel in group(1)
    # Replace blue rgb coordinates with green rgb coordinates
    return f"rgba(34, 197, 94, {alpha})"

# Matches rgba(59, 130, 246, 0.xx)
content = re.sub(r'rgba\(\s*59\s*,\s*130\s*,\s*246\s*,\s*([0-9.]+)\s*\)', replace_rgba, content)

# Matches rgba(37, 99, 235, 0.xx)
content = re.sub(r'rgba\(\s*37\s*,\s*99\s*,\s*235\s*,\s*([0-9.]+)\s*\)', replace_rgba, content)

# Also check for hex #3b82f6 (Tailwind blue-500) and replace with #22c55e (Tailwind green-500)
content = content.replace("#3b82f6", "#22c55e")
content = content.replace("#3B82F6", "#22C55E")

# Also check for hover hex #2563eb (Tailwind blue-600) and replace with #16a34a (Tailwind green-600)
content = content.replace("#2563eb", "#16a34a")
content = content.replace("#2563EB", "#16A34A")

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced all blue glow/border effects with premium green successfully.")
