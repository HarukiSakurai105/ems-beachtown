'use client'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  useEffect(() => { const interval = setInterval(() => setProgress(value => Math.min(100, value + Math.floor(Math.random() * 14) + 8)), 65); const failSafe = setTimeout(finish, 2200); return () => { clearInterval(interval); clearTimeout(failSafe) } }, [])
  useEffect(() => { if (progress >= 100) { const timer = setTimeout(finish, 180); return () => clearTimeout(timer) } }, [progress])
  function finish() { setLeaving(true); setTimeout(() => { setDone(true); onComplete?.() }, 350) }
  if (done) return null
  return <div className={`loading-screen fixed inset-0 z-[999999] grid place-items-center bg-[#07111f] px-6 text-white transition duration-500 ${leaving ? 'pointer-events-none scale-[1.03] opacity-0' : ''}`} aria-hidden="true"><div className="absolute inset-0 protocol-grid opacity-30" /><div className="relative w-full max-w-sm"><div className="mb-10 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-rose-400 text-2xl shadow-xl shadow-red-600/30">⚕️</span><div><p className="font-black tracking-tight">BEACH TOWN EMS</p><p className="text-[9px] font-bold uppercase tracking-[.22em] text-slate-500">Protocol Center</p></div></div><div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-red-400">Đang đồng bộ</p><h1 className="mt-1 text-2xl font-black tracking-tight">Medical Protocol System</h1></div><span className="font-mono text-sm font-bold text-slate-400">{progress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-100" style={{ width: `${progress}%` }} /></div><div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Kết nối dữ liệu quy định chính thức</div></div></div>
}
