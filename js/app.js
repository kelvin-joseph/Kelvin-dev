const C = window.SITE_CONTENT;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function renderNav(active='') {
  const el = $('#site-nav'); if (!el) return;
  el.innerHTML = `<header class="site-header"><div class="container nav">
    <a class="brand" href="index.html" data-transition>K<span>.</span></a>
    <button class="menu" aria-label="Open menu" aria-expanded="false">☰</button>
    <nav class="nav-links">
      <a class="${active==='home'?'active':''}" href="index.html" data-transition>Home</a>
      <a class="${active==='work'?'active':''}" href="work.html" data-transition>Work</a>
      <a class="${active==='about'?'active':''}" href="about.html" data-transition>About</a>
      <a class="${active==='services'?'active':''}" href="services.html" data-transition>Services</a>
      <a class="nav-cta ${active==='contact'?'active':''}" href="contact.html" data-transition>Let's talk</a>
      <button class="theme-toggle theme-control" type="button" aria-label="Switch theme" title="Switch theme"><span class="moon">☾</span><span class="sun">☀</span></button>
    </nav>
  </div></header>`;
  const btn=$('.menu'), nav=$('.nav-links');
  btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open);btn.textContent=open?'×':'☰'});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');if(btn)btn.textContent='☰'}));
}
function renderFooter(){const f=$('#site-footer');if(!f)return;f.innerHTML=`<footer class="footer"><div class="container footer-top"><div><a class="footer-brand" href="index.html" data-transition>K<span>.</span></a><p>React & Frontend Developer<br>Creative Builder · Product Thinker</p></div><nav class="footer-nav"><a href="work.html" data-transition>Work</a><a href="about.html" data-transition>About</a><a href="services.html" data-transition>Services</a><a href="contact.html" data-transition>Contact</a></nav></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Kelvin Ene-ojo</span><span>Built with intention.</span></div></footer>`}
function getContent(){
  try{
    const saved=JSON.parse(localStorage.getItem('kelvinSiteContent'));
    if(!saved||typeof saved!=='object')return C;
    const savedProjects=Array.isArray(saved.projects)?saved.projects:[];
    const projects=C.projects.map(base=>{
      const override=savedProjects.find(x=>x&&x.slug===base.slug)||{};
      return {
        ...base,
        ...override,
        stack:Array.isArray(override.stack)?override.stack:base.stack,
        screenshots:Array.isArray(override.screenshots)?override.screenshots:base.screenshots,
        galleryCaptions:Array.isArray(override.galleryCaptions)?override.galleryCaptions:base.galleryCaptions,
        links:Array.isArray(override.links)?override.links:base.links
      };
    });
    return {
      ...C,
      ...saved,
      profile:{...C.profile,...(saved.profile||{}),photo:(saved.profile&&saved.profile.photo)?saved.profile.photo:C.profile.photo||"./assets/profile.png"},
      contact:Array.isArray(saved.contact)?saved.contact:C.contact,
      services:Array.isArray(saved.services)?saved.services:C.services,
      projects
    };
  }catch{return C}
}
function projectVisual(p,cls=''){return p.cover?`<div class="project-visual has-image ${cls}" data-parallax="0.035"><img src="${p.cover}" alt="${p.title}"></div>`:`<div class="project-visual ${cls}"><div class="project-placeholder">${p.slug==='medtrack'?'Private project — visuals intentionally limited':'Real project visuals will be added'}</div></div>`}
function projectCard(p,i){return `<article class="project-card reveal"${p.cover?` data-peek="${p.cover}"`:''}><div class="project-visual-wrap">${projectVisual(p)}</div><div class="project-info"><div><span class="project-index">0${i+1} / ${p.category}</span><div class="project-status-pill">${p.status}</div><h3>${p.title}</h3><p>${p.summary}</p><div class="tags">${p.stack.map(x=>`<span class="tag">${x}</span>`).join('')}</div></div><a class="text-link" href="project.html?slug=${encodeURIComponent(p.slug)}" data-transition>View case study ↗</a></div></article>`}

function renderHome(){
  const c=getContent();renderNav('home');renderFooter();
  $('#hero-role').textContent=c.profile.role;$('#hero-bio').textContent=c.profile.shortBio;$('#hero-availability').textContent=c.profile.availability||'';$('#hero-photo').src=c.profile.photo||'./assets/profile.png';$('#hero-photo').onerror=function(){this.onerror=null;this.src='./assets/profile.png';};
  $('#about-preview').textContent=c.profile.about;
  $('#featured-projects').innerHTML=c.projects.filter(p=>p.slug==='medtrack').map(projectCard).join('');
  $('#services-preview').innerHTML=c.services.slice(0,4).map(s=>`<div class="service reveal"><span class="service-number">${s.number}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></div>`).join('');
}
function renderWork(){const c=getContent();renderNav('work');renderFooter();$('#work-projects').innerHTML=c.projects.map(projectCard).join('')}
function renderProject(){
  const c=getContent();renderNav('work');renderFooter();const slug=new URLSearchParams(location.search).get('slug');const p=c.projects.find(x=>x.slug===slug)||c.projects[0];
  $('#project-title').textContent=p.title;$('#project-category').textContent=p.category;$('#project-summary').textContent=p.summary;$('#project-description').textContent=p.description;$('#project-role').textContent=p.role;$('#project-status').textContent=p.status;$('#project-stack').innerHTML=p.stack.map(x=>`<span class="tag">${x}</span>`).join('');
  $('#project-cover').innerHTML=projectVisual(p);
  const caps=p.galleryCaptions||[];
  $('#project-gallery').innerHTML=p.screenshots.length?p.screenshots.map((src,i)=>`<figure class="case-visual"><div class="case-visual-image"><img src="${src}" alt="${p.title} — ${caps[i]?.title||'selected screen'}"></div><figcaption><span>0${i+1}</span><div><strong>${caps[i]?.title||'Selected screen'}</strong><p>${caps[i]?.text||'Selected product interface.'}</p></div></figcaption></figure>`).join(''):`<div class="gallery-placeholder">Selected project visuals will be added here.</div>`;
  $('#project-links').innerHTML=p.links?.length?p.links.map(l=>`<a class="button primary magnetic" href="${l.href}" target="_blank" rel="noreferrer">${l.label} ↗</a>`).join(''):`<span class="project-status-pill">${p.status}</span>`;
}
function renderAbout(){const c=getContent();renderNav('about');renderFooter();$('#about-photo').src=c.profile.photo;$('#about-text').textContent=c.profile.about}
function renderServices(){const c=getContent();renderNav('services');renderFooter();$('#services-list').innerHTML=c.services.map(s=>`<div class="service reveal"><span class="service-number">${s.number}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></div>`).join('')}
function renderContact(){
  const c=getContent();renderNav('contact');renderFooter();
  $('#contacts').innerHTML=c.contact.map(x=>`<a class="contact-card reveal" href="${x.href}"${x.label==='Email'?' data-copy="'+x.value+'"':''}><small>${x.label}</small><h3>${x.value}</h3><span class="text-link copy-hint">Start here ↗</span></a>`).join('');
  $$('#contacts .contact-card[data-copy]').forEach(card=>{
    card.addEventListener('click',()=>{
      const hint=card.querySelector('.copy-hint');
      navigator.clipboard?.writeText(card.dataset.copy).then(()=>{
        const original=hint.textContent;hint.textContent='Copied ✓';
        setTimeout(()=>{hint.textContent=original},1800);
      });
      // no preventDefault — the mailto: link still opens normally
    });
  });
}

function initReveal(){
  const els=$$('.section,.page-hero,.project-hero,.project-cover-wrap,.case-grid,.gallery,.case-visual,.gallery-placeholder,.cta,.process-step,.project-card,.contact-card,.service,.hero-copy,.hero-photo');
  els.forEach(el=>el.classList.add('reveal'));
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('is-visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08});
  els.forEach(el=>io.observe(el));
}
function addTransitionLayer(){if(!$('#page-transition')){const d=document.createElement('div');d.id='page-transition';document.body.appendChild(d)}}
function initPageTransitions(){
  addTransitionLayer();
  $$('a[data-transition]').forEach(a=>a.addEventListener('click',e=>{
    const url=new URL(a.href,location.href);
    if(url.origin!==location.origin||url.pathname===location.pathname&&url.search===location.search||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=url.href,520);
  }));
}

function initTheme(){
  const saved=localStorage.getItem('kelvinTheme');
  const preferred='dark';
  document.documentElement.dataset.theme=saved||preferred;
  const update=btn=>{
    const dark=document.documentElement.dataset.theme==='dark';
    btn.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
    btn.title=dark?'Switch to light mode':'Switch to dark mode';
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.content=dark?'#171714':'#eee9df';
  };
  $$('.theme-toggle').forEach(btn=>{
    update(btn);
    btn.addEventListener('click',()=>{
      const next=document.documentElement.dataset.theme==='dark'?'light':'dark';
      document.documentElement.dataset.theme=next;localStorage.setItem('kelvinTheme',next);
      $$('.theme-toggle').forEach(update);
    });
  });
}

function initHeader(){
  const header=$('.site-header');if(!header)return;
  let last=0;
  const onScroll=()=>{const y=window.scrollY;header.classList.toggle('scrolled',y>18);if(y>last+10&&y>120)header.style.transform='translateY(-110%)';else if(y<last-6)header.style.transform='translateY(0)';last=y};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
}
function initProgress(){
  const bar=document.createElement('div');bar.className='scroll-progress';document.body.appendChild(bar);
  const update=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?(scrollY/h)*100:0)+'%'};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
}
function initCursor(){
  if(!matchMedia('(pointer:fine)').matches)return;
  const dot=document.createElement('div'),ring=document.createElement('div');dot.className='cursor-dot';ring.className='cursor-ring';document.body.append(dot,ring);
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px'});
  const loop=()=>{rx+=(x-rx)*.14;ry+=(y-ry)*.14;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)};loop();
  document.addEventListener('mouseover',e=>{if(e.target.closest('a,button,.project-card,.contact-card'))ring.classList.add('active');else ring.classList.remove('active')});
}
function initMagnetic(){
  if(!matchMedia('(pointer:fine)').matches)return;
  $$('.magnetic').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.12}px)`}));
  $$('.magnetic').forEach(el=>el.addEventListener('pointerleave',()=>el.style.transform=''));
}
function initParallax(){
  if(matchMedia('(pointer:coarse)').matches)return;
  const items=$$('[data-parallax]');
  if(!items.length||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  let ticking=false;
  const update=()=>{items.forEach(el=>{const r=el.getBoundingClientRect(),speed=Number(el.dataset.parallax)||.03;if(r.bottom>0&&r.top<innerHeight){const p=(innerHeight/2-(r.top+r.height/2))*speed;el.style.transform=`translate3d(0,${p}px,0)`}});ticking=false};
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();
}
function initPeek(){
  const cards=$$('.project-card[data-peek]');
  if(!cards.length||!matchMedia('(pointer:fine)').matches)return;
  const preview=document.createElement('div');preview.className='peek-preview';
  const img=document.createElement('img');preview.appendChild(img);document.body.appendChild(preview);
  let mx=innerWidth/2,my=innerHeight/2,px=mx,py=my,active=false;
  window.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
  cards.forEach(card=>{
    // Only trigger on the visual/thumbnail area, never on the text or "View case study" link,
    // so the floating preview can't sit on top of anything the person is trying to click.
    const trigger=card.querySelector('.project-visual-wrap')||card;
    trigger.addEventListener('mouseenter',()=>{active=true;img.src=card.dataset.peek;preview.classList.add('active')});
    trigger.addEventListener('mouseleave',()=>{active=false;preview.classList.remove('active')});
  });
  (function loop(){
    px+=(mx-px)*.18;py+=(my-py)*.18;
    // Offset well clear of the actual pointer position so the preview never overlaps
    // the cursor or whatever's directly under it.
    preview.style.transform=`translate(${px+34}px,${py-120}px)`;
    requestAnimationFrame(loop);
  })();
}
function initPreloader(){
  const pre=$('#preloader');if(!pre)return;
  document.body.classList.add('is-loading');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const finish=()=>{
    pre.classList.add('leave');
    document.body.classList.remove('is-loading');
    setTimeout(()=>pre.classList.add('done'),reduced?0:950);
  };
  if(reduced){finish();return}
  requestAnimationFrame(()=>requestAnimationFrame(()=>pre.classList.add('show')));
  setTimeout(finish,1250);
}
document.addEventListener('DOMContentLoaded',()=>{
  const page=document.body.dataset.page;
  const run=fn=>{try{fn()}catch(err){console.error(fn.name+' failed:',err)}};
  run(initPreloader);
  run(({home:renderHome,work:renderWork,project:renderProject,about:renderAbout,services:renderServices,contact:renderContact}[page]||(()=>{})));
  [initTheme,initReveal,initPageTransitions,initHeader,initProgress,initCursor,initMagnetic,initParallax,initPeek].forEach(run);
});
