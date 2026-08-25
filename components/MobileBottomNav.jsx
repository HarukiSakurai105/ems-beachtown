'use client'
import clsx from 'clsx'

export default function MobileBottomNav({ active, onChange, onPrint }) {
  const tabs = [
    { id: 'resident', icon: '👥', label: 'Cư dân' },
    { id: 'ems',      icon: '🩺', label: 'Nội bộ EMS' },
    { id: 'pricing',  icon: '💵', label: 'Bảng Giá' },
    { id: 'print',    icon: '🖨️', label: 'In' },
  ]
  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 sm:hidden no-print rounded-2xl border border-white/10 bg-slate-950/95 text-white backdrop-blur-xl shadow-2xl">
      <div className="flex p-1">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => t.id === 'print' ? onPrint() : onChange(t.id)}
            className={clsx(
              'flex-1 flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-bold transition-all',
              active === t.id
                ? 'bg-white text-slate-950'
                : 'text-slate-400'
            )}
          >
            <span className="text-lg leading-none">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
