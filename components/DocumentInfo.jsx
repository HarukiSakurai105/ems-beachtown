'use client'

import { useState } from 'react'
import { BadgeCheck, CalendarDays, ChevronDown, Clock3, UserRoundCheck } from 'lucide-react'

export default function DocumentInfo({ info }) {
  const [showHistory, setShowHistory] = useState(false)
  if (!info) return null
  const active = info.status === 'active'
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 relative z-20 no-print" aria-labelledby="document-info-title">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,.1)] sm:p-6 grid gap-5 dark:border-white/10 dark:bg-[#0d1929]">
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <div><p id="document-info-title" className="text-[10px] font-black tracking-[.2em] uppercase text-red-500">Văn bản đã xác thực</p><p className="mt-1 font-black text-lg tracking-tight dark:text-white">EMS Beach Town Protocol • v{info.version}</p></div>
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-gray-200 text-gray-700'}`}><BadgeCheck className="w-4 h-4" />{active ? 'Đang áp dụng' : 'Hết hiệu lực'}</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 text-sm">
          <p className="flex gap-3 items-center rounded-2xl bg-slate-50 p-3 dark:bg-white/5"><CalendarDays className="w-4 h-4 text-red-500" /><span><b className="block text-[10px] uppercase tracking-wider text-slate-400">Ban hành</b>{info.issuedAt}</span></p>
          <p className="flex gap-3 items-center rounded-2xl bg-slate-50 p-3 dark:bg-white/5"><Clock3 className="w-4 h-4 text-red-500" /><span><b className="block text-[10px] uppercase tracking-wider text-slate-400">Cập nhật</b>{info.updatedAt}</span></p>
          <p className="flex gap-3 items-center rounded-2xl bg-slate-50 p-3 dark:bg-white/5"><UserRoundCheck className="w-4 h-4 text-red-500" /><span><b className="block text-[10px] uppercase tracking-wider text-slate-400">Phê duyệt</b>{info.approvedBy}</span></p>
        </div>
        <button onClick={() => setShowHistory(!showHistory)} className="justify-self-start inline-flex gap-2 items-center text-xs font-bold text-ems-600 dark:text-ems-400" aria-expanded={showHistory}><ChevronDown className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} /> Lịch sử phiên bản</button>
        {showHistory && <ol className="border-l-2 border-ems-200 dark:border-ems-900 pl-4 space-y-3">{(info.changes || []).map(change => <li key={`${change.version}-${change.date}`}><p className="font-bold text-sm">v{change.version} • {change.date}</p><p className="text-sm text-gray-600 dark:text-gray-400">{change.summary}</p></li>)}</ol>}
      </div>
    </section>
  )
}
