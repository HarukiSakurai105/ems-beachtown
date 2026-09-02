'use client'
import { useState } from 'react'
import { Search, X, Sparkles, Shield, HeartPulse, Clock } from 'lucide-react'

export default function Hero({ onSearch, searchValue, counts, onSelectTag, version }) {
  const quickTags = [
    { label: 'Cấp cứu & SOP', query: 'cấp cứu' },
    { label: 'Tác phong & Đồng phục', query: 'đồng phục' },
    { label: 'Giao tranh & Can thiệp', query: 'giao tranh' },
    { label: 'Treo Duty', query: 'treo duty' },
    { label: 'Phối hợp PD', query: 'pd' },
    { label: 'Kỷ luật & Sa thải', query: 'kỷ luật' },
  ]

  return (
    <section className="relative overflow-hidden bg-[#091728] text-white py-14 sm:py-20 px-4">
      {/* Background with hospital ambulance fleet blurred & dark medical vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25 filter blur-[2px] scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#091728]/80 via-[#071322]/90 to-[var(--bg-main)] pointer-events-none" />

      {/* Ambient glowing radial orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-ems-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Official Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-extrabold uppercase tracking-widest text-sky-200 mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>HỆ THỐNG VĂN BẢN QUY ĐỊNH CHÍNH THỨC · {version ? `V${version}` : '2026'}</span>
        </div>

        {/* Big Title matching screenshot */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase mb-3">
          HỆ THỐNG VĂN BẢN EMS
        </h1>

        {/* Subtitle / Slogan matching screenshot */}
        <p className="text-base sm:text-xl font-medium text-slate-300 mb-8 max-w-2xl mx-auto">
          Sứ mệnh cứu người - Kỷ luật là sức mạnh
        </p>

        {/* Centered Large Search Bar matching screenshot */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-black/30 border-2 border-white/20 p-1.5 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-400/20 transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Tìm kiếm luật, quy định..."
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none font-medium"
            />
            {searchValue && (
              <button
                onClick={() => onSearch?.('')}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors mr-1"
                title="Xóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white text-xs font-bold rounded-xl shadow-md transition-all uppercase tracking-wider"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Quick Search Tag Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">Từ khóa gợi ý:</span>
          {quickTags.map(tag => (
            <button
              key={tag.label}
              onClick={() => onSelectTag?.(tag.query)}
              className="px-3 py-1 rounded-full bg-white/10 hover:bg-sky-500/20 border border-white/15 hover:border-sky-400/40 text-slate-300 hover:text-white font-medium transition-all text-xs"
            >
              #{tag.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
