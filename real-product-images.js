/* 27 Mart — real product photos
   Direct references below are verified retail/product images found for the named SKU.
   Other packaged products are resolved lazily from Open Food Facts by product name.
   No generated/generic grocery photo is used here. */
const MART_REAL_IMAGES={
  'Indomie Ayam Bawang':'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/94/MTA-3452755/indomie_indomie-ayam-bawang-mie-instant_full02.jpg',
  'Indomie Kari Ayam':'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/MTA-21626664/indomie_indomie_kari_ayam_72gr_pak_full01_78o1klf.jpg',
  'Indomie Soto Ayam':'https://s3.belanjapasti.com/media/image/indomie-soto-70g-549594.jpg',
  'Indomie Rendang':'https://down-my.img.susercontent.com/file/6654904c256e24f816a35143df8a3b7f',
  'Mie Sedaap Goreng':'https://www.tokoindonesia.co.uk/wp-content/uploads/2020/04/MIesedapgoreng.png',
  'Mie Sedaap Soto':'https://m.media-amazon.com/images/I/61XK6CXdDiL._SL1080_.jpg',
  'Pop Mie Ayam':'https://cdn11.bigcommerce.com/s-5wf0xbtgyb/images/stencil/2560w/products/3128/5145/_ORIPDM16-29jun17_A00020000027_0__56908.1747292129.jpg?c=2',
  'Beras Setra Ramos 5 kg':'https://cdn.ralali.id/assets/img/Libraries/100000091427001_FS-Beras-Setra-Ramos-Premium-5-kg-74735ced1e656e551e64bb50f9939152-1.jpg',
  'Minyak Goreng':'https://down-id.img.susercontent.com/file/0030c5133ccc291cc03c8174bd569957',
  'Gula Pasir':'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/98/MTA-10790682/gulaku_gulaku_premium_full00.jpg',
  'Kecap Manis 600 ml':'https://down-my.img.susercontent.com/file/my-11134207-23020-dbj0gnrtypnved',
  'Telur Ayam 10 butir':'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/96/MTA-182386122/brd-60848_telur-ayam-negeri-segari-10-butir-10-pcs-pack-_full01-1e2b7a2e.jpg'
};
const photoCache=new Map();
const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const tokens=s=>normalize(s).split(' ').filter(x=>x.length>2);
function directRealPhoto(name){return MART_REAL_IMAGES[name]||''}
async function findOpenFoodFactsPhoto(name){
  if(photoCache.has(name))return photoCache.get(name);
  const direct=directRealPhoto(name);if(direct){photoCache.set(name,direct);return direct}
  try{
    const url='https://world.openfoodfacts.org/api/v2/search?search_terms='+encodeURIComponent(name)+'&fields=product_name,image_front_url,brands&json=1&page_size=5';
    const r=await fetch(url,{headers:{Accept:'application/json'}});if(!r.ok)throw new Error('OFF '+r.status);
    const data=await r.json();const wanted=tokens(name);
    const hit=(data.products||[]).find(p=>{const got=normalize(p.product_name||'');return p.image_front_url&&wanted.length&&wanted.filter(t=>got.includes(t)).length>=Math.max(1,Math.ceil(wanted.length*.55))});
    const image=hit?.image_front_url||'';photoCache.set(name,image);return image;
  }catch{photoCache.set(name,'');return ''}
}
function applyRealPhoto(img){
  if(!img||!img.dataset.productName)return;
  const name=img.dataset.productName;
  const direct=directRealPhoto(name);
  if(direct){img.src=direct;img.dataset.realPhoto='1';return}
  findOpenFoodFactsPhoto(name).then(src=>{if(src){img.src=src;img.dataset.realPhoto='1'}});
}
function scanRealPhotos(root=document){root.querySelectorAll('img.real-product-photo').forEach(img=>applyRealPhoto(img))}
function markProductImages(){document.querySelectorAll('.product').forEach(card=>{const id=Number(card.dataset.product);const p=window.MART_PRODUCTS&&window.MART_PRODUCTS[id];const img=card.querySelector('img.real-product-photo');if(img&&p)img.dataset.productName=p[0]})}
document.addEventListener('DOMContentLoaded',()=>{
  const grid=document.querySelector('#productGrid');
  const run=()=>{markProductImages();scanRealPhotos(document)};
  run();
  if(grid)new MutationObserver(()=>setTimeout(run,0)).observe(grid,{childList:true,subtree:true});
});
