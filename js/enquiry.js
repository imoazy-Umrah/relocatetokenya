/* Request details pop-up for estate pages (uses Web3Forms). */
(()=>{
const KEY='aef59eb2-b293-4996-8d7a-4e0ede1905c8';
const h1=document.querySelector('h1');
const base=h1?h1.textContent.trim():document.title;
const dlg=document.createElement('dialog');dlg.className='enquiry';
dlg.innerHTML='<div class="enq-box"><button type="button" class="enq-x" aria-label="Close">Close</button><h3>Request details</h3><p class="enq-prop"></p><form class="enq-form"><label>Full name<input name="name" type="text" autocomplete="name" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Phone or WhatsApp<input name="phone" type="tel" autocomplete="tel" required></label><label>Message (optional)<textarea name="message" rows="3"></textarea></label><input type="checkbox" name="botcheck" class="enq-bot" tabindex="-1" autocomplete="off"><button type="submit" class="btn">Send request</button><p class="enq-fine">We use your details only to reply to your enquiry.</p></form><p class="enq-status" role="status"></p></div>';
document.body.append(dlg);
const form=dlg.querySelector('form'),prop=dlg.querySelector('.enq-prop'),stat=dlg.querySelector('.enq-status'),btn=dlg.querySelector('button[type=submit]');
let cur={};
dlg.querySelector('.enq-x').addEventListener('click',()=>dlg.close());
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
function open(c){cur=c;prop.textContent=[c.title,c.price].filter(Boolean).join(' · ');stat.textContent='';stat.className='enq-status';form.hidden=false;dlg.showModal()}
// Any button with data-enquire opens the pop-up
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-enquire]');if(!b)return;e.preventDefault();
 open({title:b.dataset.title||base,location:b.dataset.location||'',price:b.dataset.price||'',ref:b.dataset.ref||''});
});
// Unit cards (.card-guide) that have a WhatsApp button get a Request details button automatically
document.querySelectorAll('.card-guide').forEach(c=>{
 const wa=c.querySelector('a[href^="https://wa.me/"]');if(!wa)return;
 const cat=(c.querySelector('.card-cat')||{}).textContent||'';
 const price=(c.querySelector('h3')||{}).textContent||'';
 const b=document.createElement('button');b.type='button';b.className='btn ghost sm';b.textContent='Request details';
 b.setAttribute('data-enquire','');b.dataset.title=base+(cat?' · '+cat.trim():'');b.dataset.price=price.trim();
 b.style.marginLeft='10px';wa.after(b);
});
form.addEventListener('submit',async e=>{
 e.preventDefault();
 const fd=new FormData(form);
 const body={access_key:KEY,subject:'Property enquiry: '+(cur.title||base),from_name:'Relocate to Kenya website',name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),message:fd.get('message')||'(no message)',property:cur.title||base,reference:cur.ref||'',location:cur.location||'',price:cur.price||'',page:location.href,botcheck:fd.get('botcheck')?true:false};
 btn.disabled=true;btn.textContent='Sending...';
 try{
  const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
  const d=await r.json();if(!d.success)throw new Error();
  form.reset();form.hidden=true;stat.className='enq-status ok';stat.textContent='Thank you. We have received your request and will be in touch soon.';
 }catch(err){stat.className='enq-status bad';stat.textContent='Sorry, that did not send. Please try again or message us on WhatsApp.'}
 btn.disabled=false;btn.textContent='Send request';
});
})();
