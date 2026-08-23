import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

const siteUrl = 'https://ems-beachtown.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Quy Định EMS Beach Town — GTA RolePlay',
  description: 'Tra cứu nhanh nội quy khám bệnh tại EMS Beach Town. Bảng giá dịch vụ và máy tính viện phí.',
  keywords: 'EMS, Beach Town, GTA RolePlay, quy định, bệnh viện, bác sĩ, bảng giá',
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
    title: 'Quy Định & Bảng Giá EMS Beach Town',
    description: 'Nội quy khám bệnh và bảng giá dịch vụ - GTA RolePlay Server',
    type: 'website',
    url: siteUrl,
    siteName: 'EMS Beach Town',
    locale: 'vi_VN',
    images: [{ url: '/ems-social-preview.jpg', width: 1200, height: 630, alt: 'EMS Beach Town — Quy định và bảng giá' }],
  },
  twitter: { card: 'summary_large_image', title: 'Quy Định & Bảng Giá EMS Beach Town', description: 'Cổng tra cứu chính thức dành cho cư dân và nhân viên EMS.', images: ['/ems-social-preview.jpg'] },
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
        <a href="#main-rules-section" className="skip-link">Bỏ qua đến nội dung chính</a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
