import os

style_path = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\static\css\style.css"

with open(style_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Dictionary of current color to lighter color step 1
# Keeping the same hue/saturation, just bumping lightness
replacements = {
    "#06180d": "#0c2815", # bg-dark
    "#0f2a19": "#194228", # bg-mid
    "#102415": "#1a3921", # process, values, etc.
    "#153822": "#215334", # quick nav
    "#12311d": "#1d4d2e", # roi grad 1
    "#1b4a2d": "#286b42", # roi grad 2
    "#1a3a23": "#285835", # alternate
    "#092110": "#10391d", # hover variants if any
    "#16301C": "#244d2e",
}

new_content = content
for old_color, new_color in replacements.items():
    # Replace lowercase and uppercase hexes
    new_content = new_content.replace(old_color, new_color)
    new_content = new_content.replace(old_color.upper(), new_color.upper())

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Colors lightened successfully.")
