'use client'

import { useState } from 'react'
import { BadgeCheck, CalendarDays, ChevronDown, Clock3, UserRoundCheck } from 'lucide-react'

export default function DocumentInfo({ info }) {
  const [showHistory, setShowHistory] = useState(false)
  if (!info) return null
  const active = info.status === 'active'
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 relative z-20 no-print" aria-labelledby="document-info-title">
      <div className="glass-strong rounded-2xl p-4 sm:p-5 grid gap-4">
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <div><p id="document-info-title" className="text-xs font-black tracking-widest uppercase text-ems-600 dark:text-ems-400">Thông tin văn bản chính thức</p><p className="font-black text-lg dark:text-white">Quy định EMS Beach Town • v{info.version}</p></div>
          <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-gray-200 text-gray-700'}`}><BadgeCheck className="w-4 h-4" />{active ? 'Đang áp dụng' : 'Hết hiệu lực'}</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <p className="flex gap-2 items-center"><CalendarDays className="w-4 h-4 text-ems-500" /><span><b>Ban hành:</b> {info.issuedAt}</span></p>
          <p className="flex gap-2 items-center"><Clock3 className="w-4 h-4 text-ems-500" /><span><b>Cập nhật:</b> {info.updatedAt}</span></p>
          <p className="flex gap-2 items-center"><UserRoundCheck className="w-4 h-4 text-ems-500" /><span><b>Phê duyệt:</b> {info.approvedBy}</span></p>
        </div>
        <button onClick={() => setShowHistory(!showHistory)} className="justify-self-start inline-flex gap-2 items-center text-xs font-bold text-ems-600 dark:text-ems-400" aria-expanded={showHistory}><ChevronDown className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} /> Lịch sử phiên bản</button>
        {showHistory && <ol className="border-l-2 border-ems-200 dark:border-ems-900 pl-4 space-y-3">{(info.changes || []).map(change => <li key={`${change.version}-${change.date}`}><p className="font-bold text-sm">v{change.version} • {change.date}</p><p className="text-sm text-gray-600 dark:text-gray-400">{change.summary}</p></li>)}</ol>}
      </div>
    </section>
  )
}

