'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import clsx from 'clsx'

export default function Sidebar({ rules, activeTab, isOpen, onClose, onNavigate }) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
    }, { rootMargin: '-15% 0px -70% 0px' })
    rules.forEach(r => {
      const el = document.getElementById(r.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [rules])

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={clsx(
        'fixed top-[72px] left-0 h-[calc(100vh-72px)] w-72 border-r border-slate-200 bg-white dark:border-white/10 dark:bg-[#0a1525] flex flex-col z-50',
        'transition-transform duration-300 ease-in-out',
        'lg:translate-x-0 lg:sticky lg:top-[72px] lg:z-10',
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
          <div><p className="text-[9px] font-black uppercase tracking-[.2em] text-red-500">Directory</p><h2 className="mt-1 text-slate-950 dark:text-white font-black text-sm">Mục lục quy định</h2></div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {rules.map(rule => (
            <a
              key={rule.id}
              href={`#${rule.id}`}
              onClick={(e) => { e.preventDefault(); onNavigate(rule.id); onClose() }}
              className={clsx(
                'flex items-center gap-3 px-5 py-2.5 text-sm transition-all border-l-2',
                activeId === rule.id
                  ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-500/10 dark:text-red-300'
                  : 'border-transparent text-slate-500 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 dark:hover:border-white/20'
              )}
            >
              <span className="text-base leading-none">{rule.icon}</span>
              <span className="flex-1 leading-tight">{rule.num} — {rule.title}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-white/10 flex-shrink-0">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">EMS Protocol System</p>
        </div>
      </aside>
    </>
  )
}
