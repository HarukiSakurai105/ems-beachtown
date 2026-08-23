'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, UserPlus } from 'lucide-react'

export default function SetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', name: '', password: '', confirmPassword: '' })
  const [status, setStatus] = useState({ loading: true, saving: false, setupRequired: false, error: '' })

  useEffect(() => {
    fetch('/api/auth/session').then(response => response.json()).then(data => {
      if (data.user) return router.replace('/admin')
      if (data.configured && !data.setupRequired) return router.replace('/login')
      setStatus({ loading: false, saving: false, setupRequired: data.setupRequired, error: data.migrationRequired ? 'Hãy chạy migration 002_ems_users.sql trên Supabase trước.' : '' })
    }).catch(() => setStatus(current => ({ ...current, loading: false, error: 'Không thể kiểm tra Supabase.' })))
  }, [router])

  async function submit(event) {
    event.preventDefault()
    if (form.password !== form.confirmPassword) return setStatus(current => ({ ...current, error: 'Hai mật khẩu không khớp.' }))
    setStatus(current => ({ ...current, saving: true, error: '' }))
    const response = await fetch('/api/auth/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await response.json()
    if (!response.ok) return setStatus(current => ({ ...current, saving: false, error: data.error }))
    router.replace('/admin'); router.refresh()
  }

  return <main className="min-h-screen bg-gradient-to-br from-[#070d18] via-[#190c13] to-[#070d18] px-4 py-10 flex items-center justify-center"><div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.07] backdrop-blur-xl p-7 sm:p-9 shadow-2xl text-white"><Link href="/" className="text-sm text-white/60 hover:text-white">← Về trang tra cứu</Link><div className="text-center mt-6 mb-7"><div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-ems-600 flex items-center justify-center"><UserPlus className="w-8 h-8" /></div><h1 className="text-2xl font-black">Tạo Admin đầu tiên</h1><p className="text-sm text-navy-300 mt-2">Chỉ xuất hiện khi database chưa có tài khoản. Sau khi tạo thành công, trang này sẽ tự khóa.</p></div>{status.loading ? <p className="text-center text-navy-300">Đang kiểm tra Supabase…</p> : <form onSubmit={submit} className="space-y-4"><div className="grid sm:grid-cols-2 gap-3"><label className="setup-label">Tên hiển thị<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="setup-input" placeholder="Viện trưởng EMS" /></label><label className="setup-label">Email<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="setup-input" placeholder="admin@example.com" /></label></div><label className="setup-label">Mật khẩu<input required type="password" minLength={12} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="setup-input" placeholder="Tối thiểu 12 ký tự, có chữ và số" /></label><label className="setup-label">Nhập lại mật khẩu<input required type="password" minLength={12} value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} className="setup-input" /></label>{status.error && <p role="alert" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">{status.error}</p>}<button disabled={status.saving || !status.setupRequired} className="w-full rounded-xl bg-ems-600 hover:bg-ems-500 disabled:opacity-50 py-3 font-bold flex items-center justify-center gap-2"><ShieldCheck className="w-5 h-5" />{status.saving ? 'Đang tạo…' : 'Tạo tài khoản Admin'}</button></form>}</div></main>
}

