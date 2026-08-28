'use client'
import { BookOpenText, ReceiptText, Stethoscope } from 'lucide-react'

const tabs = [{ id: 'resident', label: 'Cư dân', detail: 'Quy định công cộng', icon: BookOpenText }, { id: 'ems', label: 'Nội bộ', detail: 'Dành cho bác sĩ', icon: Stethoscope }, { id: 'pricing', label: 'Viện phí', detail: 'Bảng giá & bill', icon: ReceiptText }]
export default function TabSwitcher({ active, onChange, counts }) {
  return <div className="no-print mb-5 grid gap-2 sm:grid-cols-3">{tabs.map(tab => {
    const selected = active === tab.id
    return <button key={tab.id} onClick={() => onChange(tab.id)} role="tab" aria-selected={selected} className={`group flex items-center gap-3 rounded-2xl border p-3 text-left transition sm:p-4 ${selected ? 'border-[#14231e] bg-[#14231e] text-white shadow-lg dark:border-[#bde8d5] dark:bg-[#bde8d5] dark:text-[#14231e]' : 'border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] hover:border-[var(--line-strong)]'}`}><span className={`grid h-10 w-10 place-items-center rounded-xl ${selected ? 'bg-[#ff765f] text-white' : 'bg-[var(--page)] text-[#ff5d45]'}`}><tab.icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><b className="block text-sm">{tab.label}</b><small className={`block truncate text-[10px] ${selected ? 'opacity-55' : 'text-[var(--muted)]'}`}>{tab.detail}</small></span><span className={`rounded-full px-2 py-1 text-[10px] font-black ${selected ? 'bg-white/10 dark:bg-[#14231e]/10' : 'bg-[var(--page)]'}`}>{counts?.[tab.id] ?? 0}</span></button>
  })}</div>
}
