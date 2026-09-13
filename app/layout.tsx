import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '27 Mart — Marketplace Belanja Harian',
  description: 'Marketplace belanja harian cepat, aman, dan nyaman.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://27andriansyah.my.id')
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>
}
