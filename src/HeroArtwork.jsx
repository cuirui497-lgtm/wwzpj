import React,{useEffect,useRef} from 'react';

// The clean plate and animated tiles share one coordinate system, so they stay
// aligned as the hero resizes. Negative start times evenly populate the orbit.
export default function HeroArtwork(){
 const art=useRef(null), svg=useRef(null);
 useEffect(()=>{
  let visible=true;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{const el=svg.current;if(!el)return;const paused=!visible||document.hidden||reduced.matches;el.dataset.paused=String(paused);if(paused)el.pauseAnimations();else el.unpauseAnimations()};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});
  observer.observe(art.current.closest('section'));
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync)};
 },[]);
 const orbit='M 1750 270 A 240 90 0 1 1 1270 270 A 240 90 0 1 1 1750 270';
 return <div ref={art} className="hero-art" aria-hidden="true">
  <img src="/assets/hero-clean-2048.webp" srcSet="/assets/hero-clean-1024.webp 1024w, /assets/hero-clean-2048.webp 2048w" sizes="122vw" width="2048" height="768" fetchPriority="high" decoding="async" alt=""/>
  <svg ref={svg} className="glass-orbit" viewBox="0 0 2048 768" fill="none">
   <defs>
    <linearGradient id="glass-fill" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#d9f4ff" stopOpacity=".5"/><stop offset=".45" stopColor="#9dceff" stopOpacity=".09"/><stop offset="1" stopColor="#d6efff" stopOpacity=".3"/></linearGradient>
    <linearGradient id="glass-edge"><stop stopColor="#c5e7ff" stopOpacity=".85"/><stop offset=".5" stopColor="#b4d8ff" stopOpacity=".2"/><stop offset="1" stopColor="#e4f7ff" stopOpacity=".95"/></linearGradient>
    <mask id="sculpture-occlusion"><rect width="2048" height="768" fill="white"/><path d="M1383 399L1387 354Q1395 322 1430 308L1530 274Q1536 270 1511 269L1504 262Q1549 255 1573 280Q1597 306 1580 329Q1571 347 1540 356Z M1496 276Q1440 279 1419 257Q1393 229 1421 204Q1440 185 1490 174L1627 134Q1621 192 1585 215L1465 250Z" fill="black"/></mask>
    <clipPath id="orbit-rear-half"><rect width="2048" height="270"/></clipPath>
    <clipPath id="orbit-front-half"><rect y="270" width="2048" height="498"/></clipPath>
   </defs>
   {['rear','front'].map(half=><g key={half} clipPath={`url(#orbit-${half}-half)`}>
    <g mask={half==='rear'?'url(#sculpture-occlusion)':undefined}>
     {Array.from({length:14},(_,i)=>{const begin=`${-i*24/14}s`;return <g key={i} className="orbit-tile">
      <animateMotion dur="24s" begin={begin} repeatCount="indefinite" path={orbit} calcMode="paced"/>
      <g>
       <animateTransform attributeName="transform" type="scale" values="1;1.15;1;.85;1" keyTimes="0;.25;.5;.75;1" dur="24s" begin={begin} repeatCount="indefinite"/>
       <g transform="skewY(18)">
        <rect x="-11" y="-17" width="22" height="34" rx="1" fill={i===3?'#367cff':'url(#glass-fill)'} stroke="url(#glass-edge)" strokeWidth="1.2"/>
        <path d="M-10 -16H10M10 -16V16" stroke="#e6f7ff" strokeOpacity=".65" strokeWidth="1.5"/>
       </g>
      </g>
     </g>})}
    </g>
   </g>)}
  </svg>
 </div>
}
