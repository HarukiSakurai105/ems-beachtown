'use client'
import { useState, useEffect, useCallback } from 'react'
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
import DocumentInfo from '../components/DocumentInfo'
import Glossary from '../components/Glossary'
import { residentRules } from '../data/resident-rules'
import { emsRules } from '../data/ems-rules'
import { defaultVersionInfo } from '../lib/default-content'

export default function Home() {
  const [activeTab, setActiveTab] = useState('resident')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openAll, setOpenAll] = useState(null) // null | true | false
  const [content, setContent] = useState({ residentRules, emsRules, versionInfo: defaultVersionInfo })

  const refreshContent = useCallback(() => {
    return fetch(`/api/content?t=${Date.now()}`, { cache: 'no-store' })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => setContent(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    refreshContent()

    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ems-content-sync') : null
    if (channel) channel.onmessage = event => event.data?.type === 'published' && refreshContent()
    const onStorage = event => event.key === 'ems_content_updated' && refreshContent()
    const onVisibility = () => document.visibilityState === 'visible' && refreshContent()
    const interval = window.setInterval(refreshContent, 60_000)
    window.addEventListener('storage', onStorage)
    document.addEventListener('visibilitychange', onVisibility)

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
    if (['resident', 'ems'].includes(saved) && !hash) setActiveTab(saved)

    return () => {
      channel?.close()
      window.clearInterval(interval)
      window.removeEventListener('storage', onStorage)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [refreshContent])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setOpenAll(null)
    setSearchQuery('')
    localStorage.setItem('ems_tab', tab)
  }

  const handleSearch = (q) => {
    setSearchQuery(q)
    setOpenAll(q ? true : null)
  }

  const handleSelectTag = (query) => {
    setSearchQuery(query)
    setOpenAll(true)
    // Smooth scroll down to content
    const mainSection = document.getElementById('main-rules-section')
    if (mainSection) {
      const y = mainSection.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
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

  const visibleResidentRules = (content.residentRules || []).filter(rule => rule.visible !== false)
  const visibleEmsRules = (content.emsRules || []).filter(rule => rule.visible !== false)
  const allRules = { resident: visibleResidentRules, ems: visibleEmsRules }
  const rules = allRules[activeTab] || []
  const searchableRules = [
    ...visibleResidentRules.map(rule => ({ ...rule, _section: 'Cư dân' })),
    ...visibleEmsRules.map(rule => ({ ...rule, _section: 'Nội bộ EMS' })),
  ]

  // Filter rules based on search query
  const filteredRules = searchQuery
    ? searchableRules.filter(r => {
        const q = searchQuery.toLowerCase()
        return (
          r.title.toLowerCase().includes(q) ||
          r.num.toLowerCase().includes(q) ||
          (r.keywords || '').toLowerCase().includes(q) ||
          (r.items || []).some(item => item.text.toLowerCase().includes(q)) ||
          (r.penaltyRows || []).some(row => row.action.toLowerCase().includes(q)) ||
          (r.note || '').toLowerCase().includes(q)
        )
      })
    : rules

  const counts = {
    resident: visibleResidentRules.length,
    ems: visibleEmsRules.length,
  }

  return (
    <ThemeProvider>
      <LoadingScreen />
      <div
        className={clsx(
          'public-v3 mdt-shell min-h-screen text-[var(--ink)] pb-20 sm:pb-0',
          'opacity-100'
        )}
      >
        <ScrollProgress />
        
        <Navbar
          onSearch={handleSearch}
          searchValue={searchQuery}
          dataSource={content.source}
          onPrint={handlePrint}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <Hero onSelectTag={handleSelectTag} onSearch={handleSearch} searchValue={searchQuery} counts={counts} version={content.versionInfo?.version} />
        <DocumentInfo info={content.versionInfo} />

        {/* Layout */}
        <div className="mdt-wrap flex" id="main-rules-section">
          <Sidebar
            rules={rules}
            activeTab={activeTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onNavigate={handleNavigate}
          />

          {/* Main Content */}
          <main id="main-content" className="min-w-0 flex-1 py-8 lg:pl-6 lg:py-9">
            
            {/* Tab switcher */}
            <TabSwitcher active={activeTab} onChange={handleTabChange} counts={counts} />

            <>
                {/* Section Header */}
                <div className="mdt-panel mb-5 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={clsx(
                        'mdt-mono mb-3 inline-block text-[9px] font-bold tracking-[.14em] text-[#3fa9f5]',
                        activeTab === 'ems' ? 'text-[#3fa9f5]' : 'text-[#8ce04b]'
                      )}>
                        {searchQuery ? 'TRA CỨU TOÀN HỆ THỐNG' : activeTab === 'ems' ? 'PHẦN 2 • QUY ĐỊNH NỘI BỘ' : 'PHẦN 1 • QUY ĐỊNH CƯ DÂN'}
                      </span>
                      <h2 className="mdt-display text-xl leading-tight text-[var(--ink)] sm:text-3xl">
                        {searchQuery
                          ? 'KẾT QUẢ TÌM KIẾM QUY ĐỊNH'
                          : activeTab === 'ems'
                          ? 'QUY ĐỊNH NỘI BỘ EMS BEACH TOWN'
                          : 'QUY ĐỊNH KHÁM BỆNH TẠI EMS BEACH TOWN'}
                      </h2>
                      <p className="text-[var(--muted)] text-sm mt-2 max-w-2xl leading-6">
                        {searchQuery
                          ? 'Đang tìm trong cả quy định cư dân và nội bộ EMS với từ khóa “' + searchQuery + '”.'
                          : activeTab === 'ems'
                          ? 'Dành riêng cho nhân viên y tế (Bác sĩ, Điều dưỡng). Nghiêm cấm vi phạm.'
                          : 'Dành cho tất cả cư dân khi đến bệnh viện, đăng ký khám hoặc tiếp xúc với EMS.'}
                      </p>
                    </div>

                    {/* Expand/Collapse All Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 no-print">
                      <button
                        onClick={() => setOpenAll(true)}
                        className="mdt-control mdt-mono flex items-center gap-1.5 px-3 py-2 text-[9px] font-bold uppercase"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                        Mở tất cả
                      </button>
                      <button
                        onClick={() => setOpenAll(false)}
                        className="mdt-control mdt-mono flex items-center gap-1.5 px-3 py-2 text-[9px] font-bold uppercase"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                        Đóng tất cả
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search filter status badge */}
                {searchQuery && (
                  <div className={clsx(
                    'mb-5 flex items-center justify-between border px-4 py-3 text-sm animate-fade-in',
                    filteredRules.length === 0
                      ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400'
                      : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/40 text-blue-700 dark:text-blue-300'
                  )}>
                    <div className="flex items-center gap-2 font-medium">
                      <span>{filteredRules.length === 0 ? '😕' : '🔍'}</span>
                      <span>
                        {filteredRules.length === 0
                          ? `Không tìm thấy kết quả nào khớp với "${searchQuery}".`
                          : `Tìm thấy ${filteredRules.length} điều khoản khớp với từ khóa "${searchQuery}".`
                        }
                      </span>
                    </div>
                    <button
                      onClick={() => handleSearch('')}
                      className="text-xs underline font-bold hover:opacity-80 ml-2"
                    >
                      Xóa lọc
                    </button>
                  </div>
                )}

                {/* Accordion Rules List */}
                <div className="space-y-3.5">
                  {filteredRules.map((rule, i) => (
                    <div key={rule.id} className="observe-fade is-visible" style={{ animationDelay: `${i * 35}ms` }}>
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
            </>
          </main>
        </div>

        <Glossary />
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
