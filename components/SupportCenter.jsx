'use client'

import { useState } from 'react'
import { LifeBuoy, MapPin, MessageCircleWarning, Send } from 'lucide-react'

const discordUrl = 'https://discord.gg/beachtown2026'

export default function SupportCenter() {
  const [form, setForm] = useState({ category: 'Báo lỗi nội dung', name: '', details: '', website: '' })
  const [status, setStatus] = useState('')

  async function submit(event) {
    event.preventDefault(); setStatus('Đang gửi…')
    const response = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const data = await response.json()
    setStatus(response.ok ? 'Đã gửi tới bộ phận tiếp nhận EMS.' : data.error)
    if (response.ok) setForm({ ...form, name: '', details: '' })
  }

  function copyEmergencyGuide() {
    navigator.clipboard.writeText('Cấp cứu EMS: Gửi Ping một lần, mô tả vị trí rõ ràng, gửi ảnh hiện trường nếu khó xác định và chờ ít nhất 5 phút trước khi hỏi trạng thái.')
    setStatus('Đã sao chép hướng dẫn gọi EMS.')
  }

  return <section id="ho-tro-ems" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print" aria-labelledby="support-title"><div className="rounded-3xl bg-gradient-to-br from-[#070d18] to-[#250d18] text-white p-6 sm:p-8 shadow-2xl"><div className="grid lg:grid-cols-2 gap-8"><div><p className="text-ems-400 text-xs font-black tracking-widest uppercase">Trung tâm hỗ trợ</p><h2 id="support-title" className="text-2xl font-black mt-1">Cần EMS hỗ trợ?</h2><p className="text-navy-200 mt-2 text-sm">Khi cấp cứu, hãy gửi vị trí chính xác và hình ảnh hiện trường nếu vị trí khó tìm. Không spam Ping hoặc nhảy GPS.</p><div className="grid sm:grid-cols-2 gap-3 mt-5"><button onClick={copyEmergencyGuide} className="support-button bg-ems-600 hover:bg-ems-500"><LifeBuoy /> Gọi EMS / Hướng dẫn</button><a href={discordUrl} target="_blank" rel="noopener noreferrer" className="support-button bg-[#5865F2] hover:bg-[#4752C4]"><MapPin /> Kênh hỗ trợ Discord</a></div><div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4 text-sm"><p className="font-bold">Tiếp nhận khiếu nại</p><p className="text-navy-300 mt-1">Ban Quản lý EMS (Viện trưởng, Viện phó hoặc Quản lý). Vui lòng đính kèm thời gian, tên IC và bằng chứng rõ ràng.</p></div></div><form onSubmit={submit} className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-3"><h3 className="font-black flex gap-2"><MessageCircleWarning className="w-5 h-5" /> Báo lỗi hoặc đề xuất chỉnh sửa</h3><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="support-input"><option>Báo lỗi nội dung</option><option>Đề xuất chỉnh sửa</option><option>Khiếu nại nhân sự</option></select><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="support-input" placeholder="Tên IC / Discord" required maxLength={80} /><textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className="support-input min-h-28" placeholder="Mô tả chi tiết, điều khoản liên quan và bằng chứng…" required maxLength={1500} /><input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><button className="support-button bg-ems-600 hover:bg-ems-500 w-full"><Send /> Gửi phản hồi</button>{status && <p role="status" className="text-xs text-navy-200">{status}</p>}</form></div></div></section>
}
