'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, FileClock } from 'lucide-react'
import AccordionItem from './AccordionItem'

export default function ContentPreview() {
  const [draft, setDraft] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetch('/api/admin/draft', { cache: 'no-store' }).then(async response => { const data = await response.json(); if (!response.ok || !data.draft) throw new Error(data.error || 'Chưa có bản nháp để xem trước.'); setDraft(data.draft) }).catch(error => setError(error.message)) }, [])

  if (error) return <main className="mdt-auth grid min-h-screen place-items-center p-4"><div className="mdt-panel max-w-md p-7 text-center"><h1 className="mdt-display text-xl">Không mở được bản xem trước</h1><p className="mt-2 text-sm text-[var(--muted)]">{error}</p><Link href="/admin" className="admin-primary mt-6">Quay lại Admin</Link></div></main>
  if (!draft) return <main className="mdt-auth mdt-mono grid min-h-screen place-items-center text-xs text-[#8ce04b]">LOADING DRAFT NODE…</main>

  const content = draft.content
  const groups = [{ id: 'resident', label: 'Quy định cư dân', rules: content.residentRules || [] }, { id: 'ems', label: 'Quy định nội bộ EMS', rules: content.emsRules || [] }]
  const hiddenCount = groups.flatMap(group => group.rules).filter(rule => rule.visible === false).length

  return <main id="main-content" className="mdt-preview min-h-screen"><header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[#10161b]/95 px-4 py-3 backdrop-blur-xl"><div className="mx-auto flex max-w-5xl items-center justify-between gap-3"><Link href="/admin" className="mdt-mono inline-flex items-center gap-2 text-[10px] font-bold text-[var(--muted)] hover:text-[#8ce04b]"><ArrowLeft className="h-4 w-4" /> RETURN / ADMIN</Link><span className="mdt-tag mdt-tag-warning"><Eye className="mr-1 h-3.5 w-3.5" /> Preview only</span></div></header><div className="mx-auto max-w-5xl px-4 py-7 sm:px-6 sm:py-10"><section className="mdt-panel p-6 sm:p-8"><p className="mdt-kicker">// EMS SAFE PUBLISHING</p><h1 className="mdt-display mt-3 text-3xl sm:text-4xl">Bản nháp v{content.versionInfo?.version}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">Kiểm tra nội dung trước khi công bố lên trang chủ. Những mục đang ẩn vẫn xuất hiện ở đây để người quản trị kiểm tra.</p><div className="mdt-mono mt-5 flex flex-wrap gap-2 text-[9px]"><span className="border border-[var(--line)] bg-[#151d24] px-3 py-1.5"><FileClock className="mr-1 inline h-3.5 w-3.5 text-[#8ce04b]" /> LƯU {new Date(draft.savedAt).toLocaleString('vi-VN')}</span><span className="border border-[var(--line)] bg-[#151d24] px-3 py-1.5">{hiddenCount} MỤC ĐANG ẨN</span></div></section>{groups.map(group => <section key={group.id} className="mt-8"><div className="mb-4 flex items-end justify-between gap-3 border-b border-[var(--line)] pb-2"><div><p className="mdt-kicker">// BẢN XEM TRƯỚC</p><h2 className="mdt-display mt-1 text-xl">{group.label}</h2></div><span className="mdt-mono border border-[var(--line)] px-3 py-1.5 text-[10px]">{group.rules.length} ENTRY</span></div><div className="space-y-3">{group.rules.map(rule => <div key={rule.id} className={rule.visible === false ? 'opacity-55' : ''}>{rule.visible === false && <p className="mdt-mono mb-1 ml-2 text-[9px] font-bold uppercase text-[#ffc530]">STATUS//HIDDEN</p>}<AccordionItem rule={rule} isOpen /></div>)}</div></section>)}</div></main>
}
