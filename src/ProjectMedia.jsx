import React,{useEffect,useRef,useState} from 'react';

export default function ProjectMedia({item,projectName}){
 const frame=useRef(null), player=useRef(null);
 const [near,setNear]=useState(false);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>{
   if(entry.isIntersecting)setNear(true);
   else player.current?.pause();
  },{rootMargin:'300px'});
  observer.observe(frame.current);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(!near||!item.loop)return;
  let visible=false;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{if(visible&&!document.hidden&&!reduced.matches)player.current?.play().catch(()=>{});else player.current?.pause()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});
  observer.observe(frame.current);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);player.current?.pause()};
 },[near,item.loop]);
 return <figure ref={frame} className="project-motion">
  {near?<video ref={player} src={item.src} poster={item.poster} controls playsInline preload="none" loop={item.loop||false} muted={item.loop||false} aria-label={projectName+' · '+item.name}/>:<img src={item.poster} loading="lazy" decoding="async" width="640" height="360" alt={projectName+' · '+item.name+'预览'}/>}
  <figcaption>{item.name}</figcaption>
 </figure>
}
