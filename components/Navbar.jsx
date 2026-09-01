'use client'

import { useEffect, useState } from 'react'
import { Menu, Printer, Search, Shield } from 'lucide-react'

export default function Navbar({ onSearch, searchValue, dataSource, onPrint, onMenuOpen }) {
  const [time, setTime] = useState('00:00')
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }))
    update()
    const timer = window.setInterval(update, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const fallback = dataSource === 'fallback'
  return <div className="no-print">
    <div className="mdt-statusbar"><div className="mdt-wrap flex h-7 items-center justify-between"><span>{time}</span><span className="flex items-center gap-3"><span>▂▄▆█</span><span>GPS</span><span>EMS//01</span></span></div></div>
    <nav className="mdt-networkbar"><div className="mdt-wrap flex min-h-[70px] items-center gap-3 py-3">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mdt-control flex min-w-0 items-center gap-3 px-3 py-2 text-left sm:px-4">
        <span className={`h-2 w-2 flex-none rounded-full ${fallback ? 'bg-amber-400 shadow-[0_0_0_3px_#332905]' : 'bg-[#8ce04b] shadow-[0_0_0_3px_#3d5a22]'}`} />
        <span className="min-w-0"><b className="mdt-display block truncate text-base leading-none text-[var(--ink)]">Beach Town RP</b><small className="mdt-mono mt-1 block truncate text-[8px] tracking-wider text-[var(--muted)]">MDT NETWORK · SERVER 01</small></span>
      </button>
      <label className="mdt-console relative mx-auto hidden max-w-md flex-1 md:block"><Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8ce04b]" /><input aria-label="Tìm quy định" value={searchValue} onChange={event => onSearch(event.target.value)} placeholder="SEARCH / TOÀN BỘ QUY ĐỊNH" className="h-10 w-full bg-transparent pl-9 pr-3 text-[11px] text-[var(--ink)] outline-none placeholder:text-[#53616a]" /></label>
      <div className="ml-auto flex items-center gap-2">
        <span className={`mdt-mono hidden border px-3 py-2 text-[9px] font-bold uppercase lg:inline-flex ${fallback ? 'border-amber-400 text-amber-400' : 'border-[#8ce04b] text-[#8ce04b]'}`}>{fallback ? 'Fallback data' : 'Network online'}</span>
        <button onClick={onPrint} className="mdt-control grid h-10 w-10 place-items-center" title="Xuất PDF"><Printer className="h-4 w-4" /></button>
        <a href="/admin" className="mdt-control grid h-10 w-10 place-items-center" title="Quản trị"><Shield className="h-4 w-4" /></a>
        <button onClick={onMenuOpen} className="mdt-control grid h-10 w-10 place-items-center lg:hidden" aria-label="Mở mục lục"><Menu className="h-4 w-4" /></button>
      </div>
    </div></nav>
  </div>
}
