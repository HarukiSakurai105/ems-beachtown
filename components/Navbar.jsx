'use client'
import { Menu, Moon, Printer, Search, Shield, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar({ onSearch, onPrint, onMenuOpen }) {
  const { theme, toggle } = useTheme()
  return <nav className="fixed inset-x-0 top-0 z-50 no-print px-3 pt-3 sm:px-5">
    <div className="mx-auto flex h-[62px] max-w-[1420px] items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel-translucent)] px-3 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:px-4">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex min-w-0 flex-none items-center gap-2.5 text-left">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff5d45] text-lg text-white">⚕</span>
        <span className="hidden sm:block"><b className="block text-xs font-black tracking-tight text-[var(--ink)]">BEACH TOWN EMS</b><span className="mt-0.5 block text-[8px] font-black uppercase tracking-[.2em] text-[var(--muted)]">Medical desk / 2026</span></span>
      </button>
      <label className="relative mx-auto hidden max-w-md flex-1 md:block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" /><input onChange={event => onSearch(event.target.value)} placeholder="Tìm nhanh quy định…" className="h-10 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] pl-9 pr-3 text-xs font-semibold text-[var(--ink)] outline-none focus:border-[#ff5d45]" /></label>
      <div className="ml-auto flex items-center gap-1.5">
        <span className="hidden items-center gap-2 rounded-full bg-[#d9f1e5] px-3 py-2 text-[10px] font-black text-[#245c45] lg:flex"><i className="h-1.5 w-1.5 rounded-full bg-[#2ba66f]" /> DATA LIVE</span>
        <button onClick={onPrint} className="nav-square hidden md:grid" title="Xuất PDF"><Printer /></button>
        <a href="/admin" className="nav-square" title="Quản trị"><Shield /></a>
        <button onClick={toggle} className="nav-square" aria-label="Đổi giao diện">{theme === 'dark' ? <Sun /> : <Moon />}</button>
        <button onClick={onMenuOpen} className="nav-square lg:hidden" aria-label="Mở mục lục"><Menu /></button>
      </div>
    </div>
  </nav>
}
