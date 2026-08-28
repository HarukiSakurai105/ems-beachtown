'use client'
import { BookOpenText, Printer, ReceiptText, Stethoscope } from 'lucide-react'
import clsx from 'clsx'
export default function MobileBottomNav({ active, onChange, onPrint }) {
  const tabs = [{ id: 'resident', icon: BookOpenText, label: 'Cư dân' }, { id: 'ems', icon: Stethoscope, label: 'Nội bộ' }, { id: 'pricing', icon: ReceiptText, label: 'Viện phí' }, { id: 'print', icon: Printer, label: 'PDF' }]
  return <div className="fixed bottom-2 left-2 right-2 z-50 rounded-[1.35rem] border border-white/10 bg-[#14231e]/95 p-1.5 text-white shadow-2xl backdrop-blur-xl sm:hidden no-print"><div className="flex">{tabs.map(tab => <button key={tab.id} onClick={() => tab.id === 'print' ? onPrint() : onChange(tab.id)} className={clsx('flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[9px] font-black', active === tab.id ? 'bg-[#bde8d5] text-[#14231e]' : 'text-white/50')}><tab.icon className="h-4 w-4" />{tab.label}</button>)}</div></div>
}
