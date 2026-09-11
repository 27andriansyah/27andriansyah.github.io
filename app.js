const CONFIG={whatsapp:'62816951127',storageKey:'27mart-cart-v1'};
let products=[],cart=loadCart(),activeCategory='mobile',activeProvider='all',searchTerm='',sortMode='default';
const logoBase='https://cdn.jsdelivr.net/npm/idn-finlogos@2/dist/icons/';
const providerMeta={
  Telkomsel:{mark:'TELKOMSEL',class:'telkomsel',logo:logoBase+'telkomsel.svg'},
  'by.U':{mark:'by.U',class:'byu',logo:logoBase+'by-u.svg'},
  IM3:{mark:'IM3',class:'im3',logo:logoBase+'im3.svg'},
  Tri:{mark:'3',class:'tri',logo:logoBase+'tri.svg'},
  XL:{mark:'XL',class:'xl',logo:logoBase+'xl.svg'},
  AXIS:{mark:'AXIS',class:'axis',logo:logoBase+'axis.svg'},
  Smartfren:{mark:'smartfren',class:'smartfren',logo:logoBase+'smartfren.svg'},
  'Live.On':{mark:'LIVE.ON',class:'liveon',logo:logoBase+'live-on.svg'},
  PLN:{mark:'PLN',class:'pln',logo:logoBase+'pln.svg'},
  DANA:{mark:'DANA',class:'dana',logo:logoBase+'dana.svg'},
  GoPay:{mark:'GoPay',class:'gopay',logo:logoBase+'gopay.svg'},
  OVO:{mark:'OVO',class:'ovo',logo:logoBase+'ovo.svg'},
  ShopeePay:{mark:'ShopeePay',class:'shopeepay',logo:logoBase+'shopee-pay.svg'},
  LinkAja:{mark:'LinkAja',class:'linkaja',logo:logoBase+'linkaja.svg'}
};
const categories=[['mobile','PULSA'],['data-voucher','PAKET DATA & VOUCHER'],['ewallet','E-WALLET'],['utility','PLN & WIFI']];
const allowedCategories=new Set(categories.map(x=>x[0]));
const categoryTitles={mobile:'PULSA','data-voucher':'PAKET DATA & VOUCHER',ewallet:'E-WALLET',utility:'PLN & WIFI'};
const ewalletDenoms=[10000,20000,25000,50000,75000,100000,150000,200000,250000,500000,1000000];
const rp=n=>'Rp '+Number(n||0).toLocaleString('id-ID');
function normCat(c,p=''){c=String(c||'').toLowerCase().trim();const text=`${c} ${p}`.toLowerCase().replace(/[\s_-]+/g,' ');if(/pulsa/.test(text)&&!/(data|paket|voucher|kuota)/.test(text))return'mobile';if(/data|paket data|voucher|kuota/.test(text))return'data-voucher';if(/pln|token listrik|wifi|wi fi/.test(text))return'utility';if(/e wallet|ewallet|ewalet|e walet/.test(text))return'ewallet';return c}
function normalize(p){const category=normCat(p.category,p.product);return{id:String(p.id??''),category,provider:String(p.provider||'Layanan'),product:String(p.product||''),nominal:Number(p.nominal||0),price:Number(p.price||0),status:String(p.status||'active')}}
function expandEwallet(base){const names=[...new Set(base.filter(p=>p.category==='ewallet').map(p=>p.provider))];const wallets=names.flatMap(provider=>ewalletDenoms.map(n=>({id:`wallet-${slug(provider)}-${n}`,category:'ewallet',provider,product:`Top Up ${provider} ${rp(n)}`,nominal:n,price:n+2000,status:'active'})));return[...base.filter(p=>p.category!=='ewallet'),...wallets]}
function loadCart(){try{return JSON.parse(localStorage.getItem(CONFIG.storageKey)||'[]')}catch{return[]}}
function saveCart(){localStorage.setItem(CONFIG.storageKey,JSON.stringify(cart));updateCartCount()}
function updateCartCount(){document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cart.length)}
function visible(){return products.filter(p=>allowedCategories.has(p.category)&&p.status!=='inactive'&&p.category===activeCategory&&(!searchTerm||`${p.provider} ${p.product} ${p.nominal}`.toLowerCase().includes(searchTerm))&&(activeProvider==='all'||p.provider===activeProvider))}
function sorted(a){a=[...a];if(sortMode==='cheap')a.sort((x,y)=>x.price-y.price);if(sortMode==='expensive')a.sort((x,y)=>y.price-x.price);if(sortMode==='az')a.sort((x,y)=>x.product.localeCompare(y.product,'id'));return a}
function renderCategories(){const e=document.querySelector('#categoryChips');if(!e)return;e.innerHTML=categories.map(c=>`<button class="chip ${activeCategory===c[0]?'active':''}" data-cat="${c[0]}">${c[1]}</button>`).join('');e.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;activeProvider='all';render()})}
function esc(s){return String(s).replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]))}
function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-')}
function logo(meta){if(meta.logo)return`<span class="provider-logo ${meta.class} wallet-logo-real"><img src="${meta.logo}" alt="${esc(meta.mark)}" loading="eager"></span>`;return`<span class="provider-logo ${meta.class} logo-icon"><span class="brand-icon">${esc(meta.icon||meta.mark||'✦')}</span></span>`}
function render(){renderCategories();const arr=sorted(visible()),groups=[...new Set(arr.map(p=>p.provider))],g=document.querySelector('#catalog'),t=document.querySelector('#catalogTitle'),c=document.querySelector('#resultCount');if(t)t.textContent=categoryTitles[activeCategory];if(c)c.textContent=`${arr.length} produk · ${groups.length} layanan`;if(!g)return;if(!arr.length){g.innerHTML='<div class="empty">Belum ada produk pada kategori ini.</div>';return}g.innerHTML=groups.map(pr=>{const items=arr.filter(p=>p.provider===pr),m=providerMeta[pr]||{mark:pr.slice(0,8).toUpperCase(),class:'generic',icon:'✦'};return`<article class="provider-card"><button class="provider-head" type="button" aria-expanded="false">${logo(m)}<span class="provider-copy"><b>${esc(pr)}</b><small>${items.length} produk · mulai ${rp(Math.min(...items.map(x=>x.price)))}</small></span><span class="chevron">›</span></button><div class="provider-products">${items.map(row).join('')}</div></article>`}).join('');g.querySelectorAll('.provider-head').forEach(b=>b.onclick=()=>{const card=b.parentElement;card.classList.toggle('open');b.setAttribute('aria-expanded',card.classList.contains('open'))});g.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>openDetail(b.dataset.buy));g.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>addToCart(b.dataset.add));updateCartCount()}
function row(p){return`<div class="product-row"><div><strong>${esc(p.product)}</strong><small>${p.category==='ewallet'?`Saldo ${rp(p.nominal)} · Top Up`:p.nominal?rp(p.nominal):'Nomor / ID pelanggan'}</small></div><div class="product-price">${rp(p.price)}</div><button class="mini-add" data-add="${esc(p.id)}">+</button><button class="mini-buy" data-buy="${esc(p.id)}">Beli</button></div>`}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;cart.push(p);saveCart();toast('Ditambahkan ke keranjang')}
function openDetail(id){const p=products.find(x=>x.id===id);if(!p)return;document.querySelector('#detailBody').innerHTML=`<div class="detail-logo">${logo(providerMeta[p.provider]||{mark:p.provider,class:'generic',icon:'✦'})}</div><span class="eyebrow">${esc(categoryTitles[p.category])}</span><h2>${esc(p.product)}</h2><p class="detail-nominal">${p.category==='ewallet'?`Saldo ${rp(p.nominal)}`:(p.nominal?rp(p.nominal):'Gunakan nomor / ID pelanggan')}</p><strong class="detail-price">${rp(p.price)}</strong><label class="field-label">Nomor HP / ID pelanggan<input id="targetInput" inputmode="numeric" placeholder="Masukkan nomor tujuan"></label><div class="detail-actions"><button class="btn secondary dark-btn" onclick="closeModal('detailModal')">Batal</button><button class="btn primary" onclick="detailAdd('${esc(p.id)}')">Tambah ke Keranjang</button></div>`;openModal('detailModal')}
function detailAdd(id){const target=document.querySelector('#targetInput')?.value.trim();if(!target||target.length<4)return alert('Masukkan nomor HP atau ID pelanggan.');addToCart(id);closeModal('detailModal');openCart(target)}
function openCart(target=''){const x=document.querySelector('#cartTarget');if(x)x.value=target;renderCart();openModal('cartModal')}
function renderCart(){const e=document.querySelector('#cartItems'),t=document.querySelector('#cartTotal');if(!e||!t)return;if(!cart.length){e.innerHTML='<div class="empty-cart">Keranjang masih kosong.</div>';t.textContent=rp(0);return}e.innerHTML=cart.map((p,i)=>`<div class="cart-item"><div><b>${esc(p.product)}</b><small>${esc(p.provider)}</small></div><strong>${rp(p.price)}</strong><button onclick="removeCart(${i})">×</button></div>`).join('');t.textContent=rp(cart.reduce((n,p)=>n+p.price,0))}
function removeCart(i){cart.splice(i,1);saveCart();renderCart()}
function checkoutWA(){if(!cart.length)return alert('Keranjang masih kosong.');const target=document.querySelector('#cartTarget')?.value.trim();if(!target)return alert('Masukkan nomor HP / ID pelanggan.');const method=document.querySelector('#paymentMethod')?.value||'Belum dipilih';const total=cart.reduce((n,p)=>n+p.price,0);const items=cart.map((p,i)=>`${i+1}. ${p.product} — ${rp(p.price)}`).join('\n');window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`Halo 27 Mart, saya ingin melakukan pemesanan.\n\n${items}\n\nNomor/ID: ${target}\nTotal: ${rp(total)}\nPembayaran: ${method}`)}`,'_blank')}
function openModal(id){document.getElementById(id)?.classList.add('show');document.body.classList.add('modal-open')}
function closeModal(id){document.getElementById(id)?.classList.remove('show');if(!document.querySelector('.modal.show'))document.body.classList.remove('modal-open')}
function toast(s){const t=document.querySelector('#toast');if(!t)return;t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function applyPaymentAccountNames(){document.querySelectorAll('.pay-method small').forEach(e=>{if(/a\.n\./i.test(e.textContent))e.textContent=e.textContent.replace(/a\.n\.[^·]+/i,'a.n. ANDRIANSYAH')})}
function enhanceHomeAndPayments(){const p=document.querySelector('#paymentMethod');if(p&&!p.querySelector('option[value="COD"]')){const o=document.createElement('option');o.value='COD';o.textContent='COD (Bayar di Tempat)';p.appendChild(o)}applyPaymentAccountNames()}
async function init(){try{const r=await fetch('produk.json',{cache:'no-store'});products=expandEwallet((await r.json()).map(normalize));render()}catch(e){const g=document.querySelector('#catalog');if(g)g.innerHTML='<div class="empty">Data produk belum dapat dimuat.</div>'}document.querySelector('#search')?.addEventListener('input',e=>{searchTerm=e.target.value.toLowerCase().trim();render()});document.querySelector('#sort')?.addEventListener('change',e=>{sortMode=e.target.value;render()});document.querySelector('#openCartTop')?.addEventListener('click',e=>{e.preventDefault();openCart()});document.querySelector('#openCartFab')?.addEventListener('click',()=>openCart())}
document.addEventListener('DOMContentLoaded',()=>{init();enhanceHomeAndPayments()});
