'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, Printer, Moon, Sun, Menu, X, Shield } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import clsx from 'clsx'

export default function Navbar({ onSearch, onPrint, onMenuOpen }) {
  const { theme, toggle } = useTheme()
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print',
      scrolled
        ? 'bg-navy-950/95 backdrop-blur-md shadow-2xl border-b border-white/10'
        : 'bg-navy-900/90 dark:bg-navy-950/90 backdrop-blur-sm'
    )}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 bg-gradient-to-tr from-ems-700 to-ems-500 rounded-xl flex items-center justify-center shadow-lg shadow-ems-900/50 hover:scale-105 transition-transform">
            <span className="text-base" aria-hidden="true">⚕️</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-black text-sm tracking-wide leading-none">EMS BEACH TOWN</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider leading-none">ON-DUTY 24/7</p>
            </div>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative flex items-center group">
            <Search className="absolute left-3.5 w-4 h-4 text-navy-400 group-hover:text-ems-400 transition-colors pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Tìm nhanh: #GiaoTranh, #TreoDuty, Điều 4..."
              className="w-full pl-10 pr-9 py-2 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 focus:border-ems-500/50 rounded-full text-white placeholder-navy-400 text-sm outline-none transition-all shadow-inner focus:ring-2 focus:ring-ems-500/20"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 text-navy-400 hover:text-white transition-colors p-0.5 rounded-full hover:bg-white/10"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <a href="/admin" className="hidden md:flex w-9 h-9 items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-all" aria-label="Đăng nhập quản trị" title="Quản trị"><Shield className="w-4 h-4" /></a>
          <button
            onClick={onPrint}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full text-white text-xs font-semibold transition-all hover:scale-105"
            aria-label="In / Lưu PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In / PDF</span>
          </button>
          
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-all hover:scale-105"
            aria-label="Chuyển dark/light mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-200" />}
          </button>

          <button
            onClick={onMenuOpen}
            className="lg:hidden w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-all"
            aria-label="Mở menu mục lục"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </nav>
  )
}
