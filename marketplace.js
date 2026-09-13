(()=>{
  const boot=()=>{
    const grid=document.querySelector('#productGrid');
    const host=document.querySelector('.marketplace-shell');
    if(!grid||!host)return;
    const head=host.querySelector('[data-mp-head]');
    const chips=host.querySelector('[data-mp-chips]');
    const count=host.querySelector('[data-mp-count]');
    const cartBtn=host.querySelector('[data-mp-cart]');
    const categories=[['all','Semua'],['sembako','Sembako'],['sayuran','Sayur & Bumbu'],['digital','Produk Digital'],['pulsa','Pulsa'],['ewallet','E-Wallet'],['ppob','PPOB']];
    if(chips){chips.innerHTML=categories.map(([id,label])=>`<button class="mp-chip ${id==='all'?'active':''}" type="button" data-mp-category="${id}">${label}</button>`).join('');chips.addEventListener('click',e=>{const b=e.target.closest('[data-mp-category]');if(!b)return;const id=b.dataset.mpCategory;chips.querySelectorAll('.mp-chip').forEach(x=>x.classList.toggle('active',x===b));if(typeof setCategory==='function'){if(id==='sayuran'){state.category='sembako';state.search='';render();setTimeout(()=>{const cards=[...document.querySelectorAll('#productGrid .product')];cards.forEach(c=>{const p=PRODUCTS.find(x=>x.id===Number(c.dataset.product));c.style.display=p?.cat==='sayuran'?'':'none'});},0)}else if(['pulsa','ewallet','ppob'].includes(id)){state.category='digital';state.search='';render();setTimeout(()=>{const cards=[...document.querySelectorAll('#productGrid .product')];cards.forEach(c=>{const p=PRODUCTS.find(x=>x.id===Number(c.dataset.product));c.style.display=p?.cat===id?'':'none'});},0)}else setCategory(id)};head&&(head.textContent=id==='all'?'Semua Produk':categories.find(x=>x[0]===id)?.[1]||'Produk');if(count)count.textContent='';}})});
    if(cartBtn)cartBtn.addEventListener('click',()=>document.querySelector('#openCart')?.click());
    const sync=()=>{if(count&&window.PRODUCTS)count.textContent=`${document.querySelectorAll('#productGrid .product').length} produk`;};
    new MutationObserver(sync).observe(grid,{childList:true});sync();
  };
  document.addEventListener('DOMContentLoaded',boot);
})();
