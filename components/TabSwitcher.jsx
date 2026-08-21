'use client'
import clsx from 'clsx'

const TABS = [
  { id: 'resident', icon: '👥', label: 'Quy định Cư dân',   short: 'Cư dân' },
  { id: 'ems',      icon: '🩺', label: 'Quy định nội bộ EMS', short: 'EMS' },
  { id: 'pricing',  icon: '💵', label: 'Bảng Giá & Tính Bill', short: 'Bảng Giá & Bill' },
]

export default function TabSwitcher({ active, onChange, counts }) {
  return (
    <div className="flex gap-2.5 flex-wrap no-print mb-6">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={active === tab.id}
          className={clsx(
            'flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition-all duration-200 transform',
            active === tab.id
              ? tab.id === 'ems'
                ? 'bg-navy-800 dark:bg-navy-800 border-navy-600 text-white shadow-lg shadow-navy-950/40 scale-105'
                : tab.id === 'pricing'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/30 scale-105'
                  : 'bg-ems-600 border-ems-500 text-white shadow-lg shadow-ems-900/30 scale-105'
              : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700 text-gray-600 dark:text-gray-400 hover:border-ems-300 dark:hover:border-ems-800 hover:-translate-y-0.5 hover:shadow-md'
          )}
        >
          <span className="text-base">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.short}</span>
          {counts && counts[tab.id] !== undefined && (
            <span className={clsx(
              'text-[10px] px-1.5 py-0.5 rounded-full font-extrabold',
              active === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400'
            )}>
              {counts[tab.id]}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
