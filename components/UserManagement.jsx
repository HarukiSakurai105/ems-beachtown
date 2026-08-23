'use client'

import { useEffect, useState } from 'react'
import { KeyRound, Plus, Trash2, UserCheck, UserX } from 'lucide-react'

export default function UserManagement({ currentUser }) {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ email: '', name: '', role: 'viewer', password: '' })
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    const response = await fetch('/api/admin/users')
    const data = await response.json()
    setUsers(data.users || []); setNotice(response.ok ? '' : data.error); setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function request(method, body) {
    setNotice('Đang xử lý…')
    const response = await fetch('/api/admin/users', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await response.json()
    setNotice(response.ok ? 'Đã cập nhật tài khoản.' : data.error)
    if (response.ok) await load()
    return response.ok
  }

  async function create(event) {
    event.preventDefault()
    if (await request('POST', form)) setForm({ email: '', name: '', role: 'viewer', password: '' })
  }

  async function resetPassword(user) {
    const password = prompt(`Nhập mật khẩu mới cho ${user.email} (ít nhất 12 ký tự, có chữ và số):`)
    if (password) await request('PATCH', { id: user.id, password })
  }

  if (loading) return <p className="p-6 text-gray-500">Đang tải tài khoản…</p>
  return <div className="space-y-6"><section className="rounded-2xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 p-5"><h2 className="font-black text-lg mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> Tạo tài khoản</h2><form onSubmit={create} className="grid sm:grid-cols-2 gap-3"><input required className="admin-input" placeholder="Tên hiển thị" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /><input required type="email" className="admin-input" placeholder="Email đăng nhập" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><select className="admin-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}><option value="viewer">Người xem</option><option value="editor">Biên tập viên</option><option value="admin">Admin</option></select><input required type="password" minLength={12} className="admin-input" placeholder="Mật khẩu ban đầu (≥ 12 ký tự)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><button className="admin-primary sm:col-span-2"><Plus className="w-4 h-4" /> Tạo tài khoản</button></form></section>{notice && <p role="status" className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3 text-sm text-blue-700 dark:text-blue-300">{notice}</p>}<section className="rounded-2xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 overflow-hidden"><div className="p-4 border-b border-gray-200 dark:border-navy-700"><h2 className="font-black">Tài khoản hiện có ({users.length})</h2></div><div className="divide-y divide-gray-100 dark:divide-navy-800">{users.map(user => <div key={user.id} className="p-4 grid sm:grid-cols-[1fr_170px_auto] gap-3 items-center"><div><p className="font-bold">{user.name} {user.id === currentUser.id && <span className="text-xs text-ems-500">(Bạn)</span>}</p><p className="text-xs text-gray-500">{user.email} • {user.active ? 'Đang hoạt động' : 'Đã khóa'}</p></div><select disabled={user.id === currentUser.id} value={user.role} onChange={e => request('PATCH', { id: user.id, role: e.target.value })} className="admin-input"><option value="admin">Admin</option><option value="editor">Biên tập viên</option><option value="viewer">Người xem</option></select><div className="flex gap-1"><button onClick={() => resetPassword(user)} className="admin-icon" title="Đặt lại mật khẩu"><KeyRound /></button><button disabled={user.id === currentUser.id} onClick={() => request('PATCH', { id: user.id, active: !user.active })} className="admin-icon" title={user.active ? 'Khóa tài khoản' : 'Mở khóa'}>{user.active ? <UserX /> : <UserCheck />}</button><button disabled={user.id === currentUser.id} onClick={() => confirm(`Xóa tài khoản ${user.email}?`) && request('DELETE', { id: user.id })} className="admin-icon text-red-500" title="Xóa tài khoản"><Trash2 /></button></div></div>)}</div></section></div>
}
