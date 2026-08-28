'use client'
import { useState } from 'react'
import { BadgeCheck, CalendarDays, ChevronDown, Clock3, UserRoundCheck } from 'lucide-react'

export default function DocumentInfo({ info }) {
  const [showHistory, setShowHistory] = useState(false)
  if (!info) return null
  const facts = [
    { label: 'Ban hành', value: info.issuedAt, icon: CalendarDays },
    { label: 'Cập nhật', value: info.updatedAt, icon: Clock3 },
    { label: 'Phê duyệt', value: info.approvedBy, icon: UserRoundCheck },
  ]
  return <section className="mx-auto max-w-[1420px] px-3 sm:px-5 lg:px-8 no-print" aria-labelledby="document-info-title">
    <div className="grid overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow-soft)] lg:grid-cols-[1.1fr_2fr_auto] lg:items-stretch">
      <div className="border-b border-[var(--line)] p-5 lg:border-b-0 lg:border-r lg:p-6"><p id="document-info-title" className="eyebrow">Hồ sơ phát hành</p><p className="mt-2 text-lg font-black tracking-tight">EMS Protocol / v{info.version}</p><span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#d9f1e5] px-2.5 py-1 text-[10px] font-black text-[#245c45]"><BadgeCheck className="h-3.5 w-3.5" /> ĐANG ÁP DỤNG</span></div>
      <div className="grid sm:grid-cols-3">{facts.map(fact => <div key={fact.label} className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--page)] text-[#ff5d45]"><fact.icon className="h-4 w-4" /></span><span><small className="block text-[9px] font-black uppercase tracking-[.16em] text-[var(--muted)]">{fact.label}</small><b className="mt-1 block text-xs">{fact.value}</b></span></div>)}</div>
      <button onClick={() => setShowHistory(!showHistory)} className="flex items-center justify-between gap-3 border-t border-[var(--line)] px-5 py-4 text-xs font-black lg:border-l lg:border-t-0">Lịch sử <ChevronDown className={`h-4 w-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} /></button>
    </div>
    {showHistory && <ol className="mt-2 grid gap-2 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 sm:grid-cols-2">{(info.changes || []).map(change => <li key={`${change.version}-${change.date}`} className="rounded-xl bg-[var(--page)] p-3"><p className="text-xs font-black">v{change.version} · {change.date}</p><p className="mt-1 text-xs leading-5 text-[var(--muted)]">{change.summary}</p></li>)}</ol>}
  </section>
}
