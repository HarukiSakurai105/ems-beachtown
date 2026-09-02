'use client'
import { useState } from 'react'
import { ChevronRight, ShieldCheck, Stethoscope, BookOpen, AlertTriangle, PhoneCall, Disc } from 'lucide-react'
import clsx from 'clsx'

export default function Sidebar({ rules, activeTab, onTabChange, activeChapter, onSelectChapter, counts, onNavigate }) {
  const chapters = [
    { id: 'ch1', num: '1', title: 'Quy định chung & Tác phong', icon: '📋' },
    { id: 'ch2', num: '2', title: 'Quy trình Cấp cứu (SOP)', icon: '🚑' },
    { id: 'ch3', num: '3', title: 'Sử dụng Trang thiết bị & Xe', icon: '🚗' },
    { id: 'ch4', num: '4', title: 'Quy tắc Ứng xử & Bệnh nhân', icon: '🤝' },
    { id: 'ch5', num: '5', title: 'Hệ thống Kỷ luật & Xử phạt', icon: '⚖️' },
  ]

  return (
    <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
      
      {/* Tab Switcher: Cư dân vs Nội bộ EMS */}
      <div className="med-card p-1.5 flex rounded-2xl bg-slate-100 dark:bg-[#0b1526] border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => onTabChange('resident')}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all',
            activeTab === 'resident'
              ? 'bg-white dark:bg-sky-600 text-sky-700 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>CƯ DÂN ({counts?.resident || 0})</span>
        </button>

        <button
          onClick={() => onTabChange('ems')}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all',
            activeTab === 'ems'
              ? 'bg-white dark:bg-ems-600 text-ems-700 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          )}
        >
          <Stethoscope className="w-4 h-4" />
          <span>NỘI BỘ EMS ({counts?.ems || 0})</span>
        </button>
      </div>

      {/* Main Directory: MỤC LỤC LUẬT (exact match with screenshot) */}
      <div className="med-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          <h2 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>MỤC LỤC LUẬT</span>
          </h2>
        </div>

        <nav className="p-2 space-y-1">
          {chapters.map((ch) => {
            const isSelected = activeChapter === ch.id
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={clsx(
                  'w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-semibold transition-all group',
                  isSelected
                    ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-800/60 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-sky-500 font-bold text-xs">{'>'}</span>
                  <span className="truncate">{ch.num}. {ch.title}</span>
                </div>
                <ChevronRight className={clsx(
                  'w-3.5 h-3.5 transition-transform text-slate-400 group-hover:translate-x-0.5',
                  isSelected && 'text-sky-600 dark:text-sky-400'
                )} />
              </button>
            )
          })}
        </nav>
      </div>

      {/* Quick Rule List Shortcuts */}
      <div className="med-card p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Tất cả điều khoản ({rules.length})
        </h3>
        <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
          {rules.map((rule, idx) => (
            <a
              key={rule.id}
              href={`#${rule.id}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(rule.id)
              }}
              className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-sky-600 transition-colors"
            >
              <span className="truncate font-semibold">{rule.num}: {rule.title}</span>
              <span className="text-[10px] text-slate-400">{rule.isPenalty ? 'Phạt' : `${rule.items?.length || 0} mục`}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Support / Discord Widget */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5865F2]/10 to-[#5865F2]/20 border border-[#5865F2]/30 text-center">
        <p className="text-xs font-extrabold text-[#5865F2] uppercase tracking-wider mb-1">
          KÊNH LIÊN LẠC DISCORD
        </p>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3">
          Nộp bằng chứng Body-cam, báo cáo & khiếu nại cấp cứu.
        </p>
        <a
          href="https://discord.gg/beachtown2026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold shadow-md transition-transform active:scale-95"
        >
          <span>Tham gia Discord</span>
          <span>➔</span>
        </a>
      </div>

    </aside>
  )
}
