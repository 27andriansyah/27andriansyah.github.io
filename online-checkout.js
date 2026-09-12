const MART_PRODUCTS=window.MART_PRODUCTS||{};
const MART_DIGITAL=window.MART_DIGITAL_IDS||new Set([9,10,11,12,13,14,15,16,17,18]);
const martCleanPhone=v=>String(v||'').replace(/\D/g,'');
const martOrderCode=()=>{const d=new Date(),date=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('');return `27M-${date}-${Math.random().toString(36).slice(2,6).toUpperCase()}`};
function martLocalSave(order){try{const a=JSON.parse(localStorage.getItem('27mart-orders')||'[]');a.unshift(order);localStorage.setItem('27mart-orders',JSON.stringify(a.slice(0,20)))}catch{}}
async function martCreateOnlineOrder(order){
 const {data,error}=await window.martDB.from('orders').insert({order_code:order.orderId,customer_name:order.name,customer_phone:order.phone,target:order.target||null,address:order.address||null,note:order.note||null,payment_method:order.payment,total:order.total,status:order.status,created_at:order.createdAt}).select('id,order_code').single();
 if(error)throw error;
 const items=order.cart.map(r=>{const p=MART_PRODUCTS[r.id];return {order_id:data.id,product_id:r.id,product_name:p?.[0]||'Produk',unit:p?.[2]||'',price:p?.[1]||0,qty:r.qty}});
 const itemResult=await window.martDB.from('order_items').insert(items);if(itemResult.error)throw itemResult.error;return data;
}
async function martOnlineCheckout(){
 const cart=(()=>{try{return JSON.parse(localStorage.getItem('27mart-cart')||'[]')}catch{return[]}})().filter(r=>MART_PRODUCTS[r.id]);
 if(!cart.length){alert('Keranjang masih kosong.');return}
 const name=document.querySelector('#customerName').value.trim(),phone=martCleanPhone(document.querySelector('#customerPhone').value),target=martCleanPhone(document.querySelector('#targetInput').value),address=document.querySelector('#customerAddress').value.trim(),note=document.querySelector('#customerNote').value.trim(),payment=document.querySelector('#paymentMethod').value;
 const hasDigital=cart.some(r=>MART_DIGITAL.has(r.id)),hasPhysical=cart.some(r=>!MART_DIGITAL.has(r.id));
 if(name.length<2||name.length>60){alert('Isi nama lengkap terlebih dahulu.');return}if(phone.length<8||phone.length>16){alert('Isi nomor WhatsApp 8–16 digit.');return}if(hasDigital&&(target.length<8||target.length>16)){alert('Untuk produk digital, isi nomor HP / ID pelanggan 8–16 digit.');return}if(hasPhysical&&address.length<8){alert('Isi alamat pengiriman untuk barang fisik.');return}if(!payment){alert('Pilih metode pembayaran terlebih dahulu.');return}
 const total=cart.reduce((s,r)=>s+(MART_PRODUCTS[r.id][1]*r.qty),0);const order={orderId:martOrderCode(),cart:cart.map(r=>({...r})),name,phone,target,address,note,payment,total,status:'Menunggu pembayaran',createdAt:new Date().toISOString()};
 const button=document.querySelector('#checkout');if(button){button.disabled=true;button.textContent='Menyimpan pesanan…'}
 try{await martCreateOnlineOrder(order);martLocalSave(order);try{sessionStorage.setItem('27mart-order',JSON.stringify(order))}catch{}localStorage.removeItem('27mart-cart');window.location.href='payment.html'}catch(error){console.error(error);alert('Pesanan belum tersimpan ke server. Pastikan tabel Supabase sudah dibuat dari supabase-schema.sql.\n\nDetail: '+(error?.message||'Gagal terhubung ke database.'));if(button){button.disabled=false;button.textContent='Lanjut ke Pembayaran →'}}
}
document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('#checkout');if(b)b.onclick=martOnlineCheckout});
