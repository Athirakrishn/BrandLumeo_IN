import os
import re

templates_dir = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\templates\website"

for root, _, files in os.walk(templates_dir):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace class="something" dark-aurora-section
            # with class="something dark-aurora-section"
            new_content = re.sub(r'class="([^"]+)"\s+dark-aurora-section', r'class="\1 dark-aurora-section"', content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Fixed {f}")

print("Done fixing HTML.")
