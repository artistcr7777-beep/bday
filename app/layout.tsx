import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Cormorant_Garamond, Manrope } from 'next/font/google'
import { birthday } from '@/lib/birthday'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' })
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-hand', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: `${birthday.name} · A Birthday Chronicle`,
  description: `An S-rank birthday mission for ${birthday.name}. A little chaos, a lot of gratitude, and a whole adventure.`,
  robots: { index: false, follow: false },
  icons: { icon: '/birthday-icon.svg' },
  openGraph: {
    title: `Happy Birthday, ${birthday.name}.`,
    description: 'Some people deserve a whole adventure. This one’s for you.',
    type: 'website',
    images: [{ url: '/images/hidden-leaf-sunset.webp', width: 1536, height: 1024, alt: 'A golden sunset over a shinobi village' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#141814',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable} ${caveat.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
