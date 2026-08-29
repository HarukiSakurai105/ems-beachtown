'use client'
import { BookOpenText, Stethoscope } from 'lucide-react'
const tabs = [{ id: 'resident', label: 'Cư dân', detail: 'Quy định công cộng', icon: BookOpenText }, { id: 'ems', label: 'Nội bộ EMS', detail: 'Nghiệp vụ bác sĩ', icon: Stethoscope }]
export default function TabSwitcher({ active, onChange, counts }) {
  function handleKeyDown(event, index) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    const buttons = event.currentTarget.parentElement.querySelectorAll('[role="tab"]')
    buttons[nextIndex]?.focus()
    onChange(tabs[nextIndex].id)
  }
  return <div role="tablist" aria-label="Nhóm quy định" className="no-print mb-5 grid gap-2 sm:grid-cols-2">{tabs.map((tab, index) => { const selected = active === tab.id; return <button key={tab.id} onClick={() => onChange(tab.id)} onKeyDown={event => handleKeyDown(event, index)} role="tab" aria-selected={selected} tabIndex={selected ? 0 : -1} className={`flex items-center gap-3 rounded-xl border p-3 text-left sm:p-4 ${selected ? 'border-[#087ca7] bg-[#087ca7] text-white shadow-lg shadow-cyan-900/10' : 'border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] hover:border-[var(--accent)]'}`}><span className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? 'bg-white/15' : 'bg-[var(--accent-soft)] text-[var(--accent)]'}`}><tab.icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><b className="block text-xs sm:text-sm">{tab.label}</b><small className={`mt-1 block truncate text-[9px] ${selected ? 'text-white/60' : 'text-[var(--muted)]'}`}>{tab.detail}</small></span><span className={`rounded-lg px-2 py-1 text-[9px] font-black ${selected ? 'bg-white/10' : 'bg-[var(--page)]'}`}>{counts?.[tab.id] ?? 0}</span></button> })}</div>
}
