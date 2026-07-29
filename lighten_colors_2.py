import os

style_path = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\static\css\style.css"

with open(style_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Step 2: From previous lighter colors -> Even lighter
replacements = {
    "#0c2815": "#11381d", # bg-dark
    "#194228": "#235c38", # bg-mid
    "#1a3921": "#234c2c", # process, values, etc.
    "#215334": "#2d7046", # quick nav
    "#1d4d2e": "#28683e", # roi grad 1
    "#286b42": "#368a56", # roi grad 2
    "#285835": "#367647", # alternate
    "#10391d": "#164d27", # hover variants
    "#244d2e": "#30663d", 
}

new_content = content
for old_color, new_color in replacements.items():
    # Replace lowercase and uppercase hexes
    new_content = new_content.replace(old_color, new_color)
    new_content = new_content.replace(old_color.upper(), new_color.upper())

with open(style_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Colors lightened successfully (Step 2).")
