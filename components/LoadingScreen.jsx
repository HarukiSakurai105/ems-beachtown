'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Đang kết nối hệ thống y tế Los Santos...')
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        const inc = Math.floor(Math.random() * 12) + 6
        const next = Math.min(prev + inc, 100)

        if (next < 30) {
          setStatus('Đang nạp dữ liệu điều lệ & quy chế bệnh viện...')
        } else if (next < 65) {
          setStatus('Đồng bộ danh mục Cư dân & Nhân viên EMS...')
        } else if (next < 90) {
          setStatus('Kiểm tra quy trình cấp cứu SOP & Nhật ký 911...')
        } else {
          setStatus('Hệ thống hoàn tất! Đang chuyển hướng...')
        }

        return next
      })
    }, 70)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const t1 = setTimeout(() => setFading(true), 300)
      const t2 = setTimeout(() => {
        setHidden(true)
        if (onFinish) onFinish()
      }, 800)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [progress, onFinish])

  if (hidden) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#071728] text-white select-none transition-all duration-700 ease-out',
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      )}
    >
      {/* Background medical glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Logo Shield with pulse */}
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-red-600 via-ems-600 to-rose-700 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shadow-red-600/40 border border-white/20 animate-bounce">
            ⚕️
          </div>
          <div className="absolute -inset-2 rounded-3xl border border-red-500/40 animate-ping pointer-events-none" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase mb-1">
          LOS SANTOS EMS
        </h2>
        <p className="text-[11px] font-bold tracking-[0.25em] text-sky-300 uppercase mb-6">
          HỆ THỐNG VĂN BẢN & QUY ĐỊNH
        </p>

        {/* ECG Heartbeat line */}
        <div className="w-64 h-10 mb-4 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" viewBox="0 0 240 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path
              d="M 0 20 L 50 20 L 60 10 L 70 30 L 80 5 L 90 35 L 100 20 L 140 20 L 150 10 L 160 30 L 170 5 L 180 35 L 190 20 L 240 20"
              className="ecg-line"
              strokeDasharray="240"
              strokeDashoffset="240"
            />
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900/80 border border-white/10 rounded-full h-3 p-0.5 mb-3 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-sky-500 to-emerald-400 rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full blur-[1px] animate-pulse" />
          </div>
        </div>

        {/* Status text & percentage */}
        <div className="flex items-center justify-between w-full text-xs">
          <span className="text-slate-400 text-[11px] font-medium">{status}</span>
          <span className="font-mono font-black text-sky-400 text-sm">{progress}%</span>
        </div>

      </div>

      {/* Footer text */}
      <div className="absolute bottom-6 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
        © 2026 LOS SANTOS EMS DEPARTMENT • BEACH TOWN RP
      </div>

      <style jsx>{`
        .ecg-line {
          animation: ecgStroke 1.6s ease-in-out infinite;
        }
        @keyframes ecgStroke {
          0% { stroke-dashoffset: 240; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -240; }
        }
      `}</style>
    </div>
  )
}
