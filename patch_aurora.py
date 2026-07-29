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

aurora_html = """
    <!-- Aurora background -->
    <div class="hero-cinematic-bg">
        <div class="hero-orb orb-1"></div>
        <div class="hero-orb orb-2"></div>
        <div class="hero-orb orb-3"></div>
        <div class="hero-orb orb-4"></div>
    </div>
"""

templates_dir = r"c:\Users\MUHAMMAD SHAMIL CV\PycharmProjects\brandlumeo\templates\website"

for root, _, files in os.walk(templates_dir):
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            modified = False
            for cls in dark_classes:
                # Find <section class="... cls ...">
                # We want to add dark-aurora-section to the class and aurora_html right after the >
                # But we should only add it if not already there
                if cls in content:
                    pattern = r'(<section\s+class="[^"]*\b' + cls + r'\b[^"]*")([^>]*>)'
                    def replace_func(match):
                        class_attr = match.group(1)
                        rest = match.group(2)
                        
                        # Add dark-aurora-section if not present
                        if 'dark-aurora-section' not in class_attr:
                            class_attr += ' dark-aurora-section'
                            
                        # Add aurora html
                        return class_attr + rest + aurora_html
                    
                    new_content, count = re.subn(pattern, replace_func, content)
                    if count > 0:
                        content = new_content
                        modified = True
            
            if modified:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"Patched {f}")

print("Done.")
