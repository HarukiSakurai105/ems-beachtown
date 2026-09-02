'use client'
import { useState, useEffect } from 'react'
import { PhoneCall, Moon, Sun, Printer, Shield, Menu, X, Activity } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import clsx from 'clsx'

export default function Navbar({ onNavClick, activeSection, onPrint, onOpenEmergency }) {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'about', label: 'GIỚI THIỆU' },
    { id: 'rules', label: 'BỘ LUẬT' },
    { id: 'sop', label: 'QUY TRÌNH' },
    { id: 'personnel', label: 'NHÂN SỰ' },
  ]

  const handleItemClick = (id) => {
    setMobileMenuOpen(false)
    if (onNavClick) onNavClick(id)
  }

  return (
    <header className={clsx(
      'sticky top-0 z-50 transition-all duration-300 no-print',
      scrolled
        ? 'bg-[#0f2338]/95 dark:bg-[#07101c]/95 backdrop-blur-md shadow-xl border-b border-white/10 py-2.5'
        : 'bg-[#0f2338] dark:bg-[#07101c] border-b border-white/10 py-3.5'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Logo matching the screenshot */}
        <div 
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
        >
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-ems-700 via-ems-600 to-red-500 flex items-center justify-center text-xl shadow-lg shadow-ems-900/50 group-hover:scale-105 transition-transform">
              ⚕️
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <h1 className="text-white font-black text-xs sm:text-sm tracking-wider uppercase">
                LOS SANTOS EMS DEPARTMENT
              </h1>
            </div>
            <p className="text-sky-300 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
              BỘ LUẬT & QUY ĐỊNH HÀNH CHÍNH
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id || (item.id === 'rules' && !activeSection)
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all uppercase',
                  isActive
                    ? 'text-white bg-white/15 border border-white/20 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                )}
              >
                {item.id === 'rules' ? `[${item.label}]` : item.label}
              </button>
            )
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Emergency 911 CTA - exact match with screenshot */}
          <button
            onClick={onOpenEmergency}
            className="emergency-btn inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase transition-transform active:scale-95 shadow-lg"
            title="Nhấn để xem quy trình cấp cứu khẩn cấp 911"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>BÁO CẤP CỨU (911)</span>
          </button>

          {/* Print PDF */}
          <button
            onClick={onPrint}
            className="hidden sm:grid w-9 h-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
            title="In hoặc Xuất PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggle}
            className="grid w-9 h-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Đổi giao diện Sáng / Tối"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-200" />}
          </button>

          {/* Admin link */}
          <a
            href="/admin"
            className="hidden md:grid w-9 h-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
            title="Cổng quản trị Ban Giám Đốc"
          >
            <Shield className="w-4 h-4" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden grid w-9 h-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0c1c2e] px-4 py-4 space-y-2 text-white animate-slide-up">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 text-slate-200 hover:text-white flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-xs text-sky-400">➔</span>
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <a href="/admin" className="text-xs text-sky-300 font-bold flex items-center gap-1.5 py-1">
              <Shield className="w-3.5 h-3.5" /> Quản trị Admin
            </a>
            <button onClick={onPrint} className="text-xs text-slate-300 font-bold flex items-center gap-1.5 py-1">
              <Printer className="w-3.5 h-3.5" /> In PDF
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
