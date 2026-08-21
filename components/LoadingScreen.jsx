'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Đang khởi tạo hệ thống y tế...')
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    // Smooth progress counter simulation from 0 to 100%
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Increments smoothly
        const inc = Math.floor(Math.random() * 8) + 4
        const next = Math.min(prev + inc, 100)

        if (next < 25) {
          setStatusText('Đang kết nối cơ sở dữ liệu Beach Town...')
        } else if (next < 50) {
          setStatusText('Đồng bộ quy định Cư dân & Điều lệ khám chữa...')
        } else if (next < 80) {
          setStatusText('Nạp quy chế nội bộ EMS & Quy tắc ca trực...')
        } else if (next < 99) {
          setStatusText('Kiểm tra chế tài xử phạt & Body-cam...')
        } else {
          setStatusText('Hệ thống hoàn tất! Đang chuyển hướng...')
        }

        return next
      })
    }, 70)

    return () => clearInterval(interval)
  }, [])

  // Auto trigger smooth transition into main site when 100%
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFadingOut(true)
        setTimeout(() => {
          setIsDone(true)
          onComplete?.()
        }, 700)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  if (isDone) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#070d18] text-white px-4 select-none',
        'transition-all duration-700 ease-in-out',
        isFadingOut ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ems-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating cross particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <span className="absolute top-1/4 left-1/6 text-2xl animate-float-slow">➕</span>
        <span className="absolute top-1/3 right-1/4 text-xl animate-float-medium" style={{animationDelay: '1s'}}>⚕️</span>
        <span className="absolute bottom-1/3 left-1/4 text-3xl animate-float-slow" style={{animationDelay: '2s'}}>🏥</span>
        <span className="absolute bottom-1/4 right-1/6 text-2xl animate-float-medium" style={{animationDelay: '1.5s'}}>💊</span>
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold text-white/80 tracking-widest uppercase mb-8 backdrop-blur-md shadow-lg shadow-black/40">
          <span className="w-2 h-2 rounded-full bg-ems-500 animate-ping" />
          <span>GTA ROLEPLAY • BEACH TOWN EMS</span>
        </div>

        {/* Hospital Logo Emblem with glowing aura */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-ems-700 via-ems-600 to-red-500 flex items-center justify-center text-5xl shadow-2xl shadow-ems-600/50 animate-bounce">
            ⚕️
          </div>
          <div className="absolute -inset-3 rounded-3xl border border-ems-500/40 animate-ping pointer-events-none" />
        </div>

        {/* Typography */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white mb-1.5">
          EMS BEACH TOWN
        </h1>
        <p className="text-[11px] uppercase tracking-[0.3em] text-navy-300 mb-8 font-bold">
          HỆ THỐNG QUY ĐỊNH & CẤP CỨU THÀNH PHỐ
        </p>

        {/* ECG Heartbeat Line */}
        <div className="w-72 h-12 mb-4 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full text-ems-500 filter drop-shadow-[0_0_8px_rgba(230,57,70,0.8)]" viewBox="0 0 240 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path
              d="M 0 20 L 50 20 L 60 10 L 70 30 L 80 5 L 90 35 L 100 20 L 140 20 L 150 10 L 160 30 L 170 5 L 180 35 L 190 20 L 240 20"
              className="ecg-line"
              strokeDasharray="240"
              strokeDashoffset="240"
            />
          </svg>
        </div>

        {/* Progress Bar with smooth glow */}
        <div className="w-full bg-navy-900/90 border border-white/10 rounded-full h-3.5 p-0.5 mb-3 overflow-hidden shadow-inner relative">
          <div
            className="h-full bg-gradient-to-r from-ems-600 via-ems-500 to-blue-400 rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full blur-[1px] animate-pulse" />
          </div>
        </div>

        {/* Progress Percentage & Status */}
        <div className="flex items-center justify-between w-full text-xs px-1">
          <span className="text-navy-300 font-medium animate-pulse">{statusText}</span>
          <span className="text-white font-mono font-extrabold text-sm">{progress}%</span>
        </div>

      </div>

      {/* Footer hint */}
      <div className="absolute bottom-6 text-[11px] text-white/30 tracking-widest uppercase font-mono">
        © 2026 EMS BEACH TOWN • CHÍNH THỨC BAN HÀNH
      </div>

      <style jsx>{`
        .ecg-line {
          animation: ecgStroke 1.6s ease-in-out infinite;
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
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-10deg); }
        }
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: floatMedium 4.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
