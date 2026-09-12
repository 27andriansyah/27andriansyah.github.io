/* Tampilan kategori Produk Digital: Pulsa & Data, E-Wallet, Game, Voucher, Hiburan, PPOB. */
const DIGITAL_UI_ORDER=[
  ['pulsa','📱 Pulsa & Paket Data'],
  ['ewallet','💳 E-Wallet'],
  ['game','🎮 Game'],
  ['voucher','🎁 Voucher Digital'],
  ['hiburan','🎬 Hiburan & Langganan'],
  ['ppob','⚡ PPOB & Tagihan']
];
function organizeDigitalProducts(){
  const grid=document.querySelector('#productGrid');
  if(!grid || grid.dataset.organizing==='1') return;
  const cards=[...grid.querySelectorAll(':scope > .product')];
  if(!cards.length) return;
  grid.dataset.organizing='1';
  const byId=new Map(PRODUCTS.map(p=>[String(p.id),p]));
  const groups=new Map(DIGITAL_UI_ORDER.map(([cat])=>[cat,[]]));
  cards.forEach(card=>{const p=byId.get(card.dataset.product);if(p&&groups.has(p.cat))groups.get(p.cat).push(card)});
  grid.innerHTML='';
  DIGITAL_UI_ORDER.forEach(([cat,title])=>{
    const items=groups.get(cat)||[];if(!items.length)return;
    const section=document.createElement('section');
    section.className='digital-category-block';
    const heading=document.createElement('div');
    heading.className='digital-category-heading';
    heading.innerHTML=`<h3>${title}</h3><small>${items.length} item</small>`;
    section.appendChild(heading);
    const list=document.createElement('div');
    list.className='product-grid digital-category-grid';
    items.forEach(card=>list.appendChild(card));
    section.appendChild(list);grid.appendChild(section);
  });
  delete grid.dataset.organizing;
}
document.addEventListener('DOMContentLoaded',()=>{
  const grid=document.querySelector('#productGrid');
  if(!grid)return;
  new MutationObserver(()=>{if(!grid.querySelector('.digital-category-block'))organizeDigitalProducts()}).observe(grid,{childList:true});
  organizeDigitalProducts();
});
