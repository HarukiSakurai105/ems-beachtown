'use client'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import clsx from 'clsx'

import { ThemeProvider } from '../components/ThemeProvider'
import ScrollProgress from '../components/ScrollProgress'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import TabSwitcher from '../components/TabSwitcher'
import AccordionItem from '../components/AccordionItem'
import MobileBottomNav from '../components/MobileBottomNav'
import Footer from '../components/Footer'
import { residentRules } from '../data/resident-rules'
import { emsRules } from '../data/ems-rules'

const ALL_RULES = { resident: residentRules, ems: emsRules }

export default function Home() {
  const [activeTab, setActiveTab] = useState('resident')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openAll, setOpenAll] = useState(null) // null | true | false
  const [splashFinished, setSplashFinished] = useState(false)

  useEffect(() => {
    // Handle hash navigation on load
    const hash = window.location.hash.slice(1)
    if (hash) {
      const rule = [...residentRules, ...emsRules].find(r => r.id === hash)
      if (rule) {
        setActiveTab(rule.id.startsWith('ems') ? 'ems' : 'resident')
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 500)
      }
    }
    // Restore tab from localStorage
    const saved = localStorage.getItem('ems_tab')
    if (saved && !hash) setActiveTab(saved)
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setOpenAll(null)
    setSearchQuery('')
    localStorage.setItem('ems_tab', tab)
  }

  const handleSearch = (q) => {
    setSearchQuery(q)
    if (q) setOpenAll(true)
  }

  const handlePrint = () => {
    setOpenAll(true)
    setTimeout(() => window.print(), 300)
  }

  const handleNavigate = (id) => {
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 50)
  }

  const rules = ALL_RULES[activeTab]

  // Filter by search
  const filteredRules = searchQuery
    ? rules.filter(r => {
        const q = searchQuery.toLowerCase()
        return (
          r.title.toLowerCase().includes(q) ||
          r.num.toLowerCase().includes(q) ||
          (r.keywords || '').toLowerCase().includes(q) ||
          (r.items || []).some(item => item.text.toLowerCase().includes(q))
        )
      })
    : rules

  const counts = {
    resident: residentRules.length,
    ems: emsRules.length,
  }

  return (
    <ThemeProvider>
      {/* Interactive Waiting / Splash Screen */}
      <LoadingScreen onComplete={() => setSplashFinished(true)} />

      {/* Main Home Page with smooth fade-in after splash */}
      <div
        className={clsx(
          'min-h-screen bg-gray-50 dark:bg-navy-900 pb-16 sm:pb-0 transition-opacity duration-700',
          splashFinished ? 'opacity-100' : 'opacity-0'
        )}
      >
        <ScrollProgress />
        <Navbar
          onSearch={handleSearch}
          onPrint={handlePrint}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <Hero />

        {/* Layout */}
        <div className="flex max-w-7xl mx-auto">
          <Sidebar
            rules={rules}
            activeTab={activeTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onNavigate={handleNavigate}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
            {/* Tab switcher */}
            <TabSwitcher active={activeTab} onChange={handleTabChange} counts={counts} />

            {/* Section header */}
            <div className="mb-6 pb-5 border-b border-gray-200 dark:border-navy-700">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={clsx(
                    'inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2',
                    activeTab === 'ems'
                      ? 'bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300'
                      : 'bg-ems-50 dark:bg-ems-950/30 text-ems-700 dark:text-ems-400'
                  )}>
                    {activeTab === 'ems' ? 'PHẦN 2' : 'PHẦN 1'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                    {activeTab === 'ems'
                      ? 'QUY ĐỊNH NỘI BỘ EMS BEACH TOWN'
                      : 'QUY ĐỊNH KHÁM BỆNH TẠI EMS BEACH TOWN'}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {activeTab === 'ems'
                      ? 'Dành riêng cho nhân viên y tế. Mọi thành viên EMS phải đọc và tuân thủ đầy đủ.'
                      : 'Dành cho tất cả cư dân khi đến khám, cấp cứu hoặc tiếp xúc với nhân viên EMS.'}
                  </p>
                </div>

                {/* Expand/Collapse all */}
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 no-print">
                  <button
                    onClick={() => setOpenAll(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-ems-300 hover:text-ems-600 transition-all shadow-sm"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    Mở tất cả
                  </button>
                  <button
                    onClick={() => setOpenAll(false)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 hover:text-gray-700 transition-all shadow-sm"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    Đóng tất cả
                  </button>
                </div>
              </div>
            </div>

            {/* Search status */}
            {searchQuery && (
              <div className={clsx(
                'mb-4 px-4 py-3 rounded-xl text-sm border flex items-center gap-2',
                filteredRules.length === 0
                  ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400'
                  : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300'
              )}>
                <span>{filteredRules.length === 0 ? '😕' : '🔍'}</span>
                {filteredRules.length === 0
                  ? `Không tìm thấy kết quả nào cho "${searchQuery}".`
                  : `Tìm thấy ${filteredRules.length} mục khớp với "${searchQuery}".`
                }
              </div>
            )}

            {/* Accordion list */}
            <div className="space-y-3">
              {filteredRules.map((rule, i) => (
                <div key={rule.id} className="observe-fade is-visible" style={{ animationDelay: `${i * 40}ms` }}>
                  <AccordionItem
                    rule={rule}
                    highlight={searchQuery}
                    isOpen={openAll !== null ? openAll : undefined}
                  />
                </div>
              ))}
            </div>

            {filteredRules.length === 0 && !searchQuery && (
              <div className="text-center py-20 text-gray-400 dark:text-gray-600">
                <p className="text-4xl mb-3">🏥</p>
                <p>Không có điều khoản nào.</p>
              </div>
            )}
          </main>
        </div>

        <Footer />

        <MobileBottomNav
          active={activeTab}
          onChange={handleTabChange}
          onPrint={handlePrint}
        />
      </div>
    </ThemeProvider>
  )
}
