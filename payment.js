const rupiah=n=>'Rp '+Number(n||0).toLocaleString('id-ID');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let order={};try{order=JSON.parse(sessionStorage.getItem('27mart-order')||'{}')}catch{}
const cart=Array.isArray(order.cart)?order.cart:[];
const subtotal=Number(order.subtotal??cart.reduce((sum,row)=>sum+Number(row.price||0)*Number(row.qty||0),0));
const deliveryFee=Number(order.deliveryFee||0);
const total=Number(order.total??subtotal+deliveryFee);
document.querySelector('#orderId').textContent=order.orderId||'-';
document.querySelector('#orderCount').textContent=`${cart.reduce((s,x)=>s+Number(x.qty||0),0)} item`;
document.querySelector('#orderItems').innerHTML=cart.length?cart.map(row=>{const name=row.name||'Produk';const unit=row.unit||'';const price=Number(row.price||0);return `<div class="order-line"><div><strong>${esc(name)}</strong><small>${esc(unit)} · x${Number(row.qty||0)}</small></div><b>${rupiah(price*Number(row.qty||0))}</b></div>`}).join(''):'<div class="order-empty">Pesanan tidak ditemukan. Silakan kembali ke katalog.</div>';
const totalEl=document.querySelector('#orderTotal');if(totalEl)totalEl.textContent=rupiah(total);
if(cart.length&&deliveryFee){const wrap=document.querySelector('#orderItems');wrap.insertAdjacentHTML('beforeend',`<div class="order-line"><div><strong>Pengantaran lokal</strong><small>Biaya layanan</small></div><b>${rupiah(deliveryFee)}</b></div>`)}
const summary=[];if(order.name)summary.push(`<span><b>Nama</b>${esc(order.name)}</span>`);if(order.phone)summary.push(`<span><b>WhatsApp</b>${esc(order.phone)}</span>`);if(order.payment)summary.push(`<span><b>Metode</b>${esc(order.payment)}</span>`);if(order.address)summary.push(`<span><b>Alamat</b>${esc(order.address)}</span>`);document.querySelector('#customerSummary').innerHTML=summary.join('');
document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(btn.dataset.copy);const old=btn.textContent;btn.textContent='Tersalin ✓';setTimeout(()=>btn.textContent=old,1400)}catch{alert('Nomor: '+btn.dataset.copy)}}));
async function confirmPayment(){
 if(!cart.length){alert('Pesanan tidak ditemukan. Silakan kembali ke katalog.');return}
 const button=document.querySelector('#confirmPayment');if(button){button.disabled=true;button.textContent='Membuka WhatsApp…'}
 let serverConfirmed=false;
 try{const {error}=await window.martDB.rpc('confirm_order_payment',{p_order_code:order.orderId});if(error)throw error;serverConfirmed=true;order.status='Menunggu verifikasi';order.paidAt=new Date().toISOString();try{const orders=JSON.parse(localStorage.getItem('27mart-orders')||'[]');const i=orders.findIndex(x=>x.orderId===order.orderId);if(i>=0){orders[i].status='Menunggu verifikasi';orders[i].paidAt=order.paidAt;localStorage.setItem('27mart-orders',JSON.stringify(orders))}}catch{}}catch(e){console.warn('Server confirmation unavailable:',e)}
 const lines=cart.map(row=>`• ${row.name||'Produk'} (${row.unit||''}) x${row.qty} = ${rupiah(Number(row.price||0)*Number(row.qty||0))}`);
 const msg=['Halo 27 Mart 👋',`Konfirmasi pembayaran pesanan ${order.orderId||'-'}:`,'',`Nama: ${order.name||'-'}`,`WhatsApp: ${order.phone||'-'}`,...lines,'',`Subtotal: ${rupiah(subtotal)}`,deliveryFee?`Pengantaran: ${rupiah(deliveryFee)}`:null,`Total: ${rupiah(total)}`,order.payment?`Metode pembayaran: ${order.payment}`:null,order.address?`Alamat: ${order.address}`:null,order.target?`Nomor/ID tujuan: ${order.target}`:null,order.note?`Catatan: ${order.note}`:null,'','Saya sudah melakukan pembayaran. Mohon dicek dan dikonfirmasi. Saya siap mengirim bukti pembayaran jika diperlukan.'].filter(Boolean).join('\n');
 window.open(`https://wa.me/62816951127?text=${encodeURIComponent(msg)}`,'_blank');
 if(!serverConfirmed)alert('WhatsApp dibuka. Status server belum berubah karena fungsi konfirmasi Supabase belum tersedia; jalankan pembaruan supabase-schema.sql.');
 if(button){button.disabled=false;button.textContent='Saya sudah bayar → Konfirmasi WhatsApp'}
}
document.querySelector('#confirmPayment').addEventListener('click',confirmPayment);
