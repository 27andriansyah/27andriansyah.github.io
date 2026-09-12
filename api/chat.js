export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.XAI_API_KEY)return res.status(503).json({error:'XAI_API_KEY belum terpasang di Vercel.'});
  try{
    const body=req.body||{};
    const message=String(body.message||'').trim();
    const context=String(body.context||'').slice(0,6000);
    if(!message)return res.status(400).json({error:'Pesan kosong.'});
    if(message.length>2000)return res.status(400).json({error:'Pesan terlalu panjang.'});
    const system=`Kamu adalah AI resmi 27 Mart, asisten belanja dan pembayaran berbahasa Indonesia. Bantu pengguna memilih produk, memahami layanan, dan menyiapkan langkah pembelian. Layanan utama: PULSA; PAKET DATA & VOUCHER; E-WALLET; PLN & WIFI; serta belanja sayuran, bumbu-bumbu, dan bahan pokok. Jawab singkat, jelas, ramah, dan jangan mengarang harga atau stok. Jika data katalog tidak tersedia, katakan terus terang. Jangan pernah meminta atau menampilkan API key, password, PIN, OTP, atau data rahasia. Untuk transaksi final, arahkan pengguna menggunakan checkout/WhatsApp 27 Mart.\n\nKonteks katalog saat ini:\n${context}`;
    const r=await fetch('https://api.x.ai/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization:`Bearer ${process.env.XAI_API_KEY}`},body:JSON.stringify({model:'grok-4.6',store:false,input:[{role:'system',content:system},{role:'user',content:message}]})});
    const data=await r.json();
    if(!r.ok)return res.status(r.status).json({error:data?.error?.message||'Gagal menghubungi Grok.'});
    const text=data.output_text||data.output?.flatMap(x=>Array.isArray(x.content)?x.content.map(c=>c.text||''):[]).filter(Boolean).join('\n')||'';
    return res.status(200).json({text:text||'Maaf, Grok belum memberikan jawaban.'});
  }catch(e){return res.status(500).json({error:'Terjadi kesalahan pada layanan AI.'});}
}
