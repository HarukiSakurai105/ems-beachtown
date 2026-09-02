'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Database, HeartPulse, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react'

export default function SetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', name: '', password: '', confirmPassword: '' })
  const [status, setStatus] = useState({ loading: true, saving: false, setupRequired: false, error: '' })

  useEffect(() => {
    fetch('/api/auth/session').then(response => response.json()).then(data => {
      if (data.user) return router.replace('/admin')
      if (data.configured && !data.setupRequired) return router.replace('/login')
      setStatus({ loading: false, saving: false, setupRequired: data.setupRequired, error: data.migrationRequired ? 'Hãy chạy migration 002_ems_users.sql trên Supabase trước.' : '' })
    }).catch(() => setStatus(current => ({ ...current, loading: false, error: 'Không thể kiểm tra kết nối Supabase.' })))
  }, [router])

  async function submit(event) {
    event.preventDefault()
    if (form.password !== form.confirmPassword) return setStatus(current => ({ ...current, error: 'Hai mật khẩu không khớp.' }))
    setStatus(current => ({ ...current, saving: true, error: '' }))
    try {
      const response = await fetch('/api/auth/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await response.json()
      if (!response.ok) return setStatus(current => ({ ...current, saving: false, error: data.error || 'Không thể tạo tài khoản.' }))
      router.replace('/admin')
      router.refresh()
    } catch {
      setStatus(current => ({ ...current, saving: false, error: 'Mất kết nối. Vui lòng thử lại.' }))
    }
  }

  return <main id="main-content" className="auth-shell auth-setup-shell">
    <div className="auth-backdrop" aria-hidden="true" />
    <header className="auth-header">
      <Link href="/" className="auth-brand"><span className="auth-brand-mark">⚕️</span><span className="leading-tight"><strong className="block text-xs font-black tracking-wide text-white sm:text-sm">BEACH TOWN EMS</strong><small className="block text-[9px] font-bold uppercase tracking-[.16em] text-sky-300">Khởi tạo hệ thống</small></span></Link>
      <Link href="/login" className="auth-back-link"><ArrowLeft className="h-4 w-4" /> Đăng nhập</Link>
    </header>
    <div className="setup-layout">
      <section className="setup-intro">
        <span className="auth-card-icon"><ShieldCheck /></span><p className="auth-eyebrow">THIẾT LẬP MỘT LẦN</p><h1>Tạo quản trị viên đầu tiên</h1><p>Tài khoản này có toàn quyền quản lý nội dung và cấp quyền cho các thành viên khác ngay trên website.</p>
        <div className="setup-checks">
          <div><Database /><span><b>Lưu vĩnh viễn</b><small>Thông tin tài khoản nằm trong Supabase.</small></span></div>
          <div><ShieldCheck /><span><b>Quyền Admin</b><small>Tự động nhận quyền quản trị cao nhất.</small></span></div>
          <div><CheckCircle2 /><span><b>Tự khóa thiết lập</b><small>Trang này đóng sau khi tài khoản được tạo.</small></span></div>
        </div>
      </section>
      <section className="auth-card setup-card">
        <div className="auth-card-heading"><span className="auth-card-icon"><UserRound /></span><div><p className="auth-eyebrow">HỒ SƠ QUẢN TRỊ</p><h2>Thông tin tài khoản</h2><p>Dùng email và mật khẩu này để đăng nhập về sau.</p></div></div>
        {status.loading ? <div className="setup-loading"><HeartPulse className="h-6 w-6" /> Đang kiểm tra Supabase…</div> : <form onSubmit={submit} className="auth-form setup-form">
          <SetupField label="Tên hiển thị" icon={UserRound}><input required autoComplete="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Viện trưởng EMS" /></SetupField>
          <SetupField label="Email đăng nhập" icon={Mail}><input required type="email" autoComplete="username" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="admin@example.com" /></SetupField>
          <SetupField label="Mật khẩu" icon={LockKeyhole}><input required type="password" autoComplete="new-password" minLength={12} value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="Tối thiểu 12 ký tự" /></SetupField>
          <SetupField label="Xác nhận mật khẩu" icon={LockKeyhole}><input required type="password" autoComplete="new-password" minLength={12} value={form.confirmPassword} onChange={event => setForm({ ...form, confirmPassword: event.target.value })} placeholder="Nhập lại mật khẩu" /></SetupField>
          {status.error && <div role="alert" className="auth-alert auth-alert-error setup-error">{status.error}</div>}
          <button disabled={status.saving || !status.setupRequired} className="auth-submit setup-submit"><ShieldCheck className="h-4 w-4" />{status.saving ? 'Đang tạo tài khoản…' : 'Tạo tài khoản Admin'}</button>
        </form>}
      </section>
    </div>
  </main>
}

function SetupField({ label, icon: Icon, children }) {
  return <label className="auth-field"><span>{label}</span><div><Icon className="h-4 w-4" />{children}</div></label>
}
