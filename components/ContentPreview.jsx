'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, FileClock } from 'lucide-react'
import AccordionItem from './AccordionItem'

export default function ContentPreview() {
  const [draft, setDraft] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/draft', { cache: 'no-store' })
      .then(async response => {
        const data = await response.json()
        if (!response.ok || !data.draft) throw new Error(data.error || 'Chưa có bản nháp để xem trước.')
        setDraft(data.draft)
      })
      .catch(error => setError(error.message))
  }, [])

  if (error) return <main className="grid min-h-screen place-items-center bg-[#07111f] p-4 text-white"><div className="max-w-md rounded-3xl border border-red-400/20 bg-white/5 p-7 text-center"><h1 className="text-xl font-black">Không mở được bản xem trước</h1><p className="mt-2 text-sm text-slate-400">{error}</p><Link href="/admin" className="admin-primary mt-6">Quay lại Admin</Link></div></main>
  if (!draft) return <main className="grid min-h-screen place-items-center bg-[#07111f] text-sm font-bold text-white">Đang tải bản xem trước…</main>

  const content = draft.content
  const groups = [
    { id: 'resident', label: 'Quy định cư dân', rules: content.residentRules || [] },
    { id: 'ems', label: 'Quy định nội bộ EMS', rules: content.emsRules || [] },
  ]
  const hiddenCount = groups.flatMap(group => group.rules).filter(rule => rule.visible === false).length

  return <main id="main-content" className="min-h-screen bg-[#eef3f7] text-[#0b1f33] dark:bg-[#07111f] dark:text-white"><header className="sticky top-0 z-30 border-b border-white/10 bg-[#07111f]/95 px-4 py-3 text-white backdrop-blur-xl"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3"><Link href="/admin" className="inline-flex items-center gap-2 text-xs font-black text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> Quay lại Admin</Link><span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-300"><Eye className="h-3.5 w-3.5" /> Chỉ xem trước</span></div></header><div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-10"><section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2238] to-[#123e53] p-6 text-white shadow-2xl sm:p-8"><p className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-300">EMS Safe Publishing</p><h1 className="mt-3 text-2xl font-black sm:text-4xl">Bản nháp v{content.versionInfo?.version}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Kiểm tra nội dung trước khi công bố lên trang chủ. Những mục đang ẩn vẫn xuất hiện ở đây để người quản trị kiểm tra.</p><div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold"><span className="rounded-full bg-white/10 px-3 py-1.5"><FileClock className="mr-1 inline h-3.5 w-3.5" /> Lưu {new Date(draft.savedAt).toLocaleString('vi-VN')}</span><span className="rounded-full bg-white/10 px-3 py-1.5">{hiddenCount} mục đang ẩn</span></div></section>{groups.map(group => <section key={group.id} className="mt-8"><div className="mb-4 flex items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#e44848]">Bản xem trước</p><h2 className="mt-1 text-xl font-black">{group.label}</h2></div><span className="rounded-xl bg-white px-3 py-1.5 text-xs font-black shadow-sm dark:bg-white/10">{group.rules.length} mục</span></div><div className="space-y-3">{group.rules.map(rule => <div key={rule.id} className={rule.visible === false ? 'opacity-55' : ''}>{rule.visible === false && <p className="mb-1 ml-2 text-[9px] font-black uppercase tracking-wider text-amber-600">Đang ẩn trên trang chủ</p>}<AccordionItem rule={rule} isOpen /></div>)}</div></section>)}</div></main>
}
