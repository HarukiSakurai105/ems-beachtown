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
  return <div role="tablist" aria-label="Nhóm quy định" className="no-print mb-5 flex gap-2 overflow-x-auto pb-1">{tabs.map((tab, index) => { const selected = active === tab.id; return <button key={tab.id} onClick={() => onChange(tab.id)} onKeyDown={event => handleKeyDown(event, index)} role="tab" aria-selected={selected} tabIndex={selected ? 0 : -1} className={`mdt-control flex min-w-[190px] flex-1 items-center gap-3 p-3 text-left ${selected ? 'border-[#8ce04b] bg-[#182614] text-[#8ce04b]' : ''}`}><span className={`grid h-10 w-10 place-items-center border ${selected ? 'border-[#8ce04b]' : 'border-[var(--line)]'}`}><tab.icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><b className="mdt-display block text-sm">{tab.label}</b><small className="mdt-mono mt-1 block truncate text-[8px] text-[var(--muted)]">{tab.detail}</small></span><span className="mdt-mono text-xs font-bold">{String(counts?.[tab.id] ?? 0).padStart(2, '0')}</span></button> })}</div>
}
