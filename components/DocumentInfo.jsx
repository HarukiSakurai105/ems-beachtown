'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
export default function DocumentInfo({ info }) {
  const [showHistory, setShowHistory] = useState(false)
  if (!info) return null
  return <section className="mdt-wrap no-print" aria-labelledby="document-info-title"><div className="flex flex-col gap-3 border-l-[3px] border-[#8ce04b] bg-[var(--panel)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
    <div><p id="document-info-title" className="mdt-display text-base">EMS Protocol / v{info.version}</p><p className="mdt-mono mt-1 text-[9px] leading-5 text-[var(--muted)]">BAN HÀNH {info.issuedAt} · CẬP NHẬT {info.updatedAt} · {info.approvedBy}</p></div>
    <div className="flex items-center gap-2"><span className="mdt-mono border border-[#8ce04b] px-3 py-1.5 text-[9px] font-bold text-[#8ce04b]">{info.status === 'expired' ? 'HẾT HIỆU LỰC' : 'ĐANG ÁP DỤNG'}</span><button onClick={() => setShowHistory(!showHistory)} className="mdt-control flex items-center gap-2 px-3 py-1.5 text-[9px] font-bold">LOG <ChevronDown className={`h-3.5 w-3.5 ${showHistory ? 'rotate-180' : ''}`} /></button></div>
  </div>{showHistory && <ol className="mt-2 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">{(info.changes || []).map(change => <li key={`${change.version}-${change.date}`} className="bg-[var(--panel)] p-4"><p className="mdt-mono text-[10px] font-bold text-[#8ce04b]">REV//{change.version} · {change.date}</p><p className="mt-2 text-xs leading-5 text-[var(--muted)]">{change.summary}</p></li>)}</ol>}</section>
}
