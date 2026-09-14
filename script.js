const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.navlinks');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const lb=document.getElementById('lightbox');
const lbImg=lb?.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(img=>img.addEventListener('click',()=>{lbImg.src=img.src;lb.classList.add('open')}));
lb?.addEventListener('click',e=>{if(e.target!==lbImg)lb.classList.remove('open')});

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

const tabs=document.querySelectorAll('.tab');
const cards=document.querySelectorAll('.cap-card');
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');
  const f=t.dataset.filter;
  cards.forEach(c=>c.style.display=(f==='all'||c.dataset.group===f)?'block':'none');
}));

const form=document.getElementById('leadForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const fd=new FormData(form);
  const subject=encodeURIComponent(`Automation / SCADA enquiry — ${fd.get('company')||fd.get('name')}`);
  const body=encodeURIComponent(`Name: ${fd.get('name')}\nCompany: ${fd.get('company')}\nEmail/Phone: ${fd.get('contact')}\n\nProject requirement:\n${fd.get('message')}`);
  window.location.href=`mailto:mmmohamed.alfateh@gmail.com?subject=${subject}&body=${body}`;
});
