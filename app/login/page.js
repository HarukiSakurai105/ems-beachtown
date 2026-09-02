'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Eye, EyeOff, HeartPulse, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState({ loading: false, error: '', configured: true, setupRequired: false })

  useEffect(() => {
    fetch('/api/auth/session').then(response => response.json()).then(data => {
      if (data.user) router.replace('/admin')
      setStatus(current => ({ ...current, configured: data.configured, setupRequired: data.setupRequired }))
    }).catch(() => setStatus(current => ({ ...current, error: 'Không thể kết nối máy chủ. Vui lòng thử lại.' })))
  }, [router])

  async function submit(event) {
    event.preventDefault()
    setStatus(current => ({ ...current, loading: true, error: '' }))
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await response.json()
      if (!response.ok) return setStatus(current => ({ ...current, loading: false, error: data.error || 'Đăng nhập không thành công.' }))
      router.replace('/admin')
      router.refresh()
    } catch {
      setStatus(current => ({ ...current, loading: false, error: 'Mất kết nối. Vui lòng thử lại.' }))
    }
  }

  return <main id="main-content" className="auth-shell">
    <div className="auth-backdrop" aria-hidden="true" />
    <header className="auth-header">
      <Link href="/" className="auth-brand" aria-label="Về trang chủ Beach Town EMS"><span className="auth-brand-mark">⚕️</span><span className="min-w-0 leading-tight"><strong className="block truncate text-xs font-black tracking-wide text-white sm:text-sm">BEACH TOWN EMS</strong><small className="block truncate text-[9px] font-bold uppercase tracking-[.16em] text-sky-300">Bộ luật & quy định</small></span></Link>
      <Link href="/" className="auth-back-link"><ArrowLeft className="h-4 w-4" /> Trang chủ</Link>
    </header>
    <div className="auth-layout">
      <section className="auth-intro">
        <div className="auth-status"><span /> Hệ thống quản trị trực tuyến</div>
        <p className="auth-eyebrow">EMS CONTROL CENTER</p>
        <h1>Điều hành thống nhất.<br /><span>Phản ứng chính xác.</span></h1>
        <p className="auth-description">Quản lý quy định, nhân sự và lịch sử công bố trên một nền tảng được đồng bộ trực tiếp với Supabase.</p>
        <div className="auth-benefits">{['Đồng bộ trang chủ tức thì', 'Phân quyền theo vai trò', 'Lưu lịch sử mọi thay đổi'].map(item => <div key={item}><CheckCircle2 className="h-4 w-4" /> {item}</div>)}</div>
      </section>
      <section className="auth-card-wrap"><div className="auth-card">
        <div className="auth-card-heading"><span className="auth-card-icon"><ShieldCheck /></span><div><p className="auth-eyebrow">CỔNG NỘI BỘ EMS</p><h2>Đăng nhập quản trị</h2><p>Dành cho tài khoản đã được Ban quản lý cấp quyền.</p></div></div>
        {status.setupRequired && <div className="auth-alert auth-alert-info">Chưa có tài khoản quản trị. <Link href="/setup">Tạo Admin đầu tiên</Link>.</div>}
        {!status.configured && !status.setupRequired && <div className="auth-alert auth-alert-warning">Supabase chưa sẵn sàng hoặc chưa chạy migration tài khoản.</div>}
        {status.error && <div role="alert" className="auth-alert auth-alert-error">{status.error}</div>}
        <form onSubmit={submit} className="auth-form">
          <AuthField label="Email đăng nhập" icon={Mail}><input type="email" required autoComplete="username" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="name@ems.local" /></AuthField>
          <AuthField label="Mật khẩu" icon={LockKeyhole}><input type={showPassword ? 'text' : 'password'} required autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="Nhập mật khẩu" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>{showPassword ? <EyeOff /> : <Eye />}</button></AuthField>
          <button disabled={status.loading || !status.configured || status.setupRequired} className="auth-submit"><HeartPulse className="h-4 w-4" /> {status.loading ? 'Đang xác thực…' : 'Đăng nhập hệ thống'}</button>
        </form>
        <p className="auth-security"><LockKeyhole className="h-3.5 w-3.5" /> Kết nối được bảo vệ · Dữ liệu lưu trên Supabase</p>
      </div></section>
    </div>
  </main>
}

function AuthField({ label, icon: Icon, children }) {
  return <label className="auth-field"><span>{label}</span><div><Icon className="h-4 w-4" />{children}</div></label>
}
