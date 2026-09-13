'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const products = [
  { id: 1, name: 'Beras Premium 5 kg', price: 78000 },
  { id: 2, name: 'Minyak Goreng 2 L', price: 36000 },
  { id: 3, name: 'Gula Pasir 1 kg', price: 18000 },
]

const money = (n:number) => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n)

export default function CheckoutPage(){
  const router = useRouter()
  const [items] = useState([{...products[0],qty:1},{...products[1],qty:1}])
  const [form,setForm] = useState({name:'',phone:'',address:'',payment:'COD'})
  const [done,setDone] = useState(false)
  const subtotal = useMemo(()=>items.reduce((s,p)=>s+p.price*p.qty,0),[items])
  const shipping = subtotal >= 100000 ? 0 : 10000
  const total = subtotal + shipping
  const submit = (e:React.FormEvent)=>{e.preventDefault();setDone(true)}
  if(done) return <main className='container checkoutPage'><div className='success'><div className='successIcon'>✓</div><h1>Pesanan diterima</h1><p>Data checkout berhasil divalidasi. Integrasi payment gateway dan penyimpanan order produksi dapat diaktifkan melalui Supabase.</p><button className='cta' onClick={()=>router.push('/')}>Kembali ke marketplace</button></div></main>
  return <main className='container checkoutPage'><button className='back' onClick={()=>router.back()}>← Kembali belanja</button><div className='checkoutGrid'><section><h1>Checkout</h1><p className='muted'>Lengkapi data pengiriman dan pembayaran.</p><form onSubmit={submit} className='formCard'>{[['name','Nama lengkap','Masukkan nama'],['phone','WhatsApp','08xxxxxxxxxx'],['address','Alamat lengkap','Nama jalan, kecamatan, kabupaten']].map(([key,label,placeholder])=><label key={key}>{label}<input required value={form[key as keyof typeof form]} placeholder={placeholder} onChange={e=>setForm({...form,[key]:e.target.value})}/></label>)}<label>Metode pembayaran<select value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})}><option>COD</option><option>Transfer bank</option><option>QRIS</option></select></label><button className='submit' type='submit'>Buat pesanan • {money(total)}</button></form></section><aside className='summary'><h2>Ringkasan</h2>{items.map(p=><div className='summaryRow' key={p.id}><span>{p.name} × {p.qty}</span><b>{money(p.price*p.qty)}</b></div>)}<hr/><div className='summaryRow'><span>Subtotal</span><b>{money(subtotal)}</b></div><div className='summaryRow'><span>Pengiriman</span><b>{shipping?money(shipping):'Gratis'}</b></div><div className='summaryTotal'><span>Total</span><b>{money(total)}</b></div></aside></div></main>
}
