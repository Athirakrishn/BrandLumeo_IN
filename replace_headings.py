import os
import re

def process_html_css():
    target_dirs = [
        r"e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\templates\website",
        r"e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\static\css"
    ]
    
    # Regex to find font-family: "Playfair Display", serif; or similar
    pattern = re.compile(r'font-family\s*:\s*[\'"]?Playfair Display[\'"]?\s*,\s*serif\s*;?', re.IGNORECASE)
    
    replacement = 'font-family: "Space Grotesk", sans-serif;\n    text-transform: uppercase;\n    font-weight: 700;'
    
    for d in target_dirs:
        for root, _, files in os.walk(d):
            for filename in files:
                if filename.endswith('.html') or filename.endswith('.css'):
                    filepath = os.path.join(root, filename)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    new_content = pattern.sub(replacement, content)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filename}")

if __name__ == "__main__":
    process_html_css()
    print("Done replacing Playfair Display with uppercase Space Grotesk.")
