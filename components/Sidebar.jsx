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
    <aside className={clsx('fixed left-0 top-0 z-50 flex h-full w-[290px] flex-col border-r border-[var(--line)] bg-[var(--panel)] transition-transform lg:sticky lg:top-4 lg:z-10 lg:mt-9 lg:h-[calc(100vh-32px)] lg:w-[245px] lg:translate-x-0 lg:border', isOpen ? 'translate-x-0' : '-translate-x-full')}>
      <div className="flex items-center justify-between border-b border-[var(--line)] p-4"><div><p className="mdt-kicker">// DIRECTORY</p><h2 className="mdt-display mt-2 flex items-center gap-2 text-base"><ListFilter className="h-4 w-4 text-[#8ce04b]" /> Mục lục</h2></div><button onClick={onClose} className="mdt-control grid h-9 w-9 place-items-center lg:hidden"><X className="h-4 w-4" /></button></div>
      <nav className="flex-1 overflow-y-auto p-2">{rules.map((rule, index) => <a key={rule.id} href={`#${rule.id}`} onClick={event => { event.preventDefault(); onNavigate(rule.id); onClose() }} className={clsx('group flex items-center gap-3 border border-transparent px-2.5 py-2.5 text-xs font-semibold', activeId === rule.id ? 'border-[#3d5a22] bg-[#182614] text-[#8ce04b]' : 'text-[var(--muted)] hover:border-[var(--line)] hover:bg-[#151d24] hover:text-[var(--ink)]')}><span className="mdt-mono grid h-7 w-7 flex-none place-items-center border border-[var(--line)] text-[9px] font-bold">{String(index + 1).padStart(2, '0')}</span><span className="line-clamp-2 leading-5">{rule.title}</span></a>)}</nav>
      <div className="mdt-mono border-t border-[var(--line)] p-4 text-[8px] uppercase tracking-[.16em] text-[var(--muted)]">REC//OFFICIAL_DIRECTORY</div>
    </aside>
  </>
}
