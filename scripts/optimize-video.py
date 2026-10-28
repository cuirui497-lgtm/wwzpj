from pathlib import Path
import json,subprocess,sys
sys.path.insert(0,'/tmp/portfolio-video-tools')
import imageio_ffmpeg
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
p=Path('src/projects.json'); projects=json.loads(p.read_text())
for project in projects:
 for item in project.get('media',[]):
  source=Path('public')/item['src'].lstrip('/')
  output=source.with_name(source.stem+'-optimized.mp4')
  if not output.exists():
   subprocess.run([ffmpeg,'-y','-v','error','-i',str(source),'-vf',"scale='min(1280,iw)':-2",'-c:v','libx264','-preset','fast','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart','-c:a','aac','-b:a','96k',str(output)],check=True)
  item['originalType']=item['type'];item['type']='video';item['loop']=item['originalType']=='gif';item['src']='/assets/'+output.name
  poster=output.with_suffix('.webp')
  subprocess.run([ffmpeg,'-y','-v','error','-i',str(output),'-frames:v','1','-vf',"scale='min(640,iw)':-2",str(poster)],check=True)
  item['poster']='/assets/'+poster.name
  print(f'{source.name}: {source.stat().st_size} -> {output.stat().st_size}',flush=True)
p.write_text(json.dumps(projects,ensure_ascii=False,indent=2)+'\n')
