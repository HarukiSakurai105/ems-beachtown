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
        'fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-navy-900 dark:bg-navy-950 flex flex-col z-50',
        'transition-transform duration-300 ease-in-out',
        'lg:translate-x-0 lg:sticky lg:top-16 lg:z-10',
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-white/80 font-semibold text-sm tracking-wider uppercase">📋 Mục lục</h2>
          <button onClick={onClose} className="lg:hidden text-white/50 hover:text-white transition-colors p-1">
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
                  ? 'bg-white/8 border-ems-500 text-white'
                  : 'border-transparent text-white/50 hover:text-white/80 hover:bg-white/5 hover:border-white/20'
              )}
            >
              <span className="text-base leading-none">{rule.icon}</span>
              <span className="flex-1 leading-tight">{rule.num} — {rule.title}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 flex-shrink-0">
          <p className="text-white/25 text-[11px]">v1.0.0 • Cập nhật 08/2026</p>
        </div>
      </aside>
    </>
  )
}
