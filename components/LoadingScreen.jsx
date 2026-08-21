'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Đang khởi tạo hệ thống...')
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Progress counter simulation from 0 to 100%
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Random step increment for realistic loading feel
        const inc = Math.floor(Math.random() * 12) + 6
        const next = Math.min(prev + inc, 100)

        if (next < 30) {
          setStatusText('Đang nạp dữ liệu y tế Beach Town...')
        } else if (next < 65) {
          setStatusText('Đồng bộ quy định Cư dân & Nội bộ EMS...')
        } else if (next < 95) {
          setStatusText('Kiểm tra điều luật & hình thức xử phạt...')
        } else {
          setStatusText('Hệ thống đã sẵn sàng! Đang vào trang chủ...')
        }

        return next
      })
    }, 90)

    return () => clearInterval(interval)
  }, [])

  // When progress reaches 100%, trigger smooth transition into main site
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        finishLoading()
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const finishLoading = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsDone(true)
      onComplete?.()
    }, 600)
  }

  if (isDone) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#070d18] text-white px-4 select-none',
        'transition-all duration-700 ease-in-out',
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ems-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white/70 tracking-widest uppercase mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-ems-500 animate-ping" />
          <span>GTA ROLEPLAY • BEACH TOWN EMS</span>
        </div>

        {/* Hospital Logo Emblem */}
        <div className="relative mb-6 group">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-ems-700 via-ems-600 to-red-500 flex items-center justify-center text-5xl shadow-2xl shadow-ems-600/40 transform transition-transform duration-500 group-hover:scale-105">
            ⚕️
          </div>
          {/* Pulsing ring around emblem */}
          <div className="absolute -inset-2 rounded-3xl border border-ems-500/30 animate-ping pointer-events-none" />
        </div>

        {/* Typography */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white mb-2">
          EMS BEACH TOWN
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-navy-300 mb-8 font-semibold">
          TRUNG TÂM Y TẾ & CẤP CỨU THÀNH PHỐ
        </p>

        {/* ECG Heartbeat Line */}
        <div className="w-64 h-12 mb-4 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full text-ems-500" viewBox="0 0 240 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path
              d="M 0 20 L 50 20 L 60 10 L 70 30 L 80 5 L 90 35 L 100 20 L 140 20 L 150 10 L 160 30 L 170 5 L 180 35 L 190 20 L 240 20"
              className="ecg-line"
              strokeDasharray="240"
              strokeDashoffset="240"
            />
          </svg>
        </div>

        {/* Progress Bar with glowing pill */}
        <div className="w-full bg-navy-900/80 border border-white/10 rounded-full h-3 p-0.5 mb-3 overflow-hidden shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-ems-600 via-ems-500 to-blue-500 rounded-full transition-all duration-150 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full blur-[1px] animate-pulse" />
          </div>
        </div>

        {/* Progress Percentage & Status */}
        <div className="flex items-center justify-between w-full text-xs mb-6 px-1">
          <span className="text-navy-300 font-medium">{statusText}</span>
          <span className="text-white font-mono font-bold text-sm">{progress}%</span>
        </div>

        {/* Skip button for quick entry */}
        <button
          onClick={finishLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-ems-600 border border-white/15 hover:border-ems-500 rounded-xl text-xs font-bold text-white tracking-wider uppercase transition-all duration-200 transform hover:scale-105 shadow-lg active:scale-95"
        >
          <span>Vào trang chủ ngay</span>
          <span>➔</span>
        </button>

      </div>

      {/* Footer hint */}
      <div className="absolute bottom-6 text-[11px] text-white/30 tracking-widest uppercase font-mono">
        © 2026 EMS BEACH TOWN • SECURITY & RP COMPLIANCE
      </div>

      <style jsx>{`
        .ecg-line {
          animation: ecgStroke 1.8s ease-in-out infinite;
        }
        @keyframes ecgStroke {
          0% {
            stroke-dashoffset: 240;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -240;
          }
        }
      `}</style>
    </div>
  )
}
