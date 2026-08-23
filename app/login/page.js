'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [status, setStatus] = useState({ loading: false, error: '', configured: true, setupRequired: false })

  useEffect(() => {
    fetch('/api/auth/session').then(response => response.json()).then(data => {
      if (data.user) router.replace('/admin')
      setStatus(current => ({ ...current, configured: data.configured, setupRequired: data.setupRequired }))
    }).catch(() => {})
  }, [router])

  async function submit(event) {
    event.preventDefault()
    setStatus(current => ({ ...current, loading: true, error: '' }))
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    if (!response.ok) {
      setStatus(current => ({ ...current, loading: false, error: data.error }))
      return
    }
    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#070d18] via-[#190c13] to-[#070d18] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-7 sm:p-9 shadow-2xl">
        <Link href="/" className="text-sm text-white/60 hover:text-white">← Về trang tra cứu</Link>
        <div className="mt-7 mb-7 text-center">
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-ems-600 flex items-center justify-center shadow-lg shadow-ems-600/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Quản trị EMS</h1>
          <p className="mt-2 text-sm text-navy-300">Đăng nhập để quản lý quy định và bảng giá.</p>
        </div>

        {status.setupRequired && (
          <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
            Chưa có tài khoản. <Link href="/setup" className="font-bold underline">Tạo Admin đầu tiên</Link>.
          </div>
        )}
        {!status.configured && !status.setupRequired && (
          <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            Supabase chưa sẵn sàng hoặc chưa chạy migration tài khoản.
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-300">Email</span>
            <span className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 focus-within:border-ems-500">
              <Mail className="w-4 h-4 text-white/40" />
              <input type="email" required autoComplete="username" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="w-full bg-transparent py-3 text-white outline-none placeholder:text-white/30" placeholder="admin@ems.local" />
            </span>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-300">Mật khẩu</span>
            <span className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 focus-within:border-ems-500">
              <LockKeyhole className="w-4 h-4 text-white/40" />
              <input type="password" required autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} className="w-full bg-transparent py-3 text-white outline-none placeholder:text-white/30" placeholder="••••••••" />
            </span>
          </label>
          {status.error && <p role="alert" className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">{status.error}</p>}
          <button disabled={status.loading || !status.configured || status.setupRequired} className="w-full rounded-xl bg-ems-600 hover:bg-ems-500 disabled:opacity-50 py-3 font-bold text-white transition-colors">
            {status.loading ? 'Đang đăng nhập…' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </main>
  )
}
