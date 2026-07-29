import os

style_path = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\static\css\style.css"

with open(style_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Step 2 -> Original Colors
replacements = {
    "#11381d": "#06180d",
    "#235c38": "#0f2a19",
    "#234c2c": "#102415",
    "#2d7046": "#153822",
    "#28683e": "#12311d",
    "#368a56": "#1b4a2d",
    "#367647": "#1a3a23",
    "#164d27": "#092110",
    "#30663d": "#16301C",
}

new_content = content
for current_color, original_color in replacements.items():
    # Replace lowercase and uppercase hexes
    new_content = new_content.replace(current_color, original_color)
    new_content = new_content.replace(current_color.upper(), original_color.upper())

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Colors rolled back to original successfully.")
