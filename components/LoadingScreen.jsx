'use client'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Smooth fade out after assets / DOM mount
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)

    const removeTimer = setTimeout(() => {
      setShouldRender(false)
    }, 1100)

    return () => {
      clearTimeout(timer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!shouldRender) return null

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-navy-950 text-white transition-opacity duration-500 ease-out',
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Background glow */}
      <div className="absolute w-72 h-72 bg-ems-600/25 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Medical Cross Icon with glow & pulse */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-ems-700 to-ems-500 flex items-center justify-center text-4xl shadow-2xl shadow-ems-500/50 animate-bounce">
            ⚕️
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ems-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-ems-500"></span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black tracking-widest text-white mb-2 text-center">
          EMS BEACH TOWN
        </h1>
        <p className="text-xs uppercase tracking-widest text-navy-400 mb-6 font-semibold">
          GTA RolePlay • Medical Center
        </p>

        {/* ECG Heartbeat Line Animation */}
        <div className="w-56 h-10 mb-4 flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full text-ems-500" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path
              d="M 0 20 L 40 20 L 50 10 L 60 30 L 70 5 L 80 35 L 90 20 L 130 20 L 140 10 L 150 30 L 160 5 L 170 35 L 180 20 L 200 20"
              className="ecg-line"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          </svg>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-1.5 bg-navy-800 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-ems-500 via-ems-400 to-blue-400 rounded-full animate-loading-bar" />
        </div>

        <p className="text-[11px] text-navy-400 mt-3 font-medium animate-pulse">
          Đang tải dữ liệu quy định...
        </p>
      </div>

      <style jsx>{`
        .ecg-line {
          animation: ecgDash 1.6s ease-in-out infinite;
        }
        @keyframes ecgDash {
          0% {
            stroke-dashoffset: 200;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -200;
          }
        }
        @keyframes loadingBar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 70%;
            margin-left: 30%;
          }
          100% {
            width: 100%;
            margin-left: 0%;
          }
        }
        .animate-loading-bar {
          animation: loadingBar 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
