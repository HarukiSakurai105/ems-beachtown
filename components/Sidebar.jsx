'use client'
import { useEffect, useState } from 'react'
import { ListFilter, X } from 'lucide-react'
import clsx from 'clsx'

export default function Sidebar({ rules, isOpen, onClose, onNavigate }) {
  const [activeId, setActiveId] = useState(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActiveId(entry.target.id)), { rootMargin: '-18% 0px -68% 0px' })
    rules.forEach(rule => { const el = document.getElementById(rule.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [rules])
  return <>
    {isOpen && <div className="fixed inset-0 z-40 bg-black/45 lg:hidden" onClick={onClose} />}
    <aside className={clsx('fixed left-0 top-0 z-50 flex h-full w-[290px] flex-col border-r border-[var(--line)] bg-[var(--panel)] transition-transform lg:sticky lg:top-[86px] lg:z-10 lg:mt-10 lg:h-[calc(100vh-110px)] lg:w-[260px] lg:translate-x-0 lg:rounded-[1.75rem] lg:border lg:shadow-[var(--shadow-soft)]', isOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="flex items-center justify-between border-b border-[var(--line)] p-5"><div><p className="eyebrow">Điều hướng nhanh</p><h2 className="mt-2 flex items-center gap-2 text-sm font-black"><ListFilter className="h-4 w-4" /> Mục lục</h2></div><button onClick={onClose} className="nav-square lg:hidden"><X /></button></div>
      <nav className="flex-1 overflow-y-auto p-2.5">{rules.map((rule, index) => <a key={rule.id} href={`#${rule.id}`} onClick={event => { event.preventDefault(); onNavigate(rule.id); onClose() }} className={clsx('group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold', activeId === rule.id ? 'bg-[#14231e] text-white dark:bg-[#bde8d5] dark:text-[#14231e]' : 'text-[var(--muted)] hover:bg-[var(--page)] hover:text-[var(--ink)]')}><span className={clsx('grid h-7 w-7 flex-none place-items-center rounded-lg text-[10px] font-black', activeId === rule.id ? 'bg-[#ff765f] text-white' : 'bg-[var(--page)]')}>{String(index + 1).padStart(2, '0')}</span><span className="line-clamp-2 leading-5">{rule.title}</span></a>)}</nav>
      <div className="border-t border-[var(--line)] p-4 text-[9px] font-black uppercase tracking-[.18em] text-[var(--muted)]">EMS / Official directory</div>
    </aside>
  </>
}
