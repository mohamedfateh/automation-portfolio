const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.navlinks');

menu?.addEventListener('click',()=>{
  const isOpen=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(isOpen));
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
}));

const lb=document.getElementById('lightbox');
const lbImg=lb?.querySelector('img');
const closeLightbox=()=>lb?.classList.remove('open');
document.querySelectorAll('[data-lightbox]').forEach(img=>img.addEventListener('click',()=>{
  if(!lbImg||!lb) return;
  lbImg.src=img.src;
  lbImg.alt=img.alt||'Expanded engineering project image';
  lb.classList.add('open');
}));
lb?.addEventListener('click',e=>{if(e.target!==lbImg)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduceMotion){
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}else{
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

const tabs=document.querySelectorAll('.tab');
const cards=document.querySelectorAll('.cap-card');
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const filter=t.dataset.filter;
  cards.forEach(c=>c.style.display=(filter==='all'||c.dataset.group===filter)?'block':'none');
}));

// Active navigation gives recruiters and clients orientation on long pages.
const navLinks=[...document.querySelectorAll('.navlinks a[href^="#"]')];
const sectionMap=navLinks
  .map(a=>({a,section:document.querySelector(a.getAttribute('href'))}))
  .filter(x=>x.section);
if(sectionMap.length){
  const sectionObs=new IntersectionObserver(entries=>{
    const visible=entries
      .filter(e=>e.isIntersecting)
      .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible) return;
    navLinks.forEach(a=>a.classList.remove('active'));
    sectionMap.find(x=>x.section===visible.target)?.a.classList.add('active');
  },{rootMargin:'-28% 0px -60% 0px',threshold:[0,.1,.25,.5]});
  sectionMap.forEach(x=>sectionObs.observe(x.section));
}

const form=document.getElementById('leadForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const fd=new FormData(form);
  const subject=encodeURIComponent(`Automation / SCADA enquiry — ${fd.get('company')||fd.get('name')}`);
  const body=encodeURIComponent(
    `Name: ${fd.get('name')}\nCompany: ${fd.get('company')}\nEmail/Phone: ${fd.get('contact')}\n\nProject requirement:\n${fd.get('message')}`
  );
  window.location.href=`mailto:mmmohamed.alfateh@gmail.com?subject=${subject}&body=${body}`;
});
