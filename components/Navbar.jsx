'use client'
import { Activity, Menu, Moon, Printer, Search, Shield, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar({ onSearch, onPrint, onMenuOpen }) {
  const { theme, toggle } = useTheme()
  return <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--panel-translucent)] backdrop-blur-xl no-print">
    <div className="mx-auto flex h-[76px] max-w-[1480px] items-center gap-4 px-4 sm:px-6 lg:px-8">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex min-w-0 flex-none items-center gap-3 text-left">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e44848] text-white shadow-lg shadow-red-500/15"><Activity className="h-5 w-5" /></span>
        <span className="hidden sm:block"><b className="block text-sm font-black tracking-[-.02em] text-[var(--ink)]">BEACH TOWN EMS</b><span className="mt-0.5 block text-[8px] font-black uppercase tracking-[.22em] text-[var(--muted)]">Clinical Protocol Portal</span></span>
      </button>
      <label className="relative mx-auto hidden max-w-xl flex-1 md:block"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" /><input aria-label="Tìm quy định" onChange={event => onSearch(event.target.value)} placeholder="Tìm quy định, nghiệp vụ, tình huống…" className="h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--page)] pl-10 pr-3 text-xs font-semibold text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-cyan-500/10" /></label>
      <div className="ml-auto flex items-center gap-2">
        <span className="hidden items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[9px] font-black uppercase tracking-wider text-emerald-700 lg:flex dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Hệ thống trực tuyến</span>
        <button onClick={onPrint} className="nav-square hidden md:grid" title="Xuất PDF"><Printer /></button>
        <a href="/admin" className="nav-square" title="Quản trị"><Shield /></a>
        <button onClick={toggle} className="nav-square" aria-label="Đổi giao diện">{theme === 'dark' ? <Sun /> : <Moon />}</button>
        <button onClick={onMenuOpen} className="nav-square lg:hidden" aria-label="Mở mục lục"><Menu /></button>
      </div>
    </div>
  </nav>
}
