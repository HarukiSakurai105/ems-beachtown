import { redirect } from 'next/navigation'
import { getSession } from '../../../lib/auth'
import ContentPreview from '../../../components/ContentPreview'
import { ThemeProvider } from '../../../components/ThemeProvider'

export const metadata = { title: 'Xem trước bản nháp — EMS Beach Town', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function PreviewPage() {
  const user = await getSession()
  if (!user) redirect('/login')
  return <ThemeProvider><ContentPreview /></ThemeProvider>
}
