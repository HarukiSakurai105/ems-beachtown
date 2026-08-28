'use client'
import { useEffect, useState } from 'react'
import { Activity, ShieldCheck } from 'lucide-react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(12)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const interval = window.setInterval(() => setProgress(value => Math.min(100, value + 11)), 75)
    const failsafe = window.setTimeout(finish, 1450)
    return () => { window.clearInterval(interval); window.clearTimeout(failsafe) }
  }, [])
  useEffect(() => { if (progress >= 100) { const timer = window.setTimeout(finish, 140); return () => window.clearTimeout(timer) } }, [progress])
  function finish() { setLeaving(true); window.setTimeout(() => setDone(true), 260) }
  if (done) return null
  return <div className={`loading-screen fixed inset-0 z-[999999] grid place-items-center overflow-hidden bg-[#071523] px-5 text-white transition duration-300 ${leaving ? 'pointer-events-none opacity-0' : ''}`} aria-label="Đang tải hệ thống">
    <div className="absolute inset-x-0 top-0 h-1 bg-white/5"><div className="h-full bg-[#45bde4] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
    <div className="w-full max-w-md">
      <div className="mb-12 flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e44848]"><Activity className="h-6 w-6" /></span><span><b className="block text-sm font-black tracking-tight">BEACH TOWN EMS</b><small className="block text-[9px] font-bold uppercase tracking-[.2em] text-white/40">Clinical Protocol Network</small></span></div><ShieldCheck className="h-5 w-5 text-[#45bde4]" /></div>
      <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#45bde4]">Khởi tạo phiên truy cập</p>
      <div className="mt-3 flex items-end justify-between gap-4"><h1 className="text-2xl font-black tracking-[-.035em] sm:text-3xl">Đang đồng bộ dữ liệu chính thức</h1><b className="font-mono text-sm text-white/40">{progress}%</b></div>
      <div className="mt-7 grid grid-cols-3 gap-2 text-center text-[9px] font-bold uppercase tracking-wider text-white/30"><span className="rounded-xl border border-white/10 p-3">Quy định</span><span className="rounded-xl border border-white/10 p-3">Bảng giá</span><span className="rounded-xl border border-white/10 p-3">Phiên bản</span></div>
    </div>
  </div>
}
