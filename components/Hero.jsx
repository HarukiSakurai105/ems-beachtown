'use client'
import { ArrowRight, BadgeCheck, BookOpenText, Radio, ReceiptText, Search, Stethoscope } from 'lucide-react'

export default function Hero({ onSelectTag, onSearch, counts, version }) {
  const routes = [
    { label: 'Dành cho cư dân', desc: 'Quy trình khám và cấp cứu', count: counts?.resident || 0, icon: BookOpenText, query: 'cấp cứu' },
    { label: 'Nội bộ EMS', desc: 'Nghiệp vụ và kỷ luật', count: counts?.ems || 0, icon: Stethoscope, query: 'duty' },
    { label: 'Bảng giá viện phí', desc: 'Tính bill nhanh, chính xác', count: counts?.pricing || 0, icon: ReceiptText, query: 'bang-gia' },
  ]
  return <header className="relative overflow-hidden border-b border-[var(--line)] bg-[#081a2b] px-4 pb-14 pt-28 text-white sm:px-6 sm:pb-16 lg:px-8">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(69,189,228,.16),transparent_32%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:auto,40px_40px,40px_40px]" />
    <div className="relative mx-auto max-w-[1420px]">
      <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.2em] text-cyan-200"><Radio className="h-3.5 w-3.5" /> Cổng thông tin chính thức · v{version || '1.0'}</div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-[4.5rem]">Quy chuẩn y tế,<br /><span className="text-[#45bde4]">tra cứu trong vài giây.</span></h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Thông tin dành cho cư dân và đội ngũ EMS Beach Town, được xác thực, phân loại và đồng bộ trực tiếp từ hệ thống quản trị.</p>
          <label className="mt-8 flex max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-white p-2 pl-4 text-[#0b1f33] shadow-2xl shadow-black/20">
            <Search className="h-5 w-5 flex-none text-[#087ca7]" /><input onChange={event => onSearch?.(event.target.value)} placeholder="Bạn cần tìm quy định nào?" className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold outline-none placeholder:text-slate-400 sm:text-base" /><button type="button" onClick={() => document.getElementById('main-rules-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex h-11 flex-none items-center gap-2 rounded-xl bg-[#087ca7] px-4 text-xs font-black text-white sm:px-5">Tra cứu <ArrowRight className="h-4 w-4" /></button>
          </label>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[.055] p-5 shadow-2xl shadow-black/10 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-[9px] font-black uppercase tracking-[.18em] text-cyan-300">Trung tâm điều phối</p><h2 className="mt-1 text-sm font-black">Truy cập nhanh</h2></div><BadgeCheck className="h-5 w-5 text-emerald-400" /></div>
          <div className="mt-3 space-y-2">{routes.map(route => <button key={route.label} onClick={() => onSelectTag?.(route.query)} className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3 text-left hover:border-cyan-300/30 hover:bg-white/[.08]"><span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><route.icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><b className="block text-xs">{route.label}</b><small className="mt-1 block text-[9px] text-slate-400">{route.desc}</small></span><span className="rounded-lg bg-white/5 px-2 py-1 text-[9px] font-black text-slate-300">{route.count}</span><ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300" /></button>)}</div>
        </div>
      </div>
    </div>
  </header>
}
