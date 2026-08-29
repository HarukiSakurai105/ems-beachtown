'use client'
import { useEffect, useState } from 'react'
import { KeyRound, LockKeyhole, Plus, ShieldCheck, Trash2, UserCheck, UserX, X } from 'lucide-react'

export default function UserManagement({ currentUser }) {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ email: '', name: '', role: 'viewer', password: '' })
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)
  const [resetTarget, setResetTarget] = useState(null)
  const [resetValue, setResetValue] = useState('')
  async function load() { const response = await fetch('/api/admin/users'); const data = await response.json(); setUsers(data.users || []); setNotice(response.ok ? '' : data.error); setLoading(false) }
  useEffect(() => { load() }, [])
  async function request(method, body) { setNotice('Đang xử lý…'); const response = await fetch('/api/admin/users', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); const data = await response.json(); setNotice(response.ok ? 'Đã cập nhật tài khoản.' : data.error); if (response.ok) await load(); return response.ok }
  async function create(event) { event.preventDefault(); if (await request('POST', form)) setForm({ email: '', name: '', role: 'viewer', password: '' }) }
  function resetPassword(user) { setResetTarget(user); setResetValue('') }
  async function submitReset(event) {
    event.preventDefault()
    if (await request('PATCH', { id: resetTarget.id, password: resetValue })) {
      setResetTarget(null)
      setResetValue('')
    }
  }
  if (loading) return <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-sm text-slate-400">Đang tải danh sách nhân sự…</div>
  return <div className="space-y-5">
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1d2d]">
      <div className="grid md:grid-cols-[.75fr_1.25fr]">
        <div className="bg-[#dff5fb] p-6 text-[#0b1f33] sm:p-8"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 text-[#087ca7]"><LockKeyhole className="h-5 w-5" /></span><p className="mt-7 text-[9px] font-black uppercase tracking-[.2em] text-[#087ca7]">Identity access</p><h2 className="mt-2 text-2xl font-black tracking-[-.04em]">Cấp tài khoản mới</h2><p className="mt-3 text-xs leading-6 text-slate-600">Tài khoản được lưu trực tiếp trên Supabase và có hiệu lực ngay sau khi tạo.</p></div>
        <form onSubmit={create} className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7"><input required className="admin-input" placeholder="Tên hiển thị" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><input required type="email" className="admin-input" placeholder="Email đăng nhập" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><select className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option value="viewer">Người xem</option><option value="editor">Biên tập viên</option><option value="admin">Quản trị viên</option></select><input required type="password" minLength={12} className="admin-input" placeholder="Mật khẩu ban đầu (≥ 12 ký tự)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><button className="admin-primary py-3 sm:col-span-2"><Plus className="h-4 w-4" /> Tạo và cấp quyền</button></form>
      </div>
    </section>
    {notice && <p role="status" className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs text-cyan-200">{notice}</p>}
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1d2d]"><div className="flex items-center justify-between border-b border-white/10 p-5"><div><p className="text-[9px] font-black uppercase tracking-[.2em] text-cyan-300">Access registry</p><h2 className="mt-1 font-black">Nhân sự đang có quyền</h2></div><span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-black">{users.length}</span></div><div className="divide-y divide-white/10">{users.map(user => <article key={user.id} className="grid items-center gap-4 p-4 sm:grid-cols-[1fr_180px_auto] sm:p-5"><div className="flex min-w-0 items-center gap-3"><span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><ShieldCheck className="h-5 w-5" /></span><span className="min-w-0"><b className="block truncate text-sm">{user.name} {user.id === currentUser.id && <small className="text-cyan-300">(Bạn)</small>}</b><small className="mt-1 block truncate text-[10px] text-slate-500">{user.email} · {user.active ? 'Đang hoạt động' : 'Đã khóa'}</small></span></div><select disabled={user.id === currentUser.id} value={user.role} onChange={e => request('PATCH', { id: user.id, role: e.target.value })} className="admin-input"><option value="admin">Quản trị viên</option><option value="editor">Biên tập viên</option><option value="viewer">Người xem</option></select><div className="flex justify-end gap-1"><button onClick={() => resetPassword(user)} className="admin-icon" title="Đặt lại mật khẩu"><KeyRound /></button><button disabled={user.id === currentUser.id} onClick={() => request('PATCH', { id: user.id, active: !user.active })} className="admin-icon" title={user.active ? 'Khóa tài khoản' : 'Mở khóa'}>{user.active ? <UserX /> : <UserCheck />}</button><button disabled={user.id === currentUser.id} onClick={() => confirm(`Xóa tài khoản ${user.email}?`) && request('DELETE', { id: user.id })} className="admin-icon text-red-400" title="Xóa tài khoản"><Trash2 /></button></div></article>)}</div></section>
    {resetTarget && <div className="fixed inset-0 z-[70] grid place-items-center bg-[#030712]/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="reset-password-title"><form onSubmit={submitReset} className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0d1d2d] shadow-2xl"><div className="flex items-start justify-between border-b border-white/10 p-5"><div><p className="text-[9px] font-black uppercase tracking-[.2em] text-cyan-300">Bảo mật tài khoản</p><h2 id="reset-password-title" className="mt-1 text-lg font-black">Đặt lại mật khẩu</h2><p className="mt-1 text-xs text-slate-400">{resetTarget.email}</p></div><button type="button" onClick={() => setResetTarget(null)} className="admin-icon" aria-label="Đóng"><X /></button></div><div className="p-5"><label className="text-xs font-bold text-slate-300">Mật khẩu mới<input autoFocus required type="password" minLength={12} value={resetValue} onChange={event => setResetValue(event.target.value)} className="admin-input mt-2 w-full" placeholder="Ít nhất 12 ký tự, có chữ và số" /></label><p className="mt-2 text-[11px] leading-5 text-slate-500">Sau khi lưu, người dùng đăng nhập bằng mật khẩu mới ngay lần tiếp theo.</p></div><div className="flex gap-3 border-t border-white/10 bg-white/[.02] p-5"><button type="button" onClick={() => setResetTarget(null)} className="admin-secondary flex-1">Hủy</button><button type="submit" className="admin-primary flex-1"><KeyRound className="h-4 w-4" /> Lưu mật khẩu</button></div></form></div>}
  </div>
}
