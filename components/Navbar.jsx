'use client'
import { useState, useEffect, useRef } from 'react'
import { Search, Printer, Moon, Sun, Menu, X, Cross } from 'lucide-react'
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
        ? 'bg-navy-900/95 dark:bg-navy-950/95 backdrop-blur-md shadow-2xl'
        : 'bg-navy-900 dark:bg-navy-950'
    )}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 bg-ems-600 rounded-lg flex items-center justify-center shadow-lg shadow-ems-900/40">
            <span className="text-sm" aria-hidden="true">⚕️</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm leading-none">EMS BEACH TOWN</p>
            <p className="text-navy-400 text-[10px] leading-none mt-0.5">GTA RolePlay</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-navy-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Tìm kiếm điều khoản..."
              className="w-full pl-9 pr-8 py-2 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 focus:border-white/30 rounded-full text-white placeholder-navy-400 text-sm outline-none transition-all"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-3 text-navy-400 hover:text-white transition-colors"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
          <button
            onClick={onPrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-full text-white text-xs font-medium transition-all"
            aria-label="In / Lưu PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In / PDF</span>
          </button>
          <button
            onClick={toggle}
            className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            aria-label="Chuyển dark/light mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onMenuOpen}
            className="lg:hidden w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            aria-label="Mở menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  )
}
