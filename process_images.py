import os
from PIL import Image

def process_image(img_path):
    img = Image.open(img_path).convert("RGBA")
    # Get bounding box of non-transparent pixels
    bbox = img.getbbox()
    if not bbox:
        return
    
    cropped = img.crop(bbox)
    
    # Target dimensions: 400x500 (aspect ratio 4:5)
    target_w, target_h = 400, 500
    
    # We want the person to fill most of the height, say 90%
    person_target_h = int(target_h * 0.95)
    
    # Calculate scale factor
    scale = person_target_h / float(cropped.height)
    new_w = int(cropped.width * scale)
    new_h = int(cropped.height * scale)
    
    scaled = cropped.resize((new_w, new_h), Image.LANCZOS)
    
    # Create new transparent image
    new_img = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    
    # Paste centered horizontally, bottom aligned
    x = (target_w - new_w) // 2
    y = target_h - new_h
    new_img.paste(scaled, (x, y), scaled)
    
    new_img.save(img_path)
    print(f"Processed: {img_path}")

team_dir = r"e:\WORK @ BRANDLUMEO\brandlumeo\brandlumeo_web\static\images\team"
team_members = ["asna.png", "faumina.png", "varsha.png", "mubsina.png", "shamil.png", "athira.png", "rabeeh.png", "ashifa.png", "shamir.png"]

for member in team_members:
    img_path = os.path.join(team_dir, member)
    if os.path.exists(img_path):
        process_image(img_path)
    else:
        print(f"Not found: {img_path}")
