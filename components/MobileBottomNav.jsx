'use client'
import { BookOpenText, Printer, Stethoscope } from 'lucide-react'
import clsx from 'clsx'
export default function MobileBottomNav({ active, onChange, onPrint }) {
  const tabs = [{ id: 'resident', icon: BookOpenText, label: 'Cư dân' }, { id: 'ems', icon: Stethoscope, label: 'Nội bộ' }, { id: 'print', icon: Printer, label: 'PDF' }]
  return <div className="fixed bottom-2 left-2 right-2 z-50 border border-[var(--line)] bg-[#10161b]/95 p-1.5 text-white backdrop-blur-xl sm:hidden no-print"><div className="flex">{tabs.map(tab => <button key={tab.id} onClick={() => tab.id === 'print' ? onPrint() : onChange(tab.id)} className={clsx('mdt-mono flex flex-1 flex-col items-center gap-1 border border-transparent py-2 text-[8px] font-bold uppercase', active === tab.id ? 'border-[#8ce04b] bg-[#182614] text-[#8ce04b]' : 'text-white/45')}><tab.icon className="h-4 w-4" />{tab.label}</button>)}</div></div>
}
