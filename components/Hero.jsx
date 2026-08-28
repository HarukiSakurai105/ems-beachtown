'use client'
import { ArrowRight, BookOpenText, CircleDot, ReceiptText, Search, Stethoscope } from 'lucide-react'

export default function Hero({ onSelectTag, onSearch, counts, version }) {
  const quick = [
    { label: 'Quy định cư dân', value: counts?.resident || 0, icon: BookOpenText, query: 'cấp cứu', tone: 'mint' },
    { label: 'Nội bộ bác sĩ', value: counts?.ems || 0, icon: Stethoscope, query: 'duty', tone: 'orange' },
    { label: 'Dịch vụ & viện phí', value: counts?.pricing || 0, icon: ReceiptText, query: 'bang-gia', tone: 'cream' },
  ]
  const tags = ['cấp cứu', 'phương tiện', 'giao tranh', 'treo duty', 'kỷ luật']

  return <header className="px-3 pb-5 pt-24 sm:px-5 sm:pb-7 sm:pt-28 lg:px-8">
    <div className="mx-auto max-w-[1420px] overflow-hidden rounded-[2rem] border border-[var(--line-strong)] bg-[#14231e] text-white shadow-[0_24px_80px_rgba(18,35,29,.16)] lg:rounded-[2.5rem]">
      <div className="grid lg:grid-cols-[1.12fr_.88fr]">
        <div className="relative p-6 sm:p-9 lg:p-12">
          <div className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border border-white/10 lg:block" />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#bde8d5]"><CircleDot className="h-3.5 w-3.5" /> Đang áp dụng · phiên bản {version || '1.0'}</div>
          <p className="mt-8 text-[11px] font-black uppercase tracking-[.28em] text-white/45">Beach Town Medical Service</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[.94] tracking-[-.055em] sm:text-6xl lg:text-[5rem]">Tra cứu đúng.<br /><span className="text-[#ff765f]">Xử lý nhanh.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">Bàn điều phối quy định EMS dành cho cư dân và bác sĩ. Mọi nội dung, bảng giá và quy trình được tìm thấy từ một ô duy nhất.</p>
          <label className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl bg-white p-2 pl-4 text-[var(--ink)] shadow-2xl shadow-black/20 sm:rounded-[1.4rem]">
            <Search className="h-5 w-5 flex-none text-[#ff5d45]" />
            <input onChange={event => onSearch?.(event.target.value)} placeholder="Nhập tình huống, điều khoản hoặc từ khóa…" className="min-w-0 flex-1 bg-transparent py-2 text-sm font-semibold outline-none placeholder:text-slate-400 sm:text-base" />
            <button type="button" onClick={() => document.getElementById('main-rules-section')?.scrollIntoView({ behavior: 'smooth' })} className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#ff5d45] text-white sm:h-12 sm:w-12" aria-label="Đi đến kết quả"><ArrowRight className="h-5 w-5" /></button>
          </label>
          <div className="mt-5 flex flex-wrap gap-2">{tags.map(tag => <button key={tag} onClick={() => onSelectTag?.(tag)} className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-bold text-white/65 hover:border-white/35 hover:text-white">#{tag}</button>)}</div>
        </div>
        <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-1">
          {quick.map(item => <button key={item.label} onClick={() => onSelectTag?.(item.query)} className={`hero-route hero-route-${item.tone} group flex min-h-36 items-end justify-between p-6 text-left text-[#14231e] sm:min-h-44 lg:min-h-0 lg:p-8`}>
            <span><span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-white/75"><item.icon className="h-5 w-5" /></span><b className="block text-base sm:text-lg">{item.label}</b><small className="mt-1 block text-xs opacity-60">{item.value} mục đang hiển thị</small></span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>)}
        </div>
      </div>
    </div>
  </header>
}
