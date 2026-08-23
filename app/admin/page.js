import { redirect } from 'next/navigation'
import { getSession } from '../../lib/auth'
import AdminDashboard from '../../components/AdminDashboard'

export const metadata = { title: 'Quản trị — EMS Beach Town', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const user = await getSession()
  if (!user) redirect('/login')
  return <AdminDashboard user={user} />
}

