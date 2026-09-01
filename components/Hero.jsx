'use client'
import { Search } from 'lucide-react'

export default function Hero({ onSelectTag, onSearch, searchValue, counts, version }) {
  const bars = [
    { label: 'Cư dân', value: counts?.resident || 0, color: '#8ce04b', query: 'cấp cứu', segments: 4 },
    { label: 'Nội bộ EMS', value: counts?.ems || 0, color: '#3fa9f5', query: 'duty', segments: 6 },
    { label: 'Protocol', value: `V${version || '1.0'}`, color: '#ff4655', query: '', segments: 3 },
  ]
  return <header className="mdt-wrap py-9 sm:py-12">
    <p className="mdt-kicker">// EMS.MDT — TRUY CẬP QUY CHUẨN</p>
    <h1 className="mdt-display mt-2 max-w-3xl text-[2.35rem] leading-[.98] text-[var(--ink)] sm:text-6xl">Quy chuẩn y tế,<br /><span className="text-[#8ce04b]">tra cứu trong vài giây.</span></h1>
    <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">Hệ thống MDT quy định chính thức của EMS Beach Town — đồng bộ trực tiếp từ Supabase và áp dụng thống nhất cho cư dân lẫn đội ngũ y tế.</p>
    <div className="mdt-console mt-6 max-w-2xl p-3.5"><p className="mb-2 text-[11px] text-[#8ce04b]">MDT&gt; search --query</p><label className="flex items-center gap-2"><span className="text-[var(--ink)]">&gt;</span><Search className="h-3.5 w-3.5 text-[#3fa9f5]" /><input aria-label="Tìm quy định" value={searchValue} onChange={event => onSearch?.(event.target.value)} placeholder="đeo mặt nạ / mức phạt / trực thăng / CRM" className="min-w-0 flex-1 bg-transparent text-xs text-[var(--ink)] outline-none placeholder:text-[#53616a] sm:text-sm" /><span className="mdt-cursor" /></label></div>
    <div className="mt-5 grid gap-2 sm:grid-cols-3">{bars.map(bar => <button key={bar.label} onClick={() => bar.query && onSelectTag?.(bar.query)} className="mdt-control p-3 text-left" style={{ '--segment': bar.color }}><div className="flex items-end justify-between"><strong className="mdt-display text-2xl leading-none text-[var(--ink)]">{String(bar.value).padStart(2, '0')}</strong><span className="mdt-mono text-[9px] uppercase text-[var(--muted)]">{bar.label}</span></div><div className="mdt-segments mt-2">{Array.from({ length: 7 }).map((_, index) => <i key={index} className={index < bar.segments ? 'on' : ''} />)}</div></button>)}</div>
  </header>
}
