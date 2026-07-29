import re
import os
import colorsys

def is_gray(hex_code):
    hex_code = hex_code.lstrip('#')
    if len(hex_code) == 3:
        hex_code = ''.join([c*2 for c in hex_code])
    if len(hex_code) != 6:
        return False
    
    r = int(hex_code[0:2], 16) / 255.0
    g = int(hex_code[2:4], 16) / 255.0
    b = int(hex_code[4:6], 16) / 255.0
    
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    
    # It's gray if saturation is very low (e.g. < 0.25)
    # And it's not white (v > 0.95 and s < 0.05 is white)
    # And it's not already black (v < 0.05)
    if s < 0.25 and v < 0.95 and v > 0.05:
        return True
    
    # Additionally, if it's a known Tailwind slate/gray, some slates have higher saturation but are perceived as gray.
    # Slate has a blueish tint (Hue around 210-220).
    if s < 0.4 and 0.55 < h < 0.65 and v < 0.95 and v > 0.05:
        return True
        
    return False

def process_css():
    css_file = r"e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\static\css\style.css"
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_color(match):
        prefix = match.group(1)
        color = match.group(2)
        if is_gray(color):
            print(f"Replacing {color} with #000000")
            return f"{prefix}#000000"
        return match.group(0)

    # Replace color: #xxxxxx
    new_content = re.sub(r'(color\s*:\s*)(#[0-9a-fA-F]{3,6})', replace_color, content)
    
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

def process_html():
    html_dir = r"e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\templates\website"
    gray_classes = [
        r'text-gray-[4-9]00', r'text-slate-[4-9]00',
        r'text-zinc-[4-9]00', r'text-neutral-[4-9]00'
    ]
    pattern = re.compile(r'\b(' + '|'.join(gray_classes) + r')\b')
    
    for filename in os.listdir(html_dir):
        if not filename.endswith('.html'): continue
        filepath = os.path.join(html_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = pattern.sub('text-black', content)
        
        # Also replace any explicit inline colors in HTML
        def replace_color(match):
            prefix = match.group(1)
            color = match.group(2)
            if is_gray(color):
                print(f"Replacing {color} in {filename} with #000000")
                return f"{prefix}#000000"
            return match.group(0)
            
        new_content = re.sub(r'(color\s*:\s*)(#[0-9a-fA-F]{3,6})', replace_color, new_content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")

if __name__ == "__main__":
    process_css()
    process_html()
    print("Done")
