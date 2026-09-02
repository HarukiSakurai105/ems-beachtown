'use client'
import { useState } from 'react'
import { PhoneCall, Moon, Sun, Printer, Shield, Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import clsx from 'clsx'

export default function Navbar({ onNavClick, activeSection, onPrint, onOpenEmergency }) {
  const { theme, toggle } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'about', label: 'GIỚI THIỆU' },
    { id: 'rules', label: '[BỘ LUẬT]' },
    { id: 'sop', label: 'QUY TRÌNH' },
    { id: 'personnel', label: 'NHÂN SỰ' },
  ]

  const handleItem = (id) => {
    setMobileMenuOpen(false)
    if (onNavClick) onNavClick(id)
  }

  return (
    <header className="bg-[#0b2847] text-white border-b border-white/10 z-50 sticky top-0 no-print shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        
        {/* Left Logo: Match screenshot */}
        <div 
          onClick={() => handleItem('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
        >
          {/* Round Red & Blue Shield Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-blue-700 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#0b2847] flex items-center justify-center text-sm sm:text-base border border-white/30">
              ⚕️
            </div>
          </div>

          <div className="leading-tight">
            <h1 className="text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase">
              LOS SANTOS EMS DEPARTMENT -
            </h1>
            <p className="text-sky-300 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
              BỘ LUẬT & QUY ĐỊNH
            </p>
          </div>
        </div>

        {/* Center Nav items */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-xs font-bold tracking-wider uppercase">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItem(item.id)}
              className={clsx(
                'transition-colors py-1.5',
                item.id === 'rules'
                  ? 'text-white font-black'
                  : 'text-slate-300 hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right CTA button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#d90429] hover:bg-[#ef233c] text-white text-xs font-extrabold tracking-wider uppercase shadow-md transition-transform active:scale-95 animate-pulse"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>BÁO CẤP CỨU (911)</span>
          </button>

          <button
            onClick={toggle}
            className="grid w-8 h-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs"
            title="Đổi giao diện Sáng / Tối"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-sky-200" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden grid w-8 h-8 place-items-center rounded-lg bg-white/10 hover:bg-white/20 text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#081f38] px-4 py-3 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleItem(item.id)}
              className="w-full text-left py-2 px-3 rounded-lg text-xs font-bold text-slate-200 hover:bg-white/10 block"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
