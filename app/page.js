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
import BillCalculator from '../components/BillCalculator'
import MobileBottomNav from '../components/MobileBottomNav'
import Footer from '../components/Footer'
import DocumentInfo from '../components/DocumentInfo'
import Glossary from '../components/Glossary'
import SupportCenter from '../components/SupportCenter'
import { residentRules } from '../data/resident-rules'
import { emsRules } from '../data/ems-rules'
import { pricingData } from '../data/pricing'
import { defaultVersionInfo } from '../lib/default-content'

export default function Home() {
  const [activeTab, setActiveTab] = useState('resident')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openAll, setOpenAll] = useState(null) // null | true | false
  const [content, setContent] = useState({ residentRules, emsRules, pricingData, versionInfo: defaultVersionInfo })

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
      if (hash === 'bang-gia' || hash === 'tinh-bill') {
        setActiveTab('pricing')
        setTimeout(() => {
          document.getElementById('main-rules-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 500)
      } else {
        const rule = [...residentRules, ...emsRules].find(r => r.id === hash)
        if (rule) {
          setActiveTab(rule.id.startsWith('ems') ? 'ems' : 'resident')
          setTimeout(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 500)
        }
      }
    }
    // Restore tab from localStorage
    const saved = localStorage.getItem('ems_tab')
    if (saved && !hash) setActiveTab(saved)

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
    if (q) {
      if (activeTab === 'pricing') setActiveTab('resident')
      setOpenAll(true)
    }
  }

  const handleSelectTag = (query) => {
    if (query === 'bang-gia') {
      setActiveTab('pricing')
    } else {
      setSearchQuery(query)
      setOpenAll(true)
    }
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

  // Filter rules based on search query
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
    resident: visibleResidentRules.length,
    ems: visibleEmsRules.length,
    pricing: (content.pricingData?.services || []).filter(item => item.visible !== false).length,
  }

  return (
    <ThemeProvider>
      {/* Dedicated Waiting Screen */}
      <LoadingScreen />

      {/* Main Page with smooth fade-in after splash */}
      <div
        className={clsx(
          'min-h-screen bg-gray-50 dark:bg-navy-900 pb-16 sm:pb-0 transition-opacity duration-700',
          'opacity-100'
        )}
      >
        <ScrollProgress />
        
        <Navbar
          onSearch={handleSearch}
          onPrint={handlePrint}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <Hero onSelectTag={handleSelectTag} />
        <DocumentInfo info={content.versionInfo} />

        {/* Layout */}
        <div className="flex max-w-7xl mx-auto" id="main-rules-section">
          {activeTab !== 'pricing' && (
            <Sidebar
              rules={rules}
              activeTab={activeTab}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onNavigate={handleNavigate}
            />
          )}

          {/* Main Content */}
          <main className={clsx(
            'flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8',
            activeTab === 'pricing' ? 'max-w-5xl mx-auto' : ''
          )}>
            
            {/* Tab switcher */}
            <TabSwitcher active={activeTab} onChange={handleTabChange} counts={counts} />

            {/* If tab is Pricing & Calculator */}
            {activeTab === 'pricing' ? (
              <BillCalculator data={content.pricingData} />
            ) : (
              <>
                {/* Section Header */}
                <div className="mb-6 pb-5 border-b border-gray-200 dark:border-navy-700">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className={clsx(
                        'inline-block text-[11px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full mb-2',
                        activeTab === 'ems'
                          ? 'bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300'
                          : 'bg-ems-50 dark:bg-ems-950/30 text-ems-700 dark:text-ems-400'
                      )}>
                        {activeTab === 'ems' ? 'PHẦN 2 • QUY ĐỊNH NỘI BỘ' : 'PHẦN 1 • QUY ĐỊNH CƯ DÂN'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                        {activeTab === 'ems'
                          ? 'QUY ĐỊNH NỘI BỘ EMS BEACH TOWN'
                          : 'QUY ĐỊNH KHÁM BỆNH TẠI EMS BEACH TOWN'}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {activeTab === 'ems'
                          ? 'Dành riêng cho nhân viên y tế (Bác sĩ, Điều dưỡng). Nghiêm cấm vi phạm.'
                          : 'Dành cho tất cả cư dân khi đến bệnh viện, đăng ký khám hoặc tiếp xúc với EMS.'}
                      </p>
                    </div>

                    {/* Expand/Collapse All Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 no-print">
                      <button
                        onClick={() => setOpenAll(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-ems-400 hover:text-ems-600 transition-all shadow-sm active:scale-95"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                        Mở tất cả
                      </button>
                      <button
                        onClick={() => setOpenAll(false)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-400 hover:text-gray-900 transition-all shadow-sm active:scale-95"
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
                    'mb-5 px-4 py-3 rounded-xl text-sm border flex items-center justify-between shadow-sm animate-fade-in',
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
                      onClick={() => setSearchQuery('')}
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
            )}
          </main>
        </div>

        <Glossary />
        <SupportCenter />
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
