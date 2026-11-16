(async()=>{
const WA='254706688115',grid=document.getElementById('props');
if(!grid)return;
const empty=document.getElementById('empty'),bar=document.getElementById('filters');
const sel={loc:document.getElementById('f-loc'),type:document.getElementById('f-type'),price:document.getElementById('f-price')};
let data=[];
try{const r=await fetch('/data/properties.json',{cache:'no-cache'});data=await r.json()}catch(e){}
data=(Array.isArray(data)?data:[]).filter(p=>p&&p.title);
const kes=n=>'KES '+Number(n).toLocaleString('en-US');
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const lb=document.createElement('dialog');lb.className='lightbox';
const lbImg=document.createElement('img'),lbCap=el('p','lb-cap'),lbX=el('button','lb-close','Close');lbX.type='button';
lb.append(lbImg,lbCap,lbX);document.body.append(lb);
lb.addEventListener('click',()=>lb.close());
function openLB(p){lbImg.src=p.image;lbImg.alt=p.title+' in '+p.location;lbCap.textContent=p.title+' · '+p.location;lb.showModal()}
const STATUS={available:'Available','under-offer':'Under offer',sold:'Sold'};
function fmtDate(d){const x=new Date(d);return isNaN(x)?'':x.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
function card(p){
 const c=el('article','card');
 if(p.image){const i=el('img','p-img');i.src=p.image;i.alt=p.title+' in '+p.location;i.loading='lazy';if(p.image_position)i.style.objectPosition=p.image_position;const z=el('button','p-zoom');z.type='button';z.setAttribute('aria-label','View full photo: '+p.title);z.append(i);z.addEventListener('click',()=>openLB(p));c.append(z)}
 else c.append(el('div','p-img p-noimg'));
 const b=el('div','body');
 b.append(el('span','tag',[p.location,p.type,p.mode==='rent'?'For rent':'For sale'].filter(Boolean).join(' · ')));
 b.append(el('h3',null,p.title));
 b.append(el('span','price',p.price?kes(p.price)+(p.mode==='rent'?' / month':''):'Price on request'));
 if(p.price_usd)b.append(el('span','p-usd','About USD '+Number(p.price_usd).toLocaleString('en-US')));
 const f=el('div','facts');
 if(p.bedrooms!=null)f.append(el('span',null,p.bedrooms+' bed'));
 if(p.bathrooms!=null)f.append(el('span',null,p.bathrooms+' bath'));
 if(p.size)f.append(el('span',null,p.size));
 b.append(f);
 if(p.description)b.append(el('p','p-desc',p.description));
 const st=p.status||'available';
 const u=fmtDate(p.updated);
 b.append(el('span','status',(STATUS[st]||'Available')+(u?' · Updated '+u:'')));
 if(st!=='sold'){
  const msg=p.whatsapp_text||('Hi, I am interested in the '+(p.price?kes(p.price)+' ':'')+p.title+' in '+p.location+(p.id?' (Ref '+p.id+')':'')+'.');
  const a=el('a','btn sm','Enquire on WhatsApp');
  a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);a.target='_blank';a.rel='noopener';
  b.append(a);
 }
 c.append(b);return c;
}
function fill(s,vals){[...new Set(vals.filter(Boolean))].sort().forEach(v=>{const o=el('option',null,v);o.value=v;s.append(o)})}
function draw(){
 const l=sel.loc.value,t=sel.type.value,m=Number(sel.price.value)||0;
 const list=data.filter(p=>(!l||p.location===l)&&(!t||p.type===t)&&(!m||(p.price&&p.price<=m)));
 grid.replaceChildren(...list.map(card));
 empty.hidden=list.length>0;
}
if(data.length){bar.hidden=false;fill(sel.loc,data.map(p=>p.location));fill(sel.type,data.map(p=>p.type));Object.values(sel).forEach(s=>s.addEventListener('change',draw))}
draw();
})();
