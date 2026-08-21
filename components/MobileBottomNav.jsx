'use client'
import clsx from 'clsx'

export default function MobileBottomNav({ active, onChange, onPrint }) {
  const tabs = [
    { id: 'resident', icon: '👥', label: 'Cư dân' },
    { id: 'ems',      icon: '🩺', label: 'EMS' },
    { id: 'print',    icon: '🖨️', label: 'In' },
  ]
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden no-print bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-t border-gray-200 dark:border-navy-700 shadow-2xl">
      <div className="flex">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => t.id === 'print' ? onPrint() : onChange(t.id)}
            className={clsx(
              'flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-all',
              active === t.id
                ? 'text-ems-600 dark:text-ems-400'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            <span className="text-xl leading-none">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
