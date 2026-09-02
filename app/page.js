'use client'
import { useState, useEffect, useCallback } from 'react'
import { Copy, Check, Clock, Shirt } from 'lucide-react'
import clsx from 'clsx'

import { ThemeProvider } from '../components/ThemeProvider'
import ScrollProgress from '../components/ScrollProgress'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import EmergencyModal from '../components/EmergencyModal'
import { AboutModal, SOPModal, PersonnelModal } from '../components/InfoModals'
import PenaltyTable from '../components/PenaltyTable'
import { residentRules } from '../data/resident-rules'
import { emsRules } from '../data/ems-rules'
import { defaultVersionInfo } from '../lib/default-content'
import { buildChapterCatalog, getRuleChapter } from '../lib/chapter-catalog'

export default function Home() {
  const [activeTab, setActiveTab] = useState('ems')
  const [activeChapter, setActiveChapter] = useState('ch1')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [content, setContent] = useState({ residentRules, emsRules, versionInfo: defaultVersionInfo })

  // Modals
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
    return () => channel?.close()
  }, [refreshContent])

  const handleNavClick = (sectionId) => {
    if (sectionId === 'about') setAboutOpen(true)
    else if (sectionId === 'sop') setSopOpen(true)
    else if (sectionId === 'personnel') setPersonnelOpen(true)
    else if (sectionId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    else if (sectionId === 'rules') {
      document.getElementById('rules-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleCopyText = (rule) => {
    const text = (rule.items || []).map(i => i.text.replace(/[*_`]/g, '')).join('\n')
    navigator.clipboard.writeText(`${rule.num}: ${rule.title}\n${text}`)
    setCopiedId(rule.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  const visibleRules = (activeTab === 'ems' ? content.emsRules : content.residentRules).filter(r => r.visible !== false)
  const chapters = buildChapterCatalog(visibleRules)

  useEffect(() => {
    const available = buildChapterCatalog((activeTab === 'ems' ? content.emsRules : content.residentRules).filter(rule => rule.visible !== false))
    if (available.length && !available.some(chapter => chapter.id === activeChapter)) setActiveChapter(available[0].id)
  }, [activeTab, activeChapter, content])

  // Map rules to chapters
  const getChapterRules = () => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return visibleRules.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.num.toLowerCase().includes(q) ||
        (r.items || []).some(i => i.text.toLowerCase().includes(q))
      )
    }

    return visibleRules.filter(rule => getRuleChapter(rule).id === activeChapter)
  }

  const currentRules = getChapterRules()
  const selectedChapter = chapters.find(chapter => chapter.id === activeChapter) || chapters[0]

  return (
    <ThemeProvider>
      <LoadingScreen />

      <div className="min-h-screen bg-[#07192d] text-slate-900 flex flex-col font-sans">
        <ScrollProgress />

        <Navbar
          activeSection="rules"
          onNavClick={handleNavClick}
          onPrint={() => window.print()}
          onOpenEmergency={() => setEmergencyOpen(true)}
        />

        <Hero
          onSearch={(q) => setSearchQuery(q)}
          searchValue={searchQuery}
        />

        {/* ── THE WHITE CONTAINER EXACTLY LIKE SCREENSHOT ── */}
        <div id="rules-container" className="max-w-6xl mx-auto w-full px-4 -mt-6 sm:-mt-8 mb-12 relative z-20">
          <div className="bg-white dark:bg-[#0d1f33] rounded-t-2xl sm:rounded-t-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row">
            
            {/* ── LEFT SIDEBAR: MỤC LỤC LUẬT ── */}
            <div className="w-full md:w-64 lg:w-72 border-r border-slate-200 dark:border-slate-800 p-4 sm:p-5 bg-white dark:bg-[#0d1f33] flex-shrink-0">
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                  MỤC LỤC LUẬT
                </h2>
                
                {/* Switcher Cư dân / EMS */}
                <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-[10px] font-bold">
                  <button
                    onClick={() => { setActiveTab('resident'); setSearchQuery('') }}
                    className={clsx('px-2 py-1 rounded-md transition-colors', activeTab === 'resident' ? 'bg-white dark:bg-sky-600 text-sky-700 dark:text-white shadow-sm' : 'text-slate-500')}
                  >
                    Cư dân
                  </button>
                  <button
                    onClick={() => { setActiveTab('ems'); setSearchQuery('') }}
                    className={clsx('px-2 py-1 rounded-md transition-colors', activeTab === 'ems' ? 'bg-white dark:bg-red-600 text-red-700 dark:text-white shadow-sm' : 'text-slate-500')}
                  >
                    EMS
                  </button>
                </div>
              </div>

              {/* 5 Chapters exactly as in mockup */}
              <ul className="space-y-1 text-xs">
                {chapters.map((ch) => {
                  const isCurrent = activeChapter === ch.id && !searchQuery
                  return (
                    <li key={ch.id}>
                      <button
                        onClick={() => { setActiveChapter(ch.id); setSearchQuery('') }}
                        className={clsx(
                          'w-full flex items-center justify-between p-2.5 rounded-xl text-left font-semibold transition-all',
                          isCurrent
                            ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                        )}
                      >
                          <span className="min-w-0 flex-1">
                            <strong className="text-sky-600 mr-1">{'>'}</strong> {ch.num}. {ch.title}
                          </span>
                        <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-black text-slate-400 dark:bg-slate-800">{visibleRules.filter(rule => getRuleChapter(rule).id === ch.id).length}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Discord quick banner */}
              <div className="mt-8 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Cổng hỗ trợ khẩn cấp
                </p>
                <a
                  href="https://discord.gg/beachtown2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[10px] font-extrabold text-[#5865F2] hover:underline"
                >
                  Tham gia Discord Beach Town ➔
                </a>
              </div>
            </div>

            {/* ── RIGHT MAIN: BREADCRUMB + CHAPTER HEADER + 2x2 CARDS ── */}
            <div className="flex-1 p-5 sm:p-7 bg-white dark:bg-[#0d1f33] min-w-0">
              
              {/* Breadcrumb: Trang chủ > Bộ luật */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-400 mb-2 font-medium">
                <span>Trang chủ</span>
                <span>›</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {activeTab === 'ems' ? 'Bộ luật nội bộ EMS' : 'Bộ luật dành cho cư dân'}
                </span>
                {searchQuery && (
                  <>
                    <span>›</span>
                    <span className="text-sky-600 font-bold">Tìm kiếm: "{searchQuery}"</span>
                  </>
                )}
              </div>

              {/* Chapter Title: CHƯƠNG 1: QUY ĐỊNH CHUNG */}
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-5">
                {searchQuery ? `KẾT QUẢ TÌM KIẾM (${currentRules.length})` : selectedChapter ? `CHƯƠNG ${selectedChapter.num}: ${selectedChapter.title}` : 'CHƯA CÓ NỘI DUNG'}
              </h2>

              {/* ── 2x2 GRID OF WHITE CARDS MATCHING PHOTO ── */}
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                {currentRules.map((rule, idx) => {
                  const isExpanded = expandedId === rule.id
                  const snippet = rule.items?.[0]?.text?.replace(/[*_`]/g, '') || rule.title
                  
                  // Specific styling accents matching photo
                  const isCard1 = idx === 0 && !searchQuery
                  const isCard2 = idx === 1 && !searchQuery
                  const isCard3 = idx === 2 && !searchQuery
                  const isCard4 = idx === 3 && !searchQuery

                  return (
                    <div
                      key={rule.id}
                      className={clsx(
                        'relative self-start bg-white dark:bg-[#091829] rounded-2xl border p-4 sm:p-5 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md',
                        isCard1
                          ? 'border-l-4 border-l-red-500 border-slate-200 dark:border-slate-800'
                          : 'border-slate-200 dark:border-slate-800'
                      )}
                    >
                      <div>
                        {/* Header of Card */}
                        <div className="flex items-start gap-3 mb-2">
                          
                          {/* Circular icon badges for Card 2 & 4 matching screenshot */}
                          {isCard2 && (
                            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 text-sm flex-shrink-0">
                              <Shirt className="w-4 h-4" />
                            </div>
                          )}
                          {isCard4 && (
                            <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-600 text-sm flex-shrink-0">
                              <Clock className="w-4 h-4" />
                            </div>
                          )}
                          {!isCard2 && !isCard4 && (
                            <span className="text-xl flex-shrink-0">{rule.icon || '📋'}</span>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                                {rule.num}: {rule.title}
                              </h3>
                              {rule.newUntil && new Date(rule.newUntil).getTime() > Date.now() && <span className="flex-none rounded-full bg-red-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-white">Mới</span>}
                              {isCard1 && (
                                <span className="text-sky-600 font-bold text-xs">»</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Text snippet */}
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                          {snippet}
                        </p>
                      </div>

                      {/* Expandable sub-items if clicked */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2">
                          {rule.isPenalty ? (
                            <PenaltyTable rows={rule.penaltyRows} note={rule.note} notes={rule.notes} />
                          ) : (
                            rule.items?.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                <span>{item.icon}</span>
                                <span dangerouslySetInnerHTML={{
                                  __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }} />
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Footer of Card */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : rule.id)}
                          className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
                          <span className="text-[9px]">{isExpanded ? '▲' : '▼'}</span>
                        </button>

                        <button
                          onClick={() => handleCopyText(rule)}
                          className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-medium flex items-center gap-1"
                        >
                          {copiedId === rule.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === rule.id ? 'Đã copy' : 'Copy'}</span>
                        </button>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>

        {/* ── FOOTER MATCHING SCREENSHOT ── */}
        <footer className="bg-[#0b2847] text-slate-400 text-xs py-6 px-4 border-t border-white/10 mt-auto no-print">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] sm:text-xs">
              © 2024 Los Santos EMS - GTA Roleplay Server
            </p>
            <div className="flex items-center gap-6 text-[11px] font-bold text-slate-300">
              <button onClick={() => setAboutOpen(true)} className="hover:text-white">Quick Links</button>
              <a href="https://discord.gg/beachtown2026" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord Support</a>
              <a href="/admin" className="hover:text-white">Admin Portal</a>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
        <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
        <SOPModal isOpen={sopOpen} onClose={() => setSopOpen(false)} />
        <PersonnelModal isOpen={personnelOpen} onClose={() => setPersonnelOpen(false)} />

      </div>
    </ThemeProvider>
  )
}
