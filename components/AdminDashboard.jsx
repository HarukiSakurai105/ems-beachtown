'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, History, LogOut, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import UserManagement from './UserManagement'

const roleLabels = { admin: 'Admin', editor: 'Biên tập viên', viewer: 'Người xem' }
const emptyRule = () => ({ id: `rule-${Date.now()}`, num: 'Điều mới', icon: '📋', title: 'Quy định mới', keywords: '', visible: true, items: [{ type: 'normal', icon: '✅', text: 'Nội dung quy định' }] })
const emptyPrice = () => ({ id: `service-${Date.now()}`, name: 'Dịch vụ mới', price: 0, icon: '🩺', desc: '', badge: 'Mới', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', visible: true })

function RuleEditor({ value, onChange, onClose }) {
  const updateItem = (index, patch) => onChange({ ...value, items: value.items.map((item, i) => i === index ? { ...item, ...patch } : item) })
  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white dark:bg-navy-900 p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5"><h2 className="font-black text-xl dark:text-white">Chỉnh sửa quy định</h2><button onClick={onClose} aria-label="Đóng"><X /></button></div>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <input aria-label="Số điều" value={value.num} onChange={e => onChange({ ...value, num: e.target.value })} className="admin-input" placeholder="Điều/Mục" />
          <input aria-label="Biểu tượng" value={value.icon} onChange={e => onChange({ ...value, icon: e.target.value })} className="admin-input" placeholder="Biểu tượng" />
          <input aria-label="Mã định danh" value={value.id} onChange={e => onChange({ ...value, id: e.target.value.replace(/\s+/g, '-') })} className="admin-input" placeholder="ID" />
        </div>
        <input aria-label="Tiêu đề" value={value.title} onChange={e => onChange({ ...value, title: e.target.value })} className="admin-input w-full mb-3" placeholder="Tiêu đề" />
        <input aria-label="Từ khóa" value={value.keywords || ''} onChange={e => onChange({ ...value, keywords: e.target.value })} className="admin-input w-full mb-5" placeholder="Từ khóa tìm kiếm" />
        <div className="space-y-3">
          {(value.items || []).map((item, index) => (
            <div key={index} className="rounded-xl bg-gray-50 dark:bg-navy-800 p-3 flex gap-2 items-start">
              <input aria-label={`Biểu tượng mục ${index + 1}`} value={item.icon || ''} onChange={e => updateItem(index, { icon: e.target.value })} className="admin-input w-16" />
              <select aria-label={`Loại mục ${index + 1}`} value={item.type} onChange={e => updateItem(index, { type: e.target.value })} className="admin-input"><option value="normal">Thường</option><option value="info">Thông tin</option><option value="warning">Cảnh báo</option><option value="danger">Nghiêm cấm</option></select>
              <textarea aria-label={`Nội dung mục ${index + 1}`} value={item.text || ''} onChange={e => updateItem(index, { text: e.target.value })} className="admin-input min-h-24 flex-1" />
              <button onClick={() => onChange({ ...value, items: value.items.filter((_, i) => i !== index) })} className="p-2 text-red-500" aria-label="Xóa nội dung"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={() => onChange({ ...value, items: [...(value.items || []), { type: 'normal', icon: '✅', text: '' }] })} className="admin-secondary"><Plus className="w-4 h-4" /> Thêm nội dung</button>
          <button onClick={onClose} className="admin-primary">Hoàn tất</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard({ user }) {
  const router = useRouter()
  const [content, setContent] = useState(null)
  const [tab, setTab] = useState('residentRules')
  const [editing, setEditing] = useState(null)
  const [history, setHistory] = useState([])
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)
  const canEdit = ['admin', 'editor'].includes(user.role)
  const canDelete = user.role === 'admin'

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/content').then(r => r.json()),
      fetch('/api/admin/history').then(r => r.json()),
    ]).then(([data, audit]) => { setContent(data); setHistory(audit.history || []) })
  }, [])

  const entries = useMemo(() => {
    if (!content) return []
    if (tab === 'users') return []
    if (tab === 'services') return content.pricingData.services
    if (tab === 'surcharges') return content.pricingData.surcharges
    return content[tab]
  }, [content, tab])

  function setEntries(next) {
    if (tab === 'services' || tab === 'surcharges') setContent({ ...content, pricingData: { ...content.pricingData, [tab]: next } })
    else setContent({ ...content, [tab]: next })
  }

  function patchEntry(id, patch) { setEntries(entries.map(entry => entry.id === id ? { ...entry, ...patch } : entry)) }

  function removeEntry(id) {
    if (!canDelete || !confirm('Xóa nội dung này? Hành động chỉ có hiệu lực sau khi bấm Lưu thay đổi.')) return
    setEntries(entries.filter(entry => entry.id !== id))
  }

  async function save() {
    setSaving(true); setNotice('')
    const response = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) })
    const data = await response.json()
    setSaving(false)
    if (!response.ok) return setNotice(data.error)
    setContent(data); setNotice('Đã lưu và công bố nội dung thành công.')
  }

  async function logout() { await fetch('/api/auth/logout', { method: 'POST' }); router.replace('/login'); router.refresh() }

  if (!content) return <div className="min-h-screen bg-gray-50 dark:bg-navy-900 flex items-center justify-center dark:text-white">Đang tải trang quản trị…</div>

  const isPrice = tab === 'services' || tab === 'surcharges'
  const isUserTab = tab === 'users'
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-30 bg-[#070d18] text-white border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <div><h1 className="font-black">⚕️ Quản trị EMS Beach Town</h1><p className="text-xs text-navy-300">{user.name} • {roleLabels[user.role]}</p></div>
          <div className="flex gap-2"><a href="/" className="admin-header-button">Xem website</a><button onClick={logout} className="admin-header-button"><LogOut className="w-4 h-4" /> Đăng xuất</button></div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {content.source !== 'database' && <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 p-4 text-sm text-amber-800 dark:text-amber-300">Đang dùng dữ liệu tĩnh. Chạy migration và cấu hình Supabase trên Vercel để bật lưu CRUD bền vững.</div>}
        {notice && <div role="status" className="mb-5 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 p-4 text-sm text-blue-700 dark:text-blue-300">{notice}</div>}

        <section className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {[['residentRules','Cư dân'],['emsRules','Nội bộ EMS'],['services','Bảng giá'],['surcharges','Phụ phí'], ...(user.role === 'admin' ? [['users','Tài khoản & Phân quyền']] : [])].map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={tab === id ? 'admin-tab-active' : 'admin-tab'}>{label}</button>)}
            </div>

            {isUserTab ? <UserManagement currentUser={user} /> : <>
            <div className="rounded-2xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-navy-700 flex justify-between items-center">
                <p className="font-bold">{entries.length} mục</p>
                {canEdit && <button onClick={() => setEntries([...entries, isPrice ? emptyPrice() : emptyRule()])} className="admin-primary"><Plus className="w-4 h-4" /> Thêm mới</button>}
              </div>
              <div className="divide-y divide-gray-100 dark:divide-navy-800">
                {entries.map(entry => <div key={entry.id} className="p-4 flex gap-3 items-center">
                  <span className="text-xl">{entry.icon}</span>
                  <div className="flex-1 min-w-0"><p className="font-bold truncate">{isPrice ? entry.name : `${entry.num} — ${entry.title}`}</p><p className="text-xs text-gray-500">{isPrice ? `${Number(entry.price).toLocaleString('vi-VN')}$` : `${entry.items?.length || 0} nội dung`} • {entry.visible === false ? 'Đang ẩn' : 'Đang hiển thị'}</p></div>
                  {canEdit && <>
                    <button onClick={() => patchEntry(entry.id, { visible: entry.visible === false })} className="admin-icon" title="Bật/tắt hiển thị">{entry.visible === false ? <EyeOff /> : <Eye />}</button>
                    {isPrice ? <button onClick={() => {
                      const name = prompt('Tên dịch vụ', entry.name); if (name === null) return
                      const price = prompt('Mức giá', entry.price); if (price === null) return
                      const desc = prompt('Mô tả', entry.desc || ''); if (desc === null) return
                      patchEntry(entry.id, { name, price: Number(price) || 0, desc })
                    }} className="admin-icon"><Pencil /></button> : <button onClick={() => setEditing(entry.id)} className="admin-icon"><Pencil /></button>}
                    {canDelete && <button onClick={() => removeEntry(entry.id)} className="admin-icon text-red-500"><Trash2 /></button>}
                  </>}
                </div>)}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 p-5">
              <h2 className="font-black mb-4">Thông tin văn bản</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {['version','issuedAt','approvedBy'].map(key => <label key={key} className="text-xs font-bold uppercase text-gray-500">{key === 'version' ? 'Phiên bản' : key === 'issuedAt' ? 'Ngày ban hành' : 'Người phê duyệt'}<input disabled={!canEdit} value={content.versionInfo[key] || ''} onChange={e => setContent({ ...content, versionInfo: { ...content.versionInfo, [key]: e.target.value } })} className="admin-input mt-1 w-full normal-case font-normal" /></label>)}
                <label className="text-xs font-bold uppercase text-gray-500">Trạng thái<select disabled={!canEdit} value={content.versionInfo.status} onChange={e => setContent({ ...content, versionInfo: { ...content.versionInfo, status: e.target.value } })} className="admin-input mt-1 w-full normal-case font-normal"><option value="active">Đang áp dụng</option><option value="expired">Hết hiệu lực</option></select></label>
              </div>
              <label className="block mt-3 text-xs font-bold uppercase text-gray-500">Nội dung thay đổi<textarea disabled={!canEdit} value={content.versionInfo.changes?.[0]?.summary || ''} onChange={e => {
                const changes = [...(content.versionInfo.changes || [])]
                changes[0] = { ...(changes[0] || {}), version: content.versionInfo.version, date: new Date().toISOString().slice(0, 10), summary: e.target.value }
                setContent({ ...content, versionInfo: { ...content.versionInfo, changes } })
              }} className="admin-input mt-1 w-full min-h-20 normal-case font-normal" /></label>
            </div>

            {canEdit && <button onClick={save} disabled={saving} className="admin-primary mt-6 px-6 py-3"><Save className="w-5 h-5" /> {saving ? 'Đang lưu…' : 'Lưu và công bố'}</button>}
            </>}
          </div>

          <aside className="rounded-2xl bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 p-5 h-fit">
            <h2 className="font-black flex gap-2 items-center mb-4"><History className="w-5 h-5" /> Lịch sử chỉnh sửa</h2>
            {history.length === 0 ? <p className="text-sm text-gray-500">Chưa có lịch sử từ database.</p> : <div className="space-y-4">{history.map(item => <div key={item.id} className="border-l-2 border-ems-500 pl-3"><p className="text-sm font-bold">v{item.version}</p><p className="text-xs text-gray-500">{item.actor?.name} • {new Date(item.savedAt).toLocaleString('vi-VN')}</p><p className="text-xs mt-1">{item.summary}</p></div>)}</div>}
          </aside>
        </section>
      </div>
      {editing && <RuleEditor value={entries.find(entry => entry.id === editing)} onChange={next => patchEntry(editing, next)} onClose={() => setEditing(null)} />}
    </main>
  )
}
