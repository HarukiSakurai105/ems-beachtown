'use client'
import { useEffect, useMemo, useState } from 'react'
import { Activity, Check, Database, FileCheck2, ShieldCheck } from 'lucide-react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(4)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  const status = useMemo(() => progress < 36 ? 'Đang kết nối Supabase' : progress < 72 ? 'Đang xác thực quy định' : 'Đang chuẩn bị giao diện', [progress])

  useEffect(() => {
    const interval = window.setInterval(() => setProgress(value => Math.min(100, value + 4)), 82)
    const failsafe = window.setTimeout(finish, 2850)
    return () => { window.clearInterval(interval); window.clearTimeout(failsafe) }
  }, [])
  useEffect(() => {
    if (progress >= 100) {
      const timer = window.setTimeout(finish, 260)
      return () => window.clearTimeout(timer)
    }
  }, [progress])

  function finish() {
    setLeaving(true)
    window.setTimeout(() => setDone(true), 380)
  }

  if (done) return null
  const checks = [
    { label: 'Cơ sở dữ liệu', icon: Database, ready: progress >= 36 },
    { label: 'Quy định chính thức', icon: FileCheck2, ready: progress >= 72 },
    { label: 'Phiên truy cập', icon: ShieldCheck, ready: progress >= 96 },
  ]

  return <div className={`loading-screen fixed inset-0 z-[999999] grid place-items-center overflow-hidden bg-[#061523] px-5 text-white transition duration-500 ${leaving ? 'pointer-events-none scale-[1.015] opacity-0' : ''}`} role="status" aria-live="polite">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(69,189,228,.12),transparent_34%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:auto,44px_44px,44px_44px]" />
    <div className="relative w-full max-w-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-xl bg-[#e44848] shadow-lg shadow-red-500/15"><Activity className="h-6 w-6" /></span><span><b className="block text-sm font-black tracking-tight">BEACH TOWN EMS</b><small className="block text-[9px] font-bold uppercase tracking-[.22em] text-white/40">Clinical Protocol Portal</small></span></div>
        <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-[9px] font-black uppercase tracking-wider text-emerald-300"><i className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Secure</span>
      </div>

      <div className="py-9">
        <p className="text-[9px] font-black uppercase tracking-[.24em] text-[#45bde4]">Khởi tạo hệ thống</p>
        <div className="mt-3 flex items-end justify-between gap-5"><h1 className="max-w-md text-2xl font-black leading-tight tracking-[-.04em] sm:text-4xl">Đồng bộ cổng thông tin y tế</h1><span className="font-mono text-lg font-bold text-white/45">{String(progress).padStart(3, '0')}%</span></div>
        <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#087ca7] to-[#45bde4] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400"><span className="relative flex h-2 w-2"><i className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-40" /><i className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" /></span>{status}</div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">{checks.map(item => <div key={item.label} className={`flex items-center gap-3 rounded-xl border p-3 transition ${item.ready ? 'border-cyan-300/20 bg-cyan-300/10 text-white' : 'border-white/10 bg-white/[.025] text-white/30'}`}><span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5">{item.ready ? <Check className="h-4 w-4 text-emerald-300" /> : <item.icon className="h-4 w-4" />}</span><span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span></div>)}</div>
    </div>
  </div>
}
