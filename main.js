// Mobile menu + header state
const header=document.querySelector('.site-header'),nav=document.getElementById('nav'),btn=document.querySelector('.menu-btn');
btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>8),{passive:true});
document.getElementById('year').textContent=new Date().getFullYear();

// DEMONSTRATION listings only. Replace with real data (later: WordPress/JSON feed).
const LISTINGS=[
{t:'Demo: Sea-view villa',loc:'Watamu',mode:'rent',type:'house',price:'KES 180,000 / month',bed:3,bath:3,furn:'Furnished',avail:'Available now',ver:'Demonstration listing'},
{t:'Demo: Garden apartment',loc:'Malindi',mode:'rent',type:'apartment',price:'KES 65,000 / month',bed:2,bath:1,furn:'Unfurnished',avail:'Available from 1 Jan',ver:'Demonstration listing'},
{t:'Demo: Family house',loc:'Malindi',mode:'sale',type:'house',price:'KES 24,500,000',bed:4,bath:3,furn:'Unfurnished',avail:'Available now',ver:'Demonstration listing'},
{t:'Demo: Beach apartment',loc:'Watamu',mode:'sale',type:'apartment',price:'KES 9,800,000',bed:1,bath:1,furn:'Furnished',avail:'Under offer',ver:'Demonstration listing'}];
const grid=document.getElementById('listings'),chips=document.querySelectorAll('.chip');
let f='all';
function draw(){
 const list=LISTINGS.filter(l=>f==='all'||l.mode===f||l.type===f);
 grid.innerHTML=list.map(l=>`<article class="card"><div class="ph"><span>Photo placeholder</span></div><div class="body"><span class="tag">${l.loc} · For ${l.mode}</span><h3>${l.t}</h3><span class="price">${l.price}</span><div class="facts"><span>${l.bed} bed</span><span>${l.bath} bath</span><span>${l.furn}</span></div><span class="status">${l.avail} · ${l.ver}</span></div></article>`).join('')||'<p>No properties match this filter yet.</p>';
}
chips.forEach(c=>c.addEventListener('click',()=>{f=c.dataset.f;chips.forEach(x=>x.setAttribute('aria-pressed',x===c));draw()}));
draw();
