import os
import re

dark_classes = [
    'process',
    'cta',
    'page-header',
    'values-section',
    'cert-section',
    'service-packages',
    'portfolio-results',
    'insights-section',
    'engagement-section',
    'standards-section',
    'expert-notes'
]

aurora_regex = r'\s*<!-- Aurora background -->\s*<div class="hero-cinematic-bg">\s*<div class="hero-orb orb-1"></div>\s*<div class="hero-orb orb-2"></div>\s*<div class="hero-orb orb-3"></div>\s*<div class="hero-orb orb-4"></div>\s*</div>'

templates_dir = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\templates\website"

for root, _, files in os.walk(templates_dir):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            original_content = content
            
            for cls in dark_classes:
                # Remove dark-aurora-section class
                # It could be ' dark-aurora-section' or 'dark-aurora-section '
                pattern_section = r'(<section\s+class="[^"]*\b' + cls + r'\b[^"]*")'
                def replace_class(match):
                    class_attr = match.group(1)
                    class_attr = class_attr.replace(' dark-aurora-section', '').replace('dark-aurora-section ', '').replace('dark-aurora-section', '')
                    return class_attr
                
                content = re.sub(pattern_section, replace_class, content)

                # Remove the aurora block right after the section
                pattern_block = r'(<section\s+class="[^"]*\b' + cls + r'\b[^"]*"[^>]*>)' + aurora_regex
                content = re.sub(pattern_block, r'\1', content)

            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Rolled back {f}")

print("Rollback complete.")
