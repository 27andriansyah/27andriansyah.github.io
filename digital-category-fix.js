/* Normalisasi kategori Produk Digital 27 Mart.
   File ini memisahkan item katalog berdasarkan jenis layanan tanpa mengubah daftar produk/harga.
*/
const DIGITAL_CATEGORY_MAP={
  game:new Set(Array.from({length:16},(_,i)=>187+i)),
  voucher:new Set(Array.from({length:10},(_,i)=>203+i)),
  hiburan:new Set(Array.from({length:7},(_,i)=>213+i)),
  ppob:new Set(Array.from({length:15},(_,i)=>220+i))
};
const DIGITAL_CAT_IDS=new Set([9,10,11,12,13,14,15,16,17,18,...Array.from({length:119},(_,i)=>116+i)]);
for(const cat of ['game','voucher','hiburan','ppob']) DIGITAL.add(cat);
PRODUCTS.forEach(p=>{
  for(const [cat,ids] of Object.entries(DIGITAL_CATEGORY_MAP)) if(ids.has(p.id)) p.cat=cat;
});
window.MART_DIGITAL_IDS=DIGITAL_CAT_IDS;
window.MART_PRODUCTS=Object.fromEntries(PRODUCTS.map(p=>[p.id,[p.name,p.price,p.unit,p.cat]]));
