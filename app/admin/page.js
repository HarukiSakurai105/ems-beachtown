import { redirect } from 'next/navigation'
import { getSession } from '../../lib/auth'
import AdminDashboard from '../../components/AdminDashboard'
import { ThemeProvider } from '../../components/ThemeProvider'

export const metadata = { title: 'Quản trị — EMS Beach Town', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await getSession()
  if (!user) redirect('/login')
  return <ThemeProvider><AdminDashboard user={user} /></ThemeProvider>
}
