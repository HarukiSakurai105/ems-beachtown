'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp, Search, ShieldCheck, Stethoscope, BookOpen, AlertCircle, ArrowRight } from 'lucide-react'
import clsx from 'clsx'

import { ThemeProvider } from '../components/ThemeProvider'
import ScrollProgress from '../components/ScrollProgress'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Sidebar from '../components/Sidebar'
import AccordionItem from '../components/AccordionItem'
import Footer from '../components/Footer'
import EmergencyModal from '../components/EmergencyModal'
import { AboutModal, SOPModal, PersonnelModal } from '../components/InfoModals'
import { residentRules } from '../data/resident-rules'
import { emsRules } from '../data/ems-rules'
import { defaultVersionInfo } from '../lib/default-content'

export default function Home() {
  const [activeTab, setActiveTab] = useState('resident')
  const [activeChapter, setActiveChapter] = useState('ch1')
  const [searchQuery, setSearchQuery] = useState('')
  const [openAll, setOpenAll] = useState(null)
  const [content, setContent] = useState({ residentRules, emsRules, versionInfo: defaultVersionInfo })
  
  // Modals state
  const [emergencyOpen, setEmergencyOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [sopOpen, setSopOpen] = useState(false)
  const [personnelOpen, setPersonnelOpen] = useState(false)

  const refreshContent = useCallback(() => {
    return fetch(`/api/content?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setContent(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    refreshContent()

    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('ems-content-sync') : null
    if (channel) channel.onmessage = e => e.data?.type === 'published' && refreshContent()
    const onStorage = e => e.key === 'ems_content_updated' && refreshContent()
    window.addEventListener('storage', onStorage)

    // Handle hash navigation
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

    return () => {
      channel?.close()
      window.removeEventListener('storage', onStorage)
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
    const el = document.getElementById('main-rules-section')
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleNavClick = (sectionId) => {
    if (sectionId === 'about') setAboutOpen(true)
    else if (sectionId === 'sop') setSopOpen(true)
    else if (sectionId === 'personnel') setPersonnelOpen(true)
    else if (sectionId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    else if (sectionId === 'rules') {
      const el = document.getElementById('main-rules-section')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNavigate = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const visibleResidentRules = (content.residentRules || []).filter(r => r.visible !== false)
  const visibleEmsRules = (content.emsRules || []).filter(r => r.visible !== false)
  const rules = (activeTab === 'ems' ? visibleEmsRules : visibleResidentRules)

  const searchableRules = [
    ...visibleResidentRules.map(r => ({ ...r, _section: 'Cư dân' })),
    ...visibleEmsRules.map(r => ({ ...r, _section: 'Nội bộ EMS' })),
  ]

  // Filter based on search
  const filteredRules = searchQuery
    ? searchableRules.filter(r => {
        const q = searchQuery.toLowerCase()
        return (
          r.title.toLowerCase().includes(q) ||
          r.num.toLowerCase().includes(q) ||
          (r.keywords || '').toLowerCase().includes(q) ||
          (r.items || []).some(item => item.text.toLowerCase().includes(q))
        )
      })
    : rules

  const chapterNames = {
    ch1: 'CHƯƠNG 1: QUY ĐỊNH CHUNG & TÁC PHONG',
    ch2: 'CHƯƠNG 2: QUY TRÌNH CẤP CỨU (SOP)',
    ch3: 'CHƯƠNG 3: TRANG THIẾT BỊ & PHƯƠNG TIỆN',
    ch4: 'CHƯƠNG 4: QUY TẮC ỨNG XỬ VỚI BỆNH NHÂN',
    ch5: 'CHƯƠNG 5: HỆ THỐNG KỶ LUẬT & XỬ PHẠT',
  }

  return (
    <ThemeProvider>
      <LoadingScreen />
      
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />

        <Navbar
          activeSection="rules"
          onNavClick={handleNavClick}
          onPrint={() => { setOpenAll(true); setTimeout(() => window.print(), 300) }}
          onOpenEmergency={() => setEmergencyOpen(true)}
        />

        <Hero
          onSearch={handleSearch}
          searchValue={searchQuery}
          counts={{ resident: visibleResidentRules.length, ems: visibleEmsRules.length }}
          onSelectTag={handleSelectTag}
          version={content.versionInfo?.version}
        />

        {/* Main Section matching screenshot layout */}
        <main id="main-rules-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Left Column: Sidebar with MỤC LỤC LUẬT */}
            <Sidebar
              rules={rules}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              activeChapter={activeChapter}
              onSelectChapter={(id) => { setActiveChapter(id); setSearchQuery('') }}
              counts={{ resident: visibleResidentRules.length, ems: visibleEmsRules.length }}
              onNavigate={handleNavigate}
            />

            {/* Right Column: Breadcrumb + Chapter Header + Rule Cards Grid */}
            <div className="flex-1 min-w-0 w-full">
              
              {/* Breadcrumbs matching screenshot */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                <span>Trang chủ</span>
                <span>›</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold">
                  {activeTab === 'ems' ? 'Quy định nội bộ EMS' : 'Quy định khám bệnh cư dân'}
                </span>
                {searchQuery && (
                  <>
                    <span>›</span>
                    <span className="text-slate-700 dark:text-slate-200">Tìm kiếm: "{searchQuery}"</span>
                  </>
                )}
              </div>

              {/* Chapter Header + Expand Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {searchQuery ? 'KẾT QUẢ TÌM KIẾM QUY ĐỊNH' : chapterNames[activeChapter] || 'DANH SÁCH ĐIỀU KHOẢN'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {activeTab === 'ems'
                      ? 'Dành riêng cho nhân viên y tế (Bác sĩ, Y tá). Vi phạm sẽ xử lý kỷ luật.'
                      : 'Quy chuẩn bắt buộc đối với tất cả người dân khi đến khám hoặc gọi cấp cứu.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 no-print">
                  <button
                    onClick={() => setOpenAll(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1a2c] text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-400 shadow-sm"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                    Mở tất cả
                  </button>
                  <button
                    onClick={() => setOpenAll(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1a2c] text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-slate-400 shadow-sm"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    Đóng tất cả
                  </button>
                </div>
              </div>

              {/* Search match notice */}
              {searchQuery && (
                <div className="mb-5 p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-sky-800 dark:text-sky-300">
                    Tìm thấy <strong>{filteredRules.length}</strong> điều khoản khớp với từ khóa "<strong>{searchQuery}</strong>"
                  </span>
                  <button onClick={() => setSearchQuery('')} className="font-bold underline text-sky-600">Xóa tìm</button>
                </div>
              )}

              {/* Grid of Rule Cards matching the photo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRules.map((rule) => (
                  <AccordionItem
                    key={rule.id}
                    rule={rule}
                    highlight={searchQuery}
                    isOpen={openAll !== null ? openAll : undefined}
                  />
                ))}
              </div>

              {filteredRules.length === 0 && (
                <div className="med-card p-12 text-center text-slate-500">
                  <p className="text-4xl mb-3">🔍</p>
                  <h3 className="font-bold text-base text-slate-800 dark:text-white">Không tìm thấy điều luật phù hợp</h3>
                  <p className="text-xs mt-1">Hãy thử tìm từ khóa khác như "cấp cứu", "đồng phục", "kỷ luật", "vũ khí".</p>
                </div>
              )}

            </div>

          </div>

        </main>

        <Footer />

        {/* Modals */}
        <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
        <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
        <SOPModal isOpen={sopOpen} onClose={() => setSopOpen(false)} />
        <PersonnelModal isOpen={personnelOpen} onClose={() => setPersonnelOpen(false)} />

      </div>
    </ThemeProvider>
  )
}
