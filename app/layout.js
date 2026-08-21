import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
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
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
