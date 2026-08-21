import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Quy Định EMS Beach Town — GTA RolePlay',
  description: 'Tra cứu nhanh nội quy khám bệnh tại EMS Beach Town. Quy định dành cho cư dân và nhân viên EMS.',
  keywords: 'EMS, Beach Town, GTA RolePlay, quy định, bệnh viện, bác sĩ',
  openGraph: {
    title: 'Quy Định EMS Beach Town',
    description: 'Nội quy khám bệnh - GTA RolePlay Server',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head />
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
