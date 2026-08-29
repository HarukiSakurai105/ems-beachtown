import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

const siteUrl = 'https://ems-beachtown.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Beach Town EMS Protocol Center',
  description: 'Trung tâm quy chuẩn y tế và cấp cứu chính thức của EMS Beach Town.',
  keywords: 'EMS, Beach Town, GTA RolePlay, quy định, bệnh viện, bác sĩ',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg'],
  },
  openGraph: {
    title: 'Beach Town EMS — Protocol Center',
    description: 'Quy chuẩn y tế, cấp cứu và quy định nội bộ chính thức.',
    type: 'website',
    url: siteUrl,
    siteName: 'EMS Beach Town',
    locale: 'vi_VN',
    images: [{ url: '/og-v2.png', width: 1200, height: 630, alt: 'Beach Town EMS Protocol Center' }],
  },
  twitter: { card: 'summary_large_image', title: 'Beach Town EMS — Protocol Center', description: 'Trung tâm quy chuẩn y tế và cấp cứu chính thức.', images: ['/og-v2.png'] },
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  applicationName: 'EMS Beach Town',
  authors: [{ name: 'Ban Quản lý EMS Beach Town' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#0f172a" />
        <noscript><style>{`.loading-screen{display:none!important}`}</style></noscript>
      </head>
      <body>
        <a href="#main-content" className="skip-link">Bỏ qua đến nội dung chính</a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
