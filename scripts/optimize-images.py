from pathlib import Path
from PIL import Image, ImageOps
import json
assets=Path('public/assets')
for name,widths in [('hero-clean.png',[1024,2048]),('portrait-photo.jpg',[480,800])]:
 for width in widths:
  im=ImageOps.exif_transpose(Image.open(assets/name)).convert('RGB'); im.thumbnail((width,10000)); im.save(assets/f'{Path(name).stem}-{width}.webp',quality=85,method=6)
p=Path('src/projects.json'); projects=json.loads(p.read_text())
for project in projects:
 im=Image.open(assets/Path(project['cover']).name)
 project['coverSizes']={}
 for width in [480,960]:
  thumb=im.copy();thumb.thumbnail((width,10000));name=f'{Path(project["cover"]).stem}-cover-{width}.webp';thumb.save(assets/name,quality=82,method=6);project['coverSizes'][str(width)]='/assets/'+name
 project['imageSizes']={src:{'width':Image.open(assets/Path(src).name).width,'height':Image.open(assets/Path(src).name).height} for src in project['images']}
p.write_text(json.dumps(projects,ensure_ascii=False,indent=2)+'\n')
